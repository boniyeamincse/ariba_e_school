<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolClass extends Model
{
    use HasFactory;

    protected $table = 'classes'; // Explicitly define table name since model is SchoolClass

    protected $fillable = [
        'tenant_id',
        'name',
        'numeric_value',
    ];

    public function sections()
    {
        return $this->hasMany(Section::class, 'class_id');
    }

    public function subjects()
    {
        return $this->hasMany(Subject::class, 'class_id');
    }
}
