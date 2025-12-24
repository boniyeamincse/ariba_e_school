"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save } from "lucide-react";

export default function SystemSettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">System Settings</h2>
                <p className="text-sm text-zinc-500">Manage general application configuration.</p>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="format">Formats</TabsTrigger>
                    <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>General Configuration</CardTitle>
                            <CardDescription>Basic system preferences.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="app-name">Application Name</Label>
                                <Input id="app-name" defaultValue="Ariba E-School" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="footer-text">Footer Text</Label>
                                <Input id="footer-text" defaultValue="© 2025 AribaSaaS. All rights reserved." />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Force SSL</Label>
                                    <p className="text-sm text-zinc-500">Redirect all traffic to HTTPS</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="format" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Date & Time Formats</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label>Date Format</Label>
                                <Select defaultValue="d-m-Y">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select format" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="d-m-Y">DD-MM-YYYY</SelectItem>
                                        <SelectItem value="Y-m-d">YYYY-MM-DD</SelectItem>
                                        <SelectItem value="m-d-Y">MM-DD-YYYY</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label>Timezone</Label>
                                <Select defaultValue="asia_dhaka">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select timezone" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="asia_dhaka">Asia/Dhaka (GMT+6)</SelectItem>
                                        <SelectItem value="utc">UTC</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="flex justify-end">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
            </div>
        </div>
    );
}
