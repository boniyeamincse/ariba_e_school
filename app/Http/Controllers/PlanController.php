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
        // Admin only - simple validation
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:plans,slug,' . $request->id,
            'price' => 'required|numeric',
            'features' => 'array',
        ]);

        // Logic for update/create would go here used by Admin Dashboard
        // For MVP we just return list
        return response()->json(['message' => 'Not implemented for MVP yet']);
    }
}
