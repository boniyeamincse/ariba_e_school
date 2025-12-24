"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU_CONFIG } from "@/lib/menu-config";
import { ShieldCheck, ChevronDown, ChevronRight, LayoutDashboard, Settings, Users, CreditCard, MessageSquare, Shield, Activity, GraduationCap } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
    const pathname = usePathname();
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
    const [user, setUser] = useState<any>(null);
    const [role, setRole] = useState<string>("SAAS_SUPER_ADMIN"); // Default to Super Admin for safety/fallback

    useEffect(() => {
        // Load user from local storage
        try {
            const userData = localStorage.getItem("user");
            if (userData) {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
                const userRole = parsedUser.roles?.[0]?.name || "SAAS_SUPER_ADMIN";
                setRole(userRole);
            }
        } catch (e) {
            console.error("Failed to load user data", e);
        }
    }, []);

    // Fallback to "SAAS_SUPER_ADMIN" menu if role not found, or handle "Super Admin" legacy case
    const menuItems = MENU_CONFIG[role] || MENU_CONFIG["SAAS_SUPER_ADMIN"] || MENU_CONFIG["Super Admin"];

    const toggleMenu = (title: string) => {
        setOpenMenus(prev => ({ ...prev, [title]: !prev[title] }));
    };

    return (
        <aside className="w-64 bg-slate-950 border-r border-slate-900 text-slate-400 flex flex-col h-full shrink-0">
            {/* Branding */}
            <div className="flex h-16 items-center px-6 border-b border-slate-900 bg-slate-950/50">
                <Link href="/admin/dashboard" className="flex items-center gap-2">
                    <div className="bg-indigo-600 p-1.5 rounded-lg shadow-lg shadow-indigo-500/30">
                        <ShieldCheck className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-lg text-white tracking-tight">
                        Ariba<span className="text-indigo-400">SaaS</span>
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-1">
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Platform
                </div>
                {menuItems?.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    const hasSubmenu = item.submenu && item.submenu.length > 0;
                    const isOpen = openMenus[item.title];

                    return (
                        <div key={item.title}>
                            {hasSubmenu ? (
                                <button
                                    onClick={() => toggleMenu(item.title)}
                                    className={cn(
                                        "w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200",
                                        isOpen
                                            ? "text-white bg-slate-900"
                                            : "text-slate-400 hover:bg-slate-900 hover:text-white"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        {Icon && <Icon className={cn("h-5 w-5 shrink-0", isOpen ? "text-indigo-400" : "text-slate-500")} />}
                                        {item.title}
                                    </div>
                                    {isOpen ? (
                                        <ChevronDown className="h-4 w-4 text-slate-500" />
                                    ) : (
                                        <ChevronRight className="h-4 w-4 text-slate-600" />
                                    )}
                                </button>
                            ) : (
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group",
                                        isActive
                                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20"
                                            : "text-slate-400 hover:bg-slate-900 hover:text-white"
                                    )}
                                >
                                    {Icon && <Icon className={cn("h-5 w-5 shrink-0 transition-colors", isActive ? "text-indigo-200" : "text-slate-500 group-hover:text-white")} />}
                                    {item.title}
                                </Link>
                            )}

                            {/* Submenu */}
                            {hasSubmenu && isOpen && (
                                <div className="mt-1 space-y-0.5">
                                    {item.submenu?.map((sub) => {
                                        const isSubActive = pathname === sub.href;
                                        return (
                                            <Link
                                                key={sub.href}
                                                href={sub.href}
                                                className={cn(
                                                    "block pl-11 pr-3 py-2 text-sm rounded-md transition-colors",
                                                    isSubActive
                                                        ? "text-indigo-400 font-medium bg-slate-900/50"
                                                        : "text-slate-500 hover:text-slate-300 hover:bg-slate-900/30"
                                                )}
                                            >
                                                {sub.title}
                                            </Link>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    )
                })}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-slate-900 bg-slate-950/50">
                <div className="group flex items-center gap-3 p-2 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-900/20 ring-2 ring-slate-900 group-hover:ring-indigo-500/50 transition-all">
                        {user ? user.name.charAt(0).toUpperCase() : "SA"}
                    </div>
                    <div className="overflow-hidden">
                        <div className="text-sm font-medium text-white truncate group-hover:text-indigo-400 transition-colors">
                            {user ? user.name : "Loading..."}
                        </div>
                        <div className="text-xs text-slate-500 truncate">
                            {user ? user.email : "..."}
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
