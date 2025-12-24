import { SuperAdminView } from "@/components/dashboard/super-admin/SuperAdminView";
import { TenantAdminView } from "@/components/dashboard/tenant-admin/TenantAdminView";

export default function DashboardPage() {
    // TODO: Implement Real Role Check via Auth Context / API Me Endpoint
    // For demo, we can manually flip this string to see different views.
    const userRole = "School Owner"; // "Super Admin" | "School Owner"

    return (
        <div className="w-full max-w-7xl mx-auto">
            {userRole === "Super Admin" ? (
                <SuperAdminView />
            ) : userRole === "School Owner" ? (
                <TenantAdminView />
            ) : (
                <div className="p-8 text-center">
                    <h2 className="text-xl">Dashboard View Not Implemented for role: {userRole}</h2>
                </div>
            )}
        </div>
    );
}
