<?php

namespace App\Http\Controllers;

use App\Models\Domain;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class DomainController extends Controller
{
    /**
     * List domains for a tenant or all (admin)
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->hasRole(['SAAS_SUPER_ADMIN', 'SAAS_ADMIN'])) {
            $domains = Domain::with('tenant:id,name')->orderBy('created_at', 'desc')->paginate(20);
        } else {
            $domains = Domain::where('tenant_id', $user->tenant_id)
                ->orderBy('created_at', 'desc')
                ->paginate(20);
        }

        return response()->json($domains);
    }

    /**
     * Add a new domain for a tenant
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'domain' => 'required|string|unique:domains,domain|regex:/^[a-z0-9.-]+$/i',
            'type' => 'required|in:subdomain,custom',
        ]);

        $domain = Domain::create([
            'tenant_id' => $validated['tenant_id'],
            'domain' => strtolower($validated['domain']),
            'type' => $validated['type'],
            'status' => $validated['type'] === 'subdomain' ? 'verified' : 'pending',
            'verification_token' => $validated['type'] === 'custom' ? Domain::generateVerificationToken() : null,
            'verified_at' => $validated['type'] === 'subdomain' ? now() : null,
        ]);

        return response()->json([
            'domain' => $domain,
            'verification_instructions' => $validated['type'] === 'custom' ? [
                'type' => 'TXT',
                'name' => '_ariba-verification',
                'value' => $domain->verification_token,
                'message' => "Add a TXT record to your DNS: _ariba-verification.{$domain->domain} with value {$domain->verification_token}",
            ] : null,
        ], 201);
    }

    /**
     * Verify DNS TXT record for custom domain
     */
    public function verify(Domain $domain, Request $request)
    {
        if (!$request->user()->hasRole(['SAAS_SUPER_ADMIN', 'SAAS_ADMIN'])) {
            if ($request->user()->tenant_id !== $domain->tenant_id) {
                abort(403, 'Unauthorized');
            }
        }

        if ($domain->status === 'verified') {
            return response()->json(['message' => 'Domain already verified'], 200);
        }

        if ($domain->type === 'subdomain') {
            $domain->update(['status' => 'verified', 'verified_at' => now()]);
            return response()->json(['message' => 'Subdomain verified', 'domain' => $domain]);
        }

        // Check DNS TXT record
        $txtRecords = dns_get_record("_ariba-verification.{$domain->domain}", DNS_TXT);

        $isVerified = false;
        if ($txtRecords) {
            foreach ($txtRecords as $record) {
                if (isset($record['txt']) && $record['txt'] === $domain->verification_token) {
                    $isVerified = true;
                    break;
                }
            }
        }

        if ($isVerified) {
            $domain->update(['status' => 'verified', 'verified_at' => now()]);
            return response()->json(['message' => 'Domain verified successfully', 'domain' => $domain]);
        }

        $domain->update(['status' => 'failed']);
        return response()->json([
            'message' => 'Verification failed. Please ensure the TXT record is correctly configured.',
            'expected_record' => "_ariba-verification.{$domain->domain}",
            'expected_value' => $domain->verification_token,
        ], 400);
    }

    /**
     * Set a domain as primary
     */
    public function setPrimary(Domain $domain, Request $request)
    {
        if (!$request->user()->hasRole(['SAAS_SUPER_ADMIN', 'SAAS_ADMIN'])) {
            if ($request->user()->tenant_id !== $domain->tenant_id) {
                abort(403, 'Unauthorized');
            }
        }

        if ($domain->status !== 'verified') {
            return response()->json(['error' => 'Only verified domains can be set as primary'], 400);
        }

        // Unset all other primary domains for this tenant
        Domain::where('tenant_id', $domain->tenant_id)->update(['is_primary' => false]);

        $domain->update(['is_primary' => true]);

        return response()->json(['message' => 'Primary domain set', 'domain' => $domain]);
    }

    /**
     * Delete a domain
     */
    public function destroy(Domain $domain, Request $request)
    {
        if (!$request->user()->hasRole(['SAAS_SUPER_ADMIN', 'SAAS_ADMIN'])) {
            if ($request->user()->tenant_id !== $domain->tenant_id) {
                abort(403, 'Unauthorized');
            }
        }

        if ($domain->is_primary) {
            return response()->json(['error' => 'Cannot delete primary domain'], 400);
        }

        $domain->delete();

        return response()->json(['message' => 'Domain deleted']);
    }
}
