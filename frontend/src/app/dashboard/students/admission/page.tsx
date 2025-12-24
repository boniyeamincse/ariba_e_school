"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, Save, ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function AdmissionPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Dropdown Data
    const [classes, setClasses] = useState<any[]>([]);
    const [sections, setSections] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        gender: "",
        date_of_birth: undefined as Date | undefined,
        religion: "",
        blood_group: "",
        address: "",
        class_id: "",
        section_id: "",
        roll_number: "",
        admission_date: new Date(),
    });

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8000/api/academics/hierarchy', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) setClasses(data.data);
        } catch (e) { }
    }

    const handleClassChange = (classId: string) => {
        setFormData({ ...formData, class_id: classId, section_id: "" });
        const selectedClass = classes.find(c => String(c.id) === classId);
        setSections(selectedClass ? selectedClass.sections : []);
    };

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (!formData.first_name || !formData.last_name || !formData.class_id) {
            toast.error("Please fill in required fields (*)");
            return;
        }

        setLoading(true);
        const toastId = toast.loading("Processing admission...");

        try {
            const token = localStorage.getItem('token');

            // Format dates
            const payload = {
                ...formData,
                tenant_id: 1, // Hardcoded for demo/MVP until auth context full
                date_of_birth: formData.date_of_birth ? format(formData.date_of_birth, "yyyy-MM-dd") : null,
                admission_date: formData.admission_date ? format(formData.admission_date, "yyyy-MM-dd") : null,
            };

            const res = await fetch('http://localhost:8000/api/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                toast.success("Student admitted successfully!", { id: toastId });
                router.push("/dashboard/students");
            } else {
                const err = await res.json();
                toast.error(err.message || "Admission failed", { id: toastId });
            }
        } catch (error) {
            toast.error("Network error", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/students">
                        <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">New Admission</h2>
                        <p className="text-sm text-zinc-500">Enroll a new student into the academic year.</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => router.push("/dashboard/students")}>Cancel</Button>
                    <Button onClick={handleSubmit} disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                        <Save className="mr-2 h-4 w-4" />
                        {loading ? "Saving..." : "Confirm Admission"}
                    </Button>
                </div>
            </div>

            <div className="grid gap-6">
                {/* Personal Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>First Name <span className="text-red-500">*</span></Label>
                            <Input placeholder="John" value={formData.first_name} onChange={e => handleInputChange('first_name', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>Last Name <span className="text-red-500">*</span></Label>
                            <Input placeholder="Doe" value={formData.last_name} onChange={e => handleInputChange('last_name', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>Date of Birth</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !formData.date_of_birth && "text-muted-foreground")}>
                                        {formData.date_of_birth ? format(formData.date_of_birth, "PPP") : <span>Pick a date</span>}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar mode="single" selected={formData.date_of_birth} onSelect={d => handleInputChange('date_of_birth', d)} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2">
                            <Label>Gender</Label>
                            <Select onValueChange={v => handleInputChange('gender', v)}>
                                <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Blood Group</Label>
                            <Select onValueChange={v => handleInputChange('blood_group', v)}>
                                <SelectTrigger><SelectValue placeholder="Select Group" /></SelectTrigger>
                                <SelectContent>
                                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(g => (
                                        <SelectItem key={g} value={g}>{g}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Religion</Label>
                            <Select onValueChange={v => handleInputChange('religion', v)}>
                                <SelectTrigger><SelectValue placeholder="Select Religion" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Islam">Islam</SelectItem>
                                    <SelectItem value="Hinduism">Hinduism</SelectItem>
                                    <SelectItem value="Christianity">Christianity</SelectItem>
                                    <SelectItem value="Buddhism">Buddhism</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Academic Details */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Academic Details</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label>Admission Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal")}>
                                        {formData.admission_date ? format(formData.admission_date, "PPP") : <span>Pick a date</span>}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar mode="single" selected={formData.admission_date} onSelect={d => handleInputChange('admission_date', d)} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2">
                            <Label>Class <span className="text-red-500">*</span></Label>
                            <Select onValueChange={handleClassChange}>
                                <SelectTrigger><SelectValue placeholder="Select Class" /></SelectTrigger>
                                <SelectContent>
                                    {classes.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Section</Label>
                            <Select onValueChange={v => handleInputChange('section_id', v)} disabled={!formData.class_id}>
                                <SelectTrigger><SelectValue placeholder="Select Section" /></SelectTrigger>
                                <SelectContent>
                                    {sections.map(s => <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Roll Number</Label>
                            <Input placeholder="e.g. 01" value={formData.roll_number} onChange={e => handleInputChange('roll_number', e.target.value)} />
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Info */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Phone Number</Label>
                            <Input placeholder="+880..." value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>Email Address</Label>
                            <Input type="email" placeholder="student@example.com" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <Label>Present Address</Label>
                            <Input placeholder="Full Address" value={formData.address} onChange={e => handleInputChange('address', e.target.value)} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
