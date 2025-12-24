# AribaSaaS - 40-Phase Development Roadmap

This document outlines the granular 40-phase development plan for the Ariba SaaS School Management System.

## 🟢 Phase 1-5: Foundation & Multi-Tenancy
| Phase | Module | Description | Status |
| :--- | :--- | :--- | :--- |
| **01** | **Project Setup** | Monorepo setup (Laravel 12 + Next.js 15), Git init, Environment config. | ✅ **Done** |
| **02** | **Database Engineering** | Schema design for Tenants, Users, Domains (Central vs Tenant DB logic). | ✅ **Done** |
| **03** | **Authentication** | JWT/Sanctum implementation with Multi-tenant context middleware. | ✅ **Done** |
| **04** | **Onboarding Engine** | Automated domain provisioning, database migration per tenant. | ✅ **Done** |
| **05** | **SaaS Global Roles** | Implementation of Super Admin, Support, and Finance roles with RBAC. | ✅ **Done** |

## 🟢 Phase 6-10: SaaS Core & Billing ✅ COMPLETE
| Phase | Module | Description | Tests | Status |
| :--- | :--- | :--- | :---: | :--- |
| **06** | **SaaS Admin Dashboard** | KPI Cards, Tenant List, System Health monitoring UI. | - | ✅ **Done** |
| **07** | **Subscription Logic** | Plan creation (Standard/Premium), Trial management (14-day auto-expiry). | 3 ✅ | ✅ **Done** |
| **08** | **Billing & Invoicing** | Invoice generation for schools, PDF downloads. | 4 ✅ | ✅ **Done** |
| **09** | **Payment Gateway** | bKash/Stripe integration for subscription collections. | 4 ✅ | ✅ **Done** |
| **10** | **Domain Management** | Custom domain mapping (e.g., `school.com` -> `school.aribasaas.com`). | 5 ✅ | ✅ **Done** |

> **Total Tests: 16 passed (29 assertions)**

## 🔴 Phase 11-15: Academic Core (School Administration)
| Phase | Module | Description | Status |
| :--- | :--- | :--- | :--- |
| **11** | **Student Info System** | Detailed student profiles, guardians, document uploads. | ⭕ Pending |
| **12** | **Admission Module** | Online admission forms, inquiry tracking, merit list generation. | ⭕ Pending |
| **13** | **Academic Setup** | Class, Section, Subject, & Topic hierarchy configuration. | ⭕ Pending |
| **14** | **Class Routine** | Conflict-free schedule generator, teacher allocation. | ⭕ Pending |
| **15** | **Attendance System** | Daily attendance (Student/Staff), Biometric device API integration. | ⭕ Pending |

## 🔴 Phase 16-20: Evaluation & Grading
| Phase | Module | Description | Status |
| :--- | :--- | :--- | :--- |
| **16** | **Exam Management** | Exam scheduling, Hall ticket generation, Seat plans. | ⭕ Pending |
| **17** | **Mark Entry** | Subject-wise mark entry by teachers (Continuous Assessment + Finals). | ⭕ Pending |
| **18** | **Result Engine** | GPA/CGPA calculation logic (Bangladesh Education Board compliant). | ⭕ Pending |
| **19** | **Report Cards** | Dynamic PDF Marksheets, Tabulation Sheets for Admins. | ⭕ Pending |
| **20** | **Analytics** | Student progress charts, Class performance comparison. | ⭕ Pending |

## 🔴 Phase 21-25: Finance (School Level)
| Phase | Module | Description | Status |
| :--- | :--- | :--- | :--- |
| **21** | **Fee Setup** | Fee heads (Tuition, Exam, Sports), Due date configuration. | ⭕ Pending |
| **22** | **Fee Collection** | Invoice generation, Partial payment support, Receipt printing. | ⭕ Pending |
| **23** | **Online Payments** | School-level payment gateway (bKash/Nagad/SSLCommerz). | ⭕ Pending |
| **24** | **Expense Manager** | Petty cash, Vendor payments, Voucher entry system. | ⭕ Pending |
| **25** | **Finance Reports** | Daily collection reports, Due lists, Profit & Loss statements. | ⭕ Pending |

## 🔴 Phase 26-30: Human Resource & Payroll
| Phase | Module | Description | Status |
| :--- | :--- | :--- | :--- |
| **26** | **Staff Directory** | Teaching vs Non-teaching staff, Document repository. | ⭕ Pending |
| **27** | **Leave Manager** | Application workflow, Approval chain, Leave balance tracking. | ⭕ Pending |
| **28** | **Payroll Config** | Basic salary, Allowances, Deductions (Provident Fund/Tax). | ⭕ Pending |
| **29** | **Salary Processing** | Monthly payroll generation, Payslip PDF export. | ⭕ Pending |
| **30** | **Activity Logs** | Class count, Logbook monitoring, Performance review. | ⭕ Pending |

## 🔴 Phase 31-35: Communications & Operations
| Phase | Module | Description | Status |
| :--- | :--- | :--- | :--- |
| **31** | **Notice Board** | Digital notice publishing (Public/Private), App push notifications. | ⭕ Pending |
| **32** | **SMS Gateway** | OTPs, Absentee alerts, Fee due reminders via SMS Gateway. | ⭕ Pending |
| **33** | **Transport** | Route planning, Vehicle registry, Driver allocation, Fee mapping. | ⭕ Pending |
| **34** | **Hostel** | Room inventory, Bed allocation, Mess/Dining management. | ⭕ Pending |
| **35** | **Library** | Book cataloging (ISBN), Issue/Return workflow, Fine calculation. | ⭕ Pending |

## 🔴 Phase 36-40: Advanced Modules & AI
| Phase | Module | Description | Status |
| :--- | :--- | :--- | :--- |
| **36** | **Website CMS** | Dynamic public website builder for each tenant school. | ⭕ Pending |
| **37** | **Inventory** | Stock tracking for stationery/lab equipment, Purchase reqs. | ⭕ Pending |
| **38** | **Alumni Portal** | Graduated student registry, Event management, Donation tracking. | ⭕ Pending |
| **39** | **AI Insights** | Dropout risk analysis, Revenue forecasting using ML. | ⭕ Pending |
| **40** | **Mobile Apps** | Finalizing REST/GraphQL APIs for dedicated Flutter/React Native apps. | ⭕ Pending |
