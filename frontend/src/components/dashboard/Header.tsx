"use client";

import { Menu, Search, Bell, User } from "lucide-react";

export function Header() {
    return (
        <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-950 sm:px-6">

            {/* Left: Mobile Menu & Search (Placeholder) */}
            <div className="flex items-center gap-4">
                <button className="lg:hidden p-2 text-zinc-500 hover:bg-zinc-100 rounded-md dark:text-zinc-400 dark:hover:bg-zinc-800">
                    <Menu className="h-6 w-6" />
                </button>

                <div className="hidden md:flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-500 px-3 py-2 rounded-lg w-64">
                    <Search className="h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Search students, invoices..."
                        className="bg-transparent border-none text-sm focus:outline-none w-full dark:text-zinc-200"
                    />
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
                <button className="p-2 text-zinc-500 hover:bg-zinc-100 rounded-full dark:text-zinc-400 dark:hover:bg-zinc-800 relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-950"></span>
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-zinc-200 dark:border-zinc-800">
                    <div className="text-right hidden sm:block">
                        <div className="text-sm font-medium text-zinc-900 dark:text-white">User Name</div>
                        <div className="text-xs text-zinc-500">Principal</div>
                    </div>
                    <div className="h-8 w-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-700 dark:text-green-400 font-semibold">
                        <User className="h-4 w-4" />
                    </div>
                </div>
            </div>

        </header>
    );
}
