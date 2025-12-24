<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Tenant;
use App\Models\Student;
use App\Models\Guardian;
use Spatie\Permission\Models\Role;

class StudentsTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_list_students()
    {
        $tenant = Tenant::factory()->create();
        $user = User::factory()->create(['tenant_id' => $tenant->id]);

        Student::create([
            'tenant_id' => $tenant->id,
            'first_name' => 'Test',
            'last_name' => 'Student',
            'status' => 'active',
        ]);

        $this->actingAs($user);
        $response = $this->getJson('/api/students');

        $response->assertStatus(200);
    }

    public function test_can_create_student()
    {
        $tenant = Tenant::factory()->create();
        $user = User::factory()->create(['tenant_id' => $tenant->id]);
        $this->actingAs($user);

        $response = $this->postJson('/api/students', [
            'tenant_id' => $tenant->id,
            'first_name' => 'New',
            'last_name' => 'Student',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('students', ['first_name' => 'New', 'last_name' => 'Student']);
    }

    public function test_student_id_auto_generated()
    {
        $tenant = Tenant::factory()->create();
        $user = User::factory()->create(['tenant_id' => $tenant->id]);
        $this->actingAs($user);

        $response = $this->postJson('/api/students', [
            'tenant_id' => $tenant->id,
            'first_name' => 'Auto',
            'last_name' => 'ID',
        ]);

        $response->assertStatus(201);
        $data = $response->json();
        $this->assertStringStartsWith(date('Y') . '-', $data['student_id']);
    }

    public function test_can_add_guardian_to_student()
    {
        $tenant = Tenant::factory()->create();
        $user = User::factory()->create(['tenant_id' => $tenant->id]);

        $student = Student::create([
            'tenant_id' => $tenant->id,
            'first_name' => 'Test',
            'last_name' => 'Student',
        ]);

        $this->actingAs($user);
        $response = $this->postJson("/api/students/{$student->id}/guardians", [
            'name' => 'Father Name',
            'relationship' => 'father',
            'phone' => '01712345678',
            'is_primary' => true,
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('guardians', ['name' => 'Father Name', 'is_primary' => true]);
    }

    public function test_student_belongs_to_tenant()
    {
        $tenant = Tenant::factory()->create();
        $student = Student::create([
            'tenant_id' => $tenant->id,
            'first_name' => 'Test',
            'last_name' => 'Student',
        ]);

        $this->assertEquals($tenant->id, $student->tenant->id);
    }
}
