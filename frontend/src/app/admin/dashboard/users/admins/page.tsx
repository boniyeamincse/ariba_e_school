"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Shield, Plus, UserCheck } from "lucide-react";
import { toast } from "sonner";

export default function AdminsPage() {
    const [admins, setAdmins] = useState([
        { id: 1, name: "SaaS Owner", email: "super@app.com", role: "SAAS_SUPER_ADMIN", status: "active" },
        { id: 2, name: "SaaS Admin", email: "admin@app.com", role: "SAAS_ADMIN", status: "active" },
        { id: 3, name: "Support User", email: "support@app.com", role: "SAAS_SUPPORT", status: "active" },
        { id: 4, name: "Finance User", email: "finance@app.com", role: "SAAS_FINANCE", status: "active" },
    ]);

    const getRoleBadge = (role: string) => {
        const colors: Record<string, string> = {
            SAAS_SUPER_ADMIN: "bg-purple-500/10 text-purple-400 border-purple-500/20",
            SAAS_ADMIN: "bg-blue-500/10 text-blue-400 border-blue-500/20",
            SAAS_SUPPORT: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
            SAAS_FINANCE: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        };
        return <Badge className={`${colors[role] || colors.SAAS_ADMIN} border`}>{role}</Badge>;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white">SaaS Admins</h3>
                    <p className="text-sm text-slate-400">Manage platform administrators and their roles.</p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Plus className="h-4 w-4 mr-2" /> Add Admin
                </Button>
            </div>

            <Card className="bg-slate-950 border-slate-800">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <Users className="h-5 w-5 text-indigo-400" />
                        Admin Users
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-800 text-left">
                                    <th className="pb-3 text-slate-400 font-medium">Name</th>
                                    <th className="pb-3 text-slate-400 font-medium">Email</th>
                                    <th className="pb-3 text-slate-400 font-medium">Role</th>
                                    <th className="pb-3 text-slate-400 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {admins.map((admin) => (
                                    <tr key={admin.id} className="border-b border-slate-800/50 hover:bg-slate-900/50">
                                        <td className="py-4 text-white">{admin.name}</td>
                                        <td className="py-4 text-slate-400">{admin.email}</td>
                                        <td className="py-4">{getRoleBadge(admin.role)}</td>
                                        <td className="py-4">
                                            <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                <UserCheck className="h-3 w-3 mr-1" /> Active
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
