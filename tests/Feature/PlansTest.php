<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Plan;
use Spatie\Permission\Models\Role;

class PlansTest extends TestCase
{

    use RefreshDatabase;

    public function test_authenticated_user_can_list_plans()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        Plan::create([
            'name' => 'Basic',
            'slug' => 'basic',
            'price' => 100,
            'duration_months' => 1,
            'description' => 'Desc',
            'features' => ['test'],
        ]);

        $response = $this->getJson('/api/plans');

        $response->assertStatus(200)
            ->assertJsonCount(1);
    }

    public function test_super_admin_can_create_plan()
    {
        $user = User::factory()->create();
        $role = Role::firstOrCreate(['name' => 'SAAS_SUPER_ADMIN', 'guard_name' => 'web']);
        $user->assignRole($role);

        $this->actingAs($user);

        $payload = [
            'name' => 'Pro Plan',
            'slug' => 'pro-plan',
            'price' => 999.00,
            'duration_months' => 1,
            'description' => 'Best plan',
            'features' => ['feature1', 'feature2'],
        ];

        $response = $this->postJson('/api/plans', $payload);

        $response->assertStatus(201)
            ->assertJsonFragment(['name' => 'Pro Plan']);

        $this->assertDatabaseHas('plans', ['slug' => 'pro-plan']);
    }

    public function test_regular_user_cannot_create_plan()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $payload = [
            'name' => 'Hacker Plan',
            'slug' => 'hacker-plan',
            'price' => 0,
            'duration_months' => 1,
            'description' => 'Free',
            'features' => [],
        ];

        $response = $this->postJson('/api/plans', $payload);

        $response->assertStatus(403);
    }
}
