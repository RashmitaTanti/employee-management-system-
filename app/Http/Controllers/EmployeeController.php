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
        $fromDate = $request->input('from_date');
        $toDate = $request->input('to_date');

        $sortBy = $request->input('sort_by', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');

        [$sortBy, $sortDirection] = $this->validateSorting(
            $sortBy,
            $sortDirection
        );

        $employees = $this->employeeQuery(
            $search,
            $department,
            $minSalary,
            $maxSalary,
            $fromDate,
            $toDate,
            $sortBy,
            $sortDirection
        )
            ->paginate(5)
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
                'from_date' => $fromDate,
                'to_date' => $toDate,
                'sort_by' => $sortBy,
                'sort_direction' => $sortDirection,
            ],
        ]);
    }

    /**
     * Print all employees matching current filters.
     *
     * IMPORTANT:
     * No pagination is used.
     */
    public function printEmployeeList(Request $request)
    {
        $search = $request->input('search');
        $department = $request->input('department');
        $minSalary = $request->input('min_salary');
        $maxSalary = $request->input('max_salary');
        $fromDate = $request->input('from_date');
        $toDate = $request->input('to_date');

        $sortBy = $request->input('sort_by', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');

        [$sortBy, $sortDirection] = $this->validateSorting(
            $sortBy,
            $sortDirection
        );

        /*
         * IMPORTANT:
         * get() is used instead of paginate().
         * Therefore ALL matching employees are printed.
         */
        $employees = $this->employeeQuery(
            $search,
            $department,
            $minSalary,
            $maxSalary,
            $fromDate,
            $toDate,
            $sortBy,
            $sortDirection
        )->get();

        return Inertia::render('employees/print', [
            'employees' => $employees,

            'filters' => [
                'search' => $search,
                'department' => $department,
                'min_salary' => $minSalary,
                'max_salary' => $maxSalary,
                'from_date' => $fromDate,
                'to_date' => $toDate,
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
        $fromDate = $request->input('from_date');
        $toDate = $request->input('to_date');

        $sortBy = $request->input('sort_by', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');

        [$sortBy, $sortDirection] = $this->validateSorting(
            $sortBy,
            $sortDirection
        );

        $employees = $this->employeeQuery(
            $search,
            $department,
            $minSalary,
            $maxSalary,
            $fromDate,
            $toDate,
            $sortBy,
            $sortDirection
        )->get();

        return response()->streamDownload(
            function () use ($employees) {
                $handle = fopen('php://output', 'w');

                /*
                 * CSV Header
                 */
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

                /*
                 * Employee Data
                 */
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
                'exists:departments,department_code',
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

        /*
         * Get department from Department Management.
         */
        $department = Department::where(
            'department_code',
            $validated['department_code']
        )->firstOrFail();

        DB::transaction(function () use (
            $request,
            $validated,
            $department
        ) {
            /*
             * Create employee login account.
             *
             * Default password:
             * 12345678
             */
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make('12345678'),
                'role' => 'employee',
            ]);

            /*
             * Store employee photo.
             */
            $photoPath = $request
                ->file('photo')
                ->store('employees', 'public');

            /*
             * Create employee.
             */
            Employee::create([
                'user_id' => $user->id,

                'employee_code' => $validated['employee_code'],

                'name' => $validated['name'],

                'email' => $validated['email'],

                'phone' => $validated['phone'],

                'department_code' => $department->department_code,

                'department' => $department->name,

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
                'exists:departments,department_code',
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

        /*
         * Get department from Department Management.
         */
        $department = Department::where(
            'department_code',
            $validated['department_code']
        )->firstOrFail();

        DB::transaction(function () use (
            $request,
            $validated,
            $employee,
            $department
        ) {
            /*
             * Photo is handled separately.
             */
            unset($validated['photo']);

            /*
             * Always use department data
             * from Department Management.
             */
            $validated['department_code'] =
                $department->department_code;

            $validated['department'] =
                $department->name;

            /*
             * Update photo if a new photo was uploaded.
             */
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

            /*
             * Update employee.
             */
            $employee->update($validated);

            /*
             * Update linked login account.
             */
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
     * Display logged-in employee's own profile.
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

            /*
             * Delete employee photo.
             */
            if ($employee->photo) {
                Storage::disk('public')->delete(
                    $employee->photo
                );
            }

            /*
             * Delete linked login account.
             */
            if ($employee->user) {
                $employee->user->delete();
            }

            /*
             * Delete employee.
             */
            $employee->delete();
        });

        return redirect()
            ->route('employees.index')
            ->with(
                'success',
                'Employee deleted successfully.'
            );
    }

    /**
     * Build employee query with filters and sorting.
     */
    private function employeeQuery(
        ?string $search,
        ?string $department,
        ?string $minSalary,
        ?string $maxSalary,
        ?string $fromDate,
        ?string $toDate,
        string $sortBy,
        string $sortDirection
    ) {
        return Employee::query()

            /*
             * Search
             */
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

            /*
             * Department
             */
            ->when($department, function (
                $query,
                $department
            ) {
                $query->where(
                    'department_code',
                    $department
                );
            })

            /*
             * Minimum Salary
             */
            ->when(
                $minSalary !== null &&
                $minSalary !== '',
                function ($query) use ($minSalary) {
                    $query->where(
                        'salary',
                        '>=',
                        $minSalary
                    );
                }
            )

            /*
             * Maximum Salary
             */
            ->when(
                $maxSalary !== null &&
                $maxSalary !== '',
                function ($query) use ($maxSalary) {
                    $query->where(
                        'salary',
                        '<=',
                        $maxSalary
                    );
                }
            )

            /*
             * Joining Date From
             */
            ->when(
                $fromDate !== null &&
                $fromDate !== '',
                function ($query) use ($fromDate) {
                    $query->whereDate(
                        'joining_date',
                        '>=',
                        $fromDate
                    );
                }
            )

            /*
             * Joining Date To
             */
            ->when(
                $toDate !== null &&
                $toDate !== '',
                function ($query) use ($toDate) {
                    $query->whereDate(
                        'joining_date',
                        '<=',
                        $toDate
                    );
                }
            )

            /*
             * Sorting
             */
            ->orderBy(
                $sortBy,
                $sortDirection
            );
    }

    /**
     * Validate sorting parameters.
     */
    private function validateSorting(
        ?string $sortBy,
        ?string $sortDirection
    ): array {
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

        if (
            ! in_array(
                $sortBy,
                $allowedSortColumns,
                true
            )
        ) {
            $sortBy = 'created_at';
        }

        if (
            ! in_array(
                $sortDirection,
                $allowedSortDirections,
                true
            )
        ) {
            $sortDirection = 'desc';
        }

        return [
            $sortBy,
            $sortDirection,
        ];
    }
}