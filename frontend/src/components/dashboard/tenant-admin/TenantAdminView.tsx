"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Users,
    CalendarCheck,
    AlertCircle,
    MessageSquare,
    Plus,
    Search,
    TrendingUp,
    Wallet,
    Download
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";

// Mock Data
const attendanceData = [
    { name: 'Class 1', present: 45, absent: 5 },
    { name: 'Class 2', present: 42, absent: 8 },
    { name: 'Class 3', present: 48, absent: 2 },
    { name: 'Class 4', present: 40, absent: 10 },
    { name: 'Class 5', present: 46, absent: 4 },
];

const feeCollectionData = [
    { name: 'Paid', value: 65, color: '#10b981' },
    { name: 'Partial', value: 15, color: '#f59e0b' },
    { name: 'Unpaid', value: 20, color: '#ef4444' },
];

const dashboardStats = [
    { label: "Total Students", value: "3,250", change: "+12% vs last term", icon: Users, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/20" },
    { label: "Today's Attendance", value: "94%", change: "-2% vs yesterday", icon: CalendarCheck, color: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-900/20" },
    { label: "Pending Fees", value: "$42k", change: "Due in 5 days", icon: Wallet, color: "text-rose-600", bg: "bg-rose-100 dark:bg-rose-900/20" },
    { label: "New Inquiries", value: "18", change: "+5 today", icon: MessageSquare, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/20" },
];

const recentActivities = [
    { id: 1, action: "New Admission", detail: "Rohim Uddin admitted to Class 5", time: "10 mins ago" },
    { id: 2, action: "Fee Collection", detail: "Received $450 from Karim (Class 9)", time: "45 mins ago" },
    { id: 3, action: "Staff Leave", detail: "Ms. Salma requested sick leave", time: "2 hours ago" },
    { id: 4, action: "Result Published", detail: "Class 8 Math Final Term", time: "5 hours ago" },
];

export function TenantAdminView() {
    return (
        <div className="space-y-6">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">School Overview</h1>
                    <p className="text-sm text-zinc-500">Academic Session: 2025-2026 | Term: Final</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" /> Export Report
                    </Button>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2 text-white">
                        <Plus className="h-4 w-4" /> Quick Admission
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {dashboardStats.map((stat, i) => (
                    <Card key={i} className="overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-zinc-500 font-sans">{stat.label}</CardTitle>
                            <div className={`p-2 rounded-full ${stat.bg}`}>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold dark:text-white">{stat.value}</div>
                            <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                                {stat.change.includes('+') ? <TrendingUp className="h-3 w-3 text-emerald-500" /> : null}
                                {stat.change}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Charts Row */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                {/* Attendance Chart - Takes up 4 columns */}
                <Card className="col-span-1 lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Class-wise Attendance</CardTitle>
                        <CardDescription>Daily attendance overview across primary sections</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={attendanceData} barGap={4}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Legend iconType="circle" />
                                    <Bar dataKey="present" name="Present" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={32} />
                                    <Bar dataKey="absent" name="Absent" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={32} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Fee Status Pie Chart - Takes up 3 columns */}
                <Card className="col-span-1 lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Fee Collection Status</CardTitle>
                        <CardDescription>Current month financial clearance</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={feeCollectionData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {feeCollectionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend iconType="circle" verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                            {/* Centered Percentage for fun */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] text-center pointer-events-none">
                                <span className="text-3xl font-bold text-zinc-800 dark:text-white">65%</span>
                                <p className="text-xs text-zinc-500">Collected</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Row */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Recent Activity */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {recentActivities.map((activity) => (
                                <div key={activity.id} className="flex gap-4 relative pl-4 border-l-2 border-indigo-100 dark:border-indigo-900/30">
                                    <div className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-zinc-950"></div>
                                    <div>
                                        <p className="text-sm font-semibold text-zinc-900 dark:text-white">{activity.action}</p>
                                        <p className="text-sm text-zinc-500">{activity.detail}</p>
                                        <div className="text-xs text-indigo-500 mt-1 font-medium">{activity.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions Grid */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-slate-50 dark:hover:bg-slate-900 border-dashed border-2">
                                <Users className="h-6 w-6 text-blue-500" />
                                Add Staff
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-slate-50 dark:hover:bg-slate-900 border-dashed border-2">
                                <MessageSquare className="h-6 w-6 text-emerald-500" />
                                Send Notice
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-slate-50 dark:hover:bg-slate-900 border-dashed border-2">
                                <CalendarCheck className="h-6 w-6 text-purple-500" />
                                Mark Holiday
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-slate-50 dark:hover:bg-slate-900 border-dashed border-2">
                                <Download className="h-6 w-6 text-orange-500" />
                                Fee Report
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
