<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AcademicSession extends Model
{
    protected $fillable = [
        'tenant_id',
        'name',
        'start_date',
        'end_date',
        'is_current',
        'admission_open',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_current' => 'boolean',
        'admission_open' => 'boolean',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public function admissions()
    {
        return $this->hasMany(Admission::class);
    }

    public function scopeCurrent($query)
    {
        return $query->where('is_current', true);
    }
}
