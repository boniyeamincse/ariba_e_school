"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Save, AlertTriangle } from "lucide-react";

export default function SmtpSettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">SMTP Settings</h2>
                <p className="text-sm text-zinc-500">Configure email delivery server.</p>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900 rounded-lg flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800 dark:text-yellow-400">
                    <strong>Important:</strong> Incorrect SMTP settings will prevent the system from sending emails (Forgot Password, Invoices, Notifications).
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Email Server Configuration</CardTitle>
                    <CardDescription>Enter your SMTP credentials below.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="driver">Mail Driver</Label>
                            <Input id="driver" defaultValue="smtp" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="host">Mail Host</Label>
                            <Input id="host" defaultValue="smtp.mailtrap.io" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="port">Mail Port</Label>
                            <Input id="port" defaultValue="2525" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="encryption">Encryption</Label>
                            <Input id="encryption" defaultValue="tls" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" type="text" placeholder="SMTP Username" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="SMTP Password" />
                        </div>
                    </div>

                    <div className="grid gap-2 mt-4">
                        <Label htmlFor="from-address">From Address</Label>
                        <Input id="from-address" defaultValue="no-reply@aribasaas.com" />
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
                <Button variant="outline">Test Connection</Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Save className="mr-2 h-4 w-4" /> Save Configuration
                </Button>
            </div>
        </div>
    );
}
