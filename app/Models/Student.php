<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
        'class_id', // Changed from 'class'
        'section_id', // Changed from 'section'
        'roll_number',
        'photo_url',
        'status',
    ];

    protected $casts = [
        'admission_date' => 'date',
        'date_of_birth' => 'date',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    // Relationship to Academic Class
    public function schoolClass()
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }

    // Relationship to Section
    public function section()
    {
        return $this->belongsTo(Section::class, 'section_id');
    }

    public function guardians()
    {
        return $this->hasMany(Guardian::class);
    }

    public function primaryGuardian()
    {
        return $this->hasOne(Guardian::class)->where('is_primary', true);
    }

    public function documents()
    {
        return $this->hasMany(StudentDocument::class);
    }
}
