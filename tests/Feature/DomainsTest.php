<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Tenant;
use App\Models\Domain;
use Spatie\Permission\Models\Role;

class DomainsTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_list_domains()
    {
        $tenant = Tenant::factory()->create();
        $user = User::factory()->create();
        $role = Role::firstOrCreate(['name' => 'SAAS_ADMIN', 'guard_name' => 'web']);
        $user->assignRole($role);

        Domain::create([
            'tenant_id' => $tenant->id,
            'domain' => 'test.aribasaas.com',
            'type' => 'subdomain',
            'status' => 'verified',
        ]);

        $this->actingAs($user);
        $response = $this->getJson('/api/domains');

        $response->assertStatus(200);
    }

    public function test_can_create_subdomain()
    {
        $tenant = Tenant::factory()->create();
        $user = User::factory()->create(['tenant_id' => $tenant->id]);
        $this->actingAs($user);

        $response = $this->postJson('/api/domains', [
            'tenant_id' => $tenant->id,
            'domain' => 'myschool',
            'type' => 'subdomain',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('domains', ['domain' => 'myschool', 'status' => 'verified']);
    }

    public function test_custom_domain_starts_pending()
    {
        $tenant = Tenant::factory()->create();
        $user = User::factory()->create(['tenant_id' => $tenant->id]);
        $this->actingAs($user);

        $response = $this->postJson('/api/domains', [
            'tenant_id' => $tenant->id,
            'domain' => 'custom-school.com',
            'type' => 'custom',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('domains', ['domain' => 'custom-school.com', 'status' => 'pending']);
        $response->assertJsonStructure(['verification_instructions']);
    }

    public function test_verification_token_is_generated()
    {
        $token = Domain::generateVerificationToken();

        $this->assertStringStartsWith('ariba-verify-', $token);
        $this->assertEquals(45, strlen($token)); // ariba-verify- (13) + 32 hex chars
    }

    public function test_cannot_delete_primary_domain()
    {
        $tenant = Tenant::factory()->create();
        $user = User::factory()->create(['tenant_id' => $tenant->id]);

        $domain = Domain::create([
            'tenant_id' => $tenant->id,
            'domain' => 'primary.aribasaas.com',
            'type' => 'subdomain',
            'status' => 'verified',
            'is_primary' => true,
        ]);

        $this->actingAs($user);
        $response = $this->deleteJson("/api/domains/{$domain->id}");

        $response->assertStatus(400)
            ->assertJsonFragment(['error' => 'Cannot delete primary domain']);
    }
}

