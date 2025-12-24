"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function CreateAdmissionPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        date_of_birth: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        applied_class: "",
        previous_school: "",
        previous_marks: "",
        guardian_name: "",
        guardian_phone: "",
        guardian_relation: "father",
        guardian_occupation: "",
    });

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.first_name || !formData.last_name || !formData.phone || !formData.applied_class) {
            toast.error("Please fill in all required fields");
            return;
        }

        if (!formData.guardian_name || !formData.guardian_phone) {
            toast.error("Guardian information is required");
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:8000/api/admissions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    tenant_id: user?.tenant_id,
                    previous_marks: formData.previous_marks ? parseFloat(formData.previous_marks) : null,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(`Application submitted! Number: ${data.application_number}`);
                router.push("/dashboard/admissions");
            } else {
                toast.error(data.message || "Failed to submit application");
            }
        } catch (error) {
            console.error(error);
            toast.error("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const classes = [
        "Nursery", "KG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
        "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"
    ];

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => router.back()} className="text-slate-400 hover:text-white">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </Button>
                <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white">New Admission Application</h3>
                    <p className="text-sm text-slate-400">Fill in the student and guardian details.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Student Information */}
                <Card className="bg-slate-950 border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-indigo-400" />
                            Student Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">First Name *</label>
                            <Input
                                required
                                value={formData.first_name}
                                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                className="bg-slate-900 border-slate-700 text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Last Name *</label>
                            <Input
                                required
                                value={formData.last_name}
                                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                className="bg-slate-900 border-slate-700 text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Date of Birth</label>
                            <Input
                                type="date"
                                value={formData.date_of_birth}
                                onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                                className="bg-slate-900 border-slate-700 text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Gender</label>
                            <Select value={formData.gender} onValueChange={(v) => setFormData({ ...formData, gender: v })}>
                                <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-900 border-slate-800">
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Phone *</label>
                            <Input
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="bg-slate-900 border-slate-700 text-white"
                                placeholder="01712345678"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                            <Input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="bg-slate-900 border-slate-700 text-white"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-300 mb-1">Address</label>
                            <Input
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="bg-slate-900 border-slate-700 text-white"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Academic Information */}
                <Card className="bg-slate-950 border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-white">Academic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Applying for Class *</label>
                            <Select value={formData.applied_class} onValueChange={(v) => setFormData({ ...formData, applied_class: v })}>
                                <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                                    <SelectValue placeholder="Select class" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-900 border-slate-800">
                                    {classes.map((cls) => (
                                        <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Previous School</label>
                            <Input
                                value={formData.previous_school}
                                onChange={(e) => setFormData({ ...formData, previous_school: e.target.value })}
                                className="bg-slate-900 border-slate-700 text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Previous Marks (%)</label>
                            <Input
                                type="number"
                                min="0"
                                max="100"
                                step="0.01"
                                value={formData.previous_marks}
                                onChange={(e) => setFormData({ ...formData, previous_marks: e.target.value })}
                                className="bg-slate-900 border-slate-700 text-white"
                                placeholder="0-100"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Guardian Information */}
                <Card className="bg-slate-950 border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-white">Guardian Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Guardian Name *</label>
                            <Input
                                required
                                value={formData.guardian_name}
                                onChange={(e) => setFormData({ ...formData, guardian_name: e.target.value })}
                                className="bg-slate-900 border-slate-700 text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Guardian Phone *</label>
                            <Input
                                required
                                value={formData.guardian_phone}
                                onChange={(e) => setFormData({ ...formData, guardian_phone: e.target.value })}
                                className="bg-slate-900 border-slate-700 text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Relationship</label>
                            <Select value={formData.guardian_relation} onValueChange={(v) => setFormData({ ...formData, guardian_relation: v })}>
                                <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-900 border-slate-800">
                                    <SelectItem value="father">Father</SelectItem>
                                    <SelectItem value="mother">Mother</SelectItem>
                                    <SelectItem value="guardian">Guardian</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Occupation</label>
                            <Input
                                value={formData.guardian_occupation}
                                onChange={(e) => setFormData({ ...formData, guardian_occupation: e.target.value })}
                                className="bg-slate-900 border-slate-700 text-white"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Submit */}
                <div className="flex justify-end gap-4">
                    <Button type="button" variant="ghost" onClick={() => router.back()} className="text-slate-400">
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                        {loading ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            "Submit Application"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
