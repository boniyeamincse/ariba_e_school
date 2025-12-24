"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Search, MoreHorizontal, Building2, User, Mail, Lock, Globe, Wand2, CheckCircle2, AlertCircle, Clock, XCircle } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Mock Data for Tenants (Keep for display until we fetch from API)
const mockTenants = [
    {
        id: "T-001",
        name: "Dhaka Ideal School & College",
        domain: "ideal.aribasaas.com",
        plan: "Enterprise",
        status: "active",
        students: 2450,
        joined: "Jan 12, 2024",
        logo: "DI"
    },
    {
        id: "T-002",
        name: "Scholastica Utara",
        domain: "scholastica.aribasaas.com",
        plan: "Premium",
        status: "active",
        students: 1200,
        joined: "Feb 05, 2024",
        logo: "SC"
    },
    {
        id: "T-003",
        name: "Demo High School",
        domain: "demo.aribasaas.com",
        plan: "Standard",
        status: "trial",
        students: 45,
        joined: "Just Now",
        logo: "DS"
    },
    {
        id: "T-004",
        name: "Banani Model School",
        domain: "banani.aribasaas.com",
        plan: "Standard",
        status: "suspended",
        students: 0,
        joined: "Dec 10, 2023",
        logo: "BM"
    },
];

export default function TenantsPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        domain: "",
        plan_id: "standard",
        admin_name: "",
        admin_email: "",
        admin_password: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSelectChange = (value: string) => {
        setFormData({ ...formData, plan_id: value });
    };

    const generatePassword = () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        let password = "";
        for (let i = 0; i < 12; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setFormData(prev => ({ ...prev, admin_password: password }));
        toast.info("Secure password generated");
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.domain || !formData.admin_email || !formData.admin_password) {
            toast.error("Please fill in all required fields");
            return;
        }

        setLoading(true);
        const loadingToast = toast.loading("Creating tenant workspace...");

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8000/api/tenants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                toast.dismiss(loadingToast);
                toast.success("School onboarded successfully!", {
                    description: `${formData.name} is now active.`
                });

                setIsOpen(false);
                setFormData({
                    name: "", domain: "", plan_id: "standard",
                    admin_name: "", admin_email: "", admin_password: ""
                });
                // Ideally refresh list here
            } else {
                const errorData = await res.json();
                toast.dismiss(loadingToast);
                toast.error("Failed to create school", {
                    description: errorData.message || "Unknown error occurred"
                });
            }
        } catch (error) {
            console.error(error);
            toast.dismiss(loadingToast);
            toast.error("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const filteredTenants = mockTenants.filter(tenant => {
        const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tenant.domain.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || tenant.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return <Badge variant="default" className="bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 border-emerald-500/20"><CheckCircle2 className="w-3 h-3 mr-1" /> Active</Badge>;
            case 'trial':
                return <Badge variant="secondary" className="bg-blue-500/15 text-blue-600 hover:bg-blue-500/25 border-blue-500/20"><Clock className="w-3 h-3 mr-1" /> Trial</Badge>;
            case 'suspended':
                return <Badge variant="destructive" className="bg-red-500/15 text-red-600 hover:bg-red-500/25 border-red-500/20"><XCircle className="w-3 h-3 mr-1" /> Suspended</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Tenants</h2>
                    <p className="text-zinc-500">
                        Manage all registered schools and their subscription status.
                    </p>
                </div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-105">
                            <Plus className="h-4 w-4 mr-2" />
                            Add New School
                        </Button>
                    </DialogTrigger>
                    {/* Dialog Content Same as Before (Simplified for brevity in update, but would keep full form) */}
                    <DialogContent className="sm:max-w-[600px] bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-indigo-600" />
                                Onboard New School
                            </DialogTitle>
                            <DialogDescription>
                                Create a new tenant workspace and assign a Super Admin.
                            </DialogDescription>
                        </DialogHeader>
                        {/* ... (Keep existing form logic here) ... */}
                        <div className="grid gap-5 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">School Name</Label>
                                    <div className="relative">
                                        <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                                        <Input id="name" placeholder="e.g. Dhaka Ideal School" className="pl-9" value={formData.name} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="domain">Domain subdomain</Label>
                                    <div className="flex">
                                        <div className="relative flex-1">
                                            <Globe className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                                            <Input id="domain" placeholder="ideal" className="pl-9 rounded-r-none" value={formData.domain} onChange={handleInputChange} />
                                        </div>
                                        <div className="flex items-center px-3 bg-zinc-50 dark:bg-zinc-900 border border-l-0 border-zinc-200 dark:border-zinc-800 rounded-r-md text-zinc-500 text-sm font-medium">
                                            .aribasaas.com
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="plan_id">Subscription Plan</Label>
                                <Select value={formData.plan_id} onValueChange={handleSelectChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Plan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="standard">Standard (Free Trial)</SelectItem>
                                        <SelectItem value="premium">Premium</SelectItem>
                                        <SelectItem value="enterprise">Enterprise</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white dark:bg-zinc-950 px-2 text-zinc-500">Admin Account</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="admin_name">Admin Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                                        <Input id="admin_name" placeholder="Principal Name" className="pl-9" value={formData.admin_name} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="admin_email">Admin Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                                        <Input id="admin_email" type="email" placeholder="admin@school.com" className="pl-9" value={formData.admin_email} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="admin_password">Initial Password</Label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                                        <Input id="admin_password" type="text" className="pl-9 font-mono text-sm" value={formData.admin_password} onChange={handleInputChange} placeholder="Click generate ->" />
                                    </div>
                                    <Button type="button" variant="outline" onClick={generatePassword} className="shrink-0">
                                        <Wand2 className="h-4 w-4 mr-2" />
                                        Generate
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                            <Button onClick={handleSubmit} disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                {loading ? "Creating..." : "Create Tenant"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
                <CardHeader className="pb-4 border-b border-zinc-100 dark:border-zinc-900">
                    <div className="flex items-center justify-between">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
                            <Input
                                placeholder="Search by name or domain..."
                                className="pl-9 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:bg-white transition-colors"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="w-[180px]">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="trial">Trial</SelectItem>
                                    <SelectItem value="suspended">Suspended</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <Table>
                    <TableHeader>
                        <TableRow className="bg-zinc-50/50 dark:bg-zinc-900/50 hover:bg-zinc-50/50">
                            <TableHead className="font-semibold text-zinc-600 dark:text-zinc-400">School / Domain</TableHead>
                            <TableHead className="font-semibold text-zinc-600 dark:text-zinc-400">Plan</TableHead>
                            <TableHead className="font-semibold text-zinc-600 dark:text-zinc-400">Status</TableHead>
                            <TableHead className="font-semibold text-zinc-600 dark:text-zinc-400">Users</TableHead>
                            <TableHead className="font-semibold text-zinc-600 dark:text-zinc-400">Joined</TableHead>
                            <TableHead className="text-right font-semibold text-zinc-600 dark:text-zinc-400">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredTenants.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-zinc-500">
                                    No results found for your search.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredTenants.map((tenant) => (
                                <TableRow key={tenant.id} className="group hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 shrink-0 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                                                {tenant.logo}
                                            </div>
                                            <div>
                                                <div className="font-medium text-zinc-900 dark:text-white group-hover:text-indigo-600 transition-colors">{tenant.name}</div>
                                                <div className="text-xs text-zinc-500 flex items-center gap-1">
                                                    <Globe className="h-3 w-3" />
                                                    {tenant.domain}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="font-normal bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800">
                                            {tenant.plan}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {getStatusBadge(tenant.status)}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                                            <User className="h-3.5 w-3.5 text-zinc-400" />
                                            {tenant.students.toLocaleString()}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-zinc-500 text-sm">
                                        {tenant.joined}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48">
                                                <DropdownMenuLabel>Manage Access</DropdownMenuLabel>
                                                <DropdownMenuItem>View Dashboard</DropdownMenuItem>
                                                <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-red-600 focus:text-red-600">Suspend Access</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
