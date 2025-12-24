"use client";

import Link from "next/link";
import { ShieldCheck, AlertCircle, Loader2, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SuperAdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Login failed");
            }

            // Check if user has admin role
            const roles = data.user.roles || [];
            const roleNames = roles.map((r: any) => r.name || r);
            const isAdmin = roleNames.some((r: string) =>
                r.startsWith('SAAS_') || r === 'Super Admin'
            );

            if (!isAdmin) {
                throw new Error("Access denied. Admin credentials required.");
            }

            localStorage.setItem("token", data.token || data.access_token);
            localStorage.setItem("user", JSON.stringify(data.user));

            toast.success("Welcome, Admin!");
            router.push("/admin/dashboard");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-950 to-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            {/* Security Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />

            <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-800 border border-zinc-700 shadow-2xl">
                        <ShieldCheck className="h-9 w-9 text-green-400" />
                    </div>
                </div>

                <h2 className="text-center text-2xl font-bold text-white mb-1">
                    Platform Admin Console
                </h2>
                <p className="text-center text-sm text-zinc-500 mb-8">
                    Authorized personnel only
                </p>
            </div>

            <div className="relative sm:mx-auto sm:w-full sm:max-w-md px-4">
                <div className="bg-zinc-900/90 backdrop-blur-xl py-8 px-6 sm:px-10 shadow-2xl rounded-2xl border border-zinc-800">
                    <form className="space-y-5" onSubmit={handleLogin}>
                        {error && (
                            <div className="rounded-xl bg-red-500/10 p-4 border border-red-500/20">
                                <div className="flex items-center gap-3">
                                    <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                                    <p className="text-sm text-red-400">{error}</p>
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                Admin Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-600" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-xl border-0 py-3 pl-11 pr-4 text-white bg-zinc-800/50 shadow-sm ring-1 ring-inset ring-zinc-700 placeholder:text-zinc-600 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm"
                                    placeholder="super@app.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-600" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-xl border-0 py-3 pl-11 pr-4 text-white bg-zinc-800/50 shadow-sm ring-1 ring-inset ring-zinc-700 placeholder:text-zinc-600 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center text-zinc-400">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-green-600 focus:ring-green-600"
                                />
                                <span className="ml-2">Remember device</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full justify-center items-center rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/20 hover:from-green-500 hover:to-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                "Access Dashboard"
                            )}
                        </button>
                    </form>
                </div>

                {/* Security Notice */}
                <p className="text-center mt-6 text-xs text-zinc-600">
                    🔒 All login attempts are logged and monitored.
                </p>

                {/* Back to User Login */}
                <div className="mt-4 text-center">
                    <Link href="/login" className="text-sm text-zinc-500 hover:text-zinc-300">
                        ← Back to User Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
