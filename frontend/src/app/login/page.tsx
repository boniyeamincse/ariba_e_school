"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { School, Loader2, ArrowRight, Mail, Lock, Building2 } from "lucide-react";
import { toast } from "sonner";

type Step = "email" | "password";

export default function UnifiedLogin() {
    const router = useRouter();
    const [step, setStep] = useState<Step>("email");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        domain: "",
    });
    const [userType, setUserType] = useState<string | null>(null);
    const [showDomain, setShowDomain] = useState(false);

    // Check if email belongs to a known tenant
    const checkEmail = async () => {
        if (!formData.email) {
            toast.error("Please enter your email");
            return;
        }

        setLoading(true);
        try {
            // Try to detect tenant from email domain
            const emailDomain = formData.email.split('@')[1];

            // For now, check if it's a platform admin email
            const platformEmails = ['super@app.com', 'admin@app.com', 'support@app.com', 'finance@app.com'];

            if (platformEmails.includes(formData.email)) {
                // Redirect to admin login
                toast.info("Redirecting to Admin Login...");
                router.push("/admin/login");
                return;
            }

            // For tenant users, check if we need domain
            // In production, this would call an API to check the email
            if (emailDomain && !emailDomain.includes('app.com')) {
                // Likely a tenant user
                setShowDomain(true);
            }

            setStep("password");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (step === "email") {
            await checkEmail();
            return;
        }

        if (!formData.password) {
            toast.error("Please enter your password");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    domain: formData.domain || undefined,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token || data.access_token);
                localStorage.setItem("user", JSON.stringify(data.user));

                toast.success("Welcome back!");

                // Role-based redirect
                const roles = data.user.roles || [];
                const roleNames = roles.map((r: any) => r.name || r);

                if (roleNames.some((r: string) => r.startsWith('SAAS_') || r === 'Super Admin')) {
                    router.push("/admin/dashboard");
                } else {
                    router.push("/dashboard");
                }
            } else {
                toast.error(data.message || "Invalid credentials");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

            <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
                {/* Logo */}
                <Link href="/" className="flex justify-center items-center gap-3 mb-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30">
                        <School className="h-8 w-8 text-white" />
                    </div>
                    <span className="text-3xl font-bold tracking-tight text-white">
                        Ariba<span className="text-emerald-400">School</span>
                    </span>
                </Link>

                <h2 className="text-center text-2xl font-bold text-white mb-2">
                    Welcome back
                </h2>
                <p className="text-center text-sm text-slate-400 mb-8">
                    Sign in to manage your school
                </p>
            </div>

            <div className="relative sm:mx-auto sm:w-full sm:max-w-md px-4">
                <div className="bg-slate-900/80 backdrop-blur-xl py-8 px-6 sm:px-10 shadow-2xl rounded-2xl border border-slate-800">
                    <form onSubmit={handleLogin} className="space-y-5">

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Email address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    disabled={step === "password"}
                                    className="block w-full rounded-xl border-0 py-3 pl-11 pr-4 text-white bg-slate-800/50 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm disabled:opacity-60"
                                    placeholder="you@school.com"
                                />
                            </div>
                            {step === "password" && (
                                <button
                                    type="button"
                                    onClick={() => setStep("email")}
                                    className="mt-1 text-xs text-emerald-400 hover:text-emerald-300"
                                >
                                    Change email
                                </button>
                            )}
                        </div>

                        {/* School Domain (Optional) */}
                        {step === "password" && showDomain && (
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    School Domain
                                </label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                                    <input
                                        type="text"
                                        value={formData.domain}
                                        onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                                        className="block w-full rounded-xl border-0 py-3 pl-11 pr-24 text-white bg-slate-800/50 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm"
                                        placeholder="dhainternational"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <span className="text-slate-500 text-sm">.ariba.app</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Password Field */}
                        {step === "password" && (
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                                    <input
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="block w-full rounded-xl border-0 py-3 pl-11 pr-4 text-white bg-slate-800/50 shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm"
                                        placeholder="••••••••"
                                        autoFocus
                                    />
                                </div>
                                <div className="mt-2 flex justify-end">
                                    <a href="#" className="text-xs text-slate-400 hover:text-emerald-400">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full justify-center items-center rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : step === "email" ? (
                                <>
                                    Continue
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-800" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-slate-900 px-3 text-slate-500">
                                    New to AribaSchool?
                                </span>
                            </div>
                        </div>

                        <div className="mt-4">
                            <Link
                                href="/get-started"
                                className="flex w-full justify-center rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm font-medium text-slate-300 shadow-sm hover:bg-slate-800 hover:border-slate-600 transition-all"
                            >
                                Start your free trial
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer Links */}
                <div className="mt-6 flex justify-center gap-4 text-xs text-slate-500">
                    <Link href="/admin/login" className="hover:text-slate-300">
                        Platform Admin
                    </Link>
                    <span>•</span>
                    <a href="#" className="hover:text-slate-300">
                        Help Center
                    </a>
                    <span>•</span>
                    <a href="#" className="hover:text-slate-300">
                        Privacy
                    </a>
                </div>
            </div>
        </div>
    );
}
