# System Dashboard Definitions

This document delineates the specific dashboard views required for the SaaS School Management System. Each dashboard is tailored to specific roles to ensure optimal workflow and data security.

## SaaS Level Dashboards
1. **SaaS Super Admin Dashboard**
   - *Users*: SAAS_SUPER_ADMIN, SAAS_ADMIN
   - *Key Features*: Global revenue, tenant management, system health, master settings.

2. **SaaS Support Dashboard**
   - *Users*: SAAS_SUPPORT
   - *Key Features*: Tenant lookup, support ticket management, activity logs (read-only).

## Tenant Level Dashboards

### Administration
3. **Tenant Owner / Principal Dashboard**
   - *Users*: TENANT_OWNER
   - *Key Features*: Full school overview, financial summaries, staff monitoring, subscription billing.

4. **Tenant Admin Dashboard**
   - *Users*: TENANT_ADMIN
   - *Key Features*: Day-to-day operations, attendance overview, notice board management.

5. **Academic Admin Dashboard**
   - *Users*: ACADEMIC_ADMIN
   - *Key Features*: Curriculum planning, routine management, academic calendar.

6. **IT Admin Dashboard**
   - *Users*: IT_ADMIN
   - *Key Features*: User management, device logs, system configuration for the school.

### Finance & Operations
7. **Finance Manager Dashboard**
   - *Users*: FINANCE_MANAGER
   - *Key Features*: Budget analysis, salary disbursement, expense reporting.

8. **Accountant Dashboard**
   - *Users*: ACCOUNTANT
   - *Key Features*: Fee collection, daily expense entry, invoice generation.

9. **HR Manager Dashboard**
   - *Users*: HR_MANAGER
   - *Key Features*: Staff directory, leave requests, payroll processing, recruitment.

10. **Auditor (Read-Only) Dashboard**
    - *Users*: AUDITOR
    - *Key Features*: Read-only access to financial logs and compliance reports.

11. **Data Entry Operator Dashboard**
    - *Users*: DATA_ENTRY_OPERATOR
    - *Key Features*: Bulk student admission, historical record digitization forms.

### Academic Management
12. **Exam Controller Dashboard**
    - *Users*: EXAM_CONTROLLER
    - *Key Features*: Exam scheduling, mark sheet generation, result publishing.

13. **Admission Officer Dashboard**
    - *Users*: ADMISSION_OFFICER
    - *Key Features*: Inquiry handling, applicant tracking, new admission processing.

### Staff & Faculty
14. **Teacher Dashboard**
    - *Users*: TEACHER
    - *Key Features*: Class schedule, attendance taking, mark entry, lesson planning.

15. **Class Teacher Dashboard**
    - *Users*: CLASS_TEACHER
    - *Key Features*: Class-specific attendance stats, student behavior logs, report card comments.

### Facility Management
16. **Librarian Dashboard**
    - *Users*: LIBRARIAN
    - *Key Features*: Book catalog, issue/return tracker, overdue fine management.

17. **Transport Manager Dashboard**
    - *Users*: TRANSPORT_MANAGER
    - *Key Features*: Route management, vehicle tracking, driver rosters.

18. **Hostel Manager Dashboard**
    - *Users*: HOSTEL_MANAGER
    - *Key Features*: Room allocation, mess menu planning, student count.

### End Users
19. **Student Dashboard**
    - *Users*: STUDENT
    - *Key Features*: Routine, result cards, online class access, fee status.

20. **Parent Dashboard**
    - *Users*: PARENT
    - *Key Features*: Children's progress reports, fee payment gateway, communication logs.
