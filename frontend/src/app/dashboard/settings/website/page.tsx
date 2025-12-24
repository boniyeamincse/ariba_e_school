"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Upload } from "lucide-react";

export default function WebsiteSettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Website Settings</h2>
                <p className="text-sm text-zinc-500">Customize the look and feel of your school's public portal.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Branding</CardTitle>
                        <CardDescription>Upload logos and set brand colors.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-2">
                            <Label>School Logo</Label>
                            <div className="flex items-center gap-4">
                                <div className="h-20 w-20 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-dashed border-zinc-300 dark:border-zinc-700">
                                    <Upload className="h-6 w-6 text-zinc-400" />
                                </div>
                                <div className="space-y-2">
                                    <Button variant="outline" size="sm">Upload New</Button>
                                    <p className="text-xs text-zinc-500">Recommended: 512x512px PNG</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="primary-color">Primary Brand Color</Label>
                            <div className="flex gap-2">
                                <Input id="primary-color" type="color" className="w-12 h-10 p-1 cursor-pointer" defaultValue="#4f46e5" />
                                <Input defaultValue="#4f46e5" className="font-mono" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>SEO & Meta</CardTitle>
                        <CardDescription>Improve search visibility.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="meta-title">Meta Title</Label>
                            <Input id="meta-title" placeholder="School Name - Excellence in Education" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="meta-desc">Meta Description</Label>
                            <Textarea id="meta-desc" placeholder="Brief description of your institute..." />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="keywords">Keywords</Label>
                            <Input id="keywords" placeholder="education, school, best school dhaka" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-end">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
            </div>
        </div>
    );
}
