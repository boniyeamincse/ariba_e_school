"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";

export default function SMSLogsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-2xl font-bold tracking-tight text-white">SMS Delivery Reports</h3>
                <p className="text-sm text-slate-400">View delivery status for all SMS messages.</p>
            </div>

            <Card className="bg-slate-950 border-slate-800">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <FileText className="h-5 w-5 text-indigo-400" />
                        Recent Messages
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-12">
                        <Clock className="h-12 w-12 mx-auto mb-4 text-slate-600" />
                        <p className="text-slate-500">No SMS messages sent yet.</p>
                        <p className="text-sm text-slate-600 mt-2">Configure a provider to start sending messages.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
