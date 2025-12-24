"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, MapPin, School } from "lucide-react";

export default function SchoolSettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">School Identify</h2>
                <p className="text-sm text-zinc-500">Manage school name, address, and EIIN details.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="school-name">School Name</Label>
                        <Input id="school-name" defaultValue="Demo High School" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="eiin">EIIN Number</Label>
                            <Input id="eiin" placeholder="123456" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="established">Established Year</Label>
                            <Input id="established" placeholder="1995" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Contact & Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" placeholder="123 School Street, Dhaka" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" placeholder="+880 17..." />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Official Email</Label>
                            <Input id="email" placeholder="info@school.com" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Save className="mr-2 h-4 w-4" /> Update Profile
                </Button>
            </div>
        </div>
    );
}
