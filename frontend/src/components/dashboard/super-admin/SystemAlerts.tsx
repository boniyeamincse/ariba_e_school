"use client";

import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function SystemAlerts() {
    return (
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>Recent job failures and errors</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex gap-3">
                        <div className="mt-0.5">
                            <AlertCircle className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-zinc-900 dark:text-white">Payment Gateway Timeout</h4>
                            <p className="text-xs text-zinc-500 mt-0.5">BKash API response delayed &gt; 5s. 3 transactions failed.</p>
                            <p className="text-[10px] text-zinc-400 mt-1">10 mins ago • Critical</p>
                        </div>
                    </div>

                    <div className="flex gap-3 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                        <div className="mt-0.5">
                            <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-zinc-900 dark:text-white">High Memory Usage - Worker 02</h4>
                            <p className="text-xs text-zinc-500 mt-0.5">Queue worker utilizing 85% RAM.</p>
                            <p className="text-[10px] text-zinc-400 mt-1">2 hours ago • Warning</p>
                        </div>
                    </div>

                    <div className="flex gap-3 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                        <div className="mt-0.5">
                            <CheckCircle className="h-5 w-5 text-emerald-500" />
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-zinc-900 dark:text-white">Backup Completed</h4>
                            <p className="text-xs text-zinc-500 mt-0.5">Daily database snapshot successful (2.3GB).</p>
                            <p className="text-[10px] text-zinc-400 mt-1">4 hours ago • Info</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
