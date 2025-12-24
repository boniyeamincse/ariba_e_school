"use client";

import {
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const data = [
    { name: "Jan", tenants: 12 },
    { name: "Feb", tenants: 18 },
    { name: "Mar", tenants: 25 },
    { name: "Apr", tenants: 32 },
    { name: "May", tenants: 45 },
    { name: "Jun", tenants: 58 },
    { name: "Jul", tenants: 72 },
];

export function TenantGrowthChart() {
    return (
        <Card className="col-span-3 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardHeader>
                <CardTitle>Tenant Growth</CardTitle>
                <CardDescription>
                    New schools onboarding trend.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.1} />
                        <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#18181b',
                                borderRadius: '8px',
                                border: '1px solid #27272a',
                                color: '#fff'
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="tenants"
                            stroke="#10b981" /* Emerald-500 */
                            strokeWidth={2}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
