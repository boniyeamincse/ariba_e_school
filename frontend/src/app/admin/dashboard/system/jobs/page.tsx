"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Activity, AlertOctagon, CheckCircle2, Clock, Play, RotateCw, Trash2 } from "lucide-react";

export default function SystemJobsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-white">Jobs & Queues</h3>
                <p className="text-sm text-zinc-500">
                    Monitor background queue workers and job processing status.
                </p>
            </div>

            {/* Queue Status Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Jobs Processed (1h)</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-zinc-900 dark:text-white">1,245</div>
                        <p className="text-xs text-zinc-500">+18% from last hour</p>
                        <Progress value={92} className="mt-3 h-1.5 bg-zinc-100 dark:bg-zinc-800" />
                    </CardContent>
                </Card>
                <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Jobs</CardTitle>
                        <Clock className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-zinc-900 dark:text-white">45</div>
                        <p className="text-xs text-zinc-500">Avg wait time: 1.2s</p>
                        <Progress value={15} className="mt-3 h-1.5 bg-zinc-100 dark:bg-zinc-800" />
                    </CardContent>
                </Card>
                <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Failed Jobs</CardTitle>
                        <AlertOctagon className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-zinc-900 dark:text-white">3</div>
                        <p className="text-xs text-zinc-500">Since last restart</p>
                        <Progress value={2} className="mt-3 h-1.5 bg-zinc-100 dark:bg-zinc-800" />
                    </CardContent>
                </Card>
            </div>

            {/* Active Queues List */}
            <div className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
                <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
                    <h4 className="font-semibold text-sm">Active Queues</h4>
                    <Button size="sm" variant="outline"> <RotateCw className="h-3.5 w-3.5 mr-2" /> Refresh Workers</Button>
                </div>
                <div className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Queue Name</TableHead>
                                <TableHead>Workers</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Throughput</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">default</TableCell>
                                <TableCell>4 Processes</TableCell>
                                <TableCell><Badge className="bg-emerald-500">Running</Badge></TableCell>
                                <TableCell className="text-right">240 jobs/min</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">notifications</TableCell>
                                <TableCell>2 Processes</TableCell>
                                <TableCell><Badge className="bg-emerald-500">Running</Badge></TableCell>
                                <TableCell className="text-right">120 jobs/min</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">high-priority</TableCell>
                                <TableCell>1 Process</TableCell>
                                <TableCell><Badge variant="secondary">Idle</Badge></TableCell>
                                <TableCell className="text-right">0 jobs/min</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Recent Failed Jobs */}
            <div className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
                <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
                    <h4 className="font-semibold text-sm text-red-600 dark:text-red-400">Failed Jobs (Last 24h)</h4>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Job Reference</TableHead>
                            <TableHead>Connection</TableHead>
                            <TableHead>Exception</TableHead>
                            <TableHead>Failed At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium text-xs">
                                App\Jobs\ProcessSubscriptionPayment <br />
                                <span className="text-zinc-500">ID: e54a-22b1-998c</span>
                            </TableCell>
                            <TableCell>redis</TableCell>
                            <TableCell className="text-red-500 text-xs">TimeoutException: Connection timed out after 3000ms...</TableCell>
                            <TableCell className="text-xs text-zinc-500">10 mins ago</TableCell>
                            <TableCell className="text-right">
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                    <Play className="h-4 w-4 text-green-600" />
                                </Button>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                    <Trash2 className="h-4 w-4 text-red-600" />
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium text-xs">
                                App\Jobs\SendWelcomeEmail <br />
                                <span className="text-zinc-500">ID: a12b-33c4-55d6</span>
                            </TableCell>
                            <TableCell>redis</TableCell>
                            <TableCell className="text-red-500 text-xs">SMTP Error: 535 Authentication Failed</TableCell>
                            <TableCell className="text-xs text-zinc-500">1 hour ago</TableCell>
                            <TableCell className="text-right">
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                    <Play className="h-4 w-4 text-green-600" />
                                </Button>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                    <Trash2 className="h-4 w-4 text-red-600" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
