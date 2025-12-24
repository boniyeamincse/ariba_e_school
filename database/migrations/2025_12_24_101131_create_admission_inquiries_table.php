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
        Schema::create('admission_inquiries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->onDelete('cascade');
            $table->string('inquiry_number')->unique();

            // Prospect Info
            $table->string('student_name');
            $table->string('guardian_name');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->string('applied_class');

            // Tracking
            $table->enum('source', ['walk_in', 'website', 'phone', 'referral', 'advertisement', 'other'])->default('walk_in');
            $table->enum('status', ['new', 'contacted', 'interested', 'applied', 'not_interested', 'closed'])->default('new');
            $table->text('notes')->nullable();
            $table->timestamp('follow_up_date')->nullable();
            $table->foreignId('assigned_to')->nullable()->constrained('users')->onDelete('set null');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admission_inquiries');
    }
};
