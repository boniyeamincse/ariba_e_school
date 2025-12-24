<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plans = [
            [
                'name' => 'Standard',
                'slug' => 'standard',
                'price' => 25000.00,
                'duration_months' => 12, // Yearly
                'description' => 'For small schools getting started with digital management.',
                'features' => [
                    'Student Management (Up to 500)',
                    'Basic Reporting',
                    'Attendance Tracking',
                    'Email Support'
                ],
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Premium',
                'slug' => 'premium',
                'price' => 45000.00,
                'duration_months' => 12,
                'description' => 'Advanced features for growing educational institutions.',
                'features' => [
                    'Student Management (Up to 2000)',
                    'Advanced Analytics & Insights',
                    'SMS Integration (Twilio/BulkSMS)',
                    'Payment Gateway Integration',
                    'Priority Support'
                ],
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Enterprise',
                'slug' => 'enterprise',
                'price' => 85000.00,
                'duration_months' => 12,
                'description' => 'Full-suite solution for large campuses and chains.',
                'features' => [
                    'Unlimited Students',
                    'Custom Domain & Branding',
                    'Multi-branch Management',
                    'Dedicated Account Manager',
                    '24/7 Phone Support',
                    'API Access'
                ],
                'is_active' => true,
                'sort_order' => 3,
            ]
        ];

        foreach ($plans as $plan) {
            Plan::updateOrCreate(['slug' => $plan['slug']], $plan);
        }
    }
}
