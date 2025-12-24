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
        // 1. Classes Table
        Schema::create('classes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->string('name'); // e.g., "Class 1", "Class 10"
            $table->integer('numeric_value')->default(0); // For sorting (1, 10, etc.)
            $table->timestamps();
        });

        // 2. Sections Table
        Schema::create('sections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignId('class_id')->constrained('classes')->cascadeOnDelete();
            $table->string('name'); // e.g., "A", "Mercury"
            $table->integer('capacity')->nullable();
            $table->string('room_no')->nullable();
            $table->unsignedBigInteger('teacher_id')->nullable(); // Class Teacher
            $table->timestamps();
        });

        // 3. Subjects Table
        Schema::create('subjects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignId('class_id')->constrained('classes')->cascadeOnDelete();
            $table->string('name'); // e.g., "Mathematics"
            $table->string('code')->nullable(); // e.g., "MATH101"
            $table->enum('type', ['theory', 'practical', 'optional'])->default('theory');
            $table->decimal('full_marks', 8, 2)->default(100);
            $table->decimal('pass_marks', 8, 2)->default(33);
            $table->timestamps();
        });

        // 4. Topics Table (Syllabus)
        Schema::create('topics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignId('subject_id')->constrained('subjects')->cascadeOnDelete();
            $table->string('name'); // e.g., "Algebra", "Calculus"
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('topics');
        Schema::dropIfExists('subjects');
        Schema::dropIfExists('sections');
        Schema::dropIfExists('classes');
    }
};
