"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Server, Code } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
                <div className="h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <ShieldCheck className="h-7 w-7 text-white" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                        Ariba<span className="text-indigo-600">SaaS</span>
                    </h1>
                    <p className="text-zinc-500">School Management System</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Server className="h-5 w-5 text-blue-500" />
                            System Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-zinc-500">Version</span>
                            <span className="font-mono font-medium">v1.2.0-beta</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-zinc-500">Framework</span>
                            <span className="font-medium">Laravel 12 + Next.js 15</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-zinc-500">Environment</span>
                            <Badge variant="outline" className="border-indigo-200 text-indigo-700 bg-indigo-50">Production</Badge>
                        </div>
                        <div className="flex justify-between pt-2">
                            <span className="text-zinc-500">License</span>
                            <span className="text-emerald-600 font-medium">Enterprise Active</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Code className="h-5 w-5 text-purple-500" />
                            Developer Info
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <p className="text-sm text-zinc-500">Developed & Maintained by</p>
                            <p className="font-medium text-lg">Ariba International</p>
                            <a href="https://ariba.com" className="text-sm text-indigo-600 hover:underline">www.ariba.com</a>
                        </div>
                        <div className="pt-4 text-xs text-zinc-400">
                            Build ID: 8f2a9c12-2025-12-24
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
