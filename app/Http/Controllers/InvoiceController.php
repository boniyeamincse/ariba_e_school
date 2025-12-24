<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class InvoiceController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Super Admin sees all; Tenant Admin sees own
        if ($user->hasRole(['SAAS_SUPER_ADMIN', 'SAAS_ADMIN', 'SAAS_FINANCE'])) {
            $invoices = Invoice::with('tenant:id,name')->orderBy('created_at', 'desc')->paginate(20);
        } else {
            $invoices = Invoice::where('tenant_id', $user->tenant_id)
                ->orderBy('created_at', 'desc')
                ->paginate(20);
        }

        return response()->json($invoices);
    }

    public function store(Request $request)
    {
        if (!$request->user()->hasRole(['SAAS_SUPER_ADMIN', 'SAAS_FINANCE'])) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'amount' => 'required|numeric|min:0',
            'issue_date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:issue_date',
            'notes' => 'nullable|string',
        ]);

        $invoice = Invoice::create([
            'tenant_id' => $validated['tenant_id'],
            'invoice_number' => Invoice::generateInvoiceNumber(),
            'amount' => $validated['amount'],
            'issue_date' => $validated['issue_date'],
            'due_date' => $validated['due_date'],
            'notes' => $validated['notes'] ?? null,
            'status' => 'pending',
        ]);

        return response()->json($invoice, 201);
    }

    public function markPaid(Invoice $invoice, Request $request)
    {
        if (!$request->user()->hasRole(['SAAS_SUPER_ADMIN', 'SAAS_FINANCE'])) {
            abort(403, 'Unauthorized action.');
        }

        $invoice->update([
            'status' => 'paid',
            'paid_at' => now(),
        ]);

        return response()->json($invoice);
    }

    public function download(Invoice $invoice, Request $request)
    {
        $user = $request->user();

        // Check authorization
        if (!$user->hasRole(['SAAS_SUPER_ADMIN', 'SAAS_ADMIN', 'SAAS_FINANCE'])) {
            if ($user->tenant_id !== $invoice->tenant_id) {
                abort(403, 'You do not have access to this invoice.');
            }
        }

        $invoice->load('tenant');

        $pdf = Pdf::loadView('invoices.pdf', ['invoice' => $invoice]);

        return $pdf->download("invoice-{$invoice->invoice_number}.pdf");
    }
}
