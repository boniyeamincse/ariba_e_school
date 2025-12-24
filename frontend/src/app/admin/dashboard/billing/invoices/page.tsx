"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Plus, CheckCircle, FileText, AlertCircle } from "lucide-react";
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

export default function InvoicesPage() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);

    const [formData, setFormData] = useState({
        tenant_id: "",
        amount: "",
        issue_date: new Date().toISOString().split('T')[0],
        due_date: "",
        notes: ""
    });

    useEffect(() => {
        fetchInvoices();
    }, []);

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
                                <Label htmlFor="tenant_id">Tenant ID</Label>
                                <Input
                                    id="tenant_id"
                                    type="number"
                                    placeholder="e.g. 1"
                                    className="bg-slate-900 border-slate-800 text-white"
                                    value={formData.tenant_id}
                                    onChange={(e) => setFormData({ ...formData, tenant_id: e.target.value })}
                                />
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

            <Card className="bg-slate-950 border-slate-800">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <FileText className="h-5 w-5 text-indigo-400" />
                        All Invoices
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-16 bg-slate-900 rounded animate-pulse" />
                            ))}
                        </div>
                    ) : invoices.length === 0 ? (
                        <div className="text-center py-12 text-slate-500">
                            <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No invoices found. Create your first invoice!</p>
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
                                    {invoices.map((invoice) => (
                                        <tr key={invoice.id} className="border-b border-slate-800/50 hover:bg-slate-900/50 transition-colors">
                                            <td className="py-4 text-white font-mono">{invoice.invoice_number}</td>
                                            <td className="py-4 text-slate-300">{invoice.tenant?.name || 'N/A'}</td>
                                            <td className="py-4 text-white font-medium">৳{parseFloat(invoice.amount).toLocaleString()}</td>
                                            <td className="py-4">{getStatusBadge(invoice.status)}</td>
                                            <td className="py-4 text-slate-400">{new Date(invoice.due_date).toLocaleDateString()}</td>
                                            <td className="py-4 text-right space-x-2">
                                                {invoice.status === 'pending' && (
                                                    <Button size="sm" variant="ghost" onClick={() => handleMarkPaid(invoice.id)} className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10">
                                                        <CheckCircle className="h-4 w-4 mr-1" /> Paid
                                                    </Button>
                                                )}
                                                <Button size="sm" variant="ghost" onClick={() => handleDownload(invoice.id, invoice.invoice_number)} className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10">
                                                    <Download className="h-4 w-4 mr-1" /> PDF
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
