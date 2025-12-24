"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Plus, Edit2, Trash, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

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

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Subscription Plans</h3>
                    <p className="text-sm text-zinc-500">
                        Manage pricing tiers and feature limits for your SaaS tenants.
                    </p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Plan
                </Button>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-[400px] rounded-xl bg-zinc-100 dark:bg-zinc-900 animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                        <Card key={plan.id} className="relative flex flex-col border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-200">
                            {plan.slug === 'premium' && (
                                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                                    <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 text-xs uppercase tracking-wider">
                                        Most Popular
                                    </Badge>
                                </div>
                            )}
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                                        <CardDescription className="mt-2 text-sm text-zinc-500 h-[40px] line-clamp-2">
                                            {plan.description}
                                        </CardDescription>
                                    </div>
                                    <div className="bg-zinc-100 dark:bg-zinc-900 p-2 rounded-lg text-indigo-600">
                                        <ShieldCheck className="h-6 w-6" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="mb-6">
                                    <span className="text-3xl font-bold text-zinc-900 dark:text-white">
                                        ৳{parseFloat(plan.price).toLocaleString()}
                                    </span>
                                    <span className="text-zinc-500 ml-1">/year</span>
                                </div>
                                <div className="space-y-3">
                                    {plan.features && plan.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="mt-1 h-4 w-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                                                <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                            <span className="text-sm text-zinc-600 dark:text-zinc-300 leading-tight">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="pt-6 border-t border-zinc-100 dark:border-zinc-900 flex gap-3">
                                <Button variant="outline" className="flex-1 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900">
                                    <Edit2 className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                                <Button variant="outline" className="flex-none border-red-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:border-red-900/30">
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
