import {
    LayoutDashboard,
    School,
    Users,
    GraduationCap,
    BookOpen,
    Calendar,
    CreditCard,
    Settings,
    Shield,
    FileText,
    MessageSquare,
    Truck,
    Library
} from "lucide-react";

export type MenuItem = {
    title: string;
    href: string;
    icon?: any;
    submenu?: MenuItem[];
};

export const MENU_CONFIG: Record<string, MenuItem[]> = {
    "Super Admin": [
        { title: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
        {
            title: "Tenants",
            href: "/admin/dashboard/tenants",
            icon: School,
            submenu: [
                { title: "All Schools", href: "/admin/dashboard/tenants" },
                { title: "Plans & Subscriptions", href: "/admin/dashboard/tenants/plans" },
                { title: "Tenant Usage", href: "/admin/dashboard/tenants/usage" }
            ]
        },
        {
            title: "Billing",
            href: "/admin/dashboard/billing",
            icon: CreditCard,
            submenu: [
                { title: "Transactions", href: "/admin/dashboard/billing/transactions" },
                { title: "Gateways", href: "/admin/dashboard/billing/gateways" },
                { title: "Webhook Logs", href: "/admin/dashboard/billing/webhooks" }
            ]
        },
        {
            title: "SMS",
            href: "/admin/dashboard/sms",
            icon: MessageSquare,
            submenu: [
                { title: "Providers", href: "/admin/dashboard/sms/providers" },
                { title: "Usage", href: "/admin/dashboard/sms/usage" },
                { title: "Delivery Reports", href: "/admin/dashboard/sms/logs" }
            ]
        },
        {
            title: "Users & Security",
            href: "/admin/dashboard/users",
            icon: Users,
            submenu: [
                { title: "SaaS Admins", href: "/admin/dashboard/users/admins" },
                { title: "Roles & Permissions", href: "/admin/dashboard/users/roles" },
                { title: "Sessions", href: "/admin/dashboard/users/sessions" }
            ]
        },
        {
            title: "System",
            href: "/admin/dashboard/system",
            icon: Settings,
            submenu: [
                { title: "Jobs & Queues", href: "/admin/dashboard/system/jobs" },
                { title: "Error Logs", href: "/admin/dashboard/system/logs" },
                { title: "Integrations", href: "/admin/dashboard/system/integrations" },
                { title: "Settings", href: "/admin/dashboard/system/settings" }
            ]
        },
    ],
    "SAAS_SUPER_ADMIN": [
        { title: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
        {
            title: "Tenants",
            href: "/admin/dashboard/tenants",
            icon: School,
            submenu: [
                { title: "All Schools", href: "/admin/dashboard/tenants" },
                { title: "Plans & Subscriptions", href: "/admin/dashboard/tenants/plans" },
                { title: "Tenant Usage", href: "/admin/dashboard/tenants/usage" }
            ]
        },
        {
            title: "Billing",
            href: "/admin/dashboard/billing",
            icon: CreditCard,
            submenu: [
                { title: "Transactions", href: "/admin/dashboard/billing/transactions" },
                { title: "Gateways", href: "/admin/dashboard/billing/gateways" },
                { title: "Webhook Logs", href: "/admin/dashboard/billing/webhooks" }
            ]
        },
        {
            title: "SMS",
            href: "/admin/dashboard/sms",
            icon: MessageSquare,
            submenu: [
                { title: "Providers", href: "/admin/dashboard/sms/providers" },
                { title: "Usage", href: "/admin/dashboard/sms/usage" },
                { title: "Delivery Reports", href: "/admin/dashboard/sms/logs" }
            ]
        },
        {
            title: "Users & Security",
            href: "/admin/dashboard/users",
            icon: Users,
            submenu: [
                { title: "SaaS Admins", href: "/admin/dashboard/users/admins" },
                { title: "Roles & Permissions", href: "/admin/dashboard/users/roles" },
                { title: "Sessions", href: "/admin/dashboard/users/sessions" }
            ]
        },
        {
            title: "System",
            href: "/admin/dashboard/system",
            icon: Settings,
            submenu: [
                { title: "Jobs & Queues", href: "/admin/dashboard/system/jobs" },
                { title: "Error Logs", href: "/admin/dashboard/system/logs" },
                { title: "Integrations", href: "/admin/dashboard/system/integrations" },
                { title: "Settings", href: "/admin/dashboard/system/settings" }
            ]
        },
    ],
    "SAAS_ADMIN": [
        { title: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
        {
            title: "Tenants",
            href: "/admin/dashboard/tenants",
            icon: School,
            submenu: [
                { title: "All Schools", href: "/admin/dashboard/tenants" },
                { title: "Plans & Subscriptions", href: "/admin/dashboard/tenants/plans" },
                { title: "Tenant Usage", href: "/admin/dashboard/tenants/usage" }
            ]
        },
        { title: "SMS", href: "/admin/dashboard/sms", icon: MessageSquare }, // Simplified
    ],
    "SAAS_SUPPORT": [
        { title: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
        {
            title: "Tenants",
            href: "/admin/dashboard/tenants",
            icon: School,
            submenu: [
                { title: "All Schools", href: "/admin/dashboard/tenants" }, // Read only effectively via backend permissions
            ]
        },
        { title: "Logs", href: "/admin/dashboard/system/logs", icon: FileText },
    ],
    "SAAS_FINANCE": [
        { title: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
        {
            title: "Billing",
            href: "/admin/dashboard/billing",
            icon: CreditCard,
            submenu: [
                { title: "Transactions", href: "/admin/dashboard/billing/transactions" },
                { title: "Gateways", href: "/admin/dashboard/billing/gateways" },
            ]
        },
    ],
    "School Owner": [
        { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { title: "Students", href: "/dashboard/students", icon: GraduationCap },
        { title: "Academics", href: "/dashboard/academics", icon: BookOpen },
        { title: "HR & Staff", href: "/dashboard/staff", icon: Users },
        { title: "Attendance", href: "/dashboard/attendance", icon: Calendar },
        { title: "Fees & Accounts", href: "/dashboard/fees", icon: CreditCard },
        { title: "Exams", href: "/dashboard/exams", icon: FileText },
        { title: "Transport", href: "/dashboard/transport", icon: Truck },
        { title: "Library", href: "/dashboard/library", icon: Library },
        { title: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
    "Teacher": [
        { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { title: "My Classes", href: "/dashboard/classes", icon: Users },
        { title: "Attendance", href: "/dashboard/taken-attendance", icon: Calendar },
        { title: "Marks Entry", href: "/dashboard/marks", icon: FileText },
        { title: "Routine", href: "/dashboard/routine", icon: Calendar },
    ],
    "Student": [
        { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { title: "My Results", href: "/dashboard/results", icon: FileText },
        { title: "Class Routine", href: "/dashboard/routine", icon: Calendar },
        { title: "Fee History", href: "/dashboard/fees", icon: CreditCard },
    ],
    "Guardian": [
        { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { title: "Children", href: "/dashboard/children", icon: Users },
        { title: "Pay Fees", href: "/dashboard/fees", icon: CreditCard },
    ]
};
