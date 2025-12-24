import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { User, Lock, GraduationCap, ArrowRight } from "lucide-react";

export default function StudentPortal() {
    return (
        <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 font-sans">
            <Navbar />
            <main className="container mx-auto px-4 py-20 min-h-[70vh] flex items-center justify-center">
                <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-center">

                    <div>
                        <h1 className="text-4xl font-bold mb-6">Student Portal</h1>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
                            Access your academic world. View results, check attendance, pay fees, and download routine from one secure dashboard.
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex gap-4 items-start">
                                <div className="bg-green-100 p-2 rounded-lg text-green-600"><GraduationCap size={20} /></div>
                                <div>
                                    <h3 className="font-semibold">Academic Progress</h3>
                                    <p className="text-sm text-zinc-500">Track marks and class standing.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="bg-green-100 p-2 rounded-lg text-green-600"><User size={20} /></div>
                                <div>
                                    <h3 className="font-semibold">Profile Management</h3>
                                    <p className="text-sm text-zinc-500">Update personal info and ID card.</p>
                                </div>
                            </div>
                        </div>

                        <Link href="/login">
                            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-colors inline-flex items-center">
                                Login to Portal <ArrowRight className="ml-2 h-4 w-4" />
                            </button>
                        </Link>
                        <div className="mt-4 text-sm text-zinc-500">
                            Forgot password? <Link href="#" className="text-green-600 underline">Reset here</Link>
                        </div>
                    </div>

                    <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center">
                        <div className="w-20 h-20 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Lock className="h-10 w-10 text-zinc-400" />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">Secure Access</h2>
                        <p className="text-zinc-500 mb-6">
                            You need a valid Student ID and Password provided by your institution to access this area.
                        </p>
                        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg text-sm dark:bg-yellow-900/20 dark:text-yellow-200">
                            <strong>Note:</strong> If you are a new student, please complete your admission process to receive credentials.
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
