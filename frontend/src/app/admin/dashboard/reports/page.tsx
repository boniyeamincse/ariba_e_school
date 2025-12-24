"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    Legend
} from "recharts";
import { Download, Calendar, TrendingUp, Users, DollarSign, Activity } from "lucide-react";

// Mock data for "best for company" analytics
const revenueData = [
    { name: "Jan", revenue: 4000 },
    { name: "Feb", revenue: 6500 },
    { name: "Mar", revenue: 5000 },
    { name: "Apr", revenue: 9500 },
    { name: "May", revenue: 12000 },
    { name: "Jun", revenue: 15000 },
];

const growthData = [
    { name: "Jan", schools: 2, students: 150 },
    { name: "Feb", schools: 5, students: 400 },
    { name: "Mar", schools: 8, students: 950 },
    { name: "Apr", schools: 12, students: 1400 },
    { name: "May", schools: 18, students: 2100 },
    { name: "Jun", schools: 25, students: 3200 },
];

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">Reports & Analytics</h2>
                    <p className="text-slate-400 mt-1">
                        Comprehensive insights into your SaaS performance, financial health, and user growth.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="border-slate-800 text-slate-400 hover:bg-slate-900">
                        <Calendar className="mr-2 h-4 w-4" />
                        Last 6 Months
                    </Button>
                    <Button className="bg-indigo-600 hover:bg-indigo-700">
                        <Download className="mr-2 h-4 w-4" />
                        Export Report
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-slate-950 border-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">$52,000</div>
                        <p className="text-xs text-emerald-500 flex items-center mt-1">
                            <TrendingUp className="mr-1 h-3 w-3" />
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-slate-950 border-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Active Schools</CardTitle>
                        <Users className="h-4 w-4 text-indigo-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">25</div>
                        <p className="text-xs text-indigo-400 flex items-center mt-1">
                            <TrendingUp className="mr-1 h-3 w-3" />
                            +7 new this month
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-slate-950 border-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Total Students</CardTitle>
                        <Users className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">3,200</div>
                        <p className="text-xs text-blue-400 flex items-center mt-1">
                            <TrendingUp className="mr-1 h-3 w-3" />
                            +12% growth
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-slate-950 border-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">System Health</CardTitle>
                        <Activity className="h-4 w-4 text-rose-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">99.9%</div>
                        <p className="text-xs text-slate-400 mt-1">
                            Uptime in last 30 days
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Revenue Chart */}
                <Card className="col-span-4 bg-slate-950 border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-white">Revenue Overview</CardTitle>
                        <CardDescription className="text-slate-400">
                            Monthly revenue from subscriptions and transaction fees.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#64748b"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#64748b"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `$${value}`}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }}
                                    />
                                    <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Growth Chart */}
                <Card className="col-span-3 bg-slate-950 border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-white">Platform Growth</CardTitle>
                        <CardDescription className="text-slate-400">
                            New schools and student enrollments.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={growthData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#64748b"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#64748b"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }}
                                    />
                                    <Legend />
                                    <Line type="monotone" dataKey="schools" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                                    <Line type="monotone" dataKey="students" stroke="#06b6d4" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
