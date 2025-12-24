<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Tenant;
use App\Models\Admission;
use App\Models\AcademicSession;

class AdmissionsTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_admission_application()
    {
        $tenant = Tenant::factory()->create();
        $user = User::factory()->create(['tenant_id' => $tenant->id]);
        $this->actingAs($user);

        $response = $this->postJson('/api/admissions', [
            'tenant_id' => $tenant->id,
            'first_name' => 'Test',
            'last_name' => 'Applicant',
            'phone' => '01712345678',
            'applied_class' => 'Class 6',
            'guardian_name' => 'Test Guardian',
            'guardian_phone' => '01812345678',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('admissions', ['first_name' => 'Test']);
    }

    public function test_application_number_auto_generated()
    {
        $tenant = Tenant::factory()->create();
        $user = User::factory()->create(['tenant_id' => $tenant->id]);
        $this->actingAs($user);

        $response = $this->postJson('/api/admissions', [
            'tenant_id' => $tenant->id,
            'first_name' => 'Auto',
            'last_name' => 'Number',
            'phone' => '01712345678',
            'applied_class' => 'Class 7',
            'guardian_name' => 'Guardian',
            'guardian_phone' => '01812345678',
        ]);

        $response->assertStatus(201);
        $data = $response->json();
        $this->assertStringStartsWith('ADM-' . date('Y'), $data['application_number']);
    }

    public function test_can_update_admission_status()
    {
        $tenant = Tenant::factory()->create();
        $user = User::factory()->create(['tenant_id' => $tenant->id]);

        $admission = Admission::create([
            'tenant_id' => $tenant->id,
            'application_number' => 'ADM-TEST-001',
            'first_name' => 'Test',
            'last_name' => 'Student',
            'phone' => '01712345678',
            'applied_class' => 'Class 8',
            'guardian_name' => 'Guardian',
            'guardian_phone' => '01812345678',
        ]);

        $this->actingAs($user);
        $response = $this->putJson("/api/admissions/{$admission->id}/status", [
            'status' => 'approved',
            'merit_score' => 85.5,
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('admissions', ['id' => $admission->id, 'status' => 'approved']);
    }

    public function test_can_create_academic_session()
    {
        $tenant = Tenant::factory()->create();
        $user = User::factory()->create(['tenant_id' => $tenant->id]);
        $this->actingAs($user);

        $response = $this->postJson('/api/academic-sessions', [
            'tenant_id' => $tenant->id,
            'name' => '2025-2026',
            'start_date' => '2025-01-01',
            'end_date' => '2025-12-31',
            'is_current' => true,
            'admission_open' => true,
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('academic_sessions', ['name' => '2025-2026']);
    }

    public function test_can_create_admission_inquiry()
    {
        $tenant = Tenant::factory()->create();
        $user = User::factory()->create(['tenant_id' => $tenant->id]);
        $this->actingAs($user);

        $response = $this->postJson('/api/admission-inquiries', [
            'tenant_id' => $tenant->id,
            'student_name' => 'Prospect Student',
            'guardian_name' => 'Prospect Guardian',
            'phone' => '01712345678',
            'applied_class' => 'Class 5',
            'source' => 'website',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('admission_inquiries', ['student_name' => 'Prospect Student']);
    }
}
