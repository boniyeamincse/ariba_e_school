"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Monitor, Wrench, Clock, ShieldCheck, Globe, AlertCircle } from "lucide-react";

export default function SystemSettingsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">System Settings</h2>
                    <p className="text-zinc-500">Configure global application behavior and preferences.</p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20">
                    <Save className="mr-2 h-4 w-4" /> Save All Changes
                </Button>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mb-6">
                    <TabsTrigger value="general" className="flex items-center gap-2"><Monitor className="h-4 w-4" /> General</TabsTrigger>
                    <TabsTrigger value="format" className="flex items-center gap-2"><Clock className="h-4 w-4" /> Formats</TabsTrigger>
                    <TabsTrigger value="maintenance" className="flex items-center gap-2"><Wrench className="h-4 w-4" /> Maintenance</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6">
                    <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Globe className="h-5 w-5 text-indigo-500" />
                                Core Configuration
                            </CardTitle>
                            <CardDescription>Basic attributes for your SaaS instance.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="app-name">Application Name</Label>
                                    <Input id="app-name" defaultValue="Ariba E-School" className="bg-zinc-50 dark:bg-zinc-900" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="support-email">Support Email</Label>
                                    <Input id="support-email" type="email" defaultValue="support@ariba.com" className="bg-zinc-50 dark:bg-zinc-900" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="footer-text">Footer Text</Label>
                                <Input id="footer-text" defaultValue="© 2025 AribaSaaS. All rights reserved." className="bg-zinc-50 dark:bg-zinc-900" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                                Security & Access
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Force HTTPS</Label>
                                    <p className="text-sm text-zinc-500">Redirect all HTTP traffic to secure HTTPS connection.</p>
                                </div>
                                <Switch defaultChecked className="data-[state=checked]:bg-emerald-500" />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Maintenance Mode</Label>
                                    <p className="text-sm text-zinc-500">Disable access for non-admin users temporarily.</p>
                                </div>
                                <Switch className="data-[state=checked]:bg-amber-500" />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="format" className="space-y-6">
                    <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <CardHeader>
                            <CardTitle>Regional Preferences</CardTitle>
                            <CardDescription>Set default formats for dates, times, and numbers.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Date Format</Label>
                                    <Select defaultValue="d-m-Y">
                                        <SelectTrigger className="bg-zinc-50 dark:bg-zinc-900">
                                            <SelectValue placeholder="Select format" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="d-m-Y">DD-MM-YYYY (31-12-2024)</SelectItem>
                                            <SelectItem value="Y-m-d">YYYY-MM-DD (2024-12-31)</SelectItem>
                                            <SelectItem value="m-d-Y">MM-DD-YYYY (12-31-2024)</SelectItem>
                                            <SelectItem value="d M, Y">DD Mon, YYYY (31 Dec, 2024)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Timezone</Label>
                                    <Select defaultValue="asia_dhaka">
                                        <SelectTrigger className="bg-zinc-50 dark:bg-zinc-900">
                                            <SelectValue placeholder="Select timezone" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="asia_dhaka">Asia/Dhaka (GMT+6)</SelectItem>
                                            <SelectItem value="asia_kolkata">Asia/Kolkata (GMT+5:30)</SelectItem>
                                            <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                                            <SelectItem value="us_eastern">US/Eastern (GMT-5)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Currency Symbol Position</Label>
                                <Select defaultValue="before">
                                    <SelectTrigger className="bg-zinc-50 dark:bg-zinc-900">
                                        <SelectValue placeholder="Select position" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="before">Before Amount ($100)</SelectItem>
                                        <SelectItem value="after">After Amount (100$)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="maintenance" className="space-y-6">
                    <Card className="border-red-100 dark:border-red-900/30 bg-red-50/30 dark:bg-red-900/10 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
                                <AlertCircle className="h-5 w-5" />
                                Danger Zone
                            </CardTitle>
                            <CardDescription>Irreversible actions requiring caution.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-white dark:bg-zinc-950 rounded-lg border border-red-100 dark:border-red-900/20">
                                <div>
                                    <h4 className="font-medium text-zinc-900 dark:text-zinc-100">Clear System Cache</h4>
                                    <p className="text-sm text-zinc-500">Remove temporary files and cached data.</p>
                                </div>
                                <Button variant="destructive" size="sm">Clear Cache</Button>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white dark:bg-zinc-950 rounded-lg border border-red-100 dark:border-red-900/20">
                                <div>
                                    <h4 className="font-medium text-zinc-900 dark:text-zinc-100">Reset Configuration</h4>
                                    <p className="text-sm text-zinc-500">Revert all system settings to default.</p>
                                </div>
                                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" size="sm">Reset Defaults</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
