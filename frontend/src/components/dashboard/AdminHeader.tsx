"use client";

import { Bell, Search, Moon, Sun, Monitor, LogOut, Settings, User } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AdminHeader() {
    const { setTheme, theme } = useTheme();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/admin/login");
    };

    return (
        <header className="h-16 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-8 sticky top-0 z-50">
            {/* Left: Title / Breadcrumbs */}
            <div className="flex items-center gap-4">
                <h1 className="text-lg font-medium text-white">SaaS Operations Center</h1>
                <div className="hidden md:flex h-5 w-[1px] bg-zinc-800"></div>
                <div className="hidden md:flex items-center text-sm text-zinc-500">
                    <span className="cursor-default hover:text-zinc-300 transition-colors">Dashboard</span>
                    <span className="mx-2">/</span>
                    <span className="text-zinc-300">Overview</span>
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
                {/* Global Search */}
                <div className="relative hidden md:block">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                    <input
                        type="search"
                        placeholder="Search tenants, invoices..."
                        className="h-9 w-64 rounded-md border border-zinc-800 bg-zinc-900 pl-9 pr-4 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder:text-zinc-600"
                    />
                </div>

                {/* Notifications */}
                <button className="relative p-2 rounded-full hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-zinc-950"></span>
                </button>

                {/* Theme Toggle */}
                {mounted && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="p-2 rounded-full hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors">
                                {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800 text-white">
                            <DropdownMenuItem onClick={() => setTheme("light")} className="focus:bg-zinc-800 focus:text-white cursor-pointer">
                                <Sun className="mr-2 h-4 w-4" /> Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")} className="focus:bg-zinc-800 focus:text-white cursor-pointer">
                                <Moon className="mr-2 h-4 w-4" /> Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")} className="focus:bg-zinc-800 focus:text-white cursor-pointer">
                                <Monitor className="mr-2 h-4 w-4" /> System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}

                {/* User Profile */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-zinc-900 transition-colors">
                            <div className="h-8 w-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold border border-indigo-500/30">
                                SA
                            </div>
                            <div className="hidden md:block text-left mr-2">
                                <div className="text-sm font-medium text-white leading-none">Super Admin</div>
                                <div className="text-[10px] text-zinc-500 leading-none mt-1">super@app.com</div>
                            </div>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-zinc-800 text-white">
                        <DropdownMenuLabel className="text-zinc-400 font-normal">My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-zinc-800" />
                        <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer">
                            <User className="mr-2 h-4 w-4" /> Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" /> Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-zinc-800" />
                        <DropdownMenuItem onClick={handleLogout} className="text-red-400 focus:bg-red-900/20 focus:text-red-400 cursor-pointer">
                            <LogOut className="mr-2 h-4 w-4" /> Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
