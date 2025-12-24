<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Transaction;
use App\Services\PaymentService;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    protected PaymentService $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    /**
     * Initiate a payment for an invoice
     */
    public function initiate(Request $request)
    {
        $validated = $request->validate([
            'invoice_id' => 'required|exists:invoices,id',
            'gateway' => 'required|in:stripe,bkash,card',
        ]);

        $invoice = Invoice::findOrFail($validated['invoice_id']);

        // Check if invoice is already paid
        if ($invoice->status === 'paid') {
            return response()->json(['error' => 'Invoice is already paid'], 400);
        }

        $gateway = $validated['gateway'];

        if ($gateway === 'stripe' || $gateway === 'card') {
            $result = $this->paymentService->initiateStripePayment($invoice);
            return response()->json([
                'gateway' => 'stripe',
                'client_secret' => $result['client_secret'],
                'transaction_id' => $result['transaction_id'],
                'amount' => $result['amount'],
            ]);
        }

        if ($gateway === 'bkash') {
            $result = $this->paymentService->initiateBkashPayment($invoice);
            return response()->json([
                'gateway' => 'bkash',
                'payment_url' => $result['payment_url'],
                'reference_id' => $result['reference_id'],
                'transaction_id' => $result['transaction_id'],
                'amount' => $result['amount'],
            ]);
        }

        return response()->json(['error' => 'Unsupported gateway'], 400);
    }

    /**
     * Handle Stripe Webhook
     */
    public function stripeWebhook(Request $request)
    {
        $payload = $request->all();

        // Verify webhook signature in production
        // $sig_header = $request->header('Stripe-Signature');

        $this->paymentService->handleStripeWebhook($payload);

        return response()->json(['status' => 'ok']);
    }

    /**
     * Handle bKash Callback
     */
    public function bkashCallback(Request $request)
    {
        $payload = $request->all();

        $this->paymentService->handleBkashCallback($payload);

        return response()->json(['status' => 'ok']);
    }

    /**
     * List transactions
     */
    public function transactions(Request $request)
    {
        $user = $request->user();

        if ($user->hasRole(['SAAS_SUPER_ADMIN', 'SAAS_ADMIN', 'SAAS_FINANCE'])) {
            $transactions = Transaction::with(['tenant:id,name', 'invoice:id,invoice_number'])
                ->orderBy('created_at', 'desc')
                ->paginate(20);
        } else {
            $transactions = Transaction::where('tenant_id', $user->tenant_id)
                ->with('invoice:id,invoice_number')
                ->orderBy('created_at', 'desc')
                ->paginate(20);
        }

        return response()->json($transactions);
    }

    /**
     * Get Stripe publishable key for frontend
     */
    public function getStripeConfig()
    {
        return response()->json([
            'publishable_key' => config('services.stripe.key'),
        ]);
    }
}
