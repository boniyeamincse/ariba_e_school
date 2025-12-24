"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU_CONFIG } from "@/lib/menu-config";
import { ShieldCheck, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
    const pathname = usePathname();
    const menuItems = MENU_CONFIG["Super Admin"];
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

    const toggleMenu = (title: string) => {
        setOpenMenus(prev => ({ ...prev, [title]: !prev[title] }));
    };

    return (
        <aside className="w-64 bg-zinc-950 border-r border-zinc-900 text-zinc-400 flex flex-col h-full shrink-0">
            {/* Branding */}
            <div className="flex h-16 items-center px-6 border-b border-zinc-900">
                <Link href="/admin/dashboard" className="flex items-center gap-2">
                    <div className="bg-indigo-600 p-1.5 rounded-lg">
                        <ShieldCheck className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-lg text-white">
                        Ariba<span className="text-indigo-500">SaaS</span>
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-1">
                {menuItems.map((item) => {
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
                                        "w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors hover:bg-zinc-900 hover:text-white",
                                        isOpen ? "text-white" : "text-zinc-400"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        {Icon && <Icon className="h-5 w-5 shrink-0" />}
                                        {item.title}
                                    </div>
                                    {isOpen ? (
                                        <ChevronDown className="h-4 w-4" />
                                    ) : (
                                        <ChevronRight className="h-4 w-4" />
                                    )}
                                </button>
                            ) : (
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                                        isActive
                                            ? "bg-indigo-600/10 text-indigo-400"
                                            : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                                    )}
                                >
                                    {Icon && <Icon className="h-5 w-5 shrink-0" />}
                                    {item.title}
                                </Link>
                            )}

                            {/* Submenu */}
                            {hasSubmenu && isOpen && (
                                <div className="mt-1 ml-4 space-y-1 border-l border-zinc-800 pl-3">
                                    {item.submenu?.map((sub) => (
                                        <Link
                                            key={sub.href}
                                            href={sub.href}
                                            className={cn(
                                                "block px-3 py-2 text-sm rounded-md transition-colors",
                                                pathname === sub.href
                                                    ? "text-indigo-400 bg-zinc-900"
                                                    : "text-zinc-500 hover:text-zinc-300"
                                            )}
                                        >
                                            {sub.title}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-zinc-900">
                <div className="bg-zinc-900 p-3 rounded-lg flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                        SA
                    </div>
                    <div className="overflow-hidden">
                        <div className="text-sm font-medium text-white truncate">Super Admin</div>
                        <div className="text-xs text-zinc-500 truncate">super@app.com</div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
