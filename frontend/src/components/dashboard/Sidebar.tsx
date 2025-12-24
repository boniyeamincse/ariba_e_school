"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU_CONFIG } from "@/lib/menu-config";
import { School } from "lucide-react";

export function Sidebar() {
    const pathname = usePathname();
    const [user, setUser] = useState<any>(null);
    const [tenantName, setTenantName] = useState("Loading...");

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsed = JSON.parse(userData);
            setUser(parsed);
            // Get tenant name from user data or fetch from API
            if (parsed.tenant?.name) {
                setTenantName(parsed.tenant.name);
            } else if (parsed.tenant_id) {
                fetchTenantName(parsed.tenant_id);
            }
        }
    }, []);

    const fetchTenantName = async (tenantId: number) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:8000/api/tenants?id=${tenantId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                const tenant = data.data?.find((t: any) => t.id === tenantId) || data.find?.((t: any) => t.id === tenantId);
                if (tenant?.name) {
                    setTenantName(tenant.name);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Get role-based menu
    const userRole = user?.roles?.[0]?.name || "School Owner";
    const menuItems = MENU_CONFIG[userRole] || MENU_CONFIG["School Owner"] || MENU_CONFIG["Student"];

    return (
        <aside className="hidden lg:flex flex-col w-64 border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            {/* Branding - Shows Tenant Name */}
            <div className="flex h-16 items-center px-6 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                    <div className="bg-green-600 p-1.5 rounded-lg">
                        <School className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-lg text-zinc-900 dark:text-white truncate max-w-[180px]">
                        {tenantName}
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

            {/* User Info */}
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
                <div className="bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
                    <div className="text-xs font-semibold text-zinc-500 uppercase mb-1">Logged in as</div>
                    <div className="font-medium text-sm text-zinc-900 dark:text-white truncate">
                        {user?.name || 'User'}
                    </div>
                    <div className="text-xs text-zinc-500 truncate">
                        {user?.email}
                    </div>
                </div>
            </div>
        </aside>
    );
}

