<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = [
        'tenant_id',
        'class_id',
        'name',
        'code',
        'type',
        'full_marks',
        'pass_marks'
    ];

    public function schoolClass()
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }

    public function topics()
    {
        return $this->hasMany(Topic::class);
    }
}
