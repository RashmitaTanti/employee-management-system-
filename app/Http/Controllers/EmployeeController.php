<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of employees.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $department = $request->input('department');
        $minSalary = $request->input('min_salary');
        $maxSalary = $request->input('max_salary');

        // Joining Date Filters
        $fromDate = $request->input('from_date');
        $toDate = $request->input('to_date');

        // Sorting
        $sortBy = $request->input('sort_by', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');

        /*
        |--------------------------------------------------------------------------
        | Safe Sorting
        |--------------------------------------------------------------------------
        */

        $allowedSortColumns = [
            'employee_code',
            'name',
            'joining_date',
            'salary',
            'created_at',
        ];

        $allowedSortDirections = [
            'asc',
            'desc',
        ];

        if (! in_array($sortBy, $allowedSortColumns, true)) {
            $sortBy = 'created_at';
        }

        if (! in_array($sortDirection, $allowedSortDirections, true)) {
            $sortDirection = 'desc';
        }

        $employees = Employee::query()

            // Search
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where(
                        'employee_code',
                        'like',
                        "%{$search}%"
                    )
                        ->orWhere(
                            'name',
                            'like',
                            "%{$search}%"
                        )
                        ->orWhere(
                            'email',
                            'like',
                            "%{$search}%"
                        )
                        ->orWhere(
                            'phone',
                            'like',
                            "%{$search}%"
                        )
                        ->orWhere(
                            'department',
                            'like',
                            "%{$search}%"
                        )
                        ->orWhere(
                            'position',
                            'like',
                            "%{$search}%"
                        );
                });
            })

            // Department Filter
            ->when($department, function ($query, $department) {
                $query->where(
                    'department_code',
                    $department
                );
            })

            // Minimum Salary Filter
            ->when(
                $minSalary !== null && $minSalary !== '',
                function ($query) use ($minSalary) {
                    $query->where(
                        'salary',
                        '>=',
                        $minSalary
                    );
                }
            )

            // Maximum Salary Filter
            ->when(
                $maxSalary !== null && $maxSalary !== '',
                function ($query) use ($maxSalary) {
                    $query->where(
                        'salary',
                        '<=',
                        $maxSalary
                    );
                }
            )

            // Joining Date - From
            ->when(
                $fromDate !== null && $fromDate !== '',
                function ($query) use ($fromDate) {
                    $query->whereDate(
                        'joining_date',
                        '>=',
                        $fromDate
                    );
                }
            )

            // Joining Date - To
            ->when(
                $toDate !== null && $toDate !== '',
                function ($query) use ($toDate) {
                    $query->whereDate(
                        'joining_date',
                        '<=',
                        $toDate
                    );
                }
            )

            // Sorting
            ->orderBy(
                $sortBy,
                $sortDirection
            )

            // Pagination
            ->paginate(5)

            // Keep all filters and sorting during pagination
            ->withQueryString();

        $departments = Department::orderBy('name')->get([
            'id',
            'department_code',
            'name',
        ]);

        return Inertia::render('employees/index', [
            'employees' => $employees,

            'departments' => $departments,

            'filters' => [
                'search' => $search,
                'department' => $department,
                'min_salary' => $minSalary,
                'max_salary' => $maxSalary,

                // Joining Date Filters
                'from_date' => $fromDate,
                'to_date' => $toDate,

                // Sorting
                'sort_by' => $sortBy,
                'sort_direction' => $sortDirection,
            ],
        ]);
    }

    /**
     * Export employees to CSV.
     */
    public function exportCsv(Request $request)
    {
        $search = $request->input('search');
        $department = $request->input('department');
        $minSalary = $request->input('min_salary');
        $maxSalary = $request->input('max_salary');

        // Joining Date Filters
        $fromDate = $request->input('from_date');
        $toDate = $request->input('to_date');

        // Sorting
        $sortBy = $request->input('sort_by', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');

        /*
        |--------------------------------------------------------------------------
        | Safe Sorting
        |--------------------------------------------------------------------------
        */

        $allowedSortColumns = [
            'employee_code',
            'name',
            'joining_date',
            'salary',
            'created_at',
        ];

        $allowedSortDirections = [
            'asc',
            'desc',
        ];

        if (! in_array($sortBy, $allowedSortColumns, true)) {
            $sortBy = 'created_at';
        }

        if (! in_array($sortDirection, $allowedSortDirections, true)) {
            $sortDirection = 'desc';
        }

        /*
        |--------------------------------------------------------------------------
        | Employee Query
        |--------------------------------------------------------------------------
        */

        $employees = Employee::query()

            // Search
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where(
                        'employee_code',
                        'like',
                        "%{$search}%"
                    )
                        ->orWhere(
                            'name',
                            'like',
                            "%{$search}%"
                        )
                        ->orWhere(
                            'email',
                            'like',
                            "%{$search}%"
                        )
                        ->orWhere(
                            'phone',
                            'like',
                            "%{$search}%"
                        )
                        ->orWhere(
                            'department',
                            'like',
                            "%{$search}%"
                        )
                        ->orWhere(
                            'position',
                            'like',
                            "%{$search}%"
                        );
                });
            })

            // Department Filter
            ->when($department, function ($query, $department) {
                $query->where(
                    'department_code',
                    $department
                );
            })

            // Minimum Salary
            ->when(
                $minSalary !== null && $minSalary !== '',
                function ($query) use ($minSalary) {
                    $query->where(
                        'salary',
                        '>=',
                        $minSalary
                    );
                }
            )

            // Maximum Salary
            ->when(
                $maxSalary !== null && $maxSalary !== '',
                function ($query) use ($maxSalary) {
                    $query->where(
                        'salary',
                        '<=',
                        $maxSalary
                    );
                }
            )

            // Joining Date - From
            ->when(
                $fromDate !== null && $fromDate !== '',
                function ($query) use ($fromDate) {
                    $query->whereDate(
                        'joining_date',
                        '>=',
                        $fromDate
                    );
                }
            )

            // Joining Date - To
            ->when(
                $toDate !== null && $toDate !== '',
                function ($query) use ($toDate) {
                    $query->whereDate(
                        'joining_date',
                        '<=',
                        $toDate
                    );
                }
            )

            // Sorting
            ->orderBy(
                $sortBy,
                $sortDirection
            )

            // Get all matching employees
            ->get();

        /*
        |--------------------------------------------------------------------------
        | CSV Download
        |--------------------------------------------------------------------------
        */

        return response()->streamDownload(
            function () use ($employees) {

                $handle = fopen('php://output', 'w');

                // CSV Header
                fputcsv($handle, [
                    'Employee Code',
                    'Name',
                    'Email',
                    'Phone',
                    'Department',
                    'Position',
                    'Joining Date',
                    'Salary',
                    'Status',
                ]);

                // Employee Data
                foreach ($employees as $employee) {
                    fputcsv($handle, [
                        $employee->employee_code,
                        $employee->name,
                        $employee->email,
                        $employee->phone ?? '-',
                        $employee->department ?? '-',
                        $employee->position ?? '-',
                        $employee->joining_date
                            ? $employee->joining_date->format('d-m-Y')
                            : '-',
                        $employee->salary ?? '0',
                        strtoupper($employee->status),
                    ]);
                }

                fclose($handle);

            },
            'employees.csv',
            [
                'Content-Type' => 'text/csv; charset=UTF-8',
            ]
        );
    }

    /**
     * Show the form for creating a new employee.
     */
    public function create()
    {
        $departments = Department::orderBy('name')->get([
            'id',
            'department_code',
            'name',
        ]);

        return Inertia::render('employees/create', [
            'departments' => $departments,
        ]);
    }

    /**
     * Store a newly created employee.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_code' => [
                'required',
                'string',
                'max:50',
                'unique:employees,employee_code',
            ],

            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'email' => [
                'required',
                'email',
                'max:255',
                'unique:employees,email',
                'unique:users,email',
            ],

            'phone' => [
                'required',
                'string',
                'max:30',
                'unique:employees,phone',
            ],

            'department_code' => [
                'required',
                'string',
                'max:50',
            ],

            'department' => [
                'required',
                'string',
                'max:255',
            ],

            'position' => [
                'required',
                'string',
                'max:255',
            ],

            'joining_date' => [
                'required',
                'date',
            ],

            'salary' => [
                'required',
                'numeric',
                'min:0',
            ],

            'status' => [
                'required',
                'in:active,inactive',
            ],

            'photo' => [
                'required',
                'file',
                'mimes:jpg,jpeg,png,svg',
                'max:2048',
            ],
        ]);

        DB::transaction(function () use ($request, $validated) {

            // Create employee login account
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make('12345678'),
                'role' => 'employee',
            ]);

            // Store employee photo
            $photoPath = $request
                ->file('photo')
                ->store('employees', 'public');

            // Create employee
            Employee::create([
                'user_id' => $user->id,
                'employee_code' => $validated['employee_code'],
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'department_code' => $validated['department_code'],
                'department' => $validated['department'],
                'position' => $validated['position'],
                'joining_date' => $validated['joining_date'],
                'salary' => $validated['salary'],
                'status' => $validated['status'],
                'photo' => $photoPath,
            ]);
        });

        return redirect()
            ->route('employees.index')
            ->with(
                'success',
                'Employee inserted and employee login account created successfully.'
            );
    }

    /**
     * Display the specified employee.
     */
    public function show(Employee $employee)
    {
        return Inertia::render('employees/show', [
            'employee' => $employee,
        ]);
    }

    /**
     * Show the form for editing the specified employee.
     */
    public function edit(Employee $employee)
    {
        $departments = Department::orderBy('name')->get([
            'id',
            'department_code',
            'name',
        ]);

        return Inertia::render('employees/edit', [
            'employee' => $employee,
            'departments' => $departments,
        ]);
    }

    /**
     * Update the specified employee.
     */
    public function update(
        Request $request,
        Employee $employee
    ) {
        $userId = $employee->user_id;

        $validated = $request->validate([
            'employee_code' => [
                'required',
                'string',
                'max:50',
                Rule::unique(
                    'employees',
                    'employee_code'
                )->ignore($employee->id),
            ],

            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'email' => [
                'required',
                'email',
                'max:255',

                Rule::unique(
                    'employees',
                    'email'
                )->ignore($employee->id),

                Rule::unique(
                    'users',
                    'email'
                )->ignore($userId),
            ],

            'phone' => [
                'required',
                'string',
                'max:30',

                Rule::unique(
                    'employees',
                    'phone'
                )->ignore($employee->id),
            ],

            'department_code' => [
                'required',
                'string',
                'max:50',
            ],

            'department' => [
                'required',
                'string',
                'max:255',
            ],

            'position' => [
                'required',
                'string',
                'max:255',
            ],

            'joining_date' => [
                'required',
                'date',
            ],

            'salary' => [
                'required',
                'numeric',
                'min:0',
            ],

            'status' => [
                'required',
                'in:active,inactive',
            ],

            'photo' => [
                'nullable',
                'file',
                'mimes:jpg,jpeg,png,svg',
                'max:2048',
            ],
        ]);

        DB::transaction(function () use (
            $request,
            $validated,
            $employee
        ) {

            unset($validated['photo']);

            // Update photo if a new photo is uploaded
            if ($request->hasFile('photo')) {

                if ($employee->photo) {
                    Storage::disk('public')->delete(
                        $employee->photo
                    );
                }

                $validated['photo'] = $request
                    ->file('photo')
                    ->store('employees', 'public');
            }

            // Update employee
            $employee->update($validated);

            // Update linked login account
            if ($employee->user) {
                $employee->user->update([
                    'name' => $validated['name'],
                    'email' => $validated['email'],
                    'role' => 'employee',
                ]);
            }
        });

        return redirect()
            ->route('employees.index')
            ->with(
                'success',
                'Employee updated successfully.'
            );
    }

    /**
     * Display the logged-in employee's own profile.
     */
    public function myProfile(Request $request)
    {
        $employee = $request->user()->employee;

        if (! $employee) {
            abort(
                404,
                'Employee profile not found.'
            );
        }

        return Inertia::render(
            'employees/my-profile',
            [
                'employee' => $employee,
            ]
        );
    }

    /**
     * Remove the specified employee.
     */
    public function destroy(Employee $employee)
    {
        DB::transaction(function () use ($employee) {

            // Delete employee photo
            if ($employee->photo) {
                Storage::disk('public')->delete(
                    $employee->photo
                );
            }

            // Delete linked employee login account
            if ($employee->user) {
                $employee->user->delete();
            }

            // Delete employee
            $employee->delete();
        });

        return redirect()
            ->route('employees.index')
            ->with(
                'success',
                'Employee deleted successfully.'
            );
    }
}