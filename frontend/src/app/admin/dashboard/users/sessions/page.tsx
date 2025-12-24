"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Monitor, Smartphone, Clock, MapPin } from "lucide-react";

export default function SessionsPage() {
    const sessions = [
        { id: 1, user: "super@app.com", device: "Chrome on Windows", ip: "127.0.0.1", lastActive: "Just now", current: true },
        { id: 2, user: "admin@app.com", device: "Firefox on macOS", ip: "192.168.1.5", lastActive: "5 min ago", current: false },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-2xl font-bold tracking-tight text-white">Active Sessions</h3>
                <p className="text-sm text-slate-400">Monitor and manage active user sessions.</p>
            </div>

            <Card className="bg-slate-950 border-slate-800">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <Monitor className="h-5 w-5 text-indigo-400" />
                        Sessions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {sessions.map((session) => (
                            <div key={session.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 hover:bg-slate-900 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-indigo-500/10">
                                        <Monitor className="h-5 w-5 text-indigo-400" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">{session.user}</p>
                                        <p className="text-sm text-slate-500">{session.device}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-slate-400 text-sm flex items-center gap-1">
                                            <MapPin className="h-3 w-3" /> {session.ip}
                                        </p>
                                        <p className="text-slate-500 text-xs flex items-center gap-1">
                                            <Clock className="h-3 w-3" /> {session.lastActive}
                                        </p>
                                    </div>
                                    {session.current && (
                                        <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                            Current
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
