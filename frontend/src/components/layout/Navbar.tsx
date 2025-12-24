import Link from "next/link";
import { School, Menu, X } from "lucide-react";

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600">
                        <School className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        Ariba<span className="text-green-600">School</span>
                    </span>
                </div>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    <Link href="#features" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Features</Link>
                    <Link href="#pricing" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Pricing</Link>
                    <Link href="#about" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">About</Link>
                    <Link href="#contact" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Contact</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Link href="/login" className="hidden md:block text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                        Log in
                    </Link>
                    <Link href="/get-started" className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-all">
                        Get Started
                    </Link>
                </div>
            </div>
        </header>
    );
}
