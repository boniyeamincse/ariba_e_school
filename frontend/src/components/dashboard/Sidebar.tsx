"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU_CONFIG } from "@/lib/menu-config";
import { School } from "lucide-react";

export function Sidebar() {
    const pathname = usePathname();

    // TODO: Get this from Auth Context
    const userRole = "School Owner";

    // Fallback if role doesn't exist
    const menuItems = MENU_CONFIG[userRole] || MENU_CONFIG["Student"];

    return (
        <aside className="hidden lg:flex flex-col w-64 border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            {/* Branding */}
            <div className="flex h-16 items-center px-6 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                    <div className="bg-green-600 p-1.5 rounded-lg">
                        <School className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-lg text-zinc-900 dark:text-white">
                        Ariba<span className="text-green-600">School</span>
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-1">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${isActive
                                    ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                    : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-200"
                                }`}
                        >
                            {Icon && <Icon className="h-5 w-5 shrink-0" />}
                            {item.title}
                        </Link>
                    )
                })}
            </nav>

            {/* User Info / Tenant Info */}
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
                <div className="bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
                    <div className="text-xs font-semibold text-zinc-500 uppercase mb-1">Current Tenant</div>
                    <div className="font-medium text-sm text-zinc-900 dark:text-white truncate">Dhaka Ideal School</div>
                </div>
            </div>
        </aside>
    );
}
