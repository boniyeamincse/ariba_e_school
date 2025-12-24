"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    GraduationCap, Search, Plus, User, Phone,
    ChevronRight, FileText, CheckCircle, XCircle, Clock
} from "lucide-react";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Admission {
    id: number;
    application_number: string;
    first_name: string;
    last_name: string;
    phone: string;
    applied_class: string;
    guardian_name: string;
    status: string;
    merit_score: number | null;
    merit_rank: number | null;
    created_at: string;
}

export default function AdmissionsPage() {
    const [admissions, setAdmissions] = useState<Admission[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });

    useEffect(() => {
        fetchAdmissions();
    }, [search, statusFilter]);

    const fetchAdmissions = async () => {
        try {
            const token = localStorage.getItem('token');
            let url = `http://localhost:8000/api/admissions?`;
            if (search) url += `search=${search}&`;
            if (statusFilter !== 'all') url += `status=${statusFilter}&`;

            const res = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                const items = data.data || data;
                setAdmissions(items);

                // Calculate stats
                setStats({
                    total: items.length,
                    pending: items.filter((a: Admission) => a.status === 'pending').length,
                    approved: items.filter((a: Admission) => a.status === 'approved').length,
                    rejected: items.filter((a: Admission) => a.status === 'rejected').length,
                });
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load admissions");
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status: string) => {
        const styles: Record<string, { class: string, icon: any }> = {
            pending: { class: "bg-amber-500/10 text-amber-400 border-amber-500/20", icon: Clock },
            under_review: { class: "bg-blue-500/10 text-blue-400 border-blue-500/20", icon: FileText },
            approved: { class: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", icon: CheckCircle },
            rejected: { class: "bg-red-500/10 text-red-400 border-red-500/20", icon: XCircle },
            enrolled: { class: "bg-purple-500/10 text-purple-400 border-purple-500/20", icon: GraduationCap },
        };
        const style = styles[status] || styles.pending;
        const Icon = style.icon;
        return (
            <Badge className={`${style.class} border flex items-center gap-1`}>
                <Icon className="h-3 w-3" />
                {status.replace('_', ' ')}
            </Badge>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white">Admissions</h3>
                    <p className="text-sm text-slate-400">Manage student admission applications.</p>
                </div>
                <Link href="/dashboard/admissions/create">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                        <Plus className="h-4 w-4 mr-2" /> New Application
                    </Button>
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-slate-950 border-slate-800">
                    <CardContent className="pt-4 pb-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm">Total</p>
                                <p className="text-2xl font-bold text-white">{stats.total}</p>
                            </div>
                            <FileText className="h-8 w-8 text-indigo-400" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-slate-950 border-amber-500/20">
                    <CardContent className="pt-4 pb-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-amber-400 text-sm">Pending</p>
                                <p className="text-2xl font-bold text-white">{stats.pending}</p>
                            </div>
                            <Clock className="h-8 w-8 text-amber-400" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-slate-950 border-emerald-500/20">
                    <CardContent className="pt-4 pb-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-emerald-400 text-sm">Approved</p>
                                <p className="text-2xl font-bold text-white">{stats.approved}</p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-emerald-400" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-slate-950 border-red-500/20">
                    <CardContent className="pt-4 pb-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-red-400 text-sm">Rejected</p>
                                <p className="text-2xl font-bold text-white">{stats.rejected}</p>
                            </div>
                            <XCircle className="h-8 w-8 text-red-400" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <Input
                        placeholder="Search by name, application number, or phone..."
                        className="pl-10 bg-slate-950 border-slate-800 text-white"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[180px] bg-slate-950 border-slate-800 text-white">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-800">
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="under_review">Under Review</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="enrolled">Enrolled</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Admissions List */}
            <Card className="bg-slate-950 border-slate-800">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-indigo-400" />
                        Applications
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="h-16 bg-slate-900 rounded animate-pulse" />
                            ))}
                        </div>
                    ) : admissions.length === 0 ? (
                        <div className="text-center py-12 text-slate-500">
                            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No admission applications found.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {admissions.map((admission) => (
                                <Link key={admission.id} href={`/dashboard/admissions/${admission.id}`}>
                                    <div className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 hover:bg-slate-900 transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center">
                                                <User className="h-6 w-6 text-indigo-400" />
                                            </div>
                                            <div>
                                                <p className="text-white font-medium group-hover:text-indigo-400 transition-colors">
                                                    {admission.first_name} {admission.last_name}
                                                </p>
                                                <div className="flex items-center gap-3 text-sm text-slate-500">
                                                    <span className="font-mono">{admission.application_number}</span>
                                                    <span>•</span>
                                                    <span>{admission.applied_class}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right hidden md:block">
                                                <p className="text-slate-400 text-sm flex items-center gap-1">
                                                    <Phone className="h-3 w-3" /> {admission.phone || 'N/A'}
                                                </p>
                                                <p className="text-xs text-slate-600">
                                                    Guardian: {admission.guardian_name}
                                                </p>
                                            </div>
                                            {admission.merit_rank && (
                                                <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                                    Rank #{admission.merit_rank}
                                                </Badge>
                                            )}
                                            {getStatusBadge(admission.status)}
                                            <ChevronRight className="h-5 w-5 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
