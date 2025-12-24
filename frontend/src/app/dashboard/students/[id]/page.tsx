"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    User, Phone, Mail, Calendar, MapPin, Heart, Book,
    ArrowLeft, Users, FileText, Upload, Trash2
} from "lucide-react";
import { toast } from "sonner";

interface Student {
    id: number;
    student_id: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: string;
    blood_group: string;
    religion: string;
    nationality: string;
    address: string;
    phone: string;
    email: string;
    admission_date: string;
    class: string;
    section: string;
    roll_number: string;
    photo_url: string | null;
    status: string;
    guardians: any[];
    documents: any[];
}

export default function StudentProfilePage() {
    const params = useParams();
    const router = useRouter();
    const [student, setStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.id) {
            fetchStudent(params.id as string);
        }
    }, [params.id]);

    const fetchStudent = async (id: string) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:8000/api/students/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setStudent(data);
            } else {
                toast.error("Student not found");
                router.back();
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load student");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="h-8 w-48 bg-slate-800 rounded animate-pulse" />
                <div className="h-96 bg-slate-900 rounded animate-pulse" />
            </div>
        );
    }

    if (!student) return null;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => router.back()} className="text-slate-400 hover:text-white">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </Button>
            </div>

            {/* Profile Card */}
            <Card className="bg-slate-950 border-slate-800">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Photo */}
                        <div className="flex-shrink-0">
                            <div className="w-32 h-32 rounded-xl bg-indigo-500/10 flex items-center justify-center overflow-hidden">
                                {student.photo_url ? (
                                    <img src={student.photo_url} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="h-16 w-16 text-indigo-400" />
                                )}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold text-white">
                                        {student.first_name} {student.last_name}
                                    </h1>
                                    <p className="text-slate-400 font-mono">{student.student_id}</p>
                                </div>
                                <Badge className={`${student.status === 'active'
                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                        : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                                    } border`}>
                                    {student.status.toUpperCase()}
                                </Badge>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                                <div>
                                    <p className="text-slate-500 text-sm">Class</p>
                                    <p className="text-white">{student.class} {student.section}</p>
                                </div>
                                <div>
                                    <p className="text-slate-500 text-sm">Roll Number</p>
                                    <p className="text-white">{student.roll_number || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-slate-500 text-sm">Gender</p>
                                    <p className="text-white capitalize">{student.gender || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-slate-500 text-sm">Blood Group</p>
                                    <p className="text-white">{student.blood_group || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Info */}
                <Card className="bg-slate-950 border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <User className="h-5 w-5 text-indigo-400" />
                            Personal Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Calendar className="h-4 w-4 text-slate-500" />
                            <div>
                                <p className="text-slate-500 text-sm">Date of Birth</p>
                                <p className="text-white">{student.date_of_birth ? new Date(student.date_of_birth).toLocaleDateString() : 'N/A'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-slate-500" />
                            <div>
                                <p className="text-slate-500 text-sm">Phone</p>
                                <p className="text-white">{student.phone || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-slate-500" />
                            <div>
                                <p className="text-slate-500 text-sm">Email</p>
                                <p className="text-white">{student.email || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="h-4 w-4 text-slate-500" />
                            <div>
                                <p className="text-slate-500 text-sm">Address</p>
                                <p className="text-white">{student.address || 'N/A'}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Guardians */}
                <Card className="bg-slate-950 border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Users className="h-5 w-5 text-purple-400" />
                            Guardians
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {student.guardians?.length > 0 ? (
                            <div className="space-y-4">
                                {student.guardians.map((guardian: any) => (
                                    <div key={guardian.id} className="p-3 rounded-lg bg-slate-900/50">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-white font-medium">{guardian.name}</p>
                                                <p className="text-slate-500 text-sm capitalize">{guardian.relationship}</p>
                                            </div>
                                            {guardian.is_primary && (
                                                <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                                    Primary
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="mt-2 flex items-center gap-4 text-sm text-slate-400">
                                            <span className="flex items-center gap-1">
                                                <Phone className="h-3 w-3" /> {guardian.phone}
                                            </span>
                                            {guardian.occupation && (
                                                <span>• {guardian.occupation}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-500 text-center py-4">No guardians added</p>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Documents */}
            <Card className="bg-slate-950 border-slate-800">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-white flex items-center gap-2">
                        <FileText className="h-5 w-5 text-amber-400" />
                        Documents
                    </CardTitle>
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                        <Upload className="h-4 w-4 mr-2" /> Upload
                    </Button>
                </CardHeader>
                <CardContent>
                    {student.documents?.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {student.documents.map((doc: any) => (
                                <div key={doc.id} className="p-4 rounded-lg bg-slate-900/50 flex items-center justify-between">
                                    <div>
                                        <p className="text-white text-sm">{doc.file_name}</p>
                                        <p className="text-slate-500 text-xs">{doc.document_type}</p>
                                    </div>
                                    <FileText className="h-5 w-5 text-slate-600" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-slate-500 text-center py-4">No documents uploaded</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
