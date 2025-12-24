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
        Schema::create('tenants', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('domain')->unique()->index(); // subdomain or custom domain
            $table->string('plan_id')->nullable(); // For billing integration
            $table->enum('status', ['active', 'inactive', 'suspended'])->default('active');
            $table->json('config')->nullable(); // Branding, SMS keys, etc.
            $table->string('logo_url')->nullable();
            $table->integer('student_limit')->default(50);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tenants');
    }
};
