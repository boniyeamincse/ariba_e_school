"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const data = [
    { name: "Mon", sms: 4000 },
    { name: "Tue", sms: 3000 },
    { name: "Wed", sms: 2000 },
    { name: "Thu", sms: 2780 },
    { name: "Fri", sms: 1890 },
    { name: "Sat", sms: 2390 },
    { name: "Sun", sms: 3490 },
];

export function SmsUsageChart() {
    return (
        <Card className="col-span-2 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardHeader>
                <CardTitle>SMS Usage Trend</CardTitle>
                <CardDescription>Daily consumption (Last 7 Days)</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.1} />
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                            cursor={{ fill: '#27272a', opacity: 0.2 }}
                            contentStyle={{
                                backgroundColor: '#18181b',
                                borderRadius: '8px',
                                border: '1px solid #27272a',
                                color: '#fff'
                            }}
                        />
                        <Bar dataKey="sms" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
