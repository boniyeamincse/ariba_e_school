import Link from "next/link";
import { School, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function GetStarted() {
    return (
        <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 font-sans">
            <Navbar />
            <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">

                    {/* Value Prop */}
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-6">
                            Start your 14-day free trial
                        </h1>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
                            Join 500+ schools that trust Ariba School to run their operations.
                        </p>
                        <ul className="space-y-4 mb-8">
                            {[
                                "Unlimited Students during trial",
                                "Access to all features",
                                "No credit card required",
                                "Free onboarding support",
                                "Cancel anytime"
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 text-zinc-700 dark:text-zinc-300">
                                    <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                            <p className="italic text-zinc-600 dark:text-zinc-400 mb-4">
                                "The best decision we made for our school. Setup was instant and parents love the mobile app."
                            </p>
                            <div className="font-semibold">Principal, Dhak Ideal Application</div>
                        </div>
                    </div>

                    {/* Registration Form */}
                    <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800">
                        <h2 className="text-2xl font-semibold mb-6">Create your school account</h2>
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">First Name</label>
                                    <input type="text" className="w-full rounded-md border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 p-2 border" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Last Name</label>
                                    <input type="text" className="w-full rounded-md border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 p-2 border" placeholder="Doe" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">School Name</label>
                                <input type="text" className="w-full rounded-md border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 p-2 border" placeholder="Ideal School" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Mobile Number</label>
                                <input type="text" className="w-full rounded-md border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 p-2 border" placeholder="017..." />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input type="email" className="w-full rounded-md border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 p-2 border" placeholder="admin@school.com" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Password</label>
                                <input type="password" className="w-full rounded-md border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 p-2 border" />
                            </div>

                            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg mt-4 transition-colors">
                                Create Account
                            </button>
                            <p className="text-xs text-center text-zinc-500 mt-4">
                                By registering, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </form>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
