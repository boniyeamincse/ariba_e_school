<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Tenant Management
    Route::get('/tenants', [\App\Http\Controllers\TenantController::class, 'index']);
    Route::post('/tenants', [\App\Http\Controllers\TenantController::class, 'store']);

    // Plans
    Route::get('/plans', [\App\Http\Controllers\PlanController::class, 'index']);
});
