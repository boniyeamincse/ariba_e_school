<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SchoolClass;
use App\Models\Section;
use App\Models\Subject;
use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AcademicController extends Controller
{
    /**
     * Get the full academic hierarchy (Classes -> Sections, Subjects).
     */
    public function index(Request $request)
    {
        // Assuming tenant identification is handled via middleware or user context
        // For now, we fetch all classes. in production scope by tenant
        $classes = SchoolClass::with(['sections', 'subjects.topics'])
            ->orderBy('numeric_value')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $classes
        ]);
    }

    public function storeClass(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'numeric_value' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Hardcoding tenant_id=1 for now, waiting for auth context
        $class = SchoolClass::create([
            'tenant_id' => 1,
            'name' => $request->name,
            'numeric_value' => $request->numeric_value
        ]);

        return response()->json(['success' => true, 'data' => $class]);
    }

    public function storeSection(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'class_id' => 'required|exists:classes,id',
            'name' => 'required|string|max:255',
            'capacity' => 'nullable|integer',
            'room_no' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $section = Section::create([
            'tenant_id' => 1,
            'class_id' => $request->class_id,
            'name' => $request->name,
            'capacity' => $request->capacity,
            'room_no' => $request->room_no
        ]);

        return response()->json(['success' => true, 'data' => $section]);
    }

    public function storeSubject(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'class_id' => 'required|exists:classes,id',
            'name' => 'required|string|max:255',
            'code' => 'nullable|string',
            'type' => 'in:theory,practical',
            'full_marks' => 'numeric',
            'pass_marks' => 'numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $subject = Subject::create([
            'tenant_id' => 1,
            'class_id' => $request->class_id,
            'name' => $request->name,
            'code' => $request->code,
            'type' => $request->type ?? 'theory',
            'full_marks' => $request->full_marks ?? 100,
            'pass_marks' => $request->pass_marks ?? 33,
        ]);

        return response()->json(['success' => true, 'data' => $subject]);
    }
}
