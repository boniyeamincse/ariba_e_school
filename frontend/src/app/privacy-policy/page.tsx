import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 font-sans">
            <Navbar />
            <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 max-w-4xl">
                <h1 className="text-3xl font-bold tracking-tight mb-8">Privacy Policy</h1>
                <p className="text-sm text-zinc-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

                <div className="prose dark:prose-invert max-w-none space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
                        <p>
                            Welcome to Ariba School ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy.
                            This Privacy Policy explains how we collect, use, disclosure, and safeguard your information when you use our School Management System.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
                        <p>We collect information that allows us to provide the educational management services, including:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li><strong>Student Data:</strong> Names, dates of birth, photos, and academic records.</li>
                            <li><strong>Guardian Data:</strong> Names, contact numbers, and addresses.</li>
                            <li><strong>Staff Data:</strong> Employment details, educational qualifications, and payroll info.</li>
                            <li><strong>Financial Data:</strong> Fee payment records and transaction history.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
                        <p>We use the collected data for specific educational purposes:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>To manage academic sessions, classes, and exams.</li>
                            <li>To process fee collections and generate invoices.</li>
                            <li>To communicate attendance and notices via SMS/Email.</li>
                            <li>To generate government-mandated reports (e.g., for NCTB).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">4. Data Security</h2>
                        <p>
                            We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process.
                            However, please also remember that we cannot guarantee that the internet itself is 100% secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">5. Contact Us</h2>
                        <p>
                            If you have questions or comments about this policy, you may email us at <a href="mailto:privacy@aribaschool.com" className="text-green-600 hover:underline">privacy@aribaschool.com</a>.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
