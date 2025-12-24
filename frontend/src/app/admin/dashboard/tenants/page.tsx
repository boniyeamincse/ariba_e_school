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
import { Plus, Search, MoreVertical, Building2, User, Mail, Lock, Globe, Wand2, CheckCircle2 } from "lucide-react";
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

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-medium text-zinc-900 dark:text-white">Tenants</h3>
                    <p className="text-sm text-zinc-500">
                        Manage all registered schools and their subscription status.
                    </p>
                </div>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20">
                            <Plus className="h-4 w-4 mr-2" />
                            Add New School
                        </Button>
                    </DialogTrigger>
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

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                    <Input
                        placeholder="Search schools or domains..."
                        className="pl-9 bg-white dark:bg-zinc-900"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="w-full sm:w-[200px]">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="bg-white dark:bg-zinc-900">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="trial">Trial</SelectItem>
                            <SelectItem value="overdue">Overdue</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Tenants Table */}
            <div className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-zinc-50 dark:bg-zinc-900/50">
                            <TableHead>School Info</TableHead>
                            <TableHead>Plan</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Students</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredTenants.map((tenant) => (
                            <TableRow key={tenant.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-center font-bold">
                                            {tenant.logo}
                                        </div>
                                        <div>
                                            <div className="font-medium text-zinc-900 dark:text-white">{tenant.name}</div>
                                            <div className="text-xs text-zinc-500 flex items-center">
                                                <Globe className="h-3 w-3 mr-1" />
                                                {tenant.domain}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="font-normal bg-zinc-50 dark:bg-zinc-900">
                                        {tenant.plan}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={
                                        tenant.status === 'active' ? 'default' :
                                            tenant.status === 'trial' ? 'secondary' :
                                                'destructive'
                                    } className={
                                        tenant.status === 'active' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                            tenant.status === 'trial' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400' : ''
                                    }>
                                        {tenant.status === 'active' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                                        {tenant.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                                        <User className="h-3.5 w-3.5" />
                                        {tenant.students.toLocaleString()}
                                    </div>
                                </TableCell>
                                <TableCell className="text-zinc-500 text-sm">
                                    {tenant.joined}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                            <DropdownMenuItem>Manage Plan</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600">Suspend Access</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
