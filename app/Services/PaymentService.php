<?php

namespace App\Services;

use App\Models\Transaction;
use App\Models\Invoice;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class PaymentService
{
    public function __construct()
    {
        Stripe::setApiKey(config('services.stripe.secret'));
    }

    /**
     * Initiate Stripe Payment Intent
     */
    public function initiateStripePayment(Invoice $invoice): array
    {
        $paymentIntent = PaymentIntent::create([
            'amount' => (int) ($invoice->amount * 100), // Convert to cents
            'currency' => 'bdt',
            'metadata' => [
                'invoice_id' => $invoice->id,
                'tenant_id' => $invoice->tenant_id,
                'invoice_number' => $invoice->invoice_number,
            ],
        ]);

        // Create pending transaction
        $transaction = Transaction::create([
            'tenant_id' => $invoice->tenant_id,
            'invoice_id' => $invoice->id,
            'gateway' => 'stripe',
            'transaction_id' => $paymentIntent->id,
            'amount' => $invoice->amount,
            'currency' => 'BDT',
            'status' => 'pending',
        ]);

        return [
            'client_secret' => $paymentIntent->client_secret,
            'transaction_id' => $transaction->id,
            'amount' => $invoice->amount,
        ];
    }

    /**
     * Handle Stripe Webhook
     */
    public function handleStripeWebhook(array $payload): bool
    {
        $event = $payload['type'] ?? null;
        $data = $payload['data']['object'] ?? [];

        if ($event === 'payment_intent.succeeded') {
            $transaction = Transaction::where('transaction_id', $data['id'])->first();
            if ($transaction) {
                $transaction->update([
                    'status' => 'completed',
                    'gateway_response' => $data,
                    'payment_method' => $data['payment_method_types'][0] ?? 'card',
                ]);

                // Mark invoice as paid
                if ($transaction->invoice) {
                    $transaction->invoice->update([
                        'status' => 'paid',
                        'paid_at' => now(),
                    ]);
                }

                return true;
            }
        }

        if ($event === 'payment_intent.payment_failed') {
            $transaction = Transaction::where('transaction_id', $data['id'])->first();
            if ($transaction) {
                $transaction->update([
                    'status' => 'failed',
                    'gateway_response' => $data,
                ]);
                return true;
            }
        }

        return false;
    }

    /**
     * Initiate bKash Payment (Sandbox)
     */
    public function initiateBkashPayment(Invoice $invoice): array
    {
        // bKash API integration would go here
        // For now, returning mock data for sandbox testing
        $referenceId = 'BK' . date('YmdHis') . rand(1000, 9999);

        $transaction = Transaction::create([
            'tenant_id' => $invoice->tenant_id,
            'invoice_id' => $invoice->id,
            'gateway' => 'bkash',
            'transaction_id' => $referenceId,
            'amount' => $invoice->amount,
            'currency' => 'BDT',
            'status' => 'pending',
        ]);

        return [
            'payment_url' => 'https://sandbox.bkash.com/checkout/' . $referenceId,
            'reference_id' => $referenceId,
            'transaction_id' => $transaction->id,
            'amount' => $invoice->amount,
        ];
    }

    /**
     * Handle bKash Callback
     */
    public function handleBkashCallback(array $payload): bool
    {
        $referenceId = $payload['trxID'] ?? $payload['reference_id'] ?? null;
        $status = $payload['transactionStatus'] ?? $payload['status'] ?? null;

        if (!$referenceId) {
            return false;
        }

        $transaction = Transaction::where('transaction_id', $referenceId)->first();
        if (!$transaction) {
            return false;
        }

        $newStatus = ($status === 'Completed' || $status === 'success') ? 'completed' : 'failed';

        $transaction->update([
            'status' => $newStatus,
            'gateway_response' => $payload,
            'payment_method' => $payload['customerMsisdn'] ?? 'bkash',
        ]);

        if ($newStatus === 'completed' && $transaction->invoice) {
            $transaction->invoice->update([
                'status' => 'paid',
                'paid_at' => now(),
            ]);
        }

        return true;
    }
}
