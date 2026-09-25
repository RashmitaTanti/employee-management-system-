<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    /**
     * Display all departments.
     */
    public function index()
    {
        // Show 5 departments per page
        $departments = Department::latest()->paginate(5);

        return Inertia::render('departments/index', [
            'departments' => $departments,
        ]);
    }

    /**
     * Show the create department form.
     */
    public function create()
    {
        return Inertia::render('departments/create');
    }

    /**
     * Store a new department.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'department_code' => [
                'required',
                'string',
                'max:50',
                'unique:departments,department_code',
            ],

            'name' => [
                'required',
                'string',
                'max:255',
                'unique:departments,name',
            ],

            'description' => [
                'nullable',
                'string',
                'max:1000',
            ],
        ]);

        Department::create($validated);

        return redirect()
            ->route('departments.index')
            ->with('success', 'Department inserted successfully.');
    }

    /**
     * Display a department.
     */
    public function show(Department $department)
    {
        return Inertia::render('departments/show', [
            'department' => $department,
        ]);
    }

    /**
     * Show the edit department form.
     */
    public function edit(Department $department)
    {
        return Inertia::render('departments/edit', [
            'department' => $department,
        ]);
    }

    /**
     * Update a department.
     */
    public function update(Request $request, Department $department)
    {
        $validated = $request->validate([
            'department_code' => [
                'required',
                'string',
                'max:50',
                Rule::unique('departments', 'department_code')
                    ->ignore($department->id),
            ],

            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('departments', 'name')
                    ->ignore($department->id),
            ],

            'description' => [
                'nullable',
                'string',
                'max:1000',
            ],
        ]);

        $department->update($validated);

        return redirect()
            ->route('departments.index')
            ->with('success', 'Department updated successfully.');
    }

    /**
     * Delete a department.
     */
    public function destroy(Department $department)
    {
        /*
         * Check whether this department is being used
         * by any employee.
         */
        $isUsed = Employee::where(
            'department_code',
            $department->department_code
        )
            ->orWhere(
                'department',
                $department->name
            )
            ->exists();

        /*
         * Do not delete a department that is being used.
         */
        if ($isUsed) {
            return redirect()
                ->route('departments.index')
                ->with(
                    'error',
                    'This department is used by employees, so it cannot be deleted.'
                );
        }

        /*
         * Delete department when it is not being used.
         */
        $department->delete();

        return redirect()
            ->route('departments.index')
            ->with(
                'success',
                'Department deleted successfully.'
            );
    }
}