<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Guardian extends Model
{
    protected $fillable = [
        'tenant_id',
        'student_id',
        'name',
        'relationship',
        'phone',
        'email',
        'occupation',
        'address',
        'photo_url',
        'is_primary',
    ];

    protected $casts = [
        'is_primary' => 'boolean',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }
}
