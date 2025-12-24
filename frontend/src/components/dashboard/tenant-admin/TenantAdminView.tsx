import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CalendarCheck, AlertCircle, MessageSquare } from "lucide-react";
import { getDashboardStats } from "@/lib/mock-dashboard";

export async function TenantAdminView() {
    const data = await getDashboardStats("School Owner");

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">School Dashboard</h1>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-zinc-500">Academic Session: 2025</span>
                </div>
            </div>

            {/* KPI Row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {data.kpi.map((stat, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-zinc-500">{stat.label}</CardTitle>
                            {i === 0 && <Users className="h-4 w-4 text-blue-600" />}
                            {i === 1 && <CalendarCheck className="h-4 w-4 text-green-600" />}
                            {i === 2 && <AlertCircle className="h-4 w-4 text-red-600" />}
                            {i === 3 && <MessageSquare className="h-4 w-4 text-yellow-600" />}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-zinc-500 mt-1">
                                {stat.change}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Attendance Quick View */}
                <Card className="col-span-1 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Today's Attendance</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[200px] flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 rounded-md border border-dashed border-zinc-200 dark:border-zinc-800">
                        <span className="text-zinc-400">Class-wise Chart Placeholder</span>
                    </CardContent>
                </Card>

                {/* Recent Activity Feed */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {data.recentActivity.map((activity) => (
                                <div key={activity.id} className="flex gap-4 relative pl-4 border-l-2 border-zinc-200 dark:border-zinc-800">
                                    <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-zinc-400"></div>
                                    <div>
                                        <p className="text-sm font-medium text-zinc-900 dark:text-white">{activity.action}</p>
                                        <p className="text-xs text-zinc-500">{activity.detail}</p>
                                        <div className="text-[10px] text-zinc-400 mt-1 uppercase tracking-wider">{activity.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
