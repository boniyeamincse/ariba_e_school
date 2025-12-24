"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Building2, CheckCircle, XCircle, Clock, Eye, Search,
    Phone, Mail, MapPin, Calendar
} from "lucide-react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

interface School {
    id: number;
    school_id: string;
    name: string;
    domain: string;
    email: string;
    phone: string;
    district: string;
    school_type: string;
    approval_status: string;
    created_at: string;
}

export default function PendingSchoolsPage() {
    const [schools, setSchools] = useState<School[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
    const [showRejectDialog, setShowRejectDialog] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        fetchPendingSchools();
    }, []);

    const fetchPendingSchools = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch("http://localhost:8000/api/schools/pending", {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setSchools(data.data || data);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load pending schools");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (school: School) => {
        setActionLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:8000/api/schools/${school.id}/approve`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (res.ok) {
                toast.success(`${school.name} approved successfully!`);
                fetchPendingSchools();
                setSelectedSchool(null);
            } else {
                toast.error("Failed to approve school");
            }
        } catch (error) {
            console.error(error);
            toast.error("Network error");
        } finally {
            setActionLoading(false);
        }
    };

    const handleReject = async () => {
        if (!selectedSchool || !rejectReason) {
            toast.error("Please provide a rejection reason");
            return;
        }

        setActionLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:8000/api/schools/${selectedSchool.id}/reject`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ reason: rejectReason })
            });
            if (res.ok) {
                toast.success("School rejected");
                fetchPendingSchools();
                setShowRejectDialog(false);
                setSelectedSchool(null);
                setRejectReason("");
            } else {
                toast.error("Failed to reject school");
            }
        } catch (error) {
            console.error(error);
            toast.error("Network error");
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-2xl font-bold tracking-tight text-white">Pending School Approvals</h3>
                <p className="text-sm text-zinc-400">Review and approve new school registrations.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-zinc-950 border-amber-500/20">
                    <CardContent className="pt-4 pb-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-amber-400 text-sm">Pending</p>
                                <p className="text-3xl font-bold text-white">{schools.length}</p>
                            </div>
                            <Clock className="h-10 w-10 text-amber-400" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Schools List */}
            <Card className="bg-zinc-950 border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-amber-400" />
                        Registration Queue
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-20 bg-zinc-900 rounded animate-pulse" />
                            ))}
                        </div>
                    ) : schools.length === 0 ? (
                        <div className="text-center py-12 text-zinc-500">
                            <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No pending registrations.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {schools.map((school) => (
                                <div key={school.id} className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                                            <Building2 className="h-6 w-6 text-amber-400" />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">{school.name}</p>
                                            <div className="flex items-center gap-3 text-sm text-zinc-500">
                                                <span className="font-mono text-amber-400">{school.school_id}</span>
                                                <span>•</span>
                                                <span>{school.domain}.ariba.app</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-right hidden md:block">
                                            <p className="text-zinc-400 text-sm flex items-center gap-1">
                                                <Mail className="h-3 w-3" /> {school.email}
                                            </p>
                                            <p className="text-xs text-zinc-600">
                                                <Calendar className="h-3 w-3 inline mr-1" />
                                                {new Date(school.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                            <Clock className="h-3 w-3 mr-1" /> Pending
                                        </Badge>
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => setSelectedSchool(school)}
                                                className="text-zinc-400 hover:text-white"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                onClick={() => handleApprove(school)}
                                                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                            >
                                                <CheckCircle className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => { setSelectedSchool(school); setShowRejectDialog(true); }}
                                            >
                                                <XCircle className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Reject Dialog */}
            <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
                <DialogContent className="bg-zinc-900 border-zinc-800">
                    <DialogHeader>
                        <DialogTitle className="text-white">Reject School Registration</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                            Rejection Reason *
                        </label>
                        <Input
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            className="bg-zinc-800 border-zinc-700 text-white"
                            placeholder="Incomplete documentation, invalid EIIN..."
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setShowRejectDialog(false)} className="text-zinc-400">
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleReject}
                            disabled={actionLoading || !rejectReason}
                        >
                            Reject Registration
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* School Details Dialog */}
            <Dialog open={!!selectedSchool && !showRejectDialog} onOpenChange={() => setSelectedSchool(null)}>
                <DialogContent className="bg-zinc-900 border-zinc-800 max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-white flex items-center gap-2">
                            <Building2 className="h-5 w-5 text-amber-400" />
                            {selectedSchool?.name}
                        </DialogTitle>
                    </DialogHeader>
                    {selectedSchool && (
                        <div className="py-4 space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="text-zinc-500">School ID</div>
                                    <div className="text-amber-400 font-mono">{selectedSchool.school_id}</div>
                                </div>
                                <div>
                                    <div className="text-zinc-500">Domain</div>
                                    <div className="text-white">{selectedSchool.domain}.ariba.app</div>
                                </div>
                                <div>
                                    <div className="text-zinc-500">Email</div>
                                    <div className="text-white">{selectedSchool.email}</div>
                                </div>
                                <div>
                                    <div className="text-zinc-500">Phone</div>
                                    <div className="text-white">{selectedSchool.phone}</div>
                                </div>
                                <div>
                                    <div className="text-zinc-500">District</div>
                                    <div className="text-white">{selectedSchool.district || 'N/A'}</div>
                                </div>
                                <div>
                                    <div className="text-zinc-500">Type</div>
                                    <div className="text-white capitalize">{selectedSchool.school_type || 'N/A'}</div>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setSelectedSchool(null)} className="text-zinc-400">
                            Close
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => setShowRejectDialog(true)}
                        >
                            <XCircle className="h-4 w-4 mr-2" /> Reject
                        </Button>
                        <Button
                            onClick={() => selectedSchool && handleApprove(selectedSchool)}
                            disabled={actionLoading}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                            <CheckCircle className="h-4 w-4 mr-2" /> Approve School
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
