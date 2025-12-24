<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class TenantController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'domain' => 'required|string|max:255|unique:tenants,domain',
            'plan_id' => 'required|string',
            'admin_name' => 'required|string|max:255',
            'admin_email' => 'required|email|max:255', // Uniqueness check should be scoped to tenant, but for new tenant admin it's complex. keeping simple for now.
            'admin_password' => 'required|string|min:8',
        ]);

        return DB::transaction(function () use ($validated) {
            // 1. Create Tenant
            $tenant = Tenant::create([
                'name' => $validated['name'],
                'domain' => $validated['domain'],
                'plan_id' => $validated['plan_id'],
                'status' => 'active',
                'trial_ends_at' => now()->addDays(14),
            ]);

            // 2. Create Admin User for this Tenant
            $adminVal = [
                'name' => $validated['admin_name'],
                'email' => $validated['admin_email'],
                'password' => Hash::make($validated['admin_password']),
                'tenant_id' => $tenant->id,
            ];

            // Check if user exists globally? For multi-tenant, same email might exist in different tenants.
            // But for SaaS Admin creation, we create a fresh user.
            $user = User::create($adminVal);

            // 3. Assign Role (using Spatie Permissions)
            // Ensure the role exists or create it. Ideally seeded.
            // We assume 'School Admin' role exists.
            $user->assignRole('School Admin');

            return response()->json([
                'message' => 'School created successfully',
                'tenant' => $tenant,
                'admin' => $user
            ], 201);
        });
    }

    public function index()
    {
        return response()->json(Tenant::withCount('users')->latest()->get());
    }

    public function usage()
    {
        // Mock data for MVP as integrations (S3, SMS) and Student module are in Phase 4
        // In real implementation, this would aggregate data from related tables
        $stats = [
            'storage' => [
                'used' => '45.5 GB',
                'limit' => '100 GB',
                'percentage' => 45.5
            ],
            'sms' => [
                'sent' => 12500,
                'limit' => 25000,
                'percentage' => 50
            ],
            'students' => [
                'current' => 450,
                'limit' => 1000, // Based on 'Standard' plan
                'percentage' => 45
            ],
            'recent_activity' => [
                ['action' => 'Bulk Import', 'details' => 'Imported 120 students', 'date' => '2 hours ago', 'status' => 'Completed'],
                ['action' => 'Backup', 'details' => 'Daily database backup', 'date' => '5 hours ago', 'status' => 'Completed'],
                ['action' => 'SMS Blast', 'details' => 'Exam schedule notification', 'date' => '1 day ago', 'status' => 'Completed'],
            ]
        ];

        return response()->json($stats);
    }
}
