import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle2, FileText, Calendar, ArrowRight } from "lucide-react";

export default function Admissions() {
    return (
        <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 font-sans">
            <Navbar />
            <main>
                {/* Header */}
                <section className="bg-green-50 dark:bg-green-900/20 py-20 px-4">
                    <div className="container mx-auto text-center">
                        <h1 className="text-4xl font-bold tracking-tight mb-4">Admission Information</h1>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                            Join Ariba School and experience world-class education. We are currently accepting applications for the 2026 Academic Session.
                        </p>
                    </div>
                </section>

                {/* Process */}
                <section className="py-16 container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">How to Apply</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6 border rounded-xl hover:border-green-500 transition-colors">
                            <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 mb-4">
                                <FileText className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">1. Online Application</h3>
                            <p className="text-zinc-500">Fill out the online admission form with student details, photos, and previous academic records.</p>
                        </div>
                        <div className="p-6 border rounded-xl hover:border-green-500 transition-colors">
                            <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 mb-4">
                                <Calendar className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">2. Admission Test</h3>
                            <p className="text-zinc-500">Appear for the admission test on the scheduled date. Syllabus is available for download.</p>
                        </div>
                        <div className="p-6 border rounded-xl hover:border-green-500 transition-colors">
                            <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 mb-4">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">3. Confirmation</h3>
                            <p className="text-zinc-500">Check results online. Successful candidates can pay admission fees to confirm their seat.</p>
                        </div>
                    </div>
                </section>

                {/* Requirements */}
                <section className="py-16 bg-zinc-50 dark:bg-zinc-900/50 px-4">
                    <div className="container mx-auto max-w-4xl">
                        <h2 className="text-3xl font-bold mb-8">Requirements</h2>
                        <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-sm">
                            <ul className="space-y-4">
                                <li className="flex gap-3 text-zinc-700 dark:text-zinc-300">
                                    <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0" />
                                    <span>Birth Certificate / NID of Student</span>
                                </li>
                                <li className="flex gap-3 text-zinc-700 dark:text-zinc-300">
                                    <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0" />
                                    <span>Passport size photographs (Student & Guardians)</span>
                                </li>
                                <li className="flex gap-3 text-zinc-700 dark:text-zinc-300">
                                    <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0" />
                                    <span>Transfer Certificate (if applicable)</span>
                                </li>
                                <li className="flex gap-3 text-zinc-700 dark:text-zinc-300">
                                    <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0" />
                                    <span>Previous Class Report Card</span>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-8 text-center">
                            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-colors inline-flex items-center">
                                Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                            </button>
                            <p className="mt-4 text-sm text-zinc-500">Applications closing soon for Spring 2026</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
