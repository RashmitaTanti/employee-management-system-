<?php

use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\EmployeeController;
use App\Models\Employee;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    */

    Route::get('dashboard', function (\Illuminate\Http\Request $request) {

        // Total Employees
        $totalEmployees = Employee::count();

        // Active Employees
        $activeEmployees = Employee::where('status', 'active')->count();

        // Inactive Employees
        $inactiveEmployees = Employee::where('status', 'inactive')->count();

        // Total Used Departments
        // Count unique departments currently assigned to employees
        $totalDepartments = Employee::whereNotNull('department_code')
            ->where('department_code', '!=' , '')
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

            // Logged-in user information
            'user' => [
                'name' => $request->user()->name,
                'email' => $request->user()->email,
                'role' => $request->user()->role,
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


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';