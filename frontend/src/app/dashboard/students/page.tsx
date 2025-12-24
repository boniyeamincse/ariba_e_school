"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    GraduationCap, Search, Plus, User, Phone,
    ChevronRight, Users, BookOpen
} from "lucide-react";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Student {
    id: number;
    student_id: string;
    first_name: string;
    last_name: string;
    class: string;
    section: string;
    phone: string;
    status: string;
    photo_url: string | null;
    guardians: any[];
}

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [classFilter, setClassFilter] = useState("all");
    const [stats, setStats] = useState({ total: 0, active: 0, classes: [] as string[] });

    useEffect(() => {
        fetchStudents();
    }, [search, classFilter]);

    const fetchStudents = async () => {
        try {
            const token = localStorage.getItem('token');
            let url = `http://localhost:8000/api/students?`;
            if (search) url += `search=${search}&`;
            if (classFilter !== 'all') url += `class=${classFilter}&`;

            const res = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                const items = data.data || data;
                setStudents(items);

                // Calculate stats
                const classes = [...new Set(items.map((s: Student) => s.class).filter(Boolean))] as string[];
                setStats({
                    total: items.length,
                    active: items.filter((s: Student) => s.status === 'active').length,
                    classes: classes.sort(),
                });
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load students");
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
            inactive: "bg-slate-500/10 text-slate-400 border-slate-500/20",
            graduated: "bg-blue-500/10 text-blue-400 border-blue-500/20",
            transferred: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        };
        return <Badge className={`${styles[status] || styles.active} border`}>{status}</Badge>;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white">Students</h3>
                    <p className="text-sm text-slate-400">Manage student records and profiles.</p>
                </div>
                <Link href="/dashboard/students/create">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                        <Plus className="h-4 w-4 mr-2" /> Add Student
                    </Button>
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-slate-950 border-slate-800">
                    <CardContent className="pt-4 pb-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm">Total</p>
                                <p className="text-2xl font-bold text-white">{stats.total}</p>
                            </div>
                            <GraduationCap className="h-8 w-8 text-indigo-400" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-slate-950 border-emerald-500/20">
                    <CardContent className="pt-4 pb-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-emerald-400 text-sm">Active</p>
                                <p className="text-2xl font-bold text-white">{stats.active}</p>
                            </div>
                            <User className="h-8 w-8 text-emerald-400" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-slate-950 border-blue-500/20">
                    <CardContent className="pt-4 pb-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-400 text-sm">Classes</p>
                                <p className="text-2xl font-bold text-white">{stats.classes.length}</p>
                            </div>
                            <BookOpen className="h-8 w-8 text-blue-400" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-slate-950 border-purple-500/20">
                    <CardContent className="pt-4 pb-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-400 text-sm">Guardians</p>
                                <p className="text-2xl font-bold text-white">{students.reduce((sum, s) => sum + (s.guardians?.length || 0), 0)}</p>
                            </div>
                            <Users className="h-8 w-8 text-purple-400" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <Input
                        placeholder="Search by name, ID, or phone..."
                        className="pl-10 bg-slate-950 border-slate-800 text-white"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <Select value={classFilter} onValueChange={setClassFilter}>
                    <SelectTrigger className="w-full sm:w-[180px] bg-slate-950 border-slate-800 text-white">
                        <SelectValue placeholder="Filter by class" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-800">
                        <SelectItem value="all">All Classes</SelectItem>
                        {stats.classes.map((cls) => (
                            <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Student List */}
            <Card className="bg-slate-950 border-slate-800">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-indigo-400" />
                        Student Directory
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="h-16 bg-slate-900 rounded animate-pulse" />
                            ))}
                        </div>
                    ) : students.length === 0 ? (
                        <div className="text-center py-12 text-slate-500">
                            <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No students found.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {students.map((student) => (
                                <Link key={student.id} href={`/dashboard/students/${student.id}`}>
                                    <div className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 hover:bg-slate-900 transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center">
                                                {student.photo_url ? (
                                                    <img src={student.photo_url} alt="" className="w-12 h-12 rounded-full object-cover" />
                                                ) : (
                                                    <User className="h-6 w-6 text-indigo-400" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-white font-medium group-hover:text-indigo-400 transition-colors">
                                                    {student.first_name} {student.last_name}
                                                </p>
                                                <div className="flex items-center gap-3 text-sm text-slate-500">
                                                    <span className="font-mono">{student.student_id}</span>
                                                    <span>•</span>
                                                    <span>{student.class} {student.section}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right hidden md:block">
                                                <p className="text-slate-400 text-sm flex items-center gap-1">
                                                    <Phone className="h-3 w-3" /> {student.phone || 'N/A'}
                                                </p>
                                            </div>
                                            {getStatusBadge(student.status)}
                                            <ChevronRight className="h-5 w-5 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
