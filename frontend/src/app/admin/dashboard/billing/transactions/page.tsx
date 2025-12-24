"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, ArrowUpRight, ArrowDownRight, Clock, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

interface Transaction {
    id: number;
    gateway: 'stripe' | 'bkash' | 'card' | 'bank';
    amount: string;
    currency: string;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    payment_method: string | null;
    created_at: string;
    tenant?: { id: number; name: string };
    invoice?: { id: number; invoice_number: string };
}

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, failed: 0 });

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8000/api/transactions', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                const items = data.data || data;
                setTransactions(items);

                // Calculate stats
                const completed = items.filter((t: Transaction) => t.status === 'completed');
                const pending = items.filter((t: Transaction) => t.status === 'pending');
                const failed = items.filter((t: Transaction) => t.status === 'failed');
                const totalAmount = completed.reduce((sum: number, t: Transaction) => sum + parseFloat(t.amount), 0);

                setStats({
                    total: totalAmount,
                    completed: completed.length,
                    pending: pending.length,
                    failed: failed.length,
                });
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load transactions");
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status: string) => {
        const config: Record<string, { icon: any; class: string }> = {
            completed: { icon: CheckCircle, class: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
            pending: { icon: Clock, class: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
            failed: { icon: XCircle, class: "bg-red-500/10 text-red-500 border-red-500/20" },
            refunded: { icon: ArrowDownRight, class: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
        };
        const { icon: Icon, class: className } = config[status] || config.pending;
        return (
            <Badge className={`${className} border flex items-center gap-1`}>
                <Icon className="h-3 w-3" /> {status.toUpperCase()}
            </Badge>
        );
    };

    const getGatewayBadge = (gateway: string) => {
        const colors: Record<string, string> = {
            stripe: "bg-purple-500/10 text-purple-400 border-purple-500/20",
            bkash: "bg-pink-500/10 text-pink-400 border-pink-500/20",
            card: "bg-blue-500/10 text-blue-400 border-blue-500/20",
            bank: "bg-slate-500/10 text-slate-400 border-slate-500/20",
        };
        return <Badge className={`${colors[gateway] || colors.card} border`}>{gateway.toUpperCase()}</Badge>;
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-2xl font-bold tracking-tight text-white">Transactions</h3>
                <p className="text-sm text-slate-400">View all payment transactions across tenants.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-emerald-400">Total Revenue</p>
                                <p className="text-2xl font-bold text-white">৳{stats.total.toLocaleString()}</p>
                            </div>
                            <div className="p-3 rounded-full bg-emerald-500/10">
                                <ArrowUpRight className="h-6 w-6 text-emerald-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-blue-400">Completed</p>
                                <p className="text-2xl font-bold text-white">{stats.completed}</p>
                            </div>
                            <div className="p-3 rounded-full bg-blue-500/10">
                                <CheckCircle className="h-6 w-6 text-blue-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-amber-400">Pending</p>
                                <p className="text-2xl font-bold text-white">{stats.pending}</p>
                            </div>
                            <div className="p-3 rounded-full bg-amber-500/10">
                                <Clock className="h-6 w-6 text-amber-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-red-400">Failed</p>
                                <p className="text-2xl font-bold text-white">{stats.failed}</p>
                            </div>
                            <div className="p-3 rounded-full bg-red-500/10">
                                <XCircle className="h-6 w-6 text-red-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Transactions Table */}
            <Card className="bg-slate-950 border-slate-800">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-indigo-400" />
                        Transaction History
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="h-16 bg-slate-900 rounded animate-pulse" />
                            ))}
                        </div>
                    ) : transactions.length === 0 ? (
                        <div className="text-center py-12 text-slate-500">
                            <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No transactions yet.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-800 text-left">
                                        <th className="pb-3 text-slate-400 font-medium">Date</th>
                                        <th className="pb-3 text-slate-400 font-medium">Tenant</th>
                                        <th className="pb-3 text-slate-400 font-medium">Invoice</th>
                                        <th className="pb-3 text-slate-400 font-medium">Gateway</th>
                                        <th className="pb-3 text-slate-400 font-medium">Amount</th>
                                        <th className="pb-3 text-slate-400 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((tx) => (
                                        <tr key={tx.id} className="border-b border-slate-800/50 hover:bg-slate-900/50 transition-colors">
                                            <td className="py-4 text-slate-300 text-sm">
                                                {new Date(tx.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                                })}
                                            </td>
                                            <td className="py-4 text-white">{tx.tenant?.name || 'N/A'}</td>
                                            <td className="py-4 text-slate-400 font-mono text-sm">
                                                {tx.invoice?.invoice_number || '-'}
                                            </td>
                                            <td className="py-4">{getGatewayBadge(tx.gateway)}</td>
                                            <td className="py-4 text-white font-semibold">
                                                ৳{parseFloat(tx.amount).toLocaleString()}
                                            </td>
                                            <td className="py-4">{getStatusBadge(tx.status)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
