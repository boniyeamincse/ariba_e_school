# 🔐 Test Credentials

All test accounts use password: `password`

---

## 🛡️ SaaS Platform Admins

Login URL: **http://localhost:3000/admin/login**

| Role | Email | Description |
|:---|:---|:---|
| **SaaS Owner** | `super@app.com` | Full platform access |
| **SaaS Admin** | `admin@app.com` | Tenant & billing management |
| **SaaS Support** | `support@app.com` | Read-only tenant access |
| **SaaS Finance** | `finance@app.com` | Invoices & transactions |

---

## 🏫 School Users

Login URL: **http://localhost:3000/login**

### Dhaka Ideal School
- **Domain**: `dhakaideal`

| Role | Email | Description |
|:---|:---|:---|
| **School Admin** | `admin@dhakaideal.com` | School principal, full access |

---

### DHA International School (Demo)
- **Domain**: `demo-school`
- **Students**: 10 (2025-0001 to 2025-0010)
- **Guardians**: 20

| Data | Count |
|:---|:---|
| Students | 10 |
| Guardians | 20 |

---

## 🔑 Login Instructions

### For Platform Admins
1. Go to http://localhost:3000/admin/login
2. Enter email (e.g., `super@app.com`)
3. Enter password: `password`
4. Click "Access Dashboard"

### For School Users
1. Go to http://localhost:3000/login
2. Enter email (e.g., `admin@dhakaideal.com`)
3. Click "Continue"
4. Enter school domain: `dhakaideal`
5. Enter password: `password`
6. Click "Sign in"

---

## ⚠️ Reset Database

To reset all data and recreate test accounts:

```bash
php artisan migrate:fresh --seed
php artisan db:seed --class=DemoSchoolSeeder
```
