<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use App\Models\User;
use App\Models\Invoice;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ReportsController extends Controller
{
    /**
     * Dashboard Overview Stats
     */
    public function overview(Request $request)
    {
        $user = $request->user();
        if (!$user->hasRole(['SAAS_SUPER_ADMIN', 'SAAS_ADMIN', 'SAAS_FINANCE'])) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Current month stats
        $now = Carbon::now();
        $startOfMonth = $now->copy()->startOfMonth();
        $startOfLastMonth = $now->copy()->subMonth()->startOfMonth();
        $endOfLastMonth = $now->copy()->subMonth()->endOfMonth();

        // School counts
        $totalSchools = Tenant::count();
        $activeSchools = Tenant::where('status', 'active')->count();
        $newSchoolsThisMonth = Tenant::where('created_at', '>=', $startOfMonth)->count();
        $newSchoolsLastMonth = Tenant::whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->count();
        $pendingApprovals = Tenant::where('approval_status', 'pending')->count();

        // Revenue
        $revenueThisMonth = Transaction::where('status', 'completed')
            ->where('created_at', '>=', $startOfMonth)
            ->sum('amount');
        $revenueLastMonth = Transaction::where('status', 'completed')
            ->whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])
            ->sum('amount');

        // Users
        $totalUsers = User::count();
        $activeUsersToday = User::where('updated_at', '>=', $now->copy()->startOfDay())->count();

        // Invoices
        $pendingInvoices = Invoice::where('status', 'pending')->count();
        $overdueAmount = Invoice::where('status', 'overdue')->sum('total');

        return response()->json([
            'schools' => [
                'total' => $totalSchools,
                'active' => $activeSchools,
                'new_this_month' => $newSchoolsThisMonth,
                'new_last_month' => $newSchoolsLastMonth,
                'pending_approval' => $pendingApprovals,
                'growth_rate' => $newSchoolsLastMonth > 0
                    ? round(($newSchoolsThisMonth - $newSchoolsLastMonth) / $newSchoolsLastMonth * 100, 1)
                    : 100,
            ],
            'revenue' => [
                'this_month' => $revenueThisMonth,
                'last_month' => $revenueLastMonth,
                'growth_rate' => $revenueLastMonth > 0
                    ? round(($revenueThisMonth - $revenueLastMonth) / $revenueLastMonth * 100, 1)
                    : 100,
            ],
            'users' => [
                'total' => $totalUsers,
                'active_today' => $activeUsersToday,
            ],
            'invoices' => [
                'pending' => $pendingInvoices,
                'overdue_amount' => $overdueAmount,
            ],
        ]);
    }

    /**
     * Revenue Report - Monthly breakdown
     */
    public function revenue(Request $request)
    {
        $user = $request->user();
        if (!$user->hasRole(['SAAS_SUPER_ADMIN', 'SAAS_ADMIN', 'SAAS_FINANCE'])) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $year = $request->get('year', date('Y'));

        // Monthly revenue for the year
        $monthlyRevenue = Transaction::where('status', 'completed')
            ->whereYear('created_at', $year)
            ->selectRaw('MONTH(created_at) as month, SUM(amount) as total, COUNT(*) as count')
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->keyBy('month');

        // Fill all 12 months
        $revenueData = [];
        $months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        for ($i = 1; $i <= 12; $i++) {
            $revenueData[] = [
                'month' => $months[$i - 1],
                'revenue' => $monthlyRevenue->get($i)?->total ?? 0,
                'transactions' => $monthlyRevenue->get($i)?->count ?? 0,
            ];
        }

        // Revenue by payment method
        $byMethod = Transaction::where('status', 'completed')
            ->whereYear('created_at', $year)
            ->selectRaw('payment_method, SUM(amount) as total')
            ->groupBy('payment_method')
            ->get();

        // Total stats
        $totalRevenue = Transaction::where('status', 'completed')->whereYear('created_at', $year)->sum('amount');
        $avgTransaction = Transaction::where('status', 'completed')->whereYear('created_at', $year)->avg('amount');

        return response()->json([
            'year' => $year,
            'monthly' => $revenueData,
            'by_method' => $byMethod,
            'total_revenue' => $totalRevenue,
            'avg_transaction' => round($avgTransaction ?? 0, 2),
            'mrr' => round($totalRevenue / 12, 2), // Approximate MRR
        ]);
    }

    /**
     * School Growth Report
     */
    public function growth(Request $request)
    {
        $user = $request->user();
        if (!$user->hasRole(['SAAS_SUPER_ADMIN', 'SAAS_ADMIN'])) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $year = $request->get('year', date('Y'));

        // Monthly school signups
        $monthlySignups = Tenant::whereYear('created_at', $year)
            ->selectRaw('MONTH(created_at) as month, COUNT(*) as total')
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->keyBy('month');

        $months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $signupData = [];
        $cumulative = 0;
        for ($i = 1; $i <= 12; $i++) {
            $count = $monthlySignups->get($i)?->total ?? 0;
            $cumulative += $count;
            $signupData[] = [
                'month' => $months[$i - 1],
                'new_schools' => $count,
                'cumulative' => $cumulative,
            ];
        }

        // By school type
        $byType = Tenant::whereYear('created_at', $year)
            ->selectRaw('school_type, COUNT(*) as count')
            ->whereNotNull('school_type')
            ->groupBy('school_type')
            ->get();

        // By division
        $byDivision = Tenant::whereYear('created_at', $year)
            ->selectRaw('division, COUNT(*) as count')
            ->whereNotNull('division')
            ->groupBy('division')
            ->get();

        // Status breakdown
        $statusBreakdown = Tenant::selectRaw('approval_status, COUNT(*) as count')
            ->groupBy('approval_status')
            ->get();

        return response()->json([
            'year' => $year,
            'monthly' => $signupData,
            'by_type' => $byType,
            'by_division' => $byDivision,
            'status_breakdown' => $statusBreakdown,
            'total_schools' => Tenant::count(),
            'active_schools' => Tenant::where('status', 'active')->count(),
        ]);
    }

    /**
     * Subscription Analytics
     */
    public function subscriptions(Request $request)
    {
        $user = $request->user();
        if (!$user->hasRole(['SAAS_SUPER_ADMIN', 'SAAS_ADMIN', 'SAAS_FINANCE'])) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Schools by plan
        $byPlan = Tenant::with('plan')
            ->selectRaw('plan_id, COUNT(*) as count')
            ->groupBy('plan_id')
            ->get()
            ->map(function ($item) {
                return [
                    'plan' => $item->plan?->name ?? 'No Plan',
                    'count' => $item->count,
                ];
            });

        // Active vs Inactive subscriptions
        $now = Carbon::now();
        $activeSubscriptions = Tenant::where('subscription_ends_at', '>', $now)->count();
        $expiredSubscriptions = Tenant::where('subscription_ends_at', '<=', $now)
            ->orWhereNull('subscription_ends_at')
            ->count();

        // Trial schools
        $onTrial = Tenant::where('trial_ends_at', '>', $now)->count();
        $trialExpired = Tenant::where('trial_ends_at', '<=', $now)
            ->whereNull('subscription_ends_at')
            ->count();

        // Upcoming renewals (next 30 days)
        $upcomingRenewals = Tenant::whereBetween('subscription_ends_at', [$now, $now->copy()->addDays(30)])
            ->count();

        return response()->json([
            'by_plan' => $byPlan,
            'active_subscriptions' => $activeSubscriptions,
            'expired_subscriptions' => $expiredSubscriptions,
            'on_trial' => $onTrial,
            'trial_expired' => $trialExpired,
            'upcoming_renewals' => $upcomingRenewals,
        ]);
    }

    /**
     * Financial Summary
     */
    public function financial(Request $request)
    {
        $user = $request->user();
        if (!$user->hasRole(['SAAS_SUPER_ADMIN', 'SAAS_FINANCE'])) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $year = $request->get('year', date('Y'));

        // Invoice stats
        $invoiceStats = Invoice::whereYear('created_at', $year)
            ->selectRaw("
                COUNT(*) as total,
                SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) as paid_count,
                SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_count,
                SUM(CASE WHEN status = 'overdue' THEN 1 ELSE 0 END) as overdue_count,
                SUM(CASE WHEN status = 'paid' THEN total ELSE 0 END) as collected,
                SUM(CASE WHEN status = 'pending' THEN total ELSE 0 END) as pending_amount,
                SUM(CASE WHEN status = 'overdue' THEN total ELSE 0 END) as overdue_amount
            ")
            ->first();

        // Monthly invoices
        $monthlyInvoices = Invoice::whereYear('created_at', $year)
            ->selectRaw("MONTH(created_at) as month, SUM(total) as amount, status")
            ->groupBy('month', 'status')
            ->get();

        return response()->json([
            'year' => $year,
            'invoices' => [
                'total' => $invoiceStats->total ?? 0,
                'paid' => $invoiceStats->paid_count ?? 0,
                'pending' => $invoiceStats->pending_count ?? 0,
                'overdue' => $invoiceStats->overdue_count ?? 0,
            ],
            'amounts' => [
                'collected' => $invoiceStats->collected ?? 0,
                'pending' => $invoiceStats->pending_amount ?? 0,
                'overdue' => $invoiceStats->overdue_amount ?? 0,
            ],
            'collection_rate' => $invoiceStats->total > 0
                ? round(($invoiceStats->paid_count / $invoiceStats->total) * 100, 1)
                : 0,
        ]);
    }

    /**
     * User Activity Report
     */
    public function activity(Request $request)
    {
        $user = $request->user();
        if (!$user->hasRole(['SAAS_SUPER_ADMIN', 'SAAS_ADMIN'])) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Users by role
        $byRole = User::with('roles')
            ->get()
            ->groupBy(fn($u) => $u->roles->first()?->name ?? 'No Role')
            ->map(fn($group) => $group->count());

        // Recent signups (last 7 days)
        $recentSignups = User::where('created_at', '>=', Carbon::now()->subDays(7))
            ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Top tenants by user count
        $topTenants = Tenant::withCount('users')
            ->orderBy('users_count', 'desc')
            ->limit(10)
            ->get(['id', 'name', 'school_id', 'users_count']);

        return response()->json([
            'total_users' => User::count(),
            'by_role' => $byRole,
            'recent_signups' => $recentSignups,
            'top_tenants' => $topTenants,
        ]);
    }
}
