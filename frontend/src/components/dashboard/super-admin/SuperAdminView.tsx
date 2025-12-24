import { StatCard } from "@/components/ui/stat-card";
import { RevenueChart } from "@/components/dashboard/charts/RevenueChart";
import { TenantGrowthChart } from "@/components/dashboard/charts/TenantGrowthChart";
import { PlanDistributionChart } from "@/components/dashboard/charts/PlanDistributionChart";
import { PaymentStatusChart } from "@/components/dashboard/charts/PaymentStatusChart";
import { SmsUsageChart } from "@/components/dashboard/charts/SmsUsageChart";

import { TopSmsConsumers } from "@/components/dashboard/super-admin/TopSmsConsumers";
import { SystemAlerts } from "@/components/dashboard/super-admin/SystemAlerts";

import {
    Users,
    School,
    CreditCard,
    MessageSquare,
    Activity,
    Server
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getDashboardStats } from "@/lib/mock-dashboard";

export async function SuperAdminView() {
    const data = await getDashboardStats("Super Admin");

    return (
        <div className="space-y-8">
            {/* 1. KPI Row (6 Cards) */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                <StatCard
                    title="Active Schools"
                    value={data.kpi[0].value}
                    trend="up"
                    trendValue={data.kpi[0].change}
                    icon={School}
                    color="indigo"
                />
                <StatCard
                    title="New (30d)"
                    value={data.kpi[1].value}
                    trend="up"
                    trendValue={data.kpi[1].change}
                    icon={Users}
                    color="emerald"
                />
                <StatCard
                    title="Paid vs Trial"
                    value="65 / 12"
                    description="Ratio: 5.4"
                    icon={CreditCard}
                    color="cyan"
                />
                <StatCard
                    title="MRR"
                    value={data.kpi[2].value}
                    trend="up"
                    trendValue={data.kpi[2].change}
                    icon={CreditCard}
                    color="blue"
                />
                <StatCard
                    title="SMS Usage"
                    value="1.2M"
                    description="85% of monthly cap"
                    icon={MessageSquare}
                    color="amber"
                />
                <StatCard
                    title="System Health"
                    value="99.9%"
                    trend="neutral"
                    trendValue="Stable"
                    icon={Server}
                    color="green"
                />
            </div>

            {/* 2. Charts Layer 1 (Revenue + Growth) */}
            <div className="grid gap-6 md:grid-cols-7">
                <RevenueChart />
                <TenantGrowthChart />
            </div>

            {/* 3. Charts Layer 2 (Payment + Plan + SMS) */}
            <div className="grid gap-6 md:grid-cols-7">
                <PaymentStatusChart />
                <PlanDistributionChart />
                <SmsUsageChart />
            </div>

            {/* 4. Tables Layer (Latest Schools + Payments + Alerts + SMS) */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                {/* Latest Tenants (Col Span 2) */}
                <Card className="col-span-2 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                    <CardHeader>
                        <CardTitle>Latest Schools</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {data.recentTenants?.map((tenant) => (
                                <div key={tenant.id} className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 last:border-0 pb-3 last:pb-0">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs border border-indigo-100 dark:border-indigo-800">
                                            {tenant.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-medium text-sm text-zinc-900 dark:text-white">{tenant.name}</div>
                                            <div className="text-xs text-zinc-500">{tenant.plan} • {tenant.date}</div>
                                        </div>
                                    </div>
                                    <div className={`px-2.5 py-0.5 rounded-full text-xs font-semibold 
                                        ${tenant.status === 'Active' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' :
                                            tenant.status === 'Trial' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' : 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'}`}>
                                        {tenant.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Top SMS Consumers */}
                <div className="col-span-1">
                    <TopSmsConsumers />
                </div>

                {/* System Alerts */}
                <div className="col-span-1">
                    <SystemAlerts />
                </div>
            </div>

            {/* Recent Payments Feed (Full Width at bottom) */}
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <CardHeader>
                    <CardTitle>Recent Transaction Feed</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-0 relative border-l border-zinc-200 dark:border-zinc-800 ml-2">
                        {[1, 2, 3, 4].map((_, i) => (
                            <div key={i} className="mb-6 pl-4 relative last:mb-0">
                                <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700 ring-4 ring-white dark:ring-zinc-950"></span>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-sm font-medium text-zinc-900 dark:text-white">Subscription Payment Received</h4>
                                        <p className="text-xs text-zinc-500 mt-0.5">
                                            Gateway: <span className="font-medium text-pink-600">bKash</span> • Method: <span className="font-medium text-zinc-400">Merchant API</span>
                                        </p>
                                    </div>
                                    <span className="text-sm font-bold text-emerald-600">
                                        +৳15,000.00
                                    </span>
                                </div>
                                <span className="text-[10px] text-zinc-400 block mt-1">{i * 15 + 2} mins ago</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
