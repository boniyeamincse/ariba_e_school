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
    Library,
    BarChart3
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
                { title: "Add New School", href: "/admin/dashboard/schools/create" },
                { title: "Pending Approvals", href: "/admin/dashboard/schools/pending" },
                { title: "Plans & Subscriptions", href: "/admin/dashboard/tenants/plans" },
                { title: "Domains", href: "/admin/dashboard/tenants/domains" },
            ]
        },
        {
            title: "Billing",
            href: "/admin/dashboard/billing",
            icon: CreditCard,
            submenu: [
                { title: "Invoices", href: "/admin/dashboard/billing/invoices" },
                { title: "Transactions", href: "/admin/dashboard/billing/transactions" },
                { title: "Checkout", href: "/admin/dashboard/billing/checkout" }
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
        {
            title: "Reports",
            href: "/admin/dashboard/reports",
            icon: BarChart3,
            submenu: [
                { title: "Revenue Report", href: "/admin/dashboard/reports/revenue" },
                { title: "School Growth", href: "/admin/dashboard/reports/growth" },
                { title: "User Activity", href: "/admin/dashboard/reports/activity" },
                { title: "Export Data", href: "/admin/dashboard/reports/export" }
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
                { title: "Add New School", href: "/admin/dashboard/schools/create" },
                { title: "Pending Approvals", href: "/admin/dashboard/schools/pending" },
                { title: "Plans & Subscriptions", href: "/admin/dashboard/tenants/plans" },
                { title: "Domains", href: "/admin/dashboard/tenants/domains" },
            ]
        },
        {
            title: "Billing",
            href: "/admin/dashboard/billing",
            icon: CreditCard,
            submenu: [
                { title: "Invoices", href: "/admin/dashboard/billing/invoices" },
                { title: "Transactions", href: "/admin/dashboard/billing/transactions" },
                { title: "Checkout", href: "/admin/dashboard/billing/checkout" }
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
        {
            title: "Reports",
            href: "/admin/dashboard/reports",
            icon: BarChart3,
            submenu: [
                { title: "Revenue Report", href: "/admin/dashboard/reports/revenue" },
                { title: "School Growth", href: "/admin/dashboard/reports/growth" },
                { title: "User Activity", href: "/admin/dashboard/reports/activity" },
                { title: "Export Data", href: "/admin/dashboard/reports/export" }
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
                { title: "Add New School", href: "/admin/dashboard/schools/create" },
                { title: "Pending Approvals", href: "/admin/dashboard/schools/pending" },
                { title: "Plans & Subscriptions", href: "/admin/dashboard/tenants/plans" },
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
                { title: "Invoices", href: "/admin/dashboard/billing/invoices" },
                { title: "Transactions", href: "/admin/dashboard/billing/transactions" },
            ]
        },
    ],
    "School Owner": [
        { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        {
            title: "Students",
            href: "/dashboard/students",
            icon: GraduationCap,
            submenu: [
                { title: "Student List", href: "/dashboard/students" },
                { title: "Admission", href: "/dashboard/students/admission" },
                { title: "ID Cards", href: "/dashboard/students/id-cards" },
                { title: "Promotions", href: "/dashboard/students/promotions" },
            ]
        },
        {
            title: "Academics",
            href: "/dashboard/academics",
            icon: BookOpen,
            submenu: [
                { title: "Configuration", href: "/dashboard/academics/setup" },
                { title: "Class Routine", href: "/dashboard/academics/routine" },
                { title: "Syllabus", href: "/dashboard/academics/syllabus" },
            ]
        },
        {
            title: "HR & Staff",
            href: "/dashboard/staff",
            icon: Users,
            submenu: [
                { title: "Staff Directory", href: "/dashboard/staff" },
                { title: "Payroll", href: "/dashboard/staff/payroll" },
                { title: "Leave Management", href: "/dashboard/staff/leaves" },
            ]
        },
        {
            title: "Attendance",
            href: "/dashboard/attendance",
            icon: Calendar,
            submenu: [
                { title: "Student Attendance", href: "/dashboard/attendance/students" },
                { title: "Staff Attendance", href: "/dashboard/attendance/staff" },
                { title: "Reports", href: "/dashboard/attendance/reports" },
            ]
        },
        {
            title: "Fees & Accounts",
            href: "/dashboard/fees",
            icon: CreditCard,
            submenu: [
                { title: "Collect Fees", href: "/dashboard/fees/collect" },
                { title: "Invoices", href: "/dashboard/fees/invoices" },
                { title: "Expenses", href: "/dashboard/fees/expenses" },
                { title: "Reports", href: "/dashboard/fees/reports" },
            ]
        },
        {
            title: "Exams",
            href: "/dashboard/exams",
            icon: FileText,
            submenu: [
                { title: "Exam Setup", href: "/dashboard/exams/setup" },
                { title: "Marks Entry", href: "/dashboard/exams/marks" },
                { title: "Admit Cards", href: "/dashboard/exams/admit-cards" },
                { title: "Results", href: "/dashboard/exams/results" },
            ]
        },
        {
            title: "Transport",
            href: "/dashboard/transport",
            icon: Truck,
            submenu: [
                { title: "Routes", href: "/dashboard/transport/routes" },
                { title: "Vehicles", href: "/dashboard/transport/vehicles" },
                { title: "Assign", href: "/dashboard/transport/assign" },
            ]
        },
        {
            title: "Library",
            href: "/dashboard/library",
            icon: Library,
            submenu: [
                { title: "Book List", href: "/dashboard/library/books" },
                { title: "Issue / Return", href: "/dashboard/library/circulation" },
            ]
        },
        {
            title: "Settings",
            href: "/dashboard/settings",
            icon: Settings,
            submenu: [
                { title: "System Settings", href: "/dashboard/settings/system" },
                { title: "Website Settings", href: "/dashboard/settings/website" },
                { title: "School Settings", href: "/dashboard/settings/school" },
                { title: "Payment Settings", href: "/dashboard/settings/payment" },
                { title: "Language Settings", href: "/dashboard/settings/language" },
                { title: "SMTP Settings", href: "/dashboard/settings/smtp" },
                { title: "About", href: "/dashboard/settings/about" },
            ]
        },
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
