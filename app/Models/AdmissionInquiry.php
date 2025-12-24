<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdmissionInquiry extends Model
{
    protected $fillable = [
        'tenant_id',
        'inquiry_number',
        'student_name',
        'guardian_name',
        'phone',
        'email',
        'applied_class',
        'source',
        'status',
        'notes',
        'follow_up_date',
        'assigned_to',
    ];

    protected $casts = [
        'follow_up_date' => 'datetime',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public function assignedUser()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public static function generateInquiryNumber($tenantId): string
    {
        $year = date('Y');
        $count = self::where('tenant_id', $tenantId)->whereYear('created_at', $year)->count() + 1;
        return "INQ-{$year}-" . str_pad($count, 5, '0', STR_PAD_LEFT);
    }
}
