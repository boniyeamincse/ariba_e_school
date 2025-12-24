// Types
export interface KPI {
    label: string;
    value: string;
    change: string;
    trend: string;
}

export interface TenantData {
    id: number;
    name: string;
    plan: string;
    status: string;
    date: string;
}

export interface Activity {
    id: number;
    action: string;
    detail: string;
    time: string;
}

export interface DashboardData {
    kpi: KPI[];
    revenueTrend?: { name: string; value: number }[];
    recentTenants?: TenantData[];
    recentActivity?: Activity[];
}

export const MOCK_DASHBOARD_DATA: Record<string, DashboardData> = {
    // Super Admin Data
    superAdmin: {
        kpi: [
            { label: "Active Tenants", value: "542", change: "+12%", trend: "up" },
            { label: "New Tenants (30d)", value: "48", change: "+24%", trend: "up" },
            { label: "MRR", value: "৳ 8.5L", change: "+15%", trend: "up" },
            { label: "SMS Sent", value: "1.2M", change: "85% used", trend: "neutral" }
        ],
        revenueTrend: [
            { name: 'Jan', value: 4000 },
            { name: 'Feb', value: 3000 },
            { name: 'Mar', value: 2000 },
            { name: 'Apr', value: 2780 },
            { name: 'May', value: 1890 },
            { name: 'Jun', value: 2390 },
        ],
        recentTenants: [
            { id: 1, name: "Ideal School", plan: "Enterprise", status: "Active", date: "2025-10-01" },
            { id: 2, name: "City College", plan: "Pro", status: "Active", date: "2025-10-05" },
            { id: 3, name: "Sunshine KG", plan: "Basic", status: "Trial", date: "2025-10-10" },
            { id: 4, name: "Model High", plan: "Pro", status: "Suspended", date: "2025-09-12" },
        ]
    },
    // Tenant Admin Data
    tenantAdmin: {
        kpi: [
            { label: "Total Students", value: "1,250", change: "+5", trend: "up" },
            { label: "Attendance Today", value: "94%", change: "-2%", trend: "down" },
            { label: "Fees Due", value: "৳ 45K", change: "High", trend: "down" },
            { label: "SMS Balance", value: "540", change: "Low", trend: "down" }
        ],
        recentActivity: [
            { id: 1, action: "Fees Collected", detail: "Student #502 paid ৳1500", time: "10 mins ago" },
            { id: 2, action: "Attendance", detail: "Class 8 Section A complete", time: "15 mins ago" },
            { id: 3, action: "New Admission", detail: "Applicant #993 approved", time: "1 hour ago" },
        ]
    }
};

export async function getDashboardStats(role: string): Promise<DashboardData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (role === "Super Admin") return MOCK_DASHBOARD_DATA.superAdmin;
    return MOCK_DASHBOARD_DATA.tenantAdmin;
}
