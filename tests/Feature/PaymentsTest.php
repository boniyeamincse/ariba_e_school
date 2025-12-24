<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Tenant;
use App\Models\Invoice;
use App\Models\Transaction;
use Spatie\Permission\Models\Role;

class PaymentsTest extends TestCase
{
    use RefreshDatabase;

    public function test_finance_user_can_list_transactions()
    {
        $tenant = Tenant::factory()->create();
        $user = User::factory()->create();
        $role = Role::firstOrCreate(['name' => 'SAAS_FINANCE', 'guard_name' => 'web']);
        $user->assignRole($role);

        Transaction::create([
            'tenant_id' => $tenant->id,
            'gateway' => 'stripe',
            'amount' => 5000,
            'currency' => 'BDT',
            'status' => 'completed',
        ]);

        $this->actingAs($user);
        $response = $this->getJson('/api/transactions');

        $response->assertStatus(200);
    }

    public function test_payment_initiation_requires_invoice()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->postJson('/api/payments/initiate', [
            'gateway' => 'stripe',
        ]);

        $response->assertStatus(422); // Validation error
    }

    public function test_cannot_pay_already_paid_invoice()
    {
        $tenant = Tenant::factory()->create();
        $user = User::factory()->create(['tenant_id' => $tenant->id]);

        $invoice = Invoice::create([
            'tenant_id' => $tenant->id,
            'invoice_number' => 'INV-TEST001',
            'amount' => 5000,
            'status' => 'paid',
            'issue_date' => now(),
            'due_date' => now()->addDays(30),
            'paid_at' => now(),
        ]);

        $this->actingAs($user);

        $response = $this->postJson('/api/payments/initiate', [
            'invoice_id' => $invoice->id,
            'gateway' => 'stripe',
        ]);

        $response->assertStatus(400)
            ->assertJsonFragment(['error' => 'Invoice is already paid']);
    }

    public function test_transaction_model_relationships()
    {
        $tenant = Tenant::factory()->create();
        $invoice = Invoice::create([
            'tenant_id' => $tenant->id,
            'invoice_number' => 'INV-REL001',
            'amount' => 1000,
            'status' => 'pending',
            'issue_date' => now(),
            'due_date' => now()->addDays(7),
        ]);

        $transaction = Transaction::create([
            'tenant_id' => $tenant->id,
            'invoice_id' => $invoice->id,
            'gateway' => 'bkash',
            'amount' => 1000,
            'currency' => 'BDT',
            'status' => 'pending',
        ]);

        $this->assertEquals($tenant->id, $transaction->tenant->id);
        $this->assertEquals($invoice->id, $transaction->invoice->id);
    }
}

