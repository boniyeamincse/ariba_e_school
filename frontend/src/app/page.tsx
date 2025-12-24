import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, BookOpen, Calculator, Users, ShieldCheck, Zap, Globe, CheckCircle2, Star, Quote } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 font-sans selection:bg-green-100 selection:text-green-900">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative px-4 pt-20 pb-32 sm:px-6 lg:px-8 lg:pt-32 lg:pb-40 overflow-hidden">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#dcfce7_100%)] dark:bg-zinc-950 dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#14532d_100%)]"></div>

          <div className="container mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center rounded-full border border-green-200 bg-green-50 px-3 py-1 text-sm font-medium text-green-800 dark:border-green-900/50 dark:bg-green-900/20 dark:text-green-400">
              <span className="flex h-2 w-2 rounded-full bg-green-600 mr-2 animate-pulse"></span>
              Now Available in Bangladesh
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl mb-6 bg-gradient-to-br from-zinc-900 to-zinc-600 bg-clip-text text-transparent dark:from-white dark:to-zinc-400">
              The Smartest Way to Manage Your School
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed">
              Complete School Management System tailored for Bangladeshi institutions.
              Automate admissions, fees, results, and attendance with one powerful platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/get-started" className="h-12 w-full sm:w-auto px-8 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center justify-center transition-all shadow-lg hover:shadow-green-600/20">
                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <button className="h-12 w-full sm:w-auto px-8 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-900 font-medium dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 transition-all">
                Book a Demo
              </button>
            </div>

            {/* Trust Stats */}
            <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-zinc-900 dark:text-white">500+</span>
                <span className="text-sm text-zinc-500">Schools</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-zinc-900 dark:text-white">1M+</span>
                <span className="text-sm text-zinc-500">Students</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-zinc-900 dark:text-white">99.9%</span>
                <span className="text-sm text-zinc-500">Uptime</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-zinc-900 dark:text-white">24/7</span>
                <span className="text-sm text-zinc-500">Support</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 bg-white dark:bg-zinc-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">Everything you need to run your school</h2>
              <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                From Digital Attendance to Result Processing, we cover the full academic lifecycle.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
              {[
                { icon: BookOpen, title: "Academic Management", desc: "Manage classes, sections, subjects and NCTB curriculum with ease. Generate routine automatically." },
                { icon: Calculator, title: "Fee Automation", desc: "Tuition, exam fees, and fine calculation. Integration with bKash, Nagad for online payments." },
                { icon: Users, title: "Student & Guardian", desc: "Comprehensive student profiles, ID card generation, and SMS alerts to parents for absence." },
                { icon: Zap, title: "Result Processing", desc: "Automated GPA/CGPA calculation. Generate merit lists and report cards in one click." },
                { icon: ShieldCheck, title: "Secure & Scalable", desc: "Role-based access control (RBAC) ensures data privacy. Daily backups and secure hosting." },
                { icon: Globe, title: "Bangla Support", desc: "Fully localized interface available in Bangla. Built for the Bangladesh education context." },
              ].map((feature, i) => (
                <div key={i} className="group relative rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:shadow-md hover:border-green-200 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-green-900">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">{feature.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">Simple, Transparent Pricing</h2>
              <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                Choose the plan that fits your institution size. No hidden fees.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Starter Plan */}
              <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Starter</h3>
                <div className="mt-4 flex items-baseline text-zinc-900 dark:text-white">
                  <span className="text-4xl font-bold tracking-tight">৳2,500</span>
                  <span className="ml-1 text-sm font-semibold text-zinc-500">/month</span>
                </div>
                <p className="mt-4 text-sm text-zinc-500">For small schools starting their digital journey.</p>
                <ul className="mt-8 space-y-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  <li className="flex gap-x-3"><CheckCircle2 className="h-5 w-5 text-green-600" /> Up to 200 Students</li>
                  <li className="flex gap-x-3"><CheckCircle2 className="h-5 w-5 text-green-600" /> Basic Reports</li>
                  <li className="flex gap-x-3"><CheckCircle2 className="h-5 w-5 text-green-600" /> ID Card Generator</li>
                  <li className="flex gap-x-3"><CheckCircle2 className="h-5 w-5 text-green-600" /> Email Support</li>
                </ul>
                <button className="mt-8 w-full rounded-full border-2 border-green-600 px-3 py-2 text-sm font-semibold text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                  Get Started
                </button>
              </div>

              {/* Growth Plan */}
              <div className="relative rounded-3xl border border-green-200 bg-white p-8 shadow-xl dark:border-green-800 dark:bg-zinc-950 scale-105 z-10">
                <div className="absolute top-0 right-0 -mt-2 -mr-2 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">Popular</div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Growth</h3>
                <div className="mt-4 flex items-baseline text-zinc-900 dark:text-white">
                  <span className="text-4xl font-bold tracking-tight">৳5,000</span>
                  <span className="ml-1 text-sm font-semibold text-zinc-500">/month</span>
                </div>
                <p className="mt-4 text-sm text-zinc-500">Perfect for growing schools needing automation.</p>
                <ul className="mt-8 space-y-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  <li className="flex gap-x-3"><CheckCircle2 className="h-5 w-5 text-green-600" /> Up to 500 Students</li>
                  <li className="flex gap-x-3"><CheckCircle2 className="h-5 w-5 text-green-600" /> SMS Integration</li>
                  <li className="flex gap-x-3"><CheckCircle2 className="h-5 w-5 text-green-600" /> Online Fees (bKash)</li>
                  <li className="flex gap-x-3"><CheckCircle2 className="h-5 w-5 text-green-600" /> Priority Support</li>
                </ul>
                <button className="mt-8 w-full rounded-full bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-500 shadow-lg shadow-green-600/30 transition-all">
                  Get Started
                </button>
              </div>

              {/* Enterprise Plan */}
              <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Enterprise</h3>
                <div className="mt-4 flex items-baseline text-zinc-900 dark:text-white">
                  <span className="text-4xl font-bold tracking-tight">Custom</span>
                </div>
                <p className="mt-4 text-sm text-zinc-500">For large institutions with multiple branches.</p>
                <ul className="mt-8 space-y-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  <li className="flex gap-x-3"><CheckCircle2 className="h-5 w-5 text-green-600" /> Unlimited Students</li>
                  <li className="flex gap-x-3"><CheckCircle2 className="h-5 w-5 text-green-600" /> Custom Domain</li>
                  <li className="flex gap-x-3"><CheckCircle2 className="h-5 w-5 text-green-600" /> Dedicated Account Manager</li>
                  <li className="flex gap-x-3"><CheckCircle2 className="h-5 w-5 text-green-600" /> 24/7 Phone Support</li>
                </ul>
                <button className="mt-8 w-full rounded-full border-2 border-zinc-200 px-3 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800 transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-white dark:bg-zinc-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">Trusted by Principals</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="rounded-2xl bg-zinc-50 p-8 dark:bg-zinc-900/50">
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-lg text-zinc-700 dark:text-zinc-300 italic mb-6">
                  "Ariba School transformed how we manage attendance and fees. Parents are happier getting SMS updates, and our workload dropped by 50%."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
                    <span className="font-bold text-zinc-500">MR</span>
                  </div>
                  <div>
                    <div className="font-semibold text-zinc-900 dark:text-white">Md. Rahman</div>
                    <div className="text-sm text-zinc-500">Principal, Uttara High School</div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-zinc-50 p-8 dark:bg-zinc-900/50">
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-lg text-zinc-700 dark:text-zinc-300 italic mb-6">
                  "The result processing feature is a lifesaver. We used to spend weeks manually tabulating marks, now it takes seconds."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
                    <span className="font-bold text-zinc-500">SK</span>
                  </div>
                  <div>
                    <div className="font-semibold text-zinc-900 dark:text-white">Sarah Khan</div>
                    <div className="text-sm text-zinc-500">Admin, Banani Model School</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-green-600 dark:bg-green-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
              Ready to digitize your institution?
            </h2>
            <p className="mx-auto max-w-xl text-lg text-green-100 mb-10">
              Join over 500+ schools in Bangladesh trusting Ariba School for their daily operations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-white text-green-700 hover:bg-green-50 font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:-translate-y-1">
                Get Started Now
              </button>
              <button className="bg-green-700 text-white border border-green-500 hover:bg-green-800 font-bold py-3 px-8 rounded-full transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
