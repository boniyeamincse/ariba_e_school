"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Send, AlertCircle, Settings } from "lucide-react";

export default function SMSProvidersPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-2xl font-bold tracking-tight text-white">SMS Providers</h3>
                <p className="text-sm text-slate-400">Configure SMS gateway integrations for notifications.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="bg-slate-950 border-slate-800 hover:border-indigo-500/50 transition-colors cursor-pointer">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-emerald-500/10">
                                <MessageSquare className="h-6 w-6 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-white font-medium">Twilio</p>
                                <p className="text-sm text-slate-500">Not Configured</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-slate-950 border-slate-800 hover:border-indigo-500/50 transition-colors cursor-pointer">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-blue-500/10">
                                <Send className="h-6 w-6 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-white font-medium">SSL Wireless</p>
                                <p className="text-sm text-slate-500">Not Configured</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-slate-950 border-slate-800 hover:border-indigo-500/50 transition-colors cursor-pointer">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-purple-500/10">
                                <Settings className="h-6 w-6 text-purple-400" />
                            </div>
                            <div>
                                <p className="text-white font-medium">Custom API</p>
                                <p className="text-sm text-slate-500">Add custom endpoint</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-slate-950 border-slate-800">
                <CardContent className="py-12 text-center">
                    <AlertCircle className="h-12 w-12 mx-auto mb-4 text-slate-600" />
                    <p className="text-slate-500">SMS Gateway configuration coming in Phase 32.</p>
                </CardContent>
            </Card>
        </div>
    );
}
