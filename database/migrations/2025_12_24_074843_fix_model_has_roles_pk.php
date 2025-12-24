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
        Schema::table('model_has_roles', function (Blueprint $table) {
            // Drop the default composite primary key defined by Spatie with teams
            $table->dropPrimary('model_has_roles_role_model_type_primary');

            // Add a unique index instead, which allows NULLs (for Global roles where tenant_id is null)
            $table->unique(['tenant_id', 'role_id', 'model_id', 'model_type'], 'model_has_roles_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('model_has_roles', function (Blueprint $table) {
            $table->dropUnique('model_has_roles_unique');
            $table->primary(['tenant_id', 'role_id', 'model_id', 'model_type'], 'model_has_roles_role_model_type_primary');
        });
    }
};
