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
        Schema::create('admissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->onDelete('cascade');
            $table->foreignId('academic_session_id')->nullable()->constrained()->onDelete('set null');
            $table->string('application_number')->unique();

            // Applicant Info
            $table->string('first_name');
            $table->string('last_name');
            $table->date('date_of_birth')->nullable();
            $table->enum('gender', ['male', 'female', 'other'])->nullable();
            $table->string('blood_group', 5)->nullable();
            $table->string('religion')->nullable();
            $table->string('nationality')->default('Bangladeshi');

            // Contact
            $table->string('phone');
            $table->string('email')->nullable();
            $table->text('address')->nullable();

            // Academic
            $table->string('applied_class');
            $table->string('previous_school')->nullable();
            $table->decimal('previous_marks', 5, 2)->nullable();

            // Guardian Info
            $table->string('guardian_name');
            $table->string('guardian_phone');
            $table->string('guardian_relation')->default('father');
            $table->string('guardian_occupation')->nullable();

            // Documents
            $table->string('photo_url')->nullable();
            $table->json('documents')->nullable();

            // Status
            $table->enum('status', ['pending', 'under_review', 'approved', 'rejected', 'enrolled'])->default('pending');
            $table->decimal('merit_score', 5, 2)->nullable();
            $table->integer('merit_rank')->nullable();
            $table->text('remarks')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->onDelete('set null');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admissions');
    }
};
