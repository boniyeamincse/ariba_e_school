<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tenant extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    protected $casts = [
        'config' => 'array',
        'documents' => 'array',
        'trial_ends_at' => 'datetime',
        'subscription_ends_at' => 'datetime',
        'approved_at' => 'datetime',
        'terms_accepted' => 'boolean',
        'privacy_accepted' => 'boolean',
    ];

    protected $appends = ['subscription_status'];

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function getSubscriptionStatusAttribute(): string
    {
        if ($this->subscription_ends_at && $this->subscription_ends_at->isFuture()) {
            return 'active';
        }

        if ($this->trial_ends_at && $this->trial_ends_at->isFuture()) {
            return 'trial';
        }

        if ($this->trial_ends_at && $this->trial_ends_at->isPast() && !$this->subscription_ends_at) {
            return 'trial_expired';
        }

        return 'overdue';
    }
    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }

    public function scopeOnTrial($query)
    {
        return $query->where('trial_ends_at', '>', now());
    }

    public function scopeHasActiveSubscription($query)
    {
        return $query->where('subscription_ends_at', '>', now());
    }

    public function scopeOnPlan($query, $planId)
    {
        return $query->where('plan_id', $planId);
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }
}
