"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, MessageSquare, AlertCircle } from "lucide-react";

export default function SMSUsagePage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-2xl font-bold tracking-tight text-white">SMS Usage</h3>
                <p className="text-sm text-slate-400">Monitor SMS credits and usage across tenants.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border-indigo-500/20">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-indigo-400">Total Sent</p>
                                <p className="text-2xl font-bold text-white">0</p>
                            </div>
                            <MessageSquare className="h-8 w-8 text-indigo-400" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-emerald-400">Delivered</p>
                                <p className="text-2xl font-bold text-white">0</p>
                            </div>
                            <BarChart3 className="h-8 w-8 text-emerald-400" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-red-400">Failed</p>
                                <p className="text-2xl font-bold text-white">0</p>
                            </div>
                            <AlertCircle className="h-8 w-8 text-red-400" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-slate-950 border-slate-800">
                <CardContent className="py-12 text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 text-slate-600" />
                    <p className="text-slate-500">SMS Usage analytics coming in Phase 32.</p>
                </CardContent>
            </Card>
        </div>
    );
}
