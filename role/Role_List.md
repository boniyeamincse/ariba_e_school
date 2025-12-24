# System Role Definitions

This document outlines the hierarchy and classification of roles within the SaaS School Management System.

## SaaS Level Roles
These roles manage the entire platform, including all tenants (schools).

1. **SAAS_SUPER_ADMIN**
   - *Description*: Top-level access with unrestricted permissions. Can manage other admins, global settings, billing, and all tenants.
2. **SAAS_ADMIN**
   - *Description*: High-level administrator for platform operations, excluding critical billing or destructive database actions.
3. **SAAS_SUPPORT**
   - *Description*: Customer support agents who can view tenant configurations and logs to assist users but cannot change sensitive data.
4. **SAAS_FINANCE**
   - *Description*: Manages global billing, subscription plans, and platform revenue reporting.

## Tenant Level Roles (School Management)
These roles are specific to a single school instance.

### Administrative
5. **TENANT_OWNER**
   - *Description*: The primary account holder for a school. Has full access to their school's instance and billing.
6. **TENANT_ADMIN**
   - *Description*: Managing Director or Principal. Oversees day-to-day school operations.
7. **ACADEMIC_ADMIN**
   - *Description*: VP or Academic Coordinator. Manages curriculum, routines, and academic planning.
8. **IT_ADMIN**
   - *Description*: Manages local school settings, device configurations, and troubleshooting for the school.

### Finance & Operations
9. **ACCOUNTANT**
   - *Description*: Handles daily fee collection and basic expense recording.
10. **FINANCE_MANAGER**
    - *Description*: Oversees school budget, salary disbursement, and advanced financial reporting.
11. **PROCUREMENT_OFFICER**
    - *Description*: Manages inventory, vendor relations, and purchasing requests.
12. **HR_MANAGER**
    - *Description*: Manages staff recruitment, payroll, leave management, and employee records.
13. **AUDITOR**
    - *Description*: Read-only access to financial and operational records for internal or external auditing.

### Academic Staff
14. **TEACHER**
    - *Description*: Standard teacher role. Can take attendance, enter marks, and upload class materials.
15. **CLASS_TEACHER**
    - *Description*: Assigned to a specific class section. extended permissions for that section's students and reports.
16. **EXAM_CONTROLLER**
    - *Description*: Manages exam scheduling, question paper generation, and final result processing.
17. **CONTENT_MANAGER**
    - *Description*: Manages the school website CMS, noticeboard, and digital learning assets.

### Support Services
18. **LIBRARIAN**
    - *Description*: Manages book catalog, issuing/returning books, and library fines.
19. **TRANSPORT_MANAGER**
    - *Description*: Manages vehicle fleet, routes, drivers, and student transport assignment.
20. **HOSTEL_MANAGER**
    - *Description*: Manages dormitory rooms, student allocation, and mess/dining operations.
21. **SECURITY_OFFICER**
    - *Description*: Manages gate passes, visitor logs, and campus security surveillance access.
22. **DATA_ENTRY_OPERATOR**
    - *Description*: Assistant role for bulk data entry (admissions, historical records).
23. **ADMISSION_OFFICER**
    - *Description*: Handles new student inquiries, application processing, and enrollment.

### End Users
24. **STUDENT**
    - *Description*: Access to own profile, results, routine, and online classes.
25. **PARENT**
    - *Description*: Access to children's reports, fee payment, and communication with teachers.
