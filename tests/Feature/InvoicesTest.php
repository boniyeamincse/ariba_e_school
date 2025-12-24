<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Tenant;
use App\Models\Invoice;
use Spatie\Permission\Models\Role;

class InvoicesTest extends TestCase
{
    use RefreshDatabase;

    public function test_finance_user_can_list_invoices()
    {
        $tenant = Tenant::factory()->create();
        $user = User::factory()->create(['tenant_id' => $tenant->id]);
        $role = Role::firstOrCreate(['name' => 'SAAS_FINANCE', 'guard_name' => 'web']);
        $user->assignRole($role);

        Invoice::create([
            'tenant_id' => $tenant->id,
            'invoice_number' => 'INV-TEST001',
            'amount' => 5000,
            'status' => 'pending',
            'issue_date' => now(),
            'due_date' => now()->addDays(30),
        ]);

        $this->actingAs($user);
        $response = $this->getJson('/api/invoices');

        $response->assertStatus(200);
    }

    public function test_finance_user_can_create_invoice()
    {
        $tenant = Tenant::factory()->create();
        $user = User::factory()->create();
        $role = Role::firstOrCreate(['name' => 'SAAS_FINANCE', 'guard_name' => 'web']);
        $user->assignRole($role);

        $this->actingAs($user);

        $payload = [
            'tenant_id' => $tenant->id,
            'amount' => 10000,
            'issue_date' => now()->toDateString(),
            'due_date' => now()->addDays(15)->toDateString(),
        ];

        $response = $this->postJson('/api/invoices', $payload);

        $response->assertStatus(201)
            ->assertJsonFragment(['amount' => '10000.00']);

        $this->assertDatabaseHas('invoices', ['tenant_id' => $tenant->id]);
    }

    public function test_regular_user_cannot_create_invoice()
    {
        $tenant = Tenant::factory()->create();
        $user = User::factory()->create(['tenant_id' => $tenant->id]);
        $this->actingAs($user);

        $payload = [
            'tenant_id' => $tenant->id,
            'amount' => 500,
            'issue_date' => now()->toDateString(),
            'due_date' => now()->addDays(7)->toDateString(),
        ];

        $response = $this->postJson('/api/invoices', $payload);

        $response->assertStatus(403);
    }

    public function test_invoice_number_is_auto_generated()
    {
        $invoiceNumber = Invoice::generateInvoiceNumber();

        $this->assertStringStartsWith('INV-', $invoiceNumber);
        $this->assertEquals(14, strlen($invoiceNumber)); // INV-YYYYMM0001
    }
}

