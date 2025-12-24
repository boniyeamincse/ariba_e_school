import Link from "next/link";
import { School, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600">
                                <School className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                                Ariba<span className="text-green-600">School</span>
                            </span>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xs">
                            Empowering Bangladesh's education system with modern technology.
                            Streamline admissions, fees, and results with one platform.
                        </p>
                        <div className="mt-6 flex gap-4">
                            <a href="#" className="text-zinc-400 hover:text-green-600"><Facebook className="h-5 w-5" /></a>
                            <a href="#" className="text-zinc-400 hover:text-green-600"><Twitter className="h-5 w-5" /></a>
                            <a href="#" className="text-zinc-400 hover:text-green-600"><Instagram className="h-5 w-5" /></a>
                            <a href="#" className="text-zinc-400 hover:text-green-600"><Linkedin className="h-5 w-5" /></a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4">Product</h3>
                        <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                            <li><Link href="/#features" className="hover:text-green-600">Features</Link></li>
                            <li><Link href="/#pricing" className="hover:text-green-600">Pricing</Link></li>
                            <li><Link href="/admissions" className="hover:text-green-600">Admissions</Link></li>
                            <li><Link href="/student-portal" className="hover:text-green-600">Student Portal</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4">Support</h3>
                        <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                            <li><Link href="#" className="hover:text-green-600">Help Center</Link></li>
                            <li><Link href="#" className="hover:text-green-600">API Docs</Link></li>
                            <li><Link href="#" className="hover:text-green-600">Contact Us</Link></li>
                            <li><Link href="#" className="hover:text-green-600">Status</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4">Legal</h3>
                        <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                            <li><Link href="/privacy-policy" className="hover:text-green-600">Privacy Policy</Link></li>
                            <li><Link href="/terms-of-service" className="hover:text-green-600">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-8 text-center text-sm text-zinc-500">
                    &copy; {new Date().getFullYear()} Ariba School Systems. All rights reserved.
                </div>
            </div>
        </footer >
    );
}
