<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('tenants', function (Blueprint $table) {
            // School ID (Auto-generated: SCH-2025-00001)
            $table->string('school_id')->unique()->nullable()->after('id');

            // School Information
            $table->string('eiin_number')->nullable();
            $table->enum('school_type', ['primary', 'secondary', 'higher_secondary', 'madrasa', 'technical', 'college', 'university'])->nullable();
            $table->enum('education_board', ['dhaka', 'rajshahi', 'comilla', 'jessore', 'chittagong', 'sylhet', 'barisal', 'dinajpur', 'madrasa', 'technical'])->nullable();
            $table->year('establishment_year')->nullable();
            $table->enum('school_category', ['government', 'semi_government', 'private', 'autonomous', 'mpo'])->nullable();
            $table->enum('medium', ['bangla', 'english', 'both'])->nullable();
            $table->string('motto')->nullable();

            // Location
            $table->string('country')->default('Bangladesh');
            $table->string('division')->nullable();
            $table->string('district')->nullable();
            $table->string('upazila')->nullable();
            $table->text('full_address')->nullable();
            $table->string('post_code', 10)->nullable();

            // Contact
            $table->string('phone', 20)->nullable();
            $table->string('alt_phone', 20)->nullable();
            $table->string('email')->nullable();
            $table->string('website')->nullable();

            // Branding (logo_url already exists)
            $table->string('banner_url')->nullable();
            $table->json('documents')->nullable(); // {registration_cert, approval_doc}

            // System Preferences
            $table->enum('session_start_month', ['january', 'july'])->default('january');
            $table->enum('grading_system', ['gpa', 'percentage', 'letter'])->default('gpa');
            $table->enum('attendance_type', ['daily', 'period_wise'])->default('daily');
            $table->string('language', 5)->default('bn');
            $table->string('currency', 5)->default('BDT');

            // Approval Workflow
            $table->enum('approval_status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('approved_at')->nullable();
            $table->text('rejection_reason')->nullable();

            // Agreements
            $table->boolean('terms_accepted')->default(false);
            $table->boolean('privacy_accepted')->default(false);
        });
    }

    public function down(): void
    {
        Schema::table('tenants', function (Blueprint $table) {
            $table->dropColumn([
                'school_id',
                'eiin_number',
                'school_type',
                'education_board',
                'establishment_year',
                'school_category',
                'medium',
                'motto',
                'country',
                'division',
                'district',
                'upazila',
                'full_address',
                'post_code',
                'phone',
                'alt_phone',
                'email',
                'website',
                'banner_url',
                'documents',
                'session_start_month',
                'grading_system',
                'attendance_type',
                'language',
                'currency',
                'approval_status',
                'approved_by',
                'approved_at',
                'rejection_reason',
                'terms_accepted',
                'privacy_accepted'
            ]);
        });
    }
};
