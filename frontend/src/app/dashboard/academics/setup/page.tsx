"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, BookOpen, Layers, Users, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface Topic {
    id: number;
    name: string;
}

interface Subject {
    id: number;
    name: string;
    code: string;
    type: 'theory' | 'practical';
    full_marks: number;
    topics: Topic[];
}

interface Section {
    id: number;
    name: string;
    capacity: number;
    room_no: string;
}

interface SchoolClass {
    id: number;
    name: string;
    numeric_value: number;
    sections: Section[];
    subjects: Subject[];
}

export default function AcademicSetupPage() {
    const [classes, setClasses] = useState<SchoolClass[]>([]);
    const [loading, setLoading] = useState(true);

    // Form States
    const [isClassModalOpen, setIsClassModalOpen] = useState(false);
    const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
    const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);

    const [selectedClassId, setSelectedClassId] = useState<number | null>(null);

    const [newClass, setNewClass] = useState({ name: "", numeric_value: "" });
    const [newSection, setNewSection] = useState({ name: "", capacity: "", room_no: "" });
    const [newSubject, setNewSubject] = useState({ name: "", code: "", full_marks: "100", type: "theory" });

    // Fetch Hierarchy
    const fetchHierarchy = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8000/api/academics/hierarchy', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setClasses(data.data);
            }
        } catch (error) {
            toast.error("Failed to load academic data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHierarchy();
    }, []);

    // Handlers
    const handleCreateClass = async () => {
        if (!newClass.name) return;
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8000/api/academics/classes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(newClass)
            });
            if (res.ok) {
                toast.success("Class created successfully");
                setIsClassModalOpen(false);
                setNewClass({ name: "", numeric_value: "" });
                fetchHierarchy();
            }
        } catch (error) { toast.error("Failed to create class"); }
    };

    const handleCreateSection = async () => {
        if (!selectedClassId || !newSection.name) return;
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8000/api/academics/sections', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ ...newSection, class_id: selectedClassId })
            });
            if (res.ok) {
                toast.success("Section added successfully");
                setIsSectionModalOpen(false);
                setNewSection({ name: "", capacity: "", room_no: "" });
                fetchHierarchy();
            }
        } catch (error) { toast.error("Failed to add section"); }
    };

    const handleCreateSubject = async () => {
        if (!selectedClassId || !newSubject.name) return;
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8000/api/academics/subjects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ ...newSubject, class_id: selectedClassId })
            });
            if (res.ok) {
                toast.success("Subject added successfully");
                setIsSubjectModalOpen(false);
                setNewSubject({ name: "", code: "", full_marks: "100", type: "theory" });
                fetchHierarchy();
            }
        } catch (error) { toast.error("Failed to add subject"); }
    };

    const openSectionModal = (classId: number) => {
        setSelectedClassId(classId);
        setIsSectionModalOpen(true);
    };

    const openSubjectModal = (classId: number) => {
        setSelectedClassId(classId);
        setIsSubjectModalOpen(true);
    };


    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Academic Setup</h2>
                    <p className="text-zinc-500">Configure classes, sections, and subjects.</p>
                </div>
                <Dialog open={isClassModalOpen} onOpenChange={setIsClassModalOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30">
                            <Plus className="mr-2 h-4 w-4" /> Add New Class
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Class</DialogTitle>
                            <DialogDescription>Add a new academic class level (e.g., Class 10).</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Class Name</Label>
                                <Input id="name" placeholder="e.g. Class 10" value={newClass.name} onChange={(e) => setNewClass({ ...newClass, name: e.target.value })} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="numeric">Numeric Value (for sorting)</Label>
                                <Input id="numeric" type="number" placeholder="e.g. 10" value={newClass.numeric_value} onChange={(e) => setNewClass({ ...newClass, numeric_value: e.target.value })} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleCreateClass}>Create Class</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {loading ? (
                <div className="text-center py-12 text-zinc-400">Loading academic data...</div>
            ) : (
                <div className="space-y-4">
                    {classes.map((cls) => (
                        <Accordion type="single" collapsible key={cls.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm">
                            <AccordionItem value={`item-${cls.id}`} className="border-none">
                                <AccordionTrigger className="px-6 hover:no-underline hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-t-lg">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center font-bold text-indigo-700 dark:text-indigo-400">
                                            {cls.numeric_value}
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-lg text-zinc-900 dark:text-white">{cls.name}</h3>
                                            <p className="text-sm text-zinc-500 font-normal">
                                                {cls.sections.length} Sections • {cls.subjects.length} Subjects
                                            </p>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-6 pt-2">
                                    <div className="grid lg:grid-cols-2 gap-6 mt-4">
                                        {/* Sections Column */}
                                        <div className="space-y-4 border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 p-4 rounded-xl">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 font-medium">
                                                    <Users className="h-4 w-4" /> Sections
                                                </div>
                                                <Button size="sm" variant="outline" className="h-8" onClick={() => openSectionModal(cls.id)}>
                                                    <Plus className="h-3 w-3 mr-1" /> Add
                                                </Button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                {cls.sections.length > 0 ? cls.sections.map(sec => (
                                                    <Card key={sec.id} className="shadow-none border border-zinc-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-900">
                                                        <CardContent className="p-3 flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                                                <span className="font-medium">{sec.name}</span>
                                                            </div>
                                                            <span className="text-xs text-zinc-400">{sec.capacity ? `${sec.capacity} seats` : 'N/A'}</span>
                                                        </CardContent>
                                                    </Card>
                                                )) : (
                                                    <div className="col-span-2 text-center text-sm text-zinc-400 py-4 italic">No sections added</div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Subjects Column */}
                                        <div className="space-y-4 border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 p-4 rounded-xl">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 font-medium">
                                                    <BookOpen className="h-4 w-4" /> Subjects
                                                </div>
                                                <Button size="sm" variant="outline" className="h-8" onClick={() => openSubjectModal(cls.id)}>
                                                    <Plus className="h-3 w-3 mr-1" /> Add
                                                </Button>
                                            </div>
                                            <div className="space-y-2">
                                                {cls.subjects.length > 0 ? cls.subjects.map(sub => (
                                                    <div key={sub.id} className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700/50">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-8 w-8 rounded bg-fuchsia-50 dark:bg-fuchsia-900/20 flex items-center justify-center text-fuchsia-600 dark:text-fuchsia-400 font-bold text-xs">
                                                                {sub.code ? sub.code.substring(0, 2) : sub.name.substring(0, 2)}
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-sm text-zinc-900 dark:text-white">{sub.name}</div>
                                                                <div className="text-xs text-zinc-500">{sub.type} • {sub.full_marks} Marks</div>
                                                            </div>
                                                        </div>
                                                        <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-400"><ChevronRight className="h-4 w-4" /></Button>
                                                    </div>
                                                )) : (
                                                    <div className="text-center text-sm text-zinc-400 py-4 italic">No subjects added</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ))}

                    {classes.length === 0 && (
                        <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                            <Layers className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-zinc-900 dark:text-white">No Classes Found</h3>
                            <p className="text-zinc-500 mb-6">Start by creating your first academic class.</p>
                            <Button onClick={() => setIsClassModalOpen(true)}>Create Class</Button>
                        </div>
                    )}
                </div>
            )}

            {/* Section Modal */}
            <Dialog open={isSectionModalOpen} onOpenChange={setIsSectionModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Section</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label>Section Name (e.g. A, B, Morning)</Label>
                            <Input value={newSection.name} onChange={(e) => setNewSection({ ...newSection, name: e.target.value })} placeholder="Section Name" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Capacity</Label>
                                <Input type="number" value={newSection.capacity} onChange={(e) => setNewSection({ ...newSection, capacity: e.target.value })} placeholder="60" />
                            </div>
                            <div className="grid gap-2">
                                <Label>Room No</Label>
                                <Input value={newSection.room_no} onChange={(e) => setNewSection({ ...newSection, room_no: e.target.value })} placeholder="101" />
                            </div>
                        </div>
                    </div>
                    <DialogFooter><Button onClick={handleCreateSection}>Save Section</Button></DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Subject Modal */}
            <Dialog open={isSubjectModalOpen} onOpenChange={setIsSubjectModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Subject</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label>Subject Name</Label>
                            <Input value={newSubject.name} onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })} placeholder="Mathematics" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Subject Code</Label>
                                <Input value={newSubject.code} onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })} placeholder="MATH101" />
                            </div>
                            <div className="grid gap-2">
                                <Label>Full Marks</Label>
                                <Input type="number" value={newSubject.full_marks} onChange={(e) => setNewSubject({ ...newSubject, full_marks: e.target.value })} placeholder="100" />
                            </div>
                        </div>
                    </div>
                    <DialogFooter><Button onClick={handleCreateSubject}>Save Subject</Button></DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
