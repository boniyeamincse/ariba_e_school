"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { HardDrive, MessageSquare, Users, Activity, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface UsageStats {
    storage: { used: string; limit: string; percentage: number };
    sms: { sent: number; limit: number; percentage: number };
    students: { current: number; limit: number; percentage: number };
    recent_activity: { action: string; details: string; date: string; status: string }[];
}

export default function TenantUsagePage() {
    const [stats, setStats] = useState<UsageStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsage();
    }, []);

    const fetchUsage = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8000/api/tenants/usage', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                setStats(data);
            } else {
                toast.error("Failed to load usage data");
            }
        } catch (error) {
            console.error(error);
            toast.error("Network error");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-slate-500">Loading usage statistics...</div>;
    }

    if (!stats) return null;

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-2xl font-bold tracking-tight text-white">Usage & Limits</h3>
                <p className="text-sm text-slate-400">
                    Monitor resource consumption across all tenants.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {/* Storage Card */}
                <Card className="bg-slate-950 border-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-200">Storage Used</CardTitle>
                        <HardDrive className="h-4 w-4 text-indigo-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{stats.storage.used}</div>
                        <p className="text-xs text-slate-500">of {stats.storage.limit} total capacity</p>
                        <Progress value={stats.storage.percentage} className="mt-3 h-2 bg-slate-900" indicatorClassName="bg-indigo-600" />
                    </CardContent>
                </Card>

                {/* SMS Card */}
                <Card className="bg-slate-950 border-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-200">SMS Credits</CardTitle>
                        <MessageSquare className="h-4 w-4 text-emerald-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{stats.sms.sent.toLocaleString()}</div>
                        <p className="text-xs text-slate-500">messages sent this month</p>
                        <Progress value={stats.sms.percentage} className="mt-3 h-2 bg-slate-900" indicatorClassName="bg-emerald-600" />
                    </CardContent>
                </Card>

                {/* Students Card */}
                <Card className="bg-slate-950 border-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-200">Total Students</CardTitle>
                        <Users className="h-4 w-4 text-blue-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{stats.students.current}</div>
                        <p className="text-xs text-slate-500">of {stats.students.limit} allowed seats</p>
                        <Progress value={stats.students.percentage} className="mt-3 h-2 bg-slate-900" indicatorClassName="bg-blue-600" />
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-slate-950 border-slate-800">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-slate-400" />
                        <CardTitle className="text-white">System Activity</CardTitle>
                    </div>
                    <CardDescription className="text-slate-400">
                        Recent high-impact actions performed by tenants.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-8">
                        {stats.recent_activity.map((activity, index) => (
                            <div key={index} className="flex items-center">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 border border-slate-800">
                                    <AlertCircle className="h-4 w-4 text-indigo-400" />
                                </div>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none text-white">{activity.action}</p>
                                    <p className="text-sm text-slate-500">{activity.details}</p>
                                </div>
                                <div className="ml-auto font-medium text-slate-500 text-sm">
                                    {activity.date}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
