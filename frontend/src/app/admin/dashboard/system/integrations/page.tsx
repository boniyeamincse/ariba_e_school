"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { CreditCard, MessageSquare, Cloud, Mail, Settings2, ExternalLink } from "lucide-react";

const integrations = [
    {
        category: "Payment Gateways",
        icon: CreditCard,
        items: [
            {
                id: "bkash",
                name: "bKash",
                description: "Accept payments via bKash mobile wallet.",
                status: "active",
                connected: true,
                logo: "🇧🇩"
            },
            {
                id: "sslcommerz",
                name: "SSLCommerz",
                description: "Largest payment gateway in Bangladesh.",
                status: "active",
                connected: true,
                logo: "🔒"
            },
            {
                id: "stripe",
                name: "Stripe",
                description: "International credit card processing.",
                status: "inactive",
                connected: false,
                logo: "S"
            }
        ]
    },
    {
        category: "SMS Services",
        icon: MessageSquare,
        items: [
            {
                id: "twilio",
                name: "Twilio",
                description: "Global SMS and communication API.",
                status: "active",
                connected: true,
                logo: "T"
            },
            {
                id: "alpha_sms",
                name: "Alpha SMS (BD)",
                description: "Local non-masking SMS provider.",
                status: "inactive",
                connected: false,
                logo: "A"
            }
        ]
    },
    {
        category: "Cloud Storage",
        icon: Cloud,
        items: [
            {
                id: "aws_s3",
                name: "Amazon S3",
                description: "Scalable object storage for documents.",
                status: "active",
                connected: true,
                logo: "AWS"
            },
            {
                id: "google_drive",
                name: "Google Drive",
                description: "Store backups to Google Drive.",
                status: "beta",
                connected: false,
                logo: "G"
            }
        ]
    },
    {
        category: "Email",
        icon: Mail,
        items: [
            {
                id: "smtp",
                name: "SMTP Server",
                description: "Custom SMTP configuration.",
                status: "active",
                connected: true,
                logo: "@"
            },
            {
                id: "mailgun",
                name: "Mailgun",
                description: "Transactional email API.",
                status: "inactive",
                connected: false,
                logo: "M"
            }
        ]
    }
];

export default function IntegrationsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-white">Integrations</h3>
                <p className="text-sm text-zinc-500">
                    Connect third-party tools and services to expand functionality.
                </p>
            </div>

            <div className="space-y-10">
                {integrations.map((category) => (
                    <div key={category.category}>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                                <category.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <h4 className="text-md font-semibold text-zinc-900 dark:text-white">{category.category}</h4>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {category.items.map((item) => (
                                <Card key={item.id} className="flex flex-col border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                                    <CardHeader className="pb-4">
                                        <div className="flex justify-between items-start">
                                            <div className="h-10 w-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-lg font-bold">
                                                {item.logo}
                                            </div>
                                            <Switch defaultChecked={item.connected} />
                                        </div>
                                        <CardTitle className="mt-4 text-base">{item.name}</CardTitle>
                                        <CardDescription className="line-clamp-2 min-h-[40px]">
                                            {item.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardFooter className="mt-auto pt-0 flex justify-between items-center">
                                        <Badge variant={item.connected ? "default" : "secondary"}>
                                            {item.connected ? "Connected" : "Not connected"}
                                        </Badge>
                                        <Button variant="outline" size="sm" className="h-8">
                                            <Settings2 className="h-3.5 w-3.5 mr-2" />
                                            Configure
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
