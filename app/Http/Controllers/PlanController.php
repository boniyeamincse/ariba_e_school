<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Http\Request;

class PlanController extends Controller
{
    public function index()
    {
        $plans = Plan::where('is_active', true)->orderBy('sort_order')->get();
        return response()->json($plans);
    }

    public function store(Request $request)
    {
        if (!$request->user()->hasRole('SAAS_SUPER_ADMIN')) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:plans,slug',
            'price' => 'required|numeric',
            'duration_months' => 'required|integer',
            'description' => 'required|string',
            'features' => 'required|array',
        ]);

        $plan = Plan::create([
            'name' => $validated['name'],
            'slug' => $validated['slug'],
            'price' => $validated['price'],
            'duration_months' => $validated['duration_months'],
            'description' => $validated['description'],
            'features' => $validated['features'],
            'is_active' => true,
        ]);

        return response()->json($plan, 201);
    }

    public function update(Request $request, Plan $plan)
    {
        if (!$request->user()->hasRole('SAAS_SUPER_ADMIN')) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'slug' => 'sometimes|string|unique:plans,slug,' . $plan->id,
            'price' => 'sometimes|numeric',
            'duration_months' => 'sometimes|integer',
            'description' => 'sometimes|string',
            'features' => 'sometimes|array',
            'is_active' => 'sometimes|boolean',
        ]);

        $plan->update($validated);

        return response()->json($plan);
    }
}
