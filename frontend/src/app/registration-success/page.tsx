"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { School, CheckCircle2, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function RegistrationSuccessPage() {
    const params = useSearchParams();
    const schoolId = params.get('school_id') || 'N/A';

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black flex items-center justify-center p-4">
            <Card className="max-w-lg w-full bg-slate-900/80 border-slate-800 backdrop-blur-xl">
                <CardContent className="pt-8 pb-8 text-center">
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                    </div>

                    <h1 className="text-2xl font-bold text-white mb-2">
                        Registration Submitted!
                    </h1>
                    <p className="text-slate-400 mb-6">
                        Your school registration has been received.
                    </p>

                    <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
                        <div className="text-sm text-slate-400 mb-1">Your School ID</div>
                        <div className="text-2xl font-mono font-bold text-emerald-400">
                            {schoolId}
                        </div>
                    </div>

                    <div className="space-y-4 text-left bg-slate-800/30 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 text-amber-400 mt-0.5" />
                            <div>
                                <div className="text-sm font-medium text-white">Pending Approval</div>
                                <div className="text-xs text-slate-400">Our team will review your application within 24-48 hours.</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Mail className="h-5 w-5 text-blue-400 mt-0.5" />
                            <div>
                                <div className="text-sm font-medium text-white">Email Notification</div>
                                <div className="text-xs text-slate-400">You'll receive an email once your school is approved.</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/" className="flex-1">
                            <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800">
                                Back to Home
                            </Button>
                        </Link>
                        <Link href="/login" className="flex-1">
                            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                                Go to Login
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
