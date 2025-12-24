import { SuperAdminView } from "@/components/dashboard/super-admin/SuperAdminView";

export default function AdminDashboardPage() {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
                <p className="text-zinc-400">Welcome back, Super Admin. Here is what's happening today.</p>
            </div>
            <SuperAdminView />
        </div>
    );
}
