<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class SchoolRegistrationController extends Controller
{
    /**
     * Generate unique school ID
     */
    private function generateSchoolId(): string
    {
        $year = date('Y');
        $count = Tenant::whereYear('created_at', $year)->count() + 1;
        return "SCH-{$year}-" . str_pad($count, 5, '0', STR_PAD_LEFT);
    }

    /**
     * Public: Submit school registration
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            // School Info
            'name' => 'required|string|max:255',
            'domain' => 'required|string|max:100|unique:tenants,domain',
            'eiin_number' => 'nullable|string|max:20',
            'school_type' => 'nullable|in:primary,secondary,higher_secondary,madrasa,technical,college,university',
            'education_board' => 'nullable|in:dhaka,rajshahi,comilla,jessore,chittagong,sylhet,barisal,dinajpur,madrasa,technical',
            'establishment_year' => 'nullable|digits:4',
            'school_category' => 'nullable|in:government,semi_government,private,autonomous,mpo',
            'medium' => 'nullable|in:bangla,english,both',
            'motto' => 'nullable|string|max:255',

            // Location
            'division' => 'nullable|string|max:50',
            'district' => 'nullable|string|max:50',
            'upazila' => 'nullable|string|max:50',
            'full_address' => 'nullable|string',
            'post_code' => 'nullable|string|max:10',

            // Contact
            'phone' => 'required|string|max:20',
            'alt_phone' => 'nullable|string|max:20',
            'email' => 'required|email|unique:tenants,email',
            'website' => 'nullable|url',

            // Admin Account
            'admin_name' => 'required|string|max:100',
            'admin_email' => 'required|email|unique:users,email',
            'admin_phone' => 'nullable|string|max:20',
            'admin_password' => 'required|string|min:8|confirmed',

            // System Preferences
            'session_start_month' => 'nullable|in:january,july',
            'grading_system' => 'nullable|in:gpa,percentage,letter',
            'attendance_type' => 'nullable|in:daily,period_wise',
            'language' => 'nullable|in:bn,en',

            // Agreements
            'terms_accepted' => 'required|accepted',
            'privacy_accepted' => 'required|accepted',
        ]);

        // Create tenant
        $tenant = Tenant::create([
            'school_id' => $this->generateSchoolId(),
            'name' => $validated['name'],
            'domain' => $validated['domain'],
            'eiin_number' => $validated['eiin_number'] ?? null,
            'school_type' => $validated['school_type'] ?? null,
            'education_board' => $validated['education_board'] ?? null,
            'establishment_year' => $validated['establishment_year'] ?? null,
            'school_category' => $validated['school_category'] ?? null,
            'medium' => $validated['medium'] ?? 'bangla',
            'motto' => $validated['motto'] ?? null,
            'country' => 'Bangladesh',
            'division' => $validated['division'] ?? null,
            'district' => $validated['district'] ?? null,
            'upazila' => $validated['upazila'] ?? null,
            'full_address' => $validated['full_address'] ?? null,
            'post_code' => $validated['post_code'] ?? null,
            'phone' => $validated['phone'],
            'alt_phone' => $validated['alt_phone'] ?? null,
            'email' => $validated['email'],
            'website' => $validated['website'] ?? null,
            'session_start_month' => $validated['session_start_month'] ?? 'january',
            'grading_system' => $validated['grading_system'] ?? 'gpa',
            'attendance_type' => $validated['attendance_type'] ?? 'daily',
            'language' => $validated['language'] ?? 'bn',
            'terms_accepted' => true,
            'privacy_accepted' => true,
            'status' => 'inactive', // Until approved
            'approval_status' => 'pending',
            'trial_ends_at' => now()->addDays(14),
        ]);

        // Create admin user
        $admin = User::create([
            'name' => $validated['admin_name'],
            'email' => $validated['admin_email'],
            'password' => Hash::make($validated['admin_password']),
            'tenant_id' => $tenant->id,
        ]);
        $admin->assignRole('School Admin');

        return response()->json([
            'message' => 'Registration submitted successfully! Your application is pending approval.',
            'school_id' => $tenant->school_id,
            'tenant_id' => $tenant->id,
        ], 201);
    }

    /**
     * Upload logo/banner/documents
     */
    public function uploadFile(Request $request, $tenantId)
    {
        $tenant = Tenant::findOrFail($tenantId);

        $request->validate([
            'file' => 'required|file|max:5120', // 5MB
            'type' => 'required|in:logo,banner,registration_cert,approval_doc',
        ]);

        $file = $request->file('file');
        $path = $file->store("schools/{$tenantId}", 'public');

        $type = $request->input('type');

        if ($type === 'logo') {
            $tenant->update(['logo_url' => Storage::url($path)]);
        } elseif ($type === 'banner') {
            $tenant->update(['banner_url' => Storage::url($path)]);
        } else {
            $documents = $tenant->documents ?? [];
            $documents[$type] = Storage::url($path);
            $tenant->update(['documents' => $documents]);
        }

        return response()->json(['path' => Storage::url($path)]);
    }

    /**
     * Admin: List pending schools
     */
    public function pendingSchools(Request $request)
    {
        $user = $request->user();

        if (!$user->hasRole(['SAAS_SUPER_ADMIN', 'SAAS_ADMIN'])) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $schools = Tenant::where('approval_status', 'pending')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json($schools);
    }

    /**
     * Admin: Approve school
     */
    public function approve(Request $request, $id)
    {
        $user = $request->user();

        if (!$user->hasRole(['SAAS_SUPER_ADMIN', 'SAAS_ADMIN'])) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $tenant = Tenant::findOrFail($id);
        $tenant->update([
            'approval_status' => 'approved',
            'status' => 'active',
            'approved_by' => $user->id,
            'approved_at' => now(),
        ]);

        // TODO: Send email notification

        return response()->json([
            'message' => 'School approved successfully!',
            'tenant' => $tenant,
        ]);
    }

    /**
     * Admin: Reject school
     */
    public function reject(Request $request, $id)
    {
        $user = $request->user();

        if (!$user->hasRole(['SAAS_SUPER_ADMIN', 'SAAS_ADMIN'])) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'reason' => 'required|string|max:1000',
        ]);

        $tenant = Tenant::findOrFail($id);
        $tenant->update([
            'approval_status' => 'rejected',
            'rejection_reason' => $validated['reason'],
        ]);

        // TODO: Send email notification

        return response()->json([
            'message' => 'School rejected.',
            'tenant' => $tenant,
        ]);
    }

    /**
     * View single school details
     */
    public function show($id)
    {
        $tenant = Tenant::with('users')->findOrFail($id);
        return response()->json($tenant);
    }
}
