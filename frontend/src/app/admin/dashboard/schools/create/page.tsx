"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    ArrowLeft, Building2, MapPin, Phone, User, Settings,
    FileText, Loader2, Check, Save, School
} from "lucide-react";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

const DIVISIONS = ["Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh"];
const BOARDS = [
    { value: "dhaka", label: "Dhaka" },
    { value: "rajshahi", label: "Rajshahi" },
    { value: "comilla", label: "Comilla" },
    { value: "jessore", label: "Jessore" },
    { value: "chittagong", label: "Chittagong" },
    { value: "sylhet", label: "Sylhet" },
    { value: "barisal", label: "Barisal" },
    { value: "dinajpur", label: "Dinajpur" },
    { value: "madrasa", label: "Madrasa" },
    { value: "technical", label: "Technical" },
];

export default function AddSchoolPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("school");
    const [formData, setFormData] = useState({
        // School Info
        name: "",
        domain: "",
        eiin_number: "",
        school_type: "",
        education_board: "",
        establishment_year: "",
        school_category: "",
        medium: "bangla",
        motto: "",
        // Location
        division: "",
        district: "",
        upazila: "",
        full_address: "",
        post_code: "",
        // Contact
        phone: "",
        alt_phone: "",
        email: "",
        website: "",
        // Admin
        admin_name: "",
        admin_email: "",
        admin_phone: "",
        admin_password: "",
        admin_password_confirmation: "",
        // Preferences
        session_start_month: "january",
        grading_system: "gpa",
        attendance_type: "daily",
        language: "bn",
        // Flags
        terms_accepted: true,
        privacy_accepted: true,
    });

    const updateField = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        // Validation
        if (!formData.name || !formData.domain || !formData.email || !formData.phone) {
            toast.error("Please fill in all required fields");
            setActiveTab("school");
            return;
        }
        if (!formData.admin_name || !formData.admin_email || !formData.admin_password) {
            toast.error("Please fill in admin account details");
            setActiveTab("admin");
            return;
        }
        if (formData.admin_password !== formData.admin_password_confirmation) {
            toast.error("Passwords do not match");
            setActiveTab("admin");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://localhost:8000/api/schools/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("School created! ID: " + data.school_id);
                // Auto-approve since admin is creating it
                const token = localStorage.getItem('token');
                await fetch(`http://localhost:8000/api/schools/${data.tenant_id}/approve`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                router.push("/admin/dashboard/tenants");
            } else {
                const errors = data.errors ? Object.values(data.errors).flat().join(", ") : data.message;
                toast.error(errors || "Failed to create school");
            }
        } catch (error) {
            console.error(error);
            toast.error("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/dashboard/tenants">
                        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h3 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                            <School className="h-6 w-6 text-emerald-400" />
                            Add New School
                        </h3>
                        <p className="text-sm text-zinc-400">Create a new school and set up their admin account.</p>
                    </div>
                </div>
                <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Creating...
                        </>
                    ) : (
                        <>
                            <Save className="h-4 w-4 mr-2" />
                            Create School
                        </>
                    )}
                </Button>
            </div>

            {/* Form Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="bg-zinc-900 border border-zinc-800 p-1">
                    <TabsTrigger value="school" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">
                        <Building2 className="h-4 w-4 mr-2" />
                        School Info
                    </TabsTrigger>
                    <TabsTrigger value="location" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">
                        <MapPin className="h-4 w-4 mr-2" />
                        Location
                    </TabsTrigger>
                    <TabsTrigger value="contact" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact
                    </TabsTrigger>
                    <TabsTrigger value="admin" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">
                        <User className="h-4 w-4 mr-2" />
                        Admin Account
                    </TabsTrigger>
                    <TabsTrigger value="preferences" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white">
                        <Settings className="h-4 w-4 mr-2" />
                        Preferences
                    </TabsTrigger>
                </TabsList>

                {/* School Info Tab */}
                <TabsContent value="school">
                    <Card className="bg-zinc-950 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-emerald-400" />
                                School Information
                            </CardTitle>
                            <CardDescription className="text-zinc-500">
                                Basic details about the school
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    School Name <span className="text-red-400">*</span>
                                </label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => updateField("name", e.target.value)}
                                    className="bg-zinc-900 border-zinc-800 text-white h-11"
                                    placeholder="Dhaka Ideal School & College"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    Subdomain <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <Input
                                        value={formData.domain}
                                        onChange={(e) => updateField("domain", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                                        className="bg-zinc-900 border-zinc-800 text-white h-11 pr-24"
                                        placeholder="dhakaideal"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">.ariba.app</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">EIIN Number</label>
                                <Input
                                    value={formData.eiin_number}
                                    onChange={(e) => updateField("eiin_number", e.target.value)}
                                    className="bg-zinc-900 border-zinc-800 text-white h-11"
                                    placeholder="123456"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">School Type</label>
                                <Select value={formData.school_type} onValueChange={(v) => updateField("school_type", v)}>
                                    <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white h-11">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-zinc-800">
                                        <SelectItem value="primary">Primary</SelectItem>
                                        <SelectItem value="secondary">Secondary (Class 6-10)</SelectItem>
                                        <SelectItem value="higher_secondary">Higher Secondary (College)</SelectItem>
                                        <SelectItem value="madrasa">Madrasa</SelectItem>
                                        <SelectItem value="technical">Technical/Vocational</SelectItem>
                                        <SelectItem value="college">Degree College</SelectItem>
                                        <SelectItem value="university">University</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Education Board</label>
                                <Select value={formData.education_board} onValueChange={(v) => updateField("education_board", v)}>
                                    <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white h-11">
                                        <SelectValue placeholder="Select board" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-zinc-800">
                                        {BOARDS.map(b => <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Establishment Year</label>
                                <Input
                                    type="number"
                                    min="1800"
                                    max={new Date().getFullYear()}
                                    value={formData.establishment_year}
                                    onChange={(e) => updateField("establishment_year", e.target.value)}
                                    className="bg-zinc-900 border-zinc-800 text-white h-11"
                                    placeholder="1990"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Category</label>
                                <Select value={formData.school_category} onValueChange={(v) => updateField("school_category", v)}>
                                    <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white h-11">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-zinc-800">
                                        <SelectItem value="government">Government</SelectItem>
                                        <SelectItem value="semi_government">Semi-Government</SelectItem>
                                        <SelectItem value="private">Private</SelectItem>
                                        <SelectItem value="autonomous">Autonomous</SelectItem>
                                        <SelectItem value="mpo">MPO Enlisted</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Medium</label>
                                <Select value={formData.medium} onValueChange={(v) => updateField("medium", v)}>
                                    <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white h-11">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-zinc-800">
                                        <SelectItem value="bangla">Bangla Medium</SelectItem>
                                        <SelectItem value="english">English Medium</SelectItem>
                                        <SelectItem value="both">Both</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="lg:col-span-3">
                                <label className="block text-sm font-medium text-zinc-300 mb-2">School Motto</label>
                                <Input
                                    value={formData.motto}
                                    onChange={(e) => updateField("motto", e.target.value)}
                                    className="bg-zinc-900 border-zinc-800 text-white h-11"
                                    placeholder="Education for Excellence"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Location Tab */}
                <TabsContent value="location">
                    <Card className="bg-zinc-950 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-blue-400" />
                                Location Details
                            </CardTitle>
                            <CardDescription className="text-zinc-500">
                                Physical address of the school
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Division</label>
                                <Select value={formData.division} onValueChange={(v) => updateField("division", v)}>
                                    <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white h-11">
                                        <SelectValue placeholder="Select division" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-zinc-800">
                                        {DIVISIONS.map(d => <SelectItem key={d} value={d.toLowerCase()}>{d}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">District</label>
                                <Input
                                    value={formData.district}
                                    onChange={(e) => updateField("district", e.target.value)}
                                    className="bg-zinc-900 border-zinc-800 text-white h-11"
                                    placeholder="Dhaka"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Upazila / Thana</label>
                                <Input
                                    value={formData.upazila}
                                    onChange={(e) => updateField("upazila", e.target.value)}
                                    className="bg-zinc-900 border-zinc-800 text-white h-11"
                                    placeholder="Mirpur"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Post Code</label>
                                <Input
                                    value={formData.post_code}
                                    onChange={(e) => updateField("post_code", e.target.value)}
                                    className="bg-zinc-900 border-zinc-800 text-white h-11"
                                    placeholder="1216"
                                />
                            </div>
                            <div className="lg:col-span-2">
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Full Address</label>
                                <Input
                                    value={formData.full_address}
                                    onChange={(e) => updateField("full_address", e.target.value)}
                                    className="bg-zinc-900 border-zinc-800 text-white h-11"
                                    placeholder="House 123, Road 45, Mirpur-10, Dhaka-1216"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Contact Tab */}
                <TabsContent value="contact">
                    <Card className="bg-zinc-950 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Phone className="h-5 w-5 text-purple-400" />
                                Contact Information
                            </CardTitle>
                            <CardDescription className="text-zinc-500">
                                How to reach the school
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    Phone Number <span className="text-red-400">*</span>
                                </label>
                                <Input
                                    value={formData.phone}
                                    onChange={(e) => updateField("phone", e.target.value)}
                                    className="bg-zinc-900 border-zinc-800 text-white h-11"
                                    placeholder="01712345678"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Alternative Phone</label>
                                <Input
                                    value={formData.alt_phone}
                                    onChange={(e) => updateField("alt_phone", e.target.value)}
                                    className="bg-zinc-900 border-zinc-800 text-white h-11"
                                    placeholder="01812345678"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    Email <span className="text-red-400">*</span>
                                </label>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => updateField("email", e.target.value)}
                                    className="bg-zinc-900 border-zinc-800 text-white h-11"
                                    placeholder="info@school.edu.bd"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Website</label>
                                <Input
                                    value={formData.website}
                                    onChange={(e) => updateField("website", e.target.value)}
                                    className="bg-zinc-900 border-zinc-800 text-white h-11"
                                    placeholder="https://www.school.edu.bd"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Admin Account Tab */}
                <TabsContent value="admin">
                    <Card className="bg-zinc-950 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <User className="h-5 w-5 text-amber-400" />
                                School Admin Account
                            </CardTitle>
                            <CardDescription className="text-zinc-500">
                                Create the primary administrator account for this school
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    Admin Full Name <span className="text-red-400">*</span>
                                </label>
                                <Input
                                    value={formData.admin_name}
                                    onChange={(e) => updateField("admin_name", e.target.value)}
                                    className="bg-zinc-900 border-zinc-800 text-white h-11"
                                    placeholder="Mohammad Rahman"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    Admin Email <span className="text-red-400">*</span>
                                </label>
                                <Input
                                    type="email"
                                    value={formData.admin_email}
                                    onChange={(e) => updateField("admin_email", e.target.value)}
                                    className="bg-zinc-900 border-zinc-800 text-white h-11"
                                    placeholder="principal@school.edu.bd"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Admin Phone</label>
                                <Input
                                    value={formData.admin_phone}
                                    onChange={(e) => updateField("admin_phone", e.target.value)}
                                    className="bg-zinc-900 border-zinc-800 text-white h-11"
                                    placeholder="01712345678"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    Password <span className="text-red-400">*</span>
                                </label>
                                <Input
                                    type="password"
                                    value={formData.admin_password}
                                    onChange={(e) => updateField("admin_password", e.target.value)}
                                    className="bg-zinc-900 border-zinc-800 text-white h-11"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">
                                    Confirm Password <span className="text-red-400">*</span>
                                </label>
                                <Input
                                    type="password"
                                    value={formData.admin_password_confirmation}
                                    onChange={(e) => updateField("admin_password_confirmation", e.target.value)}
                                    className="bg-zinc-900 border-zinc-800 text-white h-11"
                                    placeholder="••••••••"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Preferences Tab */}
                <TabsContent value="preferences">
                    <Card className="bg-zinc-950 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Settings className="h-5 w-5 text-cyan-400" />
                                System Preferences
                            </CardTitle>
                            <CardDescription className="text-zinc-500">
                                Default settings for the school
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Session Start Month</label>
                                <Select value={formData.session_start_month} onValueChange={(v) => updateField("session_start_month", v)}>
                                    <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white h-11">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-zinc-800">
                                        <SelectItem value="january">January</SelectItem>
                                        <SelectItem value="july">July</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Grading System</label>
                                <Select value={formData.grading_system} onValueChange={(v) => updateField("grading_system", v)}>
                                    <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white h-11">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-zinc-800">
                                        <SelectItem value="gpa">GPA (5.0 Scale)</SelectItem>
                                        <SelectItem value="percentage">Percentage</SelectItem>
                                        <SelectItem value="letter">Letter Grades</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Attendance Type</label>
                                <Select value={formData.attendance_type} onValueChange={(v) => updateField("attendance_type", v)}>
                                    <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white h-11">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-zinc-800">
                                        <SelectItem value="daily">Daily Attendance</SelectItem>
                                        <SelectItem value="period_wise">Period-wise</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Language</label>
                                <Select value={formData.language} onValueChange={(v) => updateField("language", v)}>
                                    <SelectTrigger className="bg-zinc-900 border-zinc-800 text-white h-11">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-zinc-800">
                                        <SelectItem value="bn">বাংলা (Bangla)</SelectItem>
                                        <SelectItem value="en">English</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Footer Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
                <Link href="/admin/dashboard/tenants">
                    <Button variant="ghost" className="text-zinc-400 hover:text-white">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Cancel
                    </Button>
                </Link>
                <div className="flex gap-3">
                    <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                        <FileText className="h-3 w-3 mr-1" />
                        Auto-approved on creation
                    </Badge>
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            <>
                                <Check className="h-4 w-4 mr-2" />
                                Create School
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
