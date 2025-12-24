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
    Route::get('/tenants/usage', [\App\Http\Controllers\TenantController::class, 'usage']);
    Route::post('/tenants', [\App\Http\Controllers\TenantController::class, 'store']);

    // Plans
    Route::get('/plans', [\App\Http\Controllers\PlanController::class, 'index']);
    Route::post('/plans', [\App\Http\Controllers\PlanController::class, 'store']);
    Route::put('/plans/{plan}', [\App\Http\Controllers\PlanController::class, 'update']);

    // Invoices
    Route::get('/invoices', [\App\Http\Controllers\InvoiceController::class, 'index']);
    Route::post('/invoices', [\App\Http\Controllers\InvoiceController::class, 'store']);
    Route::post('/invoices/{invoice}/mark-paid', [\App\Http\Controllers\InvoiceController::class, 'markPaid']);
    Route::get('/invoices/{invoice}/download', [\App\Http\Controllers\InvoiceController::class, 'download']);

    // Payments
    Route::post('/payments/initiate', [\App\Http\Controllers\PaymentController::class, 'initiate']);
    Route::get('/payments/stripe-config', [\App\Http\Controllers\PaymentController::class, 'getStripeConfig']);
    Route::get('/transactions', [\App\Http\Controllers\PaymentController::class, 'transactions']);
});

// Webhooks (no auth required)
Route::post('/webhooks/stripe', [\App\Http\Controllers\PaymentController::class, 'stripeWebhook']);
Route::post('/webhooks/bkash', [\App\Http\Controllers\PaymentController::class, 'bkashCallback']);
