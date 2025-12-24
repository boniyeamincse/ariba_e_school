"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Filter, MoreHorizontal, User, Download } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function StudentListPage() {
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [classFilter, setClassFilter] = useState("all");

    // Academic Data for Filters
    const [classes, setClasses] = useState<any[]>([]);

    useEffect(() => {
        fetchStudents();
        fetchClasses();
    }, []);

    const fetchStudents = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8000/api/students', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                setStudents(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch students", error);
        } finally {
            setLoading(false);
        }
    };

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

    const filteredStudents = students.filter(student => {
        const matchesSearch =
            student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.student_id?.includes(searchTerm);

        return matchesSearch;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Students</h2>
                    <p className="text-zinc-500">Manage student records and enrollments.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                    <Link href="/dashboard/students/admission">
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20">
                            <Plus className="mr-2 h-4 w-4" /> New Admission
                        </Button>
                    </Link>
                </div>
            </div>

            <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
                <CardHeader className="pb-4 border-b border-zinc-100 dark:border-zinc-900">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
                            <Input
                                placeholder="Search by name or ID..."
                                className="pl-9 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <Select value={classFilter} onValueChange={setClassFilter}>
                                <SelectTrigger className="w-[180px] bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                                    <SelectValue placeholder="All Classes" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Classes</SelectItem>
                                    {classes.map(cls => (
                                        <SelectItem key={cls.id} value={String(cls.id)}>{cls.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button variant="outline" size="icon" className="shrink-0">
                                <Filter className="h-4 w-4 text-zinc-500" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <Table>
                    <TableHeader>
                        <TableRow className="bg-zinc-50/50 dark:bg-zinc-900/50">
                            <TableHead>Student</TableHead>
                            <TableHead>ID</TableHead>
                            <TableHead>Class / Section</TableHead>
                            <TableHead>Guardian</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">Loading students...</TableCell>
                            </TableRow>
                        ) : filteredStudents.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-32 text-center text-zinc-500">
                                    No students found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredStudents.map((student) => (
                                <TableRow key={student.id} className="group hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9 border border-zinc-200 dark:border-zinc-700">
                                                <AvatarImage src={student.photo_url} />
                                                <AvatarFallback className="bg-indigo-100 text-indigo-600 font-medium">
                                                    {student.first_name[0]}{student.last_name[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium text-zinc-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                                                    {student.first_name} {student.last_name}
                                                </div>
                                                <div className="text-xs text-zinc-500">{student.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-mono text-xs">{student.student_id}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{student.school_class?.name || "N/A"}</span>
                                            <span className="text-xs text-zinc-500">Sec: {student.section?.name || "-"}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm">{student.primary_guardian?.name || "N/A"}</div>
                                        <div className="text-xs text-zinc-500">{student.primary_guardian?.phone}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={student.status === 'active' ? 'default' : 'secondary'} className={student.status === 'active' ? 'bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 border-emerald-500/20' : ''}>
                                            {student.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                                <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                                <DropdownMenuItem>ID Card</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-red-600">Archive</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
