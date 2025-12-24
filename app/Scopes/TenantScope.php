<?php

namespace App\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use App\Services\TenantService;

class TenantScope implements Scope
{
    public function apply(Builder $builder, Model $model)
    {
        if (app()->bound('currentTenant')) {
            $builder->where('tenant_id', app('currentTenant')->id);
        }
    }
}
