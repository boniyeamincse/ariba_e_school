"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function TopSmsConsumers() {
    const consumers = [
        { name: "Dhaka Ideal School", usage: "12,450", limit: "50,000", percentage: 24 },
        { name: "Viqarunnisa Noon", usage: "10,230", limit: "50,000", percentage: 20 },
        { name: "Scholastica", usage: "8,900", limit: "25,000", percentage: 35 },
        { name: "Rajuk College", usage: "5,600", limit: "25,000", percentage: 22 },
    ];

    return (
        <Card className="col-span-2 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardHeader>
                <CardTitle>Top SMS Consumers</CardTitle>
                <CardDescription>Schools with highest message volume</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {consumers.map((school, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div className="w-1/2">
                                <div className="font-medium text-sm text-zinc-900 dark:text-white truncate">{school.name}</div>
                                <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-1.5 mt-1.5 overflow-hidden">
                                    <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${school.percentage}%` }}></div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-bold text-zinc-700 dark:text-zinc-300">{school.usage}</div>
                                <div className="text-xs text-zinc-500">of {school.limit}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
