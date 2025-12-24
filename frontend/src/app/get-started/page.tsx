"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    School, ArrowRight, ArrowLeft, Loader2, Check, Building2,
    MapPin, Phone, User, Settings, FileText, Shield
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const STEPS = [
    { id: 1, title: "School Info", icon: Building2 },
    { id: 2, title: "Location", icon: MapPin },
    { id: 3, title: "Contact", icon: Phone },
    { id: 4, title: "Admin Account", icon: User },
    { id: 5, title: "Preferences", icon: Settings },
    { id: 6, title: "Agreements", icon: Shield },
];

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

export default function GetStartedPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
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
        // Agreements
        terms_accepted: false,
        privacy_accepted: false,
    });

    const updateField = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
        if (step < 6) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = async () => {
        if (!formData.terms_accepted || !formData.privacy_accepted) {
            toast.error("Please accept the terms and privacy policy");
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
                toast.success("Registration submitted! Your School ID: " + data.school_id);
                router.push("/registration-success?school_id=" + data.school_id);
            } else {
                const errors = data.errors ? Object.values(data.errors).flat().join(", ") : data.message;
                toast.error(errors || "Registration failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600">
                            <School className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">
                            Ariba<span className="text-emerald-400">School</span>
                        </span>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">Register Your School</h1>
                    <p className="text-slate-400">Complete the form to start your 14-day free trial</p>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-between mb-8 relative">
                    <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-800" />
                    {STEPS.map((s, i) => (
                        <div key={s.id} className="relative flex flex-col items-center z-10">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${step > s.id
                                    ? "bg-emerald-500 border-emerald-500 text-white"
                                    : step === s.id
                                        ? "bg-slate-900 border-emerald-500 text-emerald-400"
                                        : "bg-slate-900 border-slate-700 text-slate-500"
                                }`}>
                                {step > s.id ? <Check className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
                            </div>
                            <span className={`text-xs mt-2 hidden sm:block ${step >= s.id ? "text-emerald-400" : "text-slate-500"}`}>
                                {s.title}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Form Card */}
                <Card className="bg-slate-900/80 border-slate-800 backdrop-blur-xl">
                    <CardHeader>
                        <CardTitle className="text-xl text-white flex items-center gap-2">
                            {step === 1 && <><Building2 className="h-5 w-5 text-emerald-400" /> School Information</>}
                            {step === 2 && <><MapPin className="h-5 w-5 text-emerald-400" /> Location Details</>}
                            {step === 3 && <><Phone className="h-5 w-5 text-emerald-400" /> Contact Information</>}
                            {step === 4 && <><User className="h-5 w-5 text-emerald-400" /> Admin Account Setup</>}
                            {step === 5 && <><Settings className="h-5 w-5 text-emerald-400" /> System Preferences</>}
                            {step === 6 && <><Shield className="h-5 w-5 text-emerald-400" /> Terms & Agreements</>}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Step 1: School Info */}
                        {step === 1 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-300 mb-1">School Name *</label>
                                    <Input
                                        value={formData.name}
                                        onChange={(e) => updateField("name", e.target.value)}
                                        className="bg-slate-800 border-slate-700 text-white"
                                        placeholder="Dhaka Ideal School"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Domain/Subdomain *</label>
                                    <div className="relative">
                                        <Input
                                            value={formData.domain}
                                            onChange={(e) => updateField("domain", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                                            className="bg-slate-800 border-slate-700 text-white pr-24"
                                            placeholder="dhakaideal"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">.ariba.app</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">EIIN Number</label>
                                    <Input
                                        value={formData.eiin_number}
                                        onChange={(e) => updateField("eiin_number", e.target.value)}
                                        className="bg-slate-800 border-slate-700 text-white"
                                        placeholder="123456"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">School Type</label>
                                    <Select value={formData.school_type} onValueChange={(v) => updateField("school_type", v)}>
                                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-800">
                                            <SelectItem value="primary">Primary</SelectItem>
                                            <SelectItem value="secondary">Secondary</SelectItem>
                                            <SelectItem value="higher_secondary">Higher Secondary</SelectItem>
                                            <SelectItem value="madrasa">Madrasa</SelectItem>
                                            <SelectItem value="technical">Technical</SelectItem>
                                            <SelectItem value="college">College</SelectItem>
                                            <SelectItem value="university">University</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Education Board</label>
                                    <Select value={formData.education_board} onValueChange={(v) => updateField("education_board", v)}>
                                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                                            <SelectValue placeholder="Select board" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-800">
                                            {BOARDS.map(b => <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Establishment Year</label>
                                    <Input
                                        type="number"
                                        min="1800"
                                        max={new Date().getFullYear()}
                                        value={formData.establishment_year}
                                        onChange={(e) => updateField("establishment_year", e.target.value)}
                                        className="bg-slate-800 border-slate-700 text-white"
                                        placeholder="1990"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Category</label>
                                    <Select value={formData.school_category} onValueChange={(v) => updateField("school_category", v)}>
                                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-800">
                                            <SelectItem value="government">Government</SelectItem>
                                            <SelectItem value="semi_government">Semi-Government</SelectItem>
                                            <SelectItem value="private">Private</SelectItem>
                                            <SelectItem value="autonomous">Autonomous</SelectItem>
                                            <SelectItem value="mpo">MPO Enlisted</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Medium of Instruction</label>
                                    <Select value={formData.medium} onValueChange={(v) => updateField("medium", v)}>
                                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-800">
                                            <SelectItem value="bangla">Bangla</SelectItem>
                                            <SelectItem value="english">English</SelectItem>
                                            <SelectItem value="both">Both</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-300 mb-1">School Motto</label>
                                    <Input
                                        value={formData.motto}
                                        onChange={(e) => updateField("motto", e.target.value)}
                                        className="bg-slate-800 border-slate-700 text-white"
                                        placeholder="Education for Excellence"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 2: Location */}
                        {step === 2 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Division</label>
                                    <Select value={formData.division} onValueChange={(v) => updateField("division", v)}>
                                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                                            <SelectValue placeholder="Select division" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-800">
                                            {DIVISIONS.map(d => <SelectItem key={d} value={d.toLowerCase()}>{d}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">District</label>
                                    <Input
                                        value={formData.district}
                                        onChange={(e) => updateField("district", e.target.value)}
                                        className="bg-slate-800 border-slate-700 text-white"
                                        placeholder="Dhaka"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Upazila / Thana</label>
                                    <Input
                                        value={formData.upazila}
                                        onChange={(e) => updateField("upazila", e.target.value)}
                                        className="bg-slate-800 border-slate-700 text-white"
                                        placeholder="Mirpur"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Post Code</label>
                                    <Input
                                        value={formData.post_code}
                                        onChange={(e) => updateField("post_code", e.target.value)}
                                        className="bg-slate-800 border-slate-700 text-white"
                                        placeholder="1216"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Full Address</label>
                                    <Input
                                        value={formData.full_address}
                                        onChange={(e) => updateField("full_address", e.target.value)}
                                        className="bg-slate-800 border-slate-700 text-white"
                                        placeholder="House 123, Road 45, Mirpur-10, Dhaka-1216"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 3: Contact */}
                        {step === 3 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Phone Number *</label>
                                    <Input
                                        value={formData.phone}
                                        onChange={(e) => updateField("phone", e.target.value)}
                                        className="bg-slate-800 border-slate-700 text-white"
                                        placeholder="01712345678"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Alternative Phone</label>
                                    <Input
                                        value={formData.alt_phone}
                                        onChange={(e) => updateField("alt_phone", e.target.value)}
                                        className="bg-slate-800 border-slate-700 text-white"
                                        placeholder="01812345678"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Email *</label>
                                    <Input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => updateField("email", e.target.value)}
                                        className="bg-slate-800 border-slate-700 text-white"
                                        placeholder="info@school.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Website</label>
                                    <Input
                                        value={formData.website}
                                        onChange={(e) => updateField("website", e.target.value)}
                                        className="bg-slate-800 border-slate-700 text-white"
                                        placeholder="https://www.school.com"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 4: Admin Account */}
                        {step === 4 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Admin Full Name *</label>
                                    <Input
                                        value={formData.admin_name}
                                        onChange={(e) => updateField("admin_name", e.target.value)}
                                        className="bg-slate-800 border-slate-700 text-white"
                                        placeholder="Mohammad Rahman"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Admin Email *</label>
                                    <Input
                                        type="email"
                                        value={formData.admin_email}
                                        onChange={(e) => updateField("admin_email", e.target.value)}
                                        className="bg-slate-800 border-slate-700 text-white"
                                        placeholder="admin@school.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Admin Phone</label>
                                    <Input
                                        value={formData.admin_phone}
                                        onChange={(e) => updateField("admin_phone", e.target.value)}
                                        className="bg-slate-800 border-slate-700 text-white"
                                        placeholder="01712345678"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Password *</label>
                                    <Input
                                        type="password"
                                        value={formData.admin_password}
                                        onChange={(e) => updateField("admin_password", e.target.value)}
                                        className="bg-slate-800 border-slate-700 text-white"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Confirm Password *</label>
                                    <Input
                                        type="password"
                                        value={formData.admin_password_confirmation}
                                        onChange={(e) => updateField("admin_password_confirmation", e.target.value)}
                                        className="bg-slate-800 border-slate-700 text-white"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 5: Preferences */}
                        {step === 5 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Session Start Month</label>
                                    <Select value={formData.session_start_month} onValueChange={(v) => updateField("session_start_month", v)}>
                                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-800">
                                            <SelectItem value="january">January</SelectItem>
                                            <SelectItem value="july">July</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Grading System</label>
                                    <Select value={formData.grading_system} onValueChange={(v) => updateField("grading_system", v)}>
                                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-800">
                                            <SelectItem value="gpa">GPA (5.0 Scale)</SelectItem>
                                            <SelectItem value="percentage">Percentage</SelectItem>
                                            <SelectItem value="letter">Letter Grades</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Attendance Type</label>
                                    <Select value={formData.attendance_type} onValueChange={(v) => updateField("attendance_type", v)}>
                                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-800">
                                            <SelectItem value="daily">Daily</SelectItem>
                                            <SelectItem value="period_wise">Period-wise</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Language</label>
                                    <Select value={formData.language} onValueChange={(v) => updateField("language", v)}>
                                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-800">
                                            <SelectItem value="bn">বাংলা (Bangla)</SelectItem>
                                            <SelectItem value="en">English</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}

                        {/* Step 6: Agreements */}
                        {step === 6 && (
                            <div className="space-y-6">
                                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                                    <h4 className="text-white font-medium mb-2">Review Your Information</h4>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div className="text-slate-400">School Name:</div>
                                        <div className="text-white">{formData.name || '-'}</div>
                                        <div className="text-slate-400">Domain:</div>
                                        <div className="text-white">{formData.domain}.ariba.app</div>
                                        <div className="text-slate-400">Email:</div>
                                        <div className="text-white">{formData.email || '-'}</div>
                                        <div className="text-slate-400">Admin:</div>
                                        <div className="text-white">{formData.admin_name || '-'}</div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.terms_accepted}
                                            onChange={(e) => updateField("terms_accepted", e.target.checked)}
                                            className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-800 text-emerald-600"
                                        />
                                        <span className="text-sm text-slate-300">
                                            I agree to the <a href="/terms" className="text-emerald-400 hover:underline">Terms & Conditions</a> *
                                        </span>
                                    </label>
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.privacy_accepted}
                                            onChange={(e) => updateField("privacy_accepted", e.target.checked)}
                                            className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-800 text-emerald-600"
                                        />
                                        <span className="text-sm text-slate-300">
                                            I agree to the <a href="/privacy" className="text-emerald-400 hover:underline">Privacy Policy</a> *
                                        </span>
                                    </label>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                    <Button
                        variant="ghost"
                        onClick={prevStep}
                        disabled={step === 1}
                        className="text-slate-400 hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" /> Previous
                    </Button>

                    {step < 6 ? (
                        <Button
                            onClick={nextStep}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                            Next <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                    ) : (
                        <Button
                            onClick={handleSubmit}
                            disabled={loading || !formData.terms_accepted || !formData.privacy_accepted}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    Submit Registration <Check className="h-4 w-4 ml-2" />
                                </>
                            )}
                        </Button>
                    )}
                </div>

                {/* Already have account */}
                <p className="text-center mt-8 text-slate-500 text-sm">
                    Already registered? <Link href="/login" className="text-emerald-400 hover:underline">Sign in here</Link>
                </p>
            </div>
        </div>
    );
}
