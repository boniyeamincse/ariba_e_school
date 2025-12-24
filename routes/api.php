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

    // Domains
    Route::get('/domains', [\App\Http\Controllers\DomainController::class, 'index']);
    Route::post('/domains', [\App\Http\Controllers\DomainController::class, 'store']);
    Route::post('/domains/{domain}/verify', [\App\Http\Controllers\DomainController::class, 'verify']);
    Route::post('/domains/{domain}/set-primary', [\App\Http\Controllers\DomainController::class, 'setPrimary']);
    Route::delete('/domains/{domain}', [\App\Http\Controllers\DomainController::class, 'destroy']);

    // Students
    Route::get('/students', [\App\Http\Controllers\StudentController::class, 'index']);
    Route::post('/students', [\App\Http\Controllers\StudentController::class, 'store']);
    Route::get('/students/{student}', [\App\Http\Controllers\StudentController::class, 'show']);
    Route::put('/students/{student}', [\App\Http\Controllers\StudentController::class, 'update']);
    Route::delete('/students/{student}', [\App\Http\Controllers\StudentController::class, 'destroy']);
    Route::post('/students/{student}/guardians', [\App\Http\Controllers\StudentController::class, 'addGuardian']);
    Route::post('/students/{student}/documents', [\App\Http\Controllers\StudentController::class, 'uploadDocument']);
    Route::post('/students/{student}/photo', [\App\Http\Controllers\StudentController::class, 'uploadPhoto']);

    // Admissions
    Route::get('/admissions', [\App\Http\Controllers\AdmissionController::class, 'index']);
    Route::post('/admissions', [\App\Http\Controllers\AdmissionController::class, 'store']);
    Route::get('/admissions/{admission}', [\App\Http\Controllers\AdmissionController::class, 'show']);
    Route::put('/admissions/{admission}/status', [\App\Http\Controllers\AdmissionController::class, 'updateStatus']);
    Route::post('/admissions/{admission}/enroll', [\App\Http\Controllers\AdmissionController::class, 'enroll']);
    Route::get('/admissions/merit-list', [\App\Http\Controllers\AdmissionController::class, 'meritList']);

    // Admission Inquiries
    Route::get('/admission-inquiries', [\App\Http\Controllers\AdmissionController::class, 'inquiries']);
    Route::post('/admission-inquiries', [\App\Http\Controllers\AdmissionController::class, 'createInquiry']);
    Route::put('/admission-inquiries/{inquiry}', [\App\Http\Controllers\AdmissionController::class, 'updateInquiry']);

    // Academic Sessions
    Route::get('/academic-sessions', [\App\Http\Controllers\AdmissionController::class, 'sessions']);
    Route::post('/academic-sessions', [\App\Http\Controllers\AdmissionController::class, 'createSession']);
});

// Webhooks (no auth required)
Route::post('/webhooks/stripe', [\App\Http\Controllers\PaymentController::class, 'stripeWebhook']);
Route::post('/webhooks/bkash', [\App\Http\Controllers\PaymentController::class, 'bkashCallback']);
