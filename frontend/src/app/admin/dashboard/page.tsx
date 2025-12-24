"use client";

import { SuperAdminView } from "@/components/dashboard/super-admin/SuperAdminView";
import { Button } from "@/components/ui/button";
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker";
import { Download } from "lucide-react";

export default function AdminDashboardPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Dashboard</h2>
                    <p className="text-zinc-500">Welcome back, Super Admin. Here is what's happening today.</p>
                </div>
                <div className="flex items-center gap-2">
                    <CalendarDateRangePicker />
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                        <Download className="mr-2 h-4 w-4" /> Download Report
                    </Button>
                </div>
            </div>

            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 p-1">
                <SuperAdminView />
            </div>
        </div>
    );
}
