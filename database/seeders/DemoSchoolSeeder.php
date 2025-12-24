<?php

namespace Database\Seeders;

use App\Models\Student;
use App\Models\Guardian;
use App\Models\Tenant;
use Illuminate\Database\Seeder;

class DemoSchoolSeeder extends Seeder
{
    public function run(): void
    {
        // Create Demo School Tenant
        $tenant = Tenant::firstOrCreate(
            ['domain' => 'demo-school'],
            [
                'name' => 'DHA International School',
                'status' => 'active',
                'plan_id' => 2, // Premium plan
                'student_limit' => 500,
                'config' => json_encode([
                    'theme' => 'modern',
                    'primary_color' => '#4f46e5',
                ]),
            ]
        );

        $this->command->info("Created Tenant: {$tenant->name} (ID: {$tenant->id})");

        // Sample Students Data
        $studentsData = [
            ['first_name' => 'Arafat', 'last_name' => 'Rahman', 'gender' => 'male', 'class' => 'Class 10', 'section' => 'A'],
            ['first_name' => 'Fatima', 'last_name' => 'Akter', 'gender' => 'female', 'class' => 'Class 10', 'section' => 'A'],
            ['first_name' => 'Tanvir', 'last_name' => 'Hossain', 'gender' => 'male', 'class' => 'Class 9', 'section' => 'B'],
            ['first_name' => 'Nusrat', 'last_name' => 'Jahan', 'gender' => 'female', 'class' => 'Class 9', 'section' => 'A'],
            ['first_name' => 'Shakib', 'last_name' => 'Khan', 'gender' => 'male', 'class' => 'Class 8', 'section' => 'A'],
            ['first_name' => 'Tasnim', 'last_name' => 'Ahmed', 'gender' => 'female', 'class' => 'Class 8', 'section' => 'B'],
            ['first_name' => 'Rafiq', 'last_name' => 'Islam', 'gender' => 'male', 'class' => 'Class 7', 'section' => 'A'],
            ['first_name' => 'Sadia', 'last_name' => 'Begum', 'gender' => 'female', 'class' => 'Class 7', 'section' => 'A'],
            ['first_name' => 'Imran', 'last_name' => 'Hasan', 'gender' => 'male', 'class' => 'Class 6', 'section' => 'A'],
            ['first_name' => 'Rashida', 'last_name' => 'Khatun', 'gender' => 'female', 'class' => 'Class 6', 'section' => 'B'],
        ];

        $guardianNames = [
            ['father' => 'Abdul Rahman', 'mother' => 'Hasina Begum'],
            ['father' => 'Kamal Akter', 'mother' => 'Salma Akter'],
            ['father' => 'Mizanur Hossain', 'mother' => 'Roksana Begum'],
            ['father' => 'Habibur Rahman', 'mother' => 'Nazma Jahan'],
            ['father' => 'Alamgir Khan', 'mother' => 'Sabina Khan'],
            ['father' => 'Farid Ahmed', 'mother' => 'Sharmin Ahmed'],
            ['father' => 'Nurul Islam', 'mother' => 'Parveen Akter'],
            ['father' => 'Jahangir Alam', 'mother' => 'Rokeya Begum'],
            ['father' => 'Shafiqul Hasan', 'mother' => 'Monowara Begum'],
            ['father' => 'Abul Kalam', 'mother' => 'Halima Khatun'],
        ];

        foreach ($studentsData as $index => $data) {
            $year = date('Y');
            $studentId = "{$year}-" . str_pad($index + 1, 4, '0', STR_PAD_LEFT);

            $student = Student::create([
                'tenant_id' => $tenant->id,
                'student_id' => $studentId,
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'date_of_birth' => now()->subYears(rand(12, 17))->subMonths(rand(0, 11)),
                'gender' => $data['gender'],
                'blood_group' => ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-'][rand(0, 6)],
                'religion' => 'Islam',
                'nationality' => 'Bangladeshi',
                'address' => 'Dhaka, Bangladesh',
                'phone' => '017' . rand(10000000, 99999999),
                'admission_date' => now()->subYears(rand(1, 3)),
                'class' => $data['class'],
                'section' => $data['section'],
                'roll_number' => (string) ($index + 1),
                'status' => 'active',
            ]);

            // Add Father
            Guardian::create([
                'tenant_id' => $tenant->id,
                'student_id' => $student->id,
                'name' => $guardianNames[$index]['father'],
                'relationship' => 'father',
                'phone' => '018' . rand(10000000, 99999999),
                'occupation' => ['Businessman', 'Doctor', 'Engineer', 'Teacher', 'Lawyer'][rand(0, 4)],
                'is_primary' => true,
            ]);

            // Add Mother
            Guardian::create([
                'tenant_id' => $tenant->id,
                'student_id' => $student->id,
                'name' => $guardianNames[$index]['mother'],
                'relationship' => 'mother',
                'phone' => '019' . rand(10000000, 99999999),
                'occupation' => 'Homemaker',
                'is_primary' => false,
            ]);

            $this->command->info("Created Student: {$student->full_name} ({$studentId})");
        }

        $this->command->info("\n✅ Demo School seeded with {$tenant->name}");
        $this->command->info("   - 10 Students");
        $this->command->info("   - 20 Guardians");
    }
}
