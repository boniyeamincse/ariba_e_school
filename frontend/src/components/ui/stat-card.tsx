import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
    title: string;
    value: string;
    description?: string;
    trend?: "up" | "down" | "neutral";
    trendValue?: string;
    icon?: React.ElementType;
    color?: "default" | "blue" | "green" | "emerald" | "amber" | "purple" | "indigo" | "cyan";
}

export function StatCard({ title, value, description, trend, trendValue, icon: Icon, color = "default" }: StatCardProps) {
    const colorStyles = {
        default: "text-zinc-500",
        blue: "text-blue-500 bg-blue-500/10",
        green: "text-green-500 bg-green-500/10",
        emerald: "text-emerald-500 bg-emerald-500/10",
        amber: "text-amber-500 bg-amber-500/10",
        purple: "text-purple-500 bg-purple-500/10",
        indigo: "text-indigo-500 bg-indigo-500/10",
        cyan: "text-cyan-500 bg-cyan-500/10"
    };

    return (
        <Card className="overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {title}
                </CardTitle>
                {Icon && (
                    <div className={cn("p-2 rounded-full", colorStyles[color])}>
                        <Icon className="h-4 w-4" />
                    </div>
                )}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-zinc-900 dark:text-white">{value}</div>
                {(description || trend) && (
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-2">
                        {trend && (
                            <span className={cn(
                                "flex items-center font-medium",
                                trend === "up" ? "text-emerald-600 dark:text-emerald-400" :
                                    trend === "down" ? "text-red-600 dark:text-red-400" : "text-zinc-500"
                            )}>
                                {trend === "up" && <ArrowUpRight className="h-3 w-3 mr-1" />}
                                {trend === "down" && <ArrowDownRight className="h-3 w-3 mr-1" />}
                                {trend === "neutral" && <Minus className="h-3 w-3 mr-1" />}
                                {trendValue}
                            </span>
                        )}
                        <span>{description}</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
