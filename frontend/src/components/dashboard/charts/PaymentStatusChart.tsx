"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const data = [
    { name: "Jan", success: 4000, failed: 240 },
    { name: "Feb", success: 3000, failed: 139 },
    { name: "Mar", success: 2000, failed: 980 },
    { name: "Apr", success: 2780, failed: 390 },
    { name: "May", success: 1890, failed: 480 },
    { name: "Jun", success: 2390, failed: 380 },
];

export function PaymentStatusChart() {
    return (
        <Card className="col-span-3 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardHeader>
                <CardTitle>Payment Success Rate</CardTitle>
                <CardDescription>Transaction status overview</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.1} />
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{
                                backgroundColor: '#18181b',
                                borderRadius: '8px',
                                border: '1px solid #27272a',
                                color: '#fff'
                            }}
                        />
                        <Legend />
                        <Bar dataKey="success" name="Successful" fill="#10b981" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="failed" name="Failed" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
