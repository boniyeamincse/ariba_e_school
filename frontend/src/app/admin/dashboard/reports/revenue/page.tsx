"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from "recharts";
import { DollarSign, TrendingUp, CreditCard, ArrowUpRight } from "lucide-react";

const monthlyData = [
    { name: "Jan", revenue: 4000, expenses: 2400 },
    { name: "Feb", revenue: 6500, expenses: 1398 },
    { name: "Mar", revenue: 5000, expenses: 3800 },
    { name: "Apr", revenue: 9500, expenses: 3908 },
    { name: "May", revenue: 12000, expenses: 4800 },
    { name: "Jun", revenue: 15000, expenses: 5800 },
    { name: "Jul", revenue: 18000, expenses: 6300 },
];

export default function RevenueReportPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">Revenue Report</h2>
                <p className="text-slate-400">Detailed financial performance analysis.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-slate-950 border-slate-800">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Net Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">$154,200</div>
                        <div className="flex items-center text-emerald-500 text-sm mt-1">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            +24% vs last year
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-slate-950 border-slate-800">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Avg. Revenue Per User (ARPU)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">$48.50</div>
                        <div className="flex items-center text-emerald-500 text-sm mt-1">
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                            +5% vs last month
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-slate-950 border-slate-800">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">Active Subscriptions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">842</div>
                        <div className="flex items-center text-indigo-400 text-sm mt-1">
                            <CreditCard className="h-4 w-4 mr-1" />
                            98% renewal rate
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-slate-950 border-slate-800">
                <CardHeader>
                    <CardTitle className="text-white">Revenue vs Expenses</CardTitle>
                    <CardDescription className="text-slate-400">Financial breakdown over the last 7 months</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} />
                                <YAxis stroke="#64748b" axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue" />
                                <Area type="monotone" dataKey="expenses" stroke="#ef4444" fillOpacity={1} fill="url(#colorExpenses)" name="Expenses" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
