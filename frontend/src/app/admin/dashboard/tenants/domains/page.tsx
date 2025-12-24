"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Plus, CheckCircle, XCircle, Clock, Star, Trash2, RefreshCw } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Domain {
    id: number;
    domain: string;
    type: 'subdomain' | 'custom';
    status: 'pending' | 'verified' | 'failed';
    verification_token: string | null;
    is_primary: boolean;
    tenant?: { id: number; name: string };
}

export default function DomainsPage() {
    const [domains, setDomains] = useState<Domain[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [formData, setFormData] = useState({ tenant_id: "", domain: "", type: "subdomain" });

    useEffect(() => {
        fetchDomains();
    }, []);

    const fetchDomains = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8000/api/domains', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setDomains(data.data || data);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load domains");
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!formData.tenant_id || !formData.domain) {
            toast.error("Please fill all fields");
            return;
        }

        setCreateLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8000/api/domains', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Domain added successfully");
                if (data.verification_instructions) {
                    toast.info(data.verification_instructions.message, { duration: 10000 });
                }
                setIsCreateOpen(false);
                setFormData({ tenant_id: "", domain: "", type: "subdomain" });
                fetchDomains();
            } else {
                toast.error(data.message || "Failed to add domain");
            }
        } catch (error) {
            console.error(error);
            toast.error("Network error");
        } finally {
            setCreateLoading(false);
        }
    };

    const handleVerify = async (domainId: number) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:8000/api/domains/${domainId}/verify`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            const data = await res.json();
            if (res.ok) {
                toast.success(data.message);
                fetchDomains();
            } else {
                toast.error(data.message || "Verification failed");
            }
        } catch (error) {
            toast.error("Network error");
        }
    };

    const handleSetPrimary = async (domainId: number) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:8000/api/domains/${domainId}/set-primary`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (res.ok) {
                toast.success("Primary domain updated");
                fetchDomains();
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to set primary");
            }
        } catch (error) {
            toast.error("Network error");
        }
    };

    const handleDelete = async (domainId: number) => {
        if (!confirm("Are you sure you want to delete this domain?")) return;

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:8000/api/domains/${domainId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (res.ok) {
                toast.success("Domain deleted");
                fetchDomains();
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to delete");
            }
        } catch (error) {
            toast.error("Network error");
        }
    };

    const getStatusBadge = (status: string) => {
        const config: Record<string, { icon: any; class: string }> = {
            verified: { icon: CheckCircle, class: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
            pending: { icon: Clock, class: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
            failed: { icon: XCircle, class: "bg-red-500/10 text-red-500 border-red-500/20" },
        };
        const { icon: Icon, class: className } = config[status] || config.pending;
        return (
            <Badge className={`${className} border flex items-center gap-1`}>
                <Icon className="h-3 w-3" /> {status.toUpperCase()}
            </Badge>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white">Domain Management</h3>
                    <p className="text-sm text-slate-400">Configure custom domains and subdomains for tenants.</p>
                </div>

                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                            <Plus className="h-4 w-4 mr-2" /> Add Domain
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] bg-slate-950 border-slate-800 text-slate-200">
                        <DialogHeader>
                            <DialogTitle className="text-white">Add Domain</DialogTitle>
                            <DialogDescription className="text-slate-400">
                                Add a subdomain or custom domain for a tenant.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="tenant_id">Tenant ID</Label>
                                <Input
                                    id="tenant_id"
                                    type="number"
                                    placeholder="1"
                                    className="bg-slate-900 border-slate-800 text-white"
                                    value={formData.tenant_id}
                                    onChange={(e) => setFormData({ ...formData, tenant_id: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="domain">Domain</Label>
                                <Input
                                    id="domain"
                                    placeholder="e.g., myschool or myschool.com"
                                    className="bg-slate-900 border-slate-800 text-white"
                                    value={formData.domain}
                                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="type">Type</Label>
                                <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                                    <SelectTrigger className="bg-slate-900 border-slate-800 text-white">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-900 border-slate-800">
                                        <SelectItem value="subdomain">Subdomain (auto-verified)</SelectItem>
                                        <SelectItem value="custom">Custom Domain (requires DNS)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsCreateOpen(false)} className="border-slate-800 text-slate-400">Cancel</Button>
                            <Button onClick={handleCreate} disabled={createLoading} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                {createLoading ? "Adding..." : "Add Domain"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card className="bg-slate-950 border-slate-800">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <Globe className="h-5 w-5 text-indigo-400" /> All Domains
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => <div key={i} className="h-16 bg-slate-900 rounded animate-pulse" />)}
                        </div>
                    ) : domains.length === 0 ? (
                        <div className="text-center py-12 text-slate-500">
                            <Globe className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No domains configured. Add your first domain!</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-800 text-left">
                                        <th className="pb-3 text-slate-400 font-medium">Domain</th>
                                        <th className="pb-3 text-slate-400 font-medium">Type</th>
                                        <th className="pb-3 text-slate-400 font-medium">Status</th>
                                        <th className="pb-3 text-slate-400 font-medium">Tenant</th>
                                        <th className="pb-3 text-slate-400 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {domains.map((domain) => (
                                        <tr key={domain.id} className="border-b border-slate-800/50 hover:bg-slate-900/50">
                                            <td className="py-4 text-white font-mono flex items-center gap-2">
                                                {domain.is_primary && <Star className="h-4 w-4 text-amber-400" />}
                                                {domain.domain}
                                            </td>
                                            <td className="py-4">
                                                <Badge variant="outline" className="border-slate-700 text-slate-300">
                                                    {domain.type}
                                                </Badge>
                                            </td>
                                            <td className="py-4">{getStatusBadge(domain.status)}</td>
                                            <td className="py-4 text-slate-300">{domain.tenant?.name || 'N/A'}</td>
                                            <td className="py-4 text-right space-x-2">
                                                {domain.status === 'pending' && (
                                                    <Button size="sm" variant="ghost" onClick={() => handleVerify(domain.id)} className="text-blue-400 hover:text-blue-300">
                                                        <RefreshCw className="h-4 w-4 mr-1" /> Verify
                                                    </Button>
                                                )}
                                                {domain.status === 'verified' && !domain.is_primary && (
                                                    <Button size="sm" variant="ghost" onClick={() => handleSetPrimary(domain.id)} className="text-amber-400 hover:text-amber-300">
                                                        <Star className="h-4 w-4 mr-1" /> Primary
                                                    </Button>
                                                )}
                                                {!domain.is_primary && (
                                                    <Button size="sm" variant="ghost" onClick={() => handleDelete(domain.id)} className="text-red-400 hover:text-red-300">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                )}
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
