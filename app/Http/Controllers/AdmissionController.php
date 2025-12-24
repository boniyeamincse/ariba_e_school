<?php

namespace App\Http\Controllers;

use App\Models\Admission;
use App\Models\AdmissionInquiry;
use App\Models\AcademicSession;
use Illuminate\Http\Request;

class AdmissionController extends Controller
{
    /**
     * List all admissions for a tenant
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $tenantId = $user->tenant_id;

        if (!$tenantId && $user->hasRole(['SAAS_SUPER_ADMIN', 'SAAS_ADMIN'])) {
            $tenantId = $request->query('tenant_id');
        }

        if (!$tenantId) {
            return response()->json(['error' => 'Tenant context required'], 400);
        }

        $query = Admission::with(['academicSession'])
            ->where('tenant_id', $tenantId);

        // Filter by status
        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        // Filter by class
        if ($class = $request->query('applied_class')) {
            $query->where('applied_class', $class);
        }

        // Search
        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('application_number', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        return response()->json($query->orderBy('created_at', 'desc')->paginate(15));
    }

    /**
     * Show single admission
     */
    public function show($id)
    {
        $admission = Admission::with(['academicSession', 'reviewer'])->findOrFail($id);
        return response()->json($admission);
    }

    /**
     * Submit a new admission application
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'academic_session_id' => 'nullable|exists:academic_sessions,id',
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'date_of_birth' => 'nullable|date',
            'gender' => 'nullable|in:male,female,other',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email',
            'address' => 'nullable|string',
            'applied_class' => 'required|string|max:50',
            'previous_school' => 'nullable|string',
            'previous_marks' => 'nullable|numeric|min:0|max:100',
            'guardian_name' => 'required|string|max:100',
            'guardian_phone' => 'required|string|max:20',
            'guardian_relation' => 'nullable|string|max:50',
            'guardian_occupation' => 'nullable|string|max:100',
        ]);

        $validated['application_number'] = Admission::generateApplicationNumber($validated['tenant_id']);
        $validated['status'] = 'pending';

        $admission = Admission::create($validated);

        return response()->json($admission, 201);
    }

    /**
     * Update admission status (approve/reject)
     */
    public function updateStatus(Request $request, $id)
    {
        $admission = Admission::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|in:pending,under_review,approved,rejected,enrolled',
            'remarks' => 'nullable|string',
            'merit_score' => 'nullable|numeric|min:0|max:100',
        ]);

        $admission->update([
            'status' => $validated['status'],
            'remarks' => $validated['remarks'] ?? $admission->remarks,
            'merit_score' => $validated['merit_score'] ?? $admission->merit_score,
            'reviewed_at' => now(),
            'reviewed_by' => $request->user()->id,
        ]);

        return response()->json($admission);
    }

    /**
     * Generate merit list for a class
     */
    public function meritList(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'applied_class' => 'required|string',
            'academic_session_id' => 'nullable|exists:academic_sessions,id',
        ]);

        $admissions = Admission::where('tenant_id', $validated['tenant_id'])
            ->where('applied_class', $validated['applied_class'])
            ->where('status', 'approved')
            ->orderByDesc('merit_score')
            ->orderByDesc('previous_marks')
            ->get();

        // Assign ranks
        $rank = 1;
        foreach ($admissions as $admission) {
            $admission->update(['merit_rank' => $rank]);
            $rank++;
        }

        return response()->json([
            'class' => $validated['applied_class'],
            'total' => $admissions->count(),
            'merit_list' => $admissions->map(fn($a) => [
                'rank' => $a->merit_rank,
                'application_number' => $a->application_number,
                'name' => $a->full_name,
                'merit_score' => $a->merit_score,
                'previous_marks' => $a->previous_marks,
                'status' => $a->status,
            ]),
        ]);
    }

    /**
     * Convert approved admission to student
     */
    public function enroll(Request $request, $id)
    {
        $admission = Admission::findOrFail($id);

        if ($admission->status !== 'approved') {
            return response()->json(['error' => 'Only approved admissions can be enrolled'], 400);
        }

        // Create student from admission data
        $student = \App\Models\Student::create([
            'tenant_id' => $admission->tenant_id,
            'first_name' => $admission->first_name,
            'last_name' => $admission->last_name,
            'date_of_birth' => $admission->date_of_birth,
            'gender' => $admission->gender,
            'blood_group' => $admission->blood_group,
            'religion' => $admission->religion,
            'nationality' => $admission->nationality,
            'address' => $admission->address,
            'phone' => $admission->phone,
            'email' => $admission->email,
            'admission_date' => now(),
            'class' => $admission->applied_class,
            'photo_url' => $admission->photo_url,
            'status' => 'active',
        ]);

        // Create guardian from admission data
        \App\Models\Guardian::create([
            'tenant_id' => $admission->tenant_id,
            'student_id' => $student->id,
            'name' => $admission->guardian_name,
            'relationship' => $admission->guardian_relation ?? 'guardian',
            'phone' => $admission->guardian_phone,
            'occupation' => $admission->guardian_occupation,
            'is_primary' => true,
        ]);

        $admission->update(['status' => 'enrolled']);

        return response()->json([
            'message' => 'Student enrolled successfully',
            'student_id' => $student->id,
            'student_number' => $student->student_id,
        ]);
    }

    // ========== INQUIRIES ==========

    /**
     * List all inquiries
     */
    public function inquiries(Request $request)
    {
        $user = $request->user();
        $tenantId = $user->tenant_id;

        if (!$tenantId) {
            return response()->json(['error' => 'Tenant context required'], 400);
        }

        $query = AdmissionInquiry::where('tenant_id', $tenantId);

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        return response()->json($query->orderBy('created_at', 'desc')->paginate(15));
    }

    /**
     * Create a new inquiry
     */
    public function createInquiry(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'student_name' => 'required|string|max:100',
            'guardian_name' => 'required|string|max:100',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email',
            'applied_class' => 'required|string|max:50',
            'source' => 'nullable|in:walk_in,website,phone,referral,advertisement,other',
            'notes' => 'nullable|string',
        ]);

        $validated['inquiry_number'] = AdmissionInquiry::generateInquiryNumber($validated['tenant_id']);
        $validated['status'] = 'new';

        $inquiry = AdmissionInquiry::create($validated);

        return response()->json($inquiry, 201);
    }

    /**
     * Update inquiry status
     */
    public function updateInquiry(Request $request, $id)
    {
        $inquiry = AdmissionInquiry::findOrFail($id);

        $validated = $request->validate([
            'status' => 'nullable|in:new,contacted,interested,applied,not_interested,closed',
            'notes' => 'nullable|string',
            'follow_up_date' => 'nullable|date',
            'assigned_to' => 'nullable|exists:users,id',
        ]);

        $inquiry->update($validated);

        return response()->json($inquiry);
    }

    // ========== ACADEMIC SESSIONS ==========

    /**
     * List academic sessions
     */
    public function sessions(Request $request)
    {
        $user = $request->user();
        $tenantId = $user->tenant_id;

        if (!$tenantId) {
            return response()->json(['error' => 'Tenant context required'], 400);
        }

        return response()->json(
            AcademicSession::where('tenant_id', $tenantId)->orderByDesc('start_date')->get()
        );
    }

    /**
     * Create academic session
     */
    public function createSession(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'name' => 'required|string|max:50',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'is_current' => 'boolean',
            'admission_open' => 'boolean',
        ]);

        // If setting as current, unset others
        if (!empty($validated['is_current'])) {
            AcademicSession::where('tenant_id', $validated['tenant_id'])->update(['is_current' => false]);
        }

        $session = AcademicSession::create($validated);

        return response()->json($session, 201);
    }
}
