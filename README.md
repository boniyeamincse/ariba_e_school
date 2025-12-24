# Ariba School - SaaS School Management System (Bangladesh)

## Project Overview
A multi-tenant, role-based School Management System built for the Bangladeshi education context.
- **Backend**: Laravel 12 (API, Sanctum, Spatie Permissions)
- **Frontend**: Next.js 15 (App Router, Tailwind, Shadcn UI)
- **Database**: SQLite (Dev) / MySQL (Prod)

## 🚀 Quick Start & Test Credentials

### 🔗 Key URLs
| **Page** | **URL** | **Description** |
| :--- | :--- | :--- |
| **Landing Page** | [http://localhost:3000](http://localhost:3000) | Public Home Page |
| **School Login** | [http://localhost:3000/login](http://localhost:3000/login) | For Teachers, Students, Principals |
| **SaaS Admin** | [http://localhost:3000/admin/login](http://localhost:3000/admin/login) | **Login** for Super Admin |
| **SaaS Dashboard** | [http://localhost:3000/admin/dashboard](http://localhost:3000/admin/dashboard) | **Dedicated** SaaS Overview |
| **School Dashboard** | [http://localhost:3000/dashboard](http://localhost:3000/dashboard) | For Principals/Teachers |

### 👤 Test Accounts
| Role | Email | Password | Domain / Context | URL |
| :--- | :--- | :--- | :--- | :--- |
| **Super Admin** | `super@app.com` | `password` | Global | [Admin Login](http://localhost:3000/admin/login) |
| **Principal** | `admin@dhakaideal.com` | `password` | `dhakaideal` | [School Login](http://localhost:3000/login) |

### 3. Installation
```bash
# Backend
cd c:\xampp\htdocs\ariba_e-school
php artisan migrate:fresh --seed
php artisan serve

# Frontend
cd frontend
npm run dev
```

---
<!-- Original Laravel Readme Below -->
