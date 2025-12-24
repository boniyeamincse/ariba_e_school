<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Tenant;
use Spatie\Permission\Models\Role;

class SchoolRegistrationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // Create School Admin role
        Role::firstOrCreate(['name' => 'School Admin', 'guard_name' => 'web']);
        Role::firstOrCreate(['name' => 'SAAS_SUPER_ADMIN', 'guard_name' => 'web']);
    }

    public function test_can_register_new_school()
    {
        $response = $this->postJson('/api/schools/register', [
            'name' => 'Test School',
            'domain' => 'testschool',
            'phone' => '01712345678',
            'email' => 'school@test.com',
            'admin_name' => 'Test Admin',
            'admin_email' => 'admin@test.com',
            'admin_password' => 'password123',
            'admin_password_confirmation' => 'password123',
            'terms_accepted' => true,
            'privacy_accepted' => true,
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('tenants', ['name' => 'Test School', 'approval_status' => 'pending']);
        $this->assertDatabaseHas('users', ['email' => 'admin@test.com']);
    }

    public function test_school_id_is_auto_generated()
    {
        $response = $this->postJson('/api/schools/register', [
            'name' => 'Auto ID School',
            'domain' => 'autoidschool',
            'phone' => '01712345678',
            'email' => 'auto@test.com',
            'admin_name' => 'Auto Admin',
            'admin_email' => 'autoadmin@test.com',
            'admin_password' => 'password123',
            'admin_password_confirmation' => 'password123',
            'terms_accepted' => true,
            'privacy_accepted' => true,
        ]);

        $response->assertStatus(201);
        $data = $response->json();
        $this->assertStringStartsWith('SCH-' . date('Y'), $data['school_id']);
    }

    public function test_admin_can_approve_school()
    {
        $admin = User::factory()->create();
        $admin->assignRole('SAAS_SUPER_ADMIN');

        $tenant = Tenant::create([
            'school_id' => 'SCH-TEST-001',
            'name' => 'Pending School',
            'domain' => 'pendingschool',
            'email' => 'pending@test.com',
            'phone' => '01712345678',
            'status' => 'inactive',
            'approval_status' => 'pending',
        ]);

        $this->actingAs($admin);
        $response = $this->putJson("/api/schools/{$tenant->id}/approve");

        $response->assertStatus(200);
        $this->assertDatabaseHas('tenants', [
            'id' => $tenant->id,
            'approval_status' => 'approved',
            'status' => 'active',
        ]);
    }

    public function test_admin_can_reject_school()
    {
        $admin = User::factory()->create();
        $admin->assignRole('SAAS_SUPER_ADMIN');

        $tenant = Tenant::create([
            'school_id' => 'SCH-TEST-002',
            'name' => 'Reject School',
            'domain' => 'rejectschool',
            'email' => 'reject@test.com',
            'phone' => '01712345678',
            'status' => 'inactive',
            'approval_status' => 'pending',
        ]);

        $this->actingAs($admin);
        $response = $this->putJson("/api/schools/{$tenant->id}/reject", [
            'reason' => 'Invalid documents',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('tenants', [
            'id' => $tenant->id,
            'approval_status' => 'rejected',
            'rejection_reason' => 'Invalid documents',
        ]);
    }
}
