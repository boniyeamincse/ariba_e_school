<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IdentifyTenant
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $host = $request->getHost();
        $subdomain = explode('.', $host)[0];

        // Allow header override for testing
        if ($request->hasHeader('X-Tenant-Domain')) {
            $subdomain = $request->header('X-Tenant-Domain');
        }

        $tenant = \App\Models\Tenant::where('domain', $subdomain)->first();

        if ($tenant) {
            app()->instance('currentTenant', $tenant);
            return $next($request);
        }

        // If generic public route or central admin, maybe proceed without tenant? 
        // For now, return 404 if tenant not found on tenant specific routes.
        return response()->json(['message' => 'Tenant not found', 'domain' => $subdomain], 404);
    }
}
