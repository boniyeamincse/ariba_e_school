"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Plus, CheckCircle, FileText, AlertCircle, Search, CreditCard } from "lucide-react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Invoice {
    id: number;
    invoice_number: string;
    amount: string;
    status: 'pending' | 'paid' | 'overdue' | 'cancelled';
    issue_date: string;
    due_date: string;
    paid_at: string | null;
    tenant: {
        id: number;
        name: string;
    };
}

interface Tenant {
    id: number;
    name: string;
    domain: string;
}

export default function InvoicesPage() {
    const router = useRouter();
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const [formData, setFormData] = useState({
        tenant_id: "",
        amount: "",
        issue_date: new Date().toISOString().split('T')[0],
        due_date: "",
        notes: ""
    });

    useEffect(() => {
        fetchInvoices();
        fetchTenants();
    }, []);

    useEffect(() => {
        filterInvoices();
    }, [searchQuery, statusFilter, invoices]);

    const fetchInvoices = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8000/api/invoices', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setInvoices(data.data || data);
            } else {
                toast.error("Failed to load invoices");
            }
        } catch (error) {
            console.error(error);
            toast.error("Network error loading invoices");
        } finally {
            setLoading(false);
        }
    };

    const fetchTenants = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8000/api/tenants', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setTenants(data.data || data);
            }
        } catch (error) {
            console.error("Error fetching tenants:", error);
        }
    };

    const filterInvoices = () => {
        let result = [...invoices];

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(inv =>
                inv.invoice_number.toLowerCase().includes(query) ||
                inv.tenant?.name.toLowerCase().includes(query)
            );
        }

        // Filter by status
        if (statusFilter !== "all") {
            result = result.filter(inv => inv.status === statusFilter);
        }

        setFilteredInvoices(result);
    };

    const handleCreate = async () => {
        if (!formData.tenant_id || !formData.amount || !formData.due_date) {
            toast.error("Please fill in required fields");
            return;
        }

        setCreateLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8000/api/invoices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                toast.success("Invoice created successfully");
                setIsCreateOpen(false);
                setFormData({ tenant_id: "", amount: "", issue_date: new Date().toISOString().split('T')[0], due_date: "", notes: "" });
                fetchInvoices();
            } else {
                const error = await res.json();
                toast.error(error.message || "Failed to create invoice");
            }
        } catch (error) {
            console.error(error);
            toast.error("Network error");
        } finally {
            setCreateLoading(false);
        }
    };

    const handleMarkPaid = async (invoiceId: number) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:8000/api/invoices/${invoiceId}/mark-paid`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                toast.success("Invoice marked as paid");
                fetchInvoices();
            } else {
                toast.error("Failed to update invoice");
            }
        } catch (error) {
            console.error(error);
            toast.error("Network error");
        }
    };

    const handlePayNow = (invoiceId: number) => {
        router.push(`/admin/dashboard/billing/checkout?invoice_id=${invoiceId}`);
    };

    const handleDownload = async (invoiceId: number, invoiceNumber: string) => {
        const token = localStorage.getItem('token');
        window.open(`http://localhost:8000/api/invoices/${invoiceId}/download?token=${token}`, '_blank');
    };

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
            paid: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
            overdue: "bg-red-500/10 text-red-500 border-red-500/20",
            cancelled: "bg-slate-500/10 text-slate-500 border-slate-500/20",
        };
        return <Badge className={`${styles[status]} border`}>{status.toUpperCase()}</Badge>;
    };

    // Stats
    const stats = {
        total: invoices.length,
        pending: invoices.filter(i => i.status === 'pending').length,
        paid: invoices.filter(i => i.status === 'paid').length,
        overdue: invoices.filter(i => i.status === 'overdue').length,
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white">Invoices</h3>
                    <p className="text-sm text-slate-400">
                        Manage billing invoices for all tenants.
                    </p>
                </div>

                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20">
                            <Plus className="h-4 w-4 mr-2" />
                            Create Invoice
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] bg-slate-950 border-slate-800 text-slate-200">
                        <DialogHeader>
                            <DialogTitle className="text-white">Create Invoice</DialogTitle>
                            <DialogDescription className="text-slate-400">
                                Generate a new invoice for a tenant.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="tenant_id">Select Tenant</Label>
                                <Select value={formData.tenant_id} onValueChange={(v) => setFormData({ ...formData, tenant_id: v })}>
                                    <SelectTrigger className="bg-slate-900 border-slate-800 text-white">
                                        <SelectValue placeholder="Choose a tenant..." />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-900 border-slate-800">
                                        {tenants.map((tenant) => (
                                            <SelectItem key={tenant.id} value={tenant.id.toString()}>
                                                {tenant.name} ({tenant.domain})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="amount">Amount (BDT)</Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        placeholder="5000"
                                        className="bg-slate-900 border-slate-800 text-white"
                                        value={formData.amount}
                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="due_date">Due Date</Label>
                                    <Input
                                        id="due_date"
                                        type="date"
                                        className="bg-slate-900 border-slate-800 text-white"
                                        value={formData.due_date}
                                        onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes (Optional)</Label>
                                <Textarea
                                    id="notes"
                                    placeholder="Additional notes..."
                                    className="bg-slate-900 border-slate-800 text-white min-h-[80px]"
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsCreateOpen(false)} className="border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-white">Cancel</Button>
                            <Button onClick={handleCreate} disabled={createLoading} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                {createLoading ? "Creating..." : "Create Invoice"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-slate-950 border-slate-800">
                    <CardContent className="pt-4 pb-3">
                        <p className="text-slate-400 text-sm">Total</p>
                        <p className="text-2xl font-bold text-white">{stats.total}</p>
                    </CardContent>
                </Card>
                <Card className="bg-slate-950 border-amber-500/20">
                    <CardContent className="pt-4 pb-3">
                        <p className="text-amber-400 text-sm">Pending</p>
                        <p className="text-2xl font-bold text-white">{stats.pending}</p>
                    </CardContent>
                </Card>
                <Card className="bg-slate-950 border-emerald-500/20">
                    <CardContent className="pt-4 pb-3">
                        <p className="text-emerald-400 text-sm">Paid</p>
                        <p className="text-2xl font-bold text-white">{stats.paid}</p>
                    </CardContent>
                </Card>
                <Card className="bg-slate-950 border-red-500/20">
                    <CardContent className="pt-4 pb-3">
                        <p className="text-red-400 text-sm">Overdue</p>
                        <p className="text-2xl font-bold text-white">{stats.overdue}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <Input
                        placeholder="Search by invoice number or tenant..."
                        className="pl-10 bg-slate-950 border-slate-800 text-white placeholder:text-slate-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[180px] bg-slate-950 border-slate-800 text-white">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-800">
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Card className="bg-slate-950 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-white flex items-center gap-2">
                        <FileText className="h-5 w-5 text-indigo-400" />
                        All Invoices
                    </CardTitle>
                    <span className="text-sm text-slate-500">
                        Showing {filteredInvoices.length} of {invoices.length}
                    </span>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-16 bg-slate-900 rounded animate-pulse" />
                            ))}
                        </div>
                    ) : filteredInvoices.length === 0 ? (
                        <div className="text-center py-12 text-slate-500">
                            <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>{invoices.length === 0 ? "No invoices found. Create your first invoice!" : "No invoices match your search."}</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-800 text-left">
                                        <th className="pb-3 text-slate-400 font-medium">Invoice #</th>
                                        <th className="pb-3 text-slate-400 font-medium">Tenant</th>
                                        <th className="pb-3 text-slate-400 font-medium">Amount</th>
                                        <th className="pb-3 text-slate-400 font-medium">Status</th>
                                        <th className="pb-3 text-slate-400 font-medium">Due Date</th>
                                        <th className="pb-3 text-slate-400 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredInvoices.map((invoice) => (
                                        <tr key={invoice.id} className="border-b border-slate-800/50 hover:bg-slate-900/50 transition-colors">
                                            <td className="py-4 text-white font-mono">{invoice.invoice_number}</td>
                                            <td className="py-4 text-slate-300">{invoice.tenant?.name || 'N/A'}</td>
                                            <td className="py-4 text-white font-medium">৳{parseFloat(invoice.amount).toLocaleString()}</td>
                                            <td className="py-4">{getStatusBadge(invoice.status)}</td>
                                            <td className="py-4 text-slate-400">{new Date(invoice.due_date).toLocaleDateString()}</td>
                                            <td className="py-4 text-right space-x-1">
                                                {invoice.status === 'pending' && (
                                                    <>
                                                        <Button size="sm" variant="ghost" onClick={() => handlePayNow(invoice.id)} className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10">
                                                            <CreditCard className="h-4 w-4 mr-1" /> Pay
                                                        </Button>
                                                        <Button size="sm" variant="ghost" onClick={() => handleMarkPaid(invoice.id)} className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10">
                                                            <CheckCircle className="h-4 w-4 mr-1" /> Paid
                                                        </Button>
                                                    </>
                                                )}
                                                <Button size="sm" variant="ghost" onClick={() => handleDownload(invoice.id, invoice.invoice_number)} className="text-slate-400 hover:text-slate-300 hover:bg-slate-500/10">
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                            </td>
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
