<?php

use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\EmployeeController;
use App\Models\Employee;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    */

    Route::get('dashboard', function (\Illuminate\Http\Request $request) {

        $user = $request->user();

        /*
        |--------------------------------------------------------------------------
        | Only this email is Admin
        |--------------------------------------------------------------------------
        */

        $isAdmin = $user->email === 'rashmita@gmail.com';


        /*
        |--------------------------------------------------------------------------
        | Non-Admin User
        |--------------------------------------------------------------------------
        |
        | Every non-admin user must have a linked Employee record.
        | If no Employee record exists, they cannot access Dashboard.
        |
        */

        if (! $isAdmin) {

            if (! $user->employee) {
                abort(403, 'Employee account not found.');
            }

            return Inertia::render('dashboard', [
                'stats' => null,

                'recentEmployees' => [],

                'user' => [
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => 'employee',
                ],
            ]);
        }


        /*
        |--------------------------------------------------------------------------
        | Admin Dashboard
        |--------------------------------------------------------------------------
        |
        | Admin is identified only by:
        |
        | rashmita@gmail.com
        |
        | Admin does NOT need to exist in the employees table.
        |
        */

        // Total Employees
        $totalEmployees = Employee::count();


        // Active Employees
        $activeEmployees = Employee::where(
            'status',
            'active'
        )->count();


        // Inactive Employees
        $inactiveEmployees = Employee::where(
            'status',
            'inactive'
        )->count();


        // Total Used Departments
        // Count unique departments currently assigned to employees
        $totalDepartments = Employee::whereNotNull(
            'department_code'
        )
            ->where(
                'department_code',
                '!=',
                ''
            )
            ->distinct()
            ->count('department_code');


        // Recent Employees
        $recentEmployees = Employee::latest()
            ->take(5)
            ->get([
                'id',
                'employee_code',
                'name',
                'email',
                'department',
                'position',
                'status',
            ]);


        return Inertia::render('dashboard', [

            'stats' => [
                'totalEmployees' => $totalEmployees,
                'activeEmployees' => $activeEmployees,
                'inactiveEmployees' => $inactiveEmployees,
                'totalDepartments' => $totalDepartments,
            ],

            'recentEmployees' => $recentEmployees,

            // Logged-in Admin information
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'role' => 'admin',
            ],
        ]);

    })->name('dashboard');


    /*
    |--------------------------------------------------------------------------
    | Employee My Profile
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/my-profile',
        [EmployeeController::class, 'myProfile']
    )->name('employee.my-profile');


    /*
    |--------------------------------------------------------------------------
    | Admin Only Routes
    |--------------------------------------------------------------------------
    */

    Route::middleware('admin')->group(function () {

        /*
        |--------------------------------------------------------------------------
        | Export Employees CSV
        |--------------------------------------------------------------------------
        */

        Route::get(
            'employees/export-csv',
            [EmployeeController::class, 'exportCsv']
        )->name('employees.export-csv');


        /*
        |--------------------------------------------------------------------------
        | Print Employees
        |--------------------------------------------------------------------------
        |
        | This route must come BEFORE the employee resource route.
        |
        */

        Route::get(
            'employees/print',
            [EmployeeController::class, 'printEmployeeList']
        )->name('employees.print');


        /*
        |--------------------------------------------------------------------------
        | Employee Management
        |--------------------------------------------------------------------------
        */

        Route::resource(
            'employees',
            EmployeeController::class
        );


        /*
        |--------------------------------------------------------------------------
        | Department Management
        |--------------------------------------------------------------------------
        */

        Route::resource(
            'departments',
            DepartmentController::class
        );
    });
});


/*
|--------------------------------------------------------------------------
| Additional Routes
|--------------------------------------------------------------------------
*/

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';