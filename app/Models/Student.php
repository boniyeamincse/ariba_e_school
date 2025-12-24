<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'tenant_id',
        'student_id',
        'first_name',
        'last_name',
        'date_of_birth',
        'gender',
        'blood_group',
        'religion',
        'nationality',
        'address',
        'phone',
        'email',
        'admission_date',
        'class',
        'section',
        'roll_number',
        'photo_url',
        'status',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'admission_date' => 'date',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public function guardians()
    {
        return $this->hasMany(Guardian::class);
    }

    public function documents()
    {
        return $this->hasMany(StudentDocument::class);
    }

    public function primaryGuardian()
    {
        return $this->hasOne(Guardian::class)->where('is_primary', true);
    }

    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
