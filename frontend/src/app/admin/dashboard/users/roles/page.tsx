"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Key, Users, Settings } from "lucide-react";

export default function RolesPage() {
    const roles = [
        {
            name: "SAAS_SUPER_ADMIN",
            description: "Full platform access",
            users: 1,
            permissions: ["manage:tenants", "manage:billing", "manage:users", "manage:system"],
            color: "purple"
        },
        {
            name: "SAAS_ADMIN",
            description: "Tenant and SMS management",
            users: 1,
            permissions: ["manage:tenants", "view:billing", "manage:sms"],
            color: "blue"
        },
        {
            name: "SAAS_SUPPORT",
            description: "Read-only tenant access",
            users: 1,
            permissions: ["view:tenants", "view:logs"],
            color: "emerald"
        },
        {
            name: "SAAS_FINANCE",
            description: "Billing and invoices",
            users: 1,
            permissions: ["manage:billing", "view:transactions"],
            color: "amber"
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-2xl font-bold tracking-tight text-white">Roles & Permissions</h3>
                <p className="text-sm text-slate-400">Configure role-based access control for platform users.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roles.map((role) => (
                    <Card key={role.name} className={`bg-slate-950 border-slate-800 hover:border-${role.color}-500/50 transition-colors`}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-white flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Shield className={`h-5 w-5 text-${role.color}-400`} />
                                    {role.name}
                                </div>
                                <Badge variant="outline" className="border-slate-700 text-slate-400">
                                    <Users className="h-3 w-3 mr-1" /> {role.users}
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-400 text-sm mb-4">{role.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {role.permissions.map((perm) => (
                                    <Badge key={perm} className="bg-slate-900 text-slate-300 border border-slate-700">
                                        <Key className="h-3 w-3 mr-1" /> {perm}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
