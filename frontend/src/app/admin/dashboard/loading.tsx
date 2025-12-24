import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-8">
            {/* KPI Cards Skeletons */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-32 w-full rounded-xl bg-zinc-800" />
                ))}
            </div>

            {/* Large Charts Skeletons */}
            <div className="grid gap-6 md:grid-cols-7">
                <Skeleton className="col-span-4 h-[350px] rounded-xl bg-zinc-800" />
                <Skeleton className="col-span-3 h-[350px] rounded-xl bg-zinc-800" />
            </div>

            {/* Secondary Charts Skeletons */}
            <div className="grid gap-6 md:grid-cols-7">
                <Skeleton className="col-span-3 h-[300px] rounded-xl bg-zinc-800" />
                <Skeleton className="col-span-2 h-[300px] rounded-xl bg-zinc-800" />
                <Skeleton className="col-span-2 h-[300px] rounded-xl bg-zinc-800" />
            </div>

            {/* Tables Skeletons */}
            <div className="grid gap-6 md:grid-cols-4">
                <Skeleton className="col-span-2 h-[400px] rounded-xl bg-zinc-800" />
                <Skeleton className="col-span-1 h-[400px] rounded-xl bg-zinc-800" />
                <Skeleton className="col-span-1 h-[400px] rounded-xl bg-zinc-800" />
            </div>
        </div>
    );
}
