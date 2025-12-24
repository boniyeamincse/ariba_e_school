"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Save, CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function PaymentSettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Payment Gateways</h2>
                <p className="text-sm text-zinc-500">Configure how you accept fees from students.</p>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
                                <span className="font-bold text-pink-600 text-xs">bKash</span>
                            </div>
                            <div>
                                <CardTitle className="text-base">bKash Merchant</CardTitle>
                                <CardDescription>Accept payments via bKash</CardDescription>
                            </div>
                        </div>
                        <Switch />
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>App Key</Label>
                                <Input type="password" placeholder="••••••••" />
                            </div>
                            <div className="grid gap-2">
                                <Label>Secret Key</Label>
                                <Input type="password" placeholder="••••••••" />
                            </div>
                            <div className="grid gap-2 md:col-span-2">
                                <Label>Merchant Number</Label>
                                <Input placeholder="017..." />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                <CreditCard className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div>
                                <CardTitle className="text-base">Stripe / Card</CardTitle>
                                <CardDescription>International card payments</CardDescription>
                            </div>
                        </div>
                        <Switch />
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label>Publishable Key</Label>
                                <Input placeholder="pk_live_..." />
                            </div>
                            <div className="grid gap-2">
                                <Label>Secret Key</Label>
                                <Input type="password" placeholder="sk_live_..." />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-end">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Save className="mr-2 h-4 w-4" /> Save Configuration
                </Button>
            </div>
        </div>
    );
}
