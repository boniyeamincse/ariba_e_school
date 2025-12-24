"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Smartphone, Building2, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function CheckoutPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const invoiceId = searchParams.get('invoice_id');

    const [selectedGateway, setSelectedGateway] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const gateways = [
        { id: 'stripe', name: 'Credit/Debit Card', icon: CreditCard, description: 'Pay with Visa, Mastercard, AMEX' },
        { id: 'bkash', name: 'bKash', icon: Smartphone, description: 'Mobile Financial Service', color: 'pink' },
        { id: 'bank', name: 'Bank Transfer', icon: Building2, description: 'Direct bank deposit', disabled: true },
    ];

    const handlePayment = async () => {
        if (!selectedGateway || !invoiceId) {
            toast.error("Please select a payment method");
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8000/api/payments/initiate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    invoice_id: parseInt(invoiceId),
                    gateway: selectedGateway,
                }),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || 'Payment initiation failed');
            }

            const data = await res.json();

            if (data.gateway === 'bkash' && data.payment_url) {
                // Redirect to bKash
                window.location.href = data.payment_url;
            } else if (data.gateway === 'stripe' && data.client_secret) {
                // For Stripe, in production you'd use Stripe Elements here
                // For now, show success simulation
                toast.success("Stripe payment flow initiated. In production, card form would appear here.");
                setPaymentSuccess(true);
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Payment failed");
        } finally {
            setLoading(false);
        }
    };

    if (paymentSuccess) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Card className="w-full max-w-md bg-slate-950 border-slate-800 text-center">
                    <CardContent className="pt-12 pb-8">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <CheckCircle className="h-10 w-10 text-emerald-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Payment Initiated!</h2>
                        <p className="text-slate-400 mb-6">
                            Your payment is being processed. You will receive a confirmation shortly.
                        </p>
                        <Button onClick={() => router.push('/admin/dashboard/billing/invoices')} className="bg-indigo-600 hover:bg-indigo-700">
                            Back to Invoices
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h3 className="text-2xl font-bold tracking-tight text-white">Checkout</h3>
                <p className="text-sm text-slate-400">
                    Select your preferred payment method to complete the transaction.
                </p>
            </div>

            <Card className="bg-slate-950 border-slate-800">
                <CardHeader>
                    <CardTitle className="text-white">Payment Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {gateways.map((gateway) => (
                        <div
                            key={gateway.id}
                            onClick={() => !gateway.disabled && setSelectedGateway(gateway.id)}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${gateway.disabled
                                    ? 'opacity-50 cursor-not-allowed border-slate-800'
                                    : selectedGateway === gateway.id
                                        ? 'border-indigo-500 bg-indigo-500/10'
                                        : 'border-slate-800 hover:border-slate-700'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-lg ${gateway.id === 'bkash' ? 'bg-pink-500/10 text-pink-500' :
                                        gateway.id === 'stripe' ? 'bg-indigo-500/10 text-indigo-400' :
                                            'bg-slate-800 text-slate-400'
                                    }`}>
                                    <gateway.icon className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-white">{gateway.name}</h4>
                                    <p className="text-sm text-slate-500">{gateway.description}</p>
                                </div>
                                {selectedGateway === gateway.id && (
                                    <CheckCircle className="h-5 w-5 text-indigo-400" />
                                )}
                                {gateway.disabled && (
                                    <span className="text-xs text-slate-500">Coming Soon</span>
                                )}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <div className="flex gap-4">
                <Button
                    variant="outline"
                    onClick={() => router.back()}
                    className="flex-1 border-slate-800 text-slate-400 hover:bg-slate-900"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handlePayment}
                    disabled={!selectedGateway || loading}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        'Proceed to Pay'
                    )}
                </Button>
            </div>
        </div>
    );
}
