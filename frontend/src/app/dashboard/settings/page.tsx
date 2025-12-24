"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Settings, Globe, School, CreditCard, Mail, Info, Monitor } from "lucide-react";
import Link from "next/link";

const settingsModules = [
    { title: "System Settings", href: "/dashboard/settings/system", icon: Monitor, desc: "General app configuration" },
    { title: "Website Settings", href: "/dashboard/settings/website", icon: Globe, desc: "Logos, colors, and SEO" },
    { title: "School Profile", href: "/dashboard/settings/school", icon: School, desc: "Address, contact, and EIIN" },
    { title: "Payment Config", href: "/dashboard/settings/payment", icon: CreditCard, desc: "bKash & Stripe setup" },
    { title: "SMTP Server", href: "/dashboard/settings/smtp", icon: Mail, desc: "Email delivery settings" },
    { title: "About System", href: "/dashboard/settings/about", icon: Info, desc: "Version & license info" },
];

export default function SettingsIndexPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Settings</h2>
                <p className="text-zinc-500">Manage your school's configuration and preferences.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {settingsModules.map((module) => (
                    <Link key={module.href} href={module.href}>
                        <Card className="h-full hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer border-zinc-200 dark:border-zinc-800">
                            <CardHeader>
                                <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center mb-2">
                                    <module.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <CardTitle className="text-lg">{module.title}</CardTitle>
                                <CardDescription>{module.desc}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
