"use client";

import { Badge } from "@/components/ui/badge";
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
import { Download, Filter, RefreshCcw, Search } from "lucide-react";
import { useState } from "react";

const logs = [
    {
        id: "LOG-001",
        timestamp: "2024-03-24 10:45:22",
        level: "error",
        service: "Payment Gateway",
        message: "Connection timeout to bKash API v2. Endpoint unreachable.",
        user: "System"
    },
    {
        id: "LOG-002",
        timestamp: "2024-03-24 10:42:15",
        level: "warning",
        service: "Queue Worker",
        message: "Job processing delayed > 30s. Queue depth: 450.",
        user: "Worker-02"
    },
    {
        id: "LOG-003",
        timestamp: "2024-03-24 10:30:00",
        level: "info",
        service: "Auth Service",
        message: "Successful login for user admin@dhakaideal.edu.bd",
        user: "Auth"
    },
    {
        id: "LOG-004",
        timestamp: "2024-03-24 10:28:45",
        level: "error",
        service: "SMS Provider",
        message: "Invalid API Key rejected by Twilio.",
        user: "School-05"
    },
    {
        id: "LOG-005",
        timestamp: "2024-03-24 10:15:10",
        level: "info",
        service: "Backup",
        message: "Daily DB snapshot completed. Size: 2.4GB.",
        user: "Cron"
    },
    {
        id: "LOG-006",
        timestamp: "2024-03-24 09:55:00",
        level: "warning",
        service: "Rate Limiter",
        message: "Tenant [T-102] exceeded API rate limit (60 req/min).",
        user: "API-Gateway"
    }
];

export default function SystemLogsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredLogs = logs.filter(log =>
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.service.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-medium text-zinc-900 dark:text-white">System Logs</h3>
                    <p className="text-sm text-zinc-500">
                        View real-time error logs, warnings, and system events.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <RefreshCcw className="h-4 w-4 mr-2" />
                        Refresh
                    </Button>
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                    <Input
                        placeholder="Search logs..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                </Button>
            </div>

            <div className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                            <TableHead className="w-[180px]">Timestamp</TableHead>
                            <TableHead className="w-[100px]">Level</TableHead>
                            <TableHead className="w-[150px]">Service</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead className="w-[120px] text-right">User/Source</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredLogs.map((log) => (
                            <TableRow key={log.id}>
                                <TableCell className="font-mono text-xs text-zinc-500">
                                    {log.timestamp}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={
                                        log.level === 'error' ? 'destructive' :
                                            log.level === 'warning' ? 'secondary' : // Using secondary for warning, maybe optimize later
                                                'outline'
                                    } className={
                                        log.level === 'warning' ? 'bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400' : ''
                                    }>
                                        {log.level.toUpperCase()}
                                    </Badge>
                                </TableCell>
                                <TableCell className="font-medium text-xs">{log.service}</TableCell>
                                <TableCell className="text-sm text-zinc-600 dark:text-zinc-300">
                                    {log.message}
                                </TableCell>
                                <TableCell className="text-right text-xs text-zinc-500">
                                    {log.user}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
