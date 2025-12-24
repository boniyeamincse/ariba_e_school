<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Guardian;
use App\Models\StudentDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StudentController extends Controller
{
    /**
     * List all students for the authenticated user's tenant
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $tenantId = $user->tenant_id;

        // For SaaS admins, allow viewing all or by tenant
        if (!$tenantId && $user->hasRole(['SAAS_SUPER_ADMIN', 'SAAS_ADMIN'])) {
            $tenantId = $request->query('tenant_id');
        }

        if (!$tenantId) {
            return response()->json(['error' => 'Tenant context required'], 400);
        }

        $query = Student::with(['guardians', 'primaryGuardian'])
            ->where('tenant_id', $tenantId);

        // Search
        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('student_id', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        // Filter by class
        if ($classId = $request->query('class_id')) {
            $query->where('class_id', $classId);
        }

        // Filter by status
        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        $students = $query->with(['schoolClass', 'section'])->orderBy('created_at', 'desc')->paginate(15);

        return response()->json($students);
    }

    /**
     * Get a single student with all details
     */
    public function show(Request $request, $id)
    {
        $student = Student::with(['guardians', 'documents', 'tenant', 'schoolClass', 'section'])
            ->findOrFail($id);

        // Check tenant access
        $user = $request->user();
        if ($user->tenant_id && $user->tenant_id !== $student->tenant_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return response()->json($student);
    }

    /**
     * Create a new student
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'student_id' => 'nullable|string|max:50',
            'date_of_birth' => 'nullable|date',
            'gender' => 'nullable|in:male,female,other',
            'blood_group' => 'nullable|string|max:5',
            'religion' => 'nullable|string|max:50',
            'nationality' => 'nullable|string|max:50',
            'address' => 'nullable|string',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email',
            'admission_date' => 'nullable|date',
            'class_id' => 'nullable|exists:classes,id',
            'section_id' => 'nullable|exists:sections,id',
            'roll_number' => 'nullable|string|max:20',
            'status' => 'nullable|in:active,inactive,graduated,transferred',
        ]);

        // Auto-generate student_id if not provided
        if (empty($validated['student_id'])) {
            $year = date('Y');
            $count = Student::where('tenant_id', $validated['tenant_id'])
                ->whereYear('created_at', $year)
                ->count() + 1;
            $validated['student_id'] = "{$year}-" . str_pad($count, 4, '0', STR_PAD_LEFT);
        }

        $student = Student::create($validated);

        return response()->json($student, 201);
    }

    /**
     * Update a student
     */
    public function update(Request $request, $id)
    {
        $student = Student::findOrFail($id);

        // Check tenant access
        $user = $request->user();
        if ($user->tenant_id && $user->tenant_id !== $student->tenant_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'first_name' => 'sometimes|string|max:100',
            'last_name' => 'sometimes|string|max:100',
            'date_of_birth' => 'nullable|date',
            'gender' => 'nullable|in:male,female,other',
            'blood_group' => 'nullable|string|max:5',
            'religion' => 'nullable|string|max:50',
            'address' => 'nullable|string',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email',
            'class_id' => 'nullable|exists:classes,id',
            'section_id' => 'nullable|exists:sections,id',
            'roll_number' => 'nullable|string|max:20',
            'status' => 'nullable|in:active,inactive,graduated,transferred',
        ]);

        $student->update($validated);

        return response()->json($student);
    }

    /**
     * Delete a student
     */
    public function destroy(Request $request, $id)
    {
        $student = Student::findOrFail($id);

        // Check tenant access
        $user = $request->user();
        if ($user->tenant_id && $user->tenant_id !== $student->tenant_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $student->delete();

        return response()->json(['message' => 'Student deleted successfully']);
    }

    /**
     * Add a guardian to a student
     */
    public function addGuardian(Request $request, $studentId)
    {
        $student = Student::findOrFail($studentId);

        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'relationship' => 'required|in:father,mother,guardian,other',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email',
            'occupation' => 'nullable|string|max:100',
            'address' => 'nullable|string',
            'is_primary' => 'boolean',
        ]);

        $validated['tenant_id'] = $student->tenant_id;
        $validated['student_id'] = $student->id;

        // If marking as primary, unset other primaries
        if (!empty($validated['is_primary'])) {
            Guardian::where('student_id', $student->id)->update(['is_primary' => false]);
        }

        $guardian = Guardian::create($validated);

        return response()->json($guardian, 201);
    }

    /**
     * Upload a document for a student
     */
    public function uploadDocument(Request $request, $studentId)
    {
        $student = Student::findOrFail($studentId);

        $request->validate([
            'document_type' => 'required|string|max:50',
            'file' => 'required|file|max:5120', // 5MB max
        ]);

        $file = $request->file('file');
        $path = $file->store("students/{$studentId}/documents", 'public');

        $document = StudentDocument::create([
            'student_id' => $student->id,
            'document_type' => $request->document_type,
            'file_name' => $file->getClientOriginalName(),
            'file_path' => $path,
            'mime_type' => $file->getMimeType(),
            'file_size' => $file->getSize(),
        ]);

        return response()->json($document, 201);
    }

    /**
     * Upload student photo
     */
    public function uploadPhoto(Request $request, $studentId)
    {
        $student = Student::findOrFail($studentId);

        $request->validate([
            'photo' => 'required|image|max:2048', // 2MB max
        ]);

        $file = $request->file('photo');
        $path = $file->store("students/{$studentId}", 'public');

        $student->update(['photo_url' => Storage::url($path)]);

        return response()->json(['photo_url' => $student->photo_url]);
    }
}
