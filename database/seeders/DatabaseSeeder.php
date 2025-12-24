<?php

namespace Database\Seeders;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Reset Cached Permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // 2. Create a Tenant (Demo School)
        $tenant = Tenant::firstOrCreate(
            ['domain' => 'dhakaideal'],
            [
                'name' => 'Dhaka Ideal School',
                'status' => 'active',
                'student_limit' => 500,
                'trial_ends_at' => now()->addDays(14),
            ]
        );

        // 3. Define Standard Roles
        $roles = [
            'Super Admin',
            'School Admin', // Tenant Admin
            'Admin Officer',
            'Accountant',
            'Teacher',
            'Student',
            'Guardian',
            'Librarian',
            'Transport Manager',
            'Hostel Manager'
        ];

        // 4. Define Standard Permissions
        $permissions = [
            'tenant' => ['view', 'manage'],
            'settings' => ['view', 'manage'],
            'student' => ['view', 'create', 'edit', 'delete', 'view_own', 'view_child'],
            'admission' => ['view', 'manage'],
            'attendance' => ['view', 'take', 'view_own', 'view_child'],
            'fees' => ['view', 'collect', 'manage', 'view_own', 'pay'],
            'exam' => ['view', 'manage', 'entry', 'view_own', 'view_child'],
            'staff' => ['view', 'manage', 'view_own'],
            'library' => ['view', 'manage', 'borrow'],
            'transport' => ['view', 'manage', 'view_own', 'view_child'],
            'hostel' => ['view', 'manage', 'view_own', 'view_child'],
        ];

        // Create Permissions
        foreach ($permissions as $module => $actions) {
            foreach ($actions as $action) {
                Permission::firstOrCreate(['name' => "{$module}.{$action}", 'guard_name' => 'web']);
            }
        }

        // Create Roles & Assign Permissions
        foreach ($roles as $roleName) {
            $role = Role::firstOrCreate(['name' => $roleName, 'guard_name' => 'web']);

            switch ($roleName) {
                case 'Super Admin':
                    $role->givePermissionTo(Permission::all());
                    break;
                case 'School Admin':
                    $role->givePermissionTo(Permission::where('name', 'not like', 'tenant.manage%')->get());
                    $role->givePermissionTo('tenant.view');
                    break;
                case 'Admin Officer':
                    $role->givePermissionTo(['student.view', 'student.create', 'student.edit', 'admission.manage', 'fees.view']);
                    break;
                case 'Teacher':
                    $role->givePermissionTo(['attendance.take', 'exam.entry', 'student.view']);
                    break;
                // Add other role permission assignments as needed
            }
        }

        // 5. Create Tenant Admin User
        $admin = User::firstOrCreate(
            ['email' => 'admin@dhakaideal.com'],
            [
                'name' => 'Principal Rahman',
                'password' => bcrypt('password'),
                'tenant_id' => $tenant->id,
            ]
        );
        setPermissionsTeamId($tenant->id);
        $admin->assignRole('School Admin');

        // 6. Create SaaS Global Roles
        $saasPermissions = [
            'saas.tenants' => ['view', 'manage', 'impersonate'],
            'saas.plans' => ['view', 'manage'],
            'saas.billing' => ['view', 'manage'],
            'saas.system' => ['view', 'manage'],
        ];

        foreach ($saasPermissions as $module => $actions) {
            foreach ($actions as $action) {
                Permission::firstOrCreate(['name' => "{$module}.{$action}", 'guard_name' => 'web']);
            }
        }

        $saasRoles = [
            'SAAS_SUPER_ADMIN' => Permission::where('name', 'like', 'saas.%')->get(),
            'SAAS_ADMIN' => Permission::where('name', 'like', 'saas.tenants.%')->get(),
            'SAAS_SUPPORT' => Permission::where('name', 'saas.tenants.view')->get(),
            'SAAS_FINANCE' => Permission::where('name', 'like', 'saas.billing.%')->get(),
        ];

        foreach ($saasRoles as $roleName => $perms) {
            $role = Role::firstOrCreate(['name' => $roleName, 'guard_name' => 'web']);
            $role->syncPermissions($perms);
        }

        // 7. Create SaaS Super User & Test Users
        $superAdmin = User::updateOrCreate(
            ['email' => 'super@app.com'],
            [
                'name' => 'SaaS Owner',
                'password' => bcrypt('password'),
                'tenant_id' => null,
            ]
        );
        setPermissionsTeamId(null);
        $superAdmin->syncRoles(['SAAS_SUPER_ADMIN']);

        $saasAdmin = User::updateOrCreate(
            ['email' => 'admin@app.com'],
            [
                'name' => 'SaaS Admin',
                'password' => bcrypt('password'),
                'tenant_id' => null,
            ]
        );
        $saasAdmin->syncRoles(['SAAS_ADMIN']);

        $saasSupport = User::updateOrCreate(
            ['email' => 'support@app.com'],
            [
                'name' => 'SaaS Support',
                'password' => bcrypt('password'),
                'tenant_id' => null,
            ]
        );
        $saasSupport->syncRoles(['SAAS_SUPPORT']);

        $saasFinance = User::updateOrCreate(
            ['email' => 'finance@app.com'],
            [
                'name' => 'SaaS Finance',
                'password' => bcrypt('password'),
                'tenant_id' => null,
            ]
        );
        $saasFinance->syncRoles(['SAAS_FINANCE']);

        // 8. Create Default Plans
        if (\App\Models\Plan::count() === 0) {
            \App\Models\Plan::create([
                'name' => 'Standard',
                'slug' => 'standard',
                'price' => 5000.00,
                'duration_months' => 1,
                'description' => 'Perfect for small schools.',
                'features' => ['student_limit:500', 'basic_modules'],
                'is_active' => true,
                'sort_order' => 1,
            ]);

            \App\Models\Plan::create([
                'name' => 'Premium',
                'slug' => 'premium',
                'price' => 45000.00,
                'duration_months' => 12,
                'description' => 'For extensive institutions.',
                'features' => ['student_limit:unlimited', 'all_modules', 'priority_support'],
                'is_active' => true,
                'sort_order' => 2,
            ]);
        }
    }
}
