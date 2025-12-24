<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admission extends Model
{
    protected $fillable = [
        'tenant_id',
        'academic_session_id',
        'application_number',
        'first_name',
        'last_name',
        'date_of_birth',
        'gender',
        'blood_group',
        'religion',
        'nationality',
        'phone',
        'email',
        'address',
        'applied_class',
        'previous_school',
        'previous_marks',
        'guardian_name',
        'guardian_phone',
        'guardian_relation',
        'guardian_occupation',
        'photo_url',
        'documents',
        'status',
        'merit_score',
        'merit_rank',
        'remarks',
        'reviewed_at',
        'reviewed_by',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'documents' => 'array',
        'reviewed_at' => 'datetime',
        'merit_score' => 'decimal:2',
        'previous_marks' => 'decimal:2',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public function academicSession()
    {
        return $this->belongsTo(AcademicSession::class);
    }

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public static function generateApplicationNumber($tenantId): string
    {
        $year = date('Y');
        $count = self::where('tenant_id', $tenantId)->whereYear('created_at', $year)->count() + 1;
        return "ADM-{$year}-" . str_pad($count, 5, '0', STR_PAD_LEFT);
    }
}
