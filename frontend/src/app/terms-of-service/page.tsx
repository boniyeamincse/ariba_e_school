import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 font-sans">
            <Navbar />
            <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 max-w-4xl">
                <h1 className="text-3xl font-bold tracking-tight mb-8">Terms of Service</h1>
                <p className="text-sm text-zinc-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

                <div className="prose dark:prose-invert max-w-none space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold mb-3">1. Agreement to Terms</h2>
                        <p>
                            These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Ariba School ("we," "us," or "our").
                            By accessing the Site, you agree that you have read, understood, and agreed to be bound by all of these Terms of Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">2. Intellectual Property Rights</h2>
                        <p>
                            Unless otherwise indicated, the Site and the SaaS platform is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") are owned or controlled by us or licensed to us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">3. User Representations</h2>
                        <p>By using the Site, you represent and warrant that:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>All registration information you submit will be true, accurate, current, and complete.</li>
                            <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
                            <li>You will not access the Site through automated or non-human means, whether through a bot, script or otherwise.</li>
                            <li>You will not use the Site for any illegal or unauthorized purpose.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">4. Subscription and Renewal</h2>
                        <p>
                            <strong>Fees:</strong> You agree to pay all fees associated with your Plan (Starter, Growth, or Enterprise).
                            <br />
                            <strong>Renewal:</strong> Unless you cancel before the end of the applicable subscription period, your subscription will automatically renew.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">5. Termination</h2>
                        <p>
                            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">6. Contact Us</h2>
                        <p>
                            To resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at: <a href="mailto:support@aribaschool.com" className="text-green-600 hover:underline">support@aribaschool.com</a>.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
