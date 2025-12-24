"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Save, Globe } from "lucide-react";

export default function LanguageSettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Language & Localization</h2>
                <p className="text-sm text-zinc-500">Manage system language and content translation.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-indigo-500" />
                        Default Language
                    </CardTitle>
                    <CardDescription>Select the primary language for your dashboard.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-2 max-w-sm">
                        <Label>System Language</Label>
                        <Select defaultValue="en">
                            <SelectTrigger>
                                <SelectValue placeholder="Select Language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">English (US)</SelectItem>
                                <SelectItem value="bn">Bengali (বাংলা)</SelectItem>
                                <SelectItem value="ar">Arabic (العربية)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Save className="mr-2 h-4 w-4" /> Save Preferences
                </Button>
            </div>
        </div>
    );
}
