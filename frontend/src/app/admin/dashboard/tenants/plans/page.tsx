"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Plus, Edit2, Trash, ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Plan {
    id: number;
    name: string;
    slug: string;
    price: string;
    description: string;
    features: string[];
    is_active: boolean;
}

export default function PlansPage() {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        price: "",
        duration_months: "12",
        description: "",
        features: "" // Comma separated string for input
    });

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8000/api/plans', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                setPlans(data);
            } else {
                toast.error("Failed to load plans");
            }
        } catch (error) {
            console.error(error);
            toast.error("Network error loading plans");
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateSlug = () => {
        const slug = formData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        setFormData(prev => ({ ...prev, slug }));
    };

    const handleCreate = async () => {
        if (!formData.name || !formData.slug || !formData.price) {
            toast.error("Please fill in required fields");
            return;
        }

        setCreateLoading(true);
        try {
            const token = localStorage.getItem('token');
            const featuresArray = formData.features.split('\n').filter(f => f.trim() !== '');

            const payload = {
                ...formData,
                price: parseFloat(formData.price),
                duration_months: parseInt(formData.duration_months),
                features: featuresArray
            };

            const res = await fetch('http://localhost:8000/api/plans', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                toast.success("Plan created successfully");
                setIsCreateOpen(false);
                setFormData({
                    name: "", slug: "", price: "",
                    duration_months: "12", description: "", features: ""
                });
                fetchPlans(); // Refresh list
            } else {
                const error = await res.json();
                toast.error(error.message || "Failed to create plan");
            }
        } catch (error) {
            console.error(error);
            toast.error("Network error");
        } finally {
            setCreateLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white">Subscription Plans</h3>
                    <p className="text-sm text-slate-400">
                        Manage pricing tiers and feature limits for your SaaS tenants.
                    </p>
                </div>

                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20">
                            <Plus className="h-4 w-4 mr-2" />
                            Create New Plan
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] bg-slate-950 border-slate-800 text-slate-200">
                        <DialogHeader>
                            <DialogTitle className="text-white">Create Subscription Plan</DialogTitle>
                            <DialogDescription className="text-slate-400">
                                Add a new pricing tier to your offering.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Plan Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="e.g. Starter"
                                        className="bg-slate-900 border-slate-800 text-white"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        onBlur={handleGenerateSlug}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug (Unique)</Label>
                                    <Input
                                        id="slug"
                                        placeholder="e.g. starter"
                                        className="bg-slate-900 border-slate-800 text-white"
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price (BDT)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        placeholder="25000"
                                        className="bg-slate-900 border-slate-800 text-white"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="duration">Duration (Months)</Label>
                                    <Input
                                        id="duration"
                                        type="number"
                                        value={formData.duration_months}
                                        className="bg-slate-900 border-slate-800 text-white"
                                        onChange={(e) => setFormData({ ...formData, duration_months: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    placeholder="Short summary of target audience..."
                                    className="bg-slate-900 border-slate-800 text-white"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="features">Features (One per line)</Label>
                                <Textarea
                                    id="features"
                                    placeholder="Student Management&#10;Basic Reporting&#10;Email Support"
                                    className="bg-slate-900 border-slate-800 text-white min-h-[100px]"
                                    value={formData.features}
                                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsCreateOpen(false)} className="border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-white">Cancel</Button>
                            <Button onClick={handleCreate} disabled={createLoading} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                {createLoading ? "Creating..." : "Create Plan"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-[400px] rounded-xl bg-slate-900 animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                        <Card key={plan.id} className="relative flex flex-col border-slate-800 bg-slate-950 shadow-sm hover:shadow-xl hover:border-indigo-500/30 transition-all duration-300">
                            {plan.slug === 'premium' && (
                                <div className="absolute -top-3 left-0 right-0 flex justify-center z-10">
                                    <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 text-xs uppercase tracking-wider shadow-lg shadow-indigo-900/40">
                                        Most Popular
                                    </Badge>
                                </div>
                            )}
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-xl font-bold text-white">{plan.name}</CardTitle>
                                        <CardDescription className="mt-2 text-sm text-slate-400 h-[40px] line-clamp-2">
                                            {plan.description}
                                        </CardDescription>
                                    </div>
                                    <div className="bg-slate-900 p-2 rounded-lg text-indigo-400 shadow-inner">
                                        <ShieldCheck className="h-6 w-6" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="mb-6">
                                    <span className="text-3xl font-bold text-white">
                                        ৳{parseFloat(plan.price).toLocaleString()}
                                    </span>
                                    <span className="text-slate-500 ml-1">/year</span>
                                </div>
                                <div className="space-y-3">
                                    {plan.features && plan.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="mt-1 h-4 w-4 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
                                                <Check className="h-3 w-3 text-indigo-400" />
                                            </div>
                                            <span className="text-sm text-slate-300 leading-tight">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="pt-6 border-t border-slate-900 flex gap-3">
                                <Button variant="outline" className="flex-1 border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-white">
                                    <Edit2 className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                                <Button variant="outline" className="flex-none border-slate-800 text-red-500 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400">
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
