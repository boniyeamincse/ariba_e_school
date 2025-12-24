"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    CreditCard, FileText, Receipt, ArrowUpRight,
    TrendingUp, DollarSign, Clock, AlertCircle
} from "lucide-react";
import { toast } from "sonner";

interface BillingStats {
    totalRevenue: number;
    pendingInvoices: number;
    overdueAmount: number;
    thisMonthRevenue: number;
}

export default function BillingOverviewPage() {
    const [stats, setStats] = useState<BillingStats>({
        totalRevenue: 0,
        pendingInvoices: 0,
        overdueAmount: 0,
        thisMonthRevenue: 0,
    });
    const [recentInvoices, setRecentInvoices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');

            // Fetch invoices
            const invoicesRes = await fetch('http://localhost:8000/api/invoices', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            // Fetch transactions
            const txRes = await fetch('http://localhost:8000/api/transactions', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (invoicesRes.ok && txRes.ok) {
                const invoicesData = await invoicesRes.json();
                const txData = await txRes.json();

                const invoices = invoicesData.data || invoicesData;
                const transactions = txData.data || txData;

                // Calculate stats
                const completedTx = transactions.filter((t: any) => t.status === 'completed');
                const totalRevenue = completedTx.reduce((sum: number, t: any) => sum + parseFloat(t.amount), 0);

                const pending = invoices.filter((i: any) => i.status === 'pending');
                const overdue = invoices.filter((i: any) => i.status === 'overdue');
                const overdueAmount = overdue.reduce((sum: number, i: any) => sum + parseFloat(i.amount), 0);

                // This month revenue (simplified)
                const now = new Date();
                const thisMonth = completedTx.filter((t: any) => {
                    const d = new Date(t.created_at);
                    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
                });
                const thisMonthRevenue = thisMonth.reduce((sum: number, t: any) => sum + parseFloat(t.amount), 0);

                setStats({
                    totalRevenue,
                    pendingInvoices: pending.length,
                    overdueAmount,
                    thisMonthRevenue,
                });

                setRecentInvoices(invoices.slice(0, 5));
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load billing data");
        } finally {
            setLoading(false);
        }
    };

    const quickActions = [
        { label: "View Invoices", href: "/admin/dashboard/billing/invoices", icon: FileText, color: "indigo" },
        { label: "Transactions", href: "/admin/dashboard/billing/transactions", icon: CreditCard, color: "purple" },
        { label: "Checkout", href: "/admin/dashboard/billing/checkout", icon: Receipt, color: "emerald" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white">Billing Overview</h3>
                    <p className="text-sm text-slate-400">Monitor revenue, invoices, and payment status.</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border-indigo-500/20 hover:border-indigo-500/40 transition-colors">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-indigo-400">Total Revenue</p>
                                <p className="text-3xl font-bold text-white mt-1">৳{stats.totalRevenue.toLocaleString()}</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-indigo-500/10">
                                <TrendingUp className="h-8 w-8 text-indigo-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-emerald-400">This Month</p>
                                <p className="text-3xl font-bold text-white mt-1">৳{stats.thisMonthRevenue.toLocaleString()}</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-emerald-500/10">
                                <DollarSign className="h-8 w-8 text-emerald-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20 hover:border-amber-500/40 transition-colors">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-amber-400">Pending Invoices</p>
                                <p className="text-3xl font-bold text-white mt-1">{stats.pendingInvoices}</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-amber-500/10">
                                <Clock className="h-8 w-8 text-amber-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20 hover:border-red-500/40 transition-colors">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-red-400">Overdue Amount</p>
                                <p className="text-3xl font-bold text-white mt-1">৳{stats.overdueAmount.toLocaleString()}</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-red-500/10">
                                <AlertCircle className="h-8 w-8 text-red-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action) => (
                    <Link key={action.href} href={action.href}>
                        <Card className={`bg-slate-950 border-slate-800 hover:border-${action.color}-500/50 transition-all cursor-pointer group`}>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-xl bg-${action.color}-500/10`}>
                                        <action.icon className={`h-6 w-6 text-${action.color}-400`} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-white font-medium group-hover:text-indigo-400 transition-colors">
                                            {action.label}
                                        </p>
                                    </div>
                                    <ArrowUpRight className="h-5 w-5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Recent Invoices */}
            <Card className="bg-slate-950 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-white flex items-center gap-2">
                        <FileText className="h-5 w-5 text-indigo-400" />
                        Recent Invoices
                    </CardTitle>
                    <Link href="/admin/dashboard/billing/invoices">
                        <Button variant="ghost" size="sm" className="text-indigo-400 hover:text-indigo-300">
                            View All <ArrowUpRight className="h-4 w-4 ml-1" />
                        </Button>
                    </Link>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map(i => <div key={i} className="h-12 bg-slate-900 rounded animate-pulse" />)}
                        </div>
                    ) : recentInvoices.length === 0 ? (
                        <p className="text-center text-slate-500 py-8">No invoices yet</p>
                    ) : (
                        <div className="space-y-3">
                            {recentInvoices.map((invoice) => (
                                <div key={invoice.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 hover:bg-slate-900 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-indigo-500/10">
                                            <FileText className="h-4 w-4 text-indigo-400" />
                                        </div>
                                        <div>
                                            <p className="text-white font-mono text-sm">{invoice.invoice_number}</p>
                                            <p className="text-slate-500 text-xs">{invoice.tenant?.name}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white font-semibold">৳{parseFloat(invoice.amount).toLocaleString()}</p>
                                        <p className={`text-xs ${invoice.status === 'paid' ? 'text-emerald-400' : 'text-amber-400'}`}>
                                            {invoice.status.toUpperCase()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
