# 🏫 Ariba e-School - SaaS School Management System

A **multi-tenant, role-based** School Management System built for the Bangladeshi education context.

![Laravel 12](https://img.shields.io/badge/Laravel-12-red?logo=laravel)
![Next.js 15](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?logo=mysql)
![License](https://img.shields.io/badge/License-Proprietary-gray)

---

## 🚀 Tech Stack

| Layer | Technology |
|:---|:---|
| **Backend** | Laravel 12 (API, Sanctum Auth, Spatie Permissions) |
| **Frontend** | Next.js 15 (App Router, TypeScript, Tailwind CSS, Shadcn UI) |
| **Database** | MySQL 8.0 (Multi-tenant architecture) |
| **Payments** | Stripe, bKash Integration |

---

## 📦 Features Completed

### ✅ SaaS Core (Phase 1-10)
- [x] Multi-tenant architecture with isolated data
- [x] SaaS Admin Dashboard with KPI cards
- [x] Subscription Plans (Standard/Premium)
- [x] Billing & Invoicing with PDF generation
- [x] Payment Gateway (Stripe + bKash)
- [x] Custom Domain Management
- [x] Role-Based Access Control (RBAC)

### ✅ Academic Core (Phase 11)
- [x] Student Information System
- [x] Guardian Management
- [x] Document Uploads
- [x] Demo School with sample data

---

## 🔗 Login Portals

| Portal | URL | Theme | Users |
|:---|:---|:---:|:---|
| **SaaS Admin** | `/admin/login` | Dark | Platform Owners |
| **School Admin** | `/school/login` | 🟢 Emerald | Principals, School Admins |
| **Student** | `/student/login` | 🔵 Blue | Students |
| **Staff** | `/staff/login` | 🟣 Purple | Teachers, Accountants |

---

## 👤 Test Credentials

| Role | Email | Password | Login URL |
|:---|:---|:---|:---|
| **SaaS Owner** | `super@app.com` | `password` | `/admin/login` |
| **SaaS Admin** | `admin@app.com` | `password` | `/admin/login` |
| **SaaS Support** | `support@app.com` | `password` | `/admin/login` |
| **SaaS Finance** | `finance@app.com` | `password` | `/admin/login` |

### Demo School
- **Tenant**: DHA International School
- **Domain**: `demo-school`
- **Students**: 10 (IDs: 2025-0001 to 2025-0010)
- **Guardians**: 20

---

## ⚡ Quick Start

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL 8.0

### Installation

```bash
# Clone repository
git clone https://github.com/boniyeamincse/ariba_e_school.git
cd ariba_e_school

# Backend setup
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate:fresh --seed
php artisan db:seed --class=DemoSchoolSeeder
php artisan serve

# Frontend setup (new terminal)
cd frontend
npm install
npm run dev
```

### Access URLs
| Service | URL |
|:---|:---|
| Backend API | http://localhost:8000 |
| Frontend | http://localhost:3000 |
| Admin Login | http://localhost:3000/admin/login |

---

## 📁 Project Structure

```
ariba_e-school/
├── app/
│   ├── Http/Controllers/     # API Controllers
│   ├── Models/               # Eloquent Models
│   └── Services/             # Business Logic
├── database/
│   ├── migrations/           # Database Schema
│   └── seeders/              # Sample Data
├── frontend/
│   └── src/
│       ├── app/              # Next.js Pages
│       ├── components/       # UI Components
│       └── lib/              # Utilities
├── tests/Feature/            # Feature Tests
└── docs/                     # Documentation
```

---

## 🧪 Testing

```bash
# Run all tests
php artisan test

# Run specific module tests
php artisan test tests/Feature/PlansTest.php
php artisan test tests/Feature/InvoicesTest.php
php artisan test tests/Feature/PaymentsTest.php
php artisan test tests/Feature/DomainsTest.php
php artisan test tests/Feature/StudentsTest.php
```

**Current Test Status**: 21 tests, 37 assertions ✅

---

## 📊 Development Roadmap

| Phase | Module | Status |
|:---:|:---|:---:|
| 1-5 | Foundation & Multi-tenancy | ✅ Complete |
| 6-10 | SaaS Core & Billing | ✅ Complete |
| 11 | Student Info System | ✅ Complete |
| 12-15 | Academic Core | 🔄 In Progress |
| 16-20 | Finance & HR | ⭕ Pending |
| 21-40 | Advanced Features | ⭕ Pending |

See full roadmap: [`docs/Development_Phases_40.md`](docs/Development_Phases_40.md)

---

## 🔒 Security

- Sanctum token-based authentication
- Role-based access control (RBAC) via Spatie Permissions
- Tenant data isolation
- CORS protection
- Input validation on all endpoints

---

## 📄 License

Proprietary - Ariba IT Solutions © 2024

---

## 👨‍💻 Author

**Boni Yeamin**  
Ariba IT Solutions  
[GitHub](https://github.com/boniyeamincse)
