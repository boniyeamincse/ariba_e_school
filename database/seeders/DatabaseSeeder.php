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
        // 1. Create Super Admin (Global)
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create Roles (Global/Team agnostic context for now, or per team?)
        // If enabling teams, we need to handle it. For now let's create global standard roles.
        // We will enable teams in config.

        // 2. Create a Tenant
        $tenant = Tenant::create([
            'name' => 'Dhaka Ideal School',
            'domain' => 'dhakaideal',
            'status' => 'active',
            'student_limit' => 500,
        ]);

        // 3. Create Key Roles for this Tenant
        // With 'teams' enabled, roles are unique per team? Or global roles assigned to user-team?
        // Spatie standard teams: Roles can be global or team specific. 
        // Let's create global Role definitions that can be assigned.

        $roles = [
            'Super Admin',
            'School Owner',
            'Admin Officer',
            'Accountant',
            'Teacher',
            'Student',
            'Guardian',
            'Librarian',
            'Transport Manager',
            'Hostel Manager'
        ];

        // 3a. Define Permissions
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

        // Create Roles
        foreach ($roles as $roleName) {
            $role = Role::firstOrCreate(['name' => $roleName, 'guard_name' => 'web']);

            // Assign Permissions based on Matrix
            switch ($roleName) {
                case 'Super Admin':
                    $role->givePermissionTo(Permission::all());
                    break;
                case 'School Owner': // Tenant Admin
                    $role->givePermissionTo(Permission::where('name', 'not like', 'tenant.manage%')->get());
                    $role->givePermissionTo('tenant.view');
                    break;
                case 'Admin Officer':
                    $role->givePermissionTo([
                        'student.view',
                        'student.create',
                        'student.edit',
                        'student.delete',
                        'admission.view',
                        'admission.manage',
                        'attendance.view',
                        'attendance.take',
                        'fees.view',
                        'exam.view',
                        'exam.manage',
                        'staff.view',
                        'staff.manage',
                        'transport.view',
                        'hostel.view',
                        'library.view',
                        'settings.view'
                    ]);
                    break;
                case 'Accountant':
                    $role->givePermissionTo([
                        'fees.view',
                        'fees.collect',
                        'fees.manage',
                        'staff.view',
                        'student.view',
                        'admission.view',
                        'transport.view',
                        'hostel.view'
                    ]);
                    break;
                case 'Teacher':
                    $role->givePermissionTo([
                        'attendance.take',
                        'attendance.view',
                        'exam.entry',
                        'exam.view',
                        'student.view',
                        'staff.view_own',
                        'library.view',
                        'library.borrow',
                        'transport.view',
                        'transport.view_own',
                        'hostel.view',
                        'hostel.view_own'
                    ]);
                    break;
                case 'Student':
                    $role->givePermissionTo([
                        'student.view_own',
                        'attendance.view_own',
                        'fees.view_own',
                        'exam.view_own',
                        'transport.view_own',
                        'hostel.view_own',
                        'library.borrow'
                    ]);
                    break;
                case 'Guardian': // Parent
                    $role->givePermissionTo([
                        'student.view_child',
                        'attendance.view_child',
                        'fees.view',
                        'fees.pay',
                        'exam.view_child',
                        'transport.view_child',
                        'hostel.view_child'
                    ]);
                    break;
                case 'Librarian':
                    $role->givePermissionTo([
                        'library.view',
                        'library.manage',
                        'library.borrow',
                        'student.view',
                        'staff.view_own'
                    ]);
                    break;
                case 'Transport Manager':
                    $role->givePermissionTo([
                        'transport.view',
                        'transport.manage',
                        'transport.view_own',
                        'student.view',
                        'staff.view_own'
                    ]);
                    break;
                case 'Hostel Manager':
                    $role->givePermissionTo([
                        'hostel.view',
                        'hostel.manage',
                        'hostel.view_own',
                        'student.view',
                        'staff.view_own'
                    ]);
                    break;
            }
        }

        // 4. Create Tenant Admin
        $admin = User::create([
            'name' => 'Principal Rahman',
            'email' => 'admin@dhakaideal.com',
            'password' => bcrypt('password'),
            'tenant_id' => $tenant->id,
        ]);

        // Assign Role with Tenant Context
        // When teams are enabled, assignRole takes the team id? 
        // Or setPermissionsTeamId($id) before assignment.
        setPermissionsTeamId($tenant->id);
        $admin->assignRole('School Owner');

        // 5. Create Super Admin (SaaS Owner)
        $superAdmin = User::create([
            'name' => 'SaaS Owner',
            'email' => 'super@app.com',
            'password' => bcrypt('password'),
            'tenant_id' => null, // Global
        ]);
        // setPermissionsTeamId(null); // Global context
        // $superAdmin->assignRole('Super Admin'); 
    }
}
