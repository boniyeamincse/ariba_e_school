"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Save } from "lucide-react";

export default function SystemSettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-white">System Settings</h3>
                <p className="text-sm text-zinc-500">
                    Manage platform-wide configurations, security protocols, and integrations.
                </p>
            </div>
            <Separator className="bg-zinc-200 dark:bg-zinc-800" />

            <Tabs defaultValue="general" className="space-y-4">
                <TabsList className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="integrations">Integrations</TabsTrigger>
                </TabsList>

                {/* General Settings */}
                <TabsContent value="general" className="space-y-4">
                    <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                        <CardHeader>
                            <CardTitle>Platform Identity</CardTitle>
                            <CardDescription>
                                Configure the main branding and operational details.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="site_name">Application Name</Label>
                                <Input id="site_name" defaultValue="AribaSaaS" className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="support_email">Support Email</Label>
                                <Input id="support_email" defaultValue="support@aribasaas.com" className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800" />
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Maintenance Mode</Label>
                                    <p className="text-sm text-zinc-500">
                                        Disable access for all tenants for system updates.
                                    </p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                <Save className="mr-2 h-4 w-4" /> Save Changes
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Security Settings */}
                <TabsContent value="security" className="space-y-4">
                    <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                        <CardHeader>
                            <CardTitle>Authentication & Session</CardTitle>
                            <CardDescription>
                                Controll session lifetimes and password policies.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="session_lifetime">Session Lifetime (minutes)</Label>
                                <Input id="session_lifetime" type="number" defaultValue="120" className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800" />
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Force Two-Factor Auth</Label>
                                    <p className="text-sm text-zinc-500">
                                        Require 2FA for all Super Admin accounts.
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                <Save className="mr-2 h-4 w-4" /> Update Security
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Integrations Settings */}
                <TabsContent value="integrations" className="space-y-4">
                    <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                        <CardHeader>
                            <CardTitle>Payment Gateways</CardTitle>
                            <CardDescription>
                                Configure API keys for payment providers.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="bkash_key">bKash App Key</Label>
                                <Input id="bkash_key" type="password" value="****************" className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="ssl_store_id">SSLCommerz Store ID</Label>
                                <Input id="ssl_store_id" defaultValue="ariba_live_24" className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                <Save className="mr-2 h-4 w-4" /> Save Keys
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
