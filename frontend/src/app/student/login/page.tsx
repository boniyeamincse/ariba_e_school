"use client";

import Link from "next/link";
import { GraduationCap, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function StudentLogin() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        domain: "",
        studentId: "",
        password: "",
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!formData.domain) {
            setError("Please enter your school domain");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    email: formData.studentId, // Can use student ID as email
                    password: formData.password,
                    domain: formData.domain,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Login failed");
            }

            localStorage.setItem("token", data.token || data.access_token);
            localStorage.setItem("user", JSON.stringify(data.user));

            toast.success("Welcome back, Student!");
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-950 to-zinc-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/" className="flex justify-center items-center gap-2 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-500/30">
                        <GraduationCap className="h-7 w-7 text-white" />
                    </div>
                </Link>
                <h2 className="text-center text-3xl font-bold tracking-tight text-white">
                    Student Portal
                </h2>
                <p className="mt-2 text-center text-sm text-blue-200/70">
                    Access your results, routine, and more
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white/10 backdrop-blur-lg py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-white/20">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        {error && (
                            <div className="rounded-lg bg-red-500/20 p-4 border border-red-500/30">
                                <div className="flex">
                                    <AlertCircle className="h-5 w-5 text-red-400" />
                                    <p className="ml-3 text-sm text-red-300">{error}</p>
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-blue-100">
                                School Domain
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    type="text"
                                    required
                                    value={formData.domain}
                                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                                    className="block w-full rounded-lg border-0 py-3 pl-4 pr-24 text-white bg-white/10 shadow-sm ring-1 ring-inset ring-white/20 placeholder:text-white/40 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm"
                                    placeholder="dhainternational"
                                />
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <span className="text-blue-300/70 sm:text-sm">.ariba.app</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-blue-100">
                                Student ID / Email
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.studentId}
                                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                                className="mt-1 block w-full rounded-lg border-0 py-3 pl-4 text-white bg-white/10 shadow-sm ring-1 ring-inset ring-white/20 placeholder:text-white/40 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm"
                                placeholder="2025-0001 or student@email.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-blue-100">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="mt-1 block w-full rounded-lg border-0 py-3 pl-4 text-white bg-white/10 shadow-sm ring-1 ring-inset ring-white/20 placeholder:text-white/40 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full justify-center items-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 transition-all"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    <div className="mt-6 flex justify-center gap-4 text-sm">
                        <Link href="/school/login" className="text-blue-300 hover:text-white">
                            School Admin
                        </Link>
                        <span className="text-blue-500">•</span>
                        <Link href="/staff/login" className="text-blue-300 hover:text-white">
                            Staff
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
