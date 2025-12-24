<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Domain extends Model
{
    protected $fillable = [
        'tenant_id',
        'domain',
        'type',
        'status',
        'verification_token',
        'verified_at',
        'is_primary',
    ];

    protected $casts = [
        'verified_at' => 'datetime',
        'is_primary' => 'boolean',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public static function generateVerificationToken(): string
    {
        return 'ariba-verify-' . bin2hex(random_bytes(16));
    }
}
