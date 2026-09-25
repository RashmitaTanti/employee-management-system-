import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

type Employee = {
    id: number;
    employee_code: string;
    name: string;
    email: string;
    phone: string | null;
    department: string | null;
    position: string | null;
    joining_date: string | null;
    salary: string | null;
    status: 'active' | 'inactive';
    photo: string | null;
};

type Department = {
    id: number;
    department_code: string;
    name: string;
};

type EmployeesPageProps = {
    employees: {
        data: Employee[];
        current_page: number;
        last_page: number;
        total: number;
    };

    departments: Department[];

    filters?: {
        search?: string;
        department?: string;
        min_salary?: string;
        max_salary?: string;
        from_date?: string;
        to_date?: string;

        // Sorting
        sort_by?: string;
        sort_direction?: string;
    };
};

type PageProps = {
    flash: {
        success?: string;
    };
};

export default function Index({
    employees,
    departments,
    filters,
}: EmployeesPageProps) {
    const { flash } = usePage<PageProps>().props;

    /*
     * Search
     */
    const [search, setSearch] = useState(
        filters?.search ?? '',
    );

    /*
     * Department
     */
    const [department, setDepartment] = useState(
        filters?.department ?? '',
    );

    /*
     * Minimum Salary
     */
    const [minSalary, setMinSalary] = useState(
        filters?.min_salary ?? '',
    );

    /*
     * Maximum Salary
     */
    const [maxSalary, setMaxSalary] = useState(
        filters?.max_salary ?? '',
    );

    /*
     * Joining Date - From
     */
    const [fromDate, setFromDate] = useState(
        filters?.from_date ?? '',
    );

    /*
     * Joining Date - To
     */
    const [toDate, setToDate] = useState(
        filters?.to_date ?? '',
    );

    /*
     * Sorting
     */
    const [sortBy, setSortBy] = useState(
        filters?.sort_by ?? 'created_at',
    );

    const [sortDirection, setSortDirection] = useState(
        filters?.sort_direction ?? 'desc',
    );

    /*
     * Search + Department + Salary + Joining Date + Sorting
     *
     * Automatic AJAX-style request using Inertia.
     */
    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(
                '/employees',
                {
                    search: search || undefined,
                    department: department || undefined,
                    min_salary: minSalary || undefined,
                    max_salary: maxSalary || undefined,
                    from_date: fromDate || undefined,
                    to_date: toDate || undefined,

                    // Sorting
                    sort_by: sortBy || undefined,
                    sort_direction:
                        sortDirection || undefined,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                },
            );
        }, 400);

        return () => clearTimeout(timer);
    }, [
        search,
        department,
        minSalary,
        maxSalary,
        fromDate,
        toDate,
        sortBy,
        sortDirection,
    ]);

    /*
     * Pagination
     */
    const goToPage = (page: number) => {
        router.get(
            '/employees',
            {
                search: search || undefined,
                department: department || undefined,
                min_salary: minSalary || undefined,
                max_salary: maxSalary || undefined,
                from_date: fromDate || undefined,
                to_date: toDate || undefined,

                // Sorting
                sort_by: sortBy || undefined,
                sort_direction:
                    sortDirection || undefined,

                page,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    /*
     * Clear all filters
     */
    const clearFilters = () => {
        setSearch('');
        setDepartment('');
        setMinSalary('');
        setMaxSalary('');
        setFromDate('');
        setToDate('');

        // Reset sorting
        setSortBy('created_at');
        setSortDirection('desc');
    };

    /*
     * Check whether any filter is active
     */
    const hasFilters =
        search ||
        department ||
        minSalary ||
        maxSalary ||
        fromDate ||
        toDate;

    /*
     * Export CSV
     *
     * Sends the current filters and sorting options
     * to the Laravel exportCsv() method.
     */
    const exportCsv = () => {
        const params = new URLSearchParams();

        if (search) {
            params.append('search', search);
        }

        if (department) {
            params.append('department', department);
        }

        if (minSalary) {
            params.append('min_salary', minSalary);
        }

        if (maxSalary) {
            params.append('max_salary', maxSalary);
        }

        if (fromDate) {
            params.append('from_date', fromDate);
        }

        if (toDate) {
            params.append('to_date', toDate);
        }

        if (sortBy) {
            params.append('sort_by', sortBy);
        }

        if (sortDirection) {
            params.append(
                'sort_direction',
                sortDirection,
            );
        }

        const queryString = params.toString();

        window.location.href = queryString
            ? `/employees/export-csv?${queryString}`
            : '/employees/export-csv';
    };

    /*
     * Print Employee List
     *
     * Prints the currently displayed employee table.
     * The active filters and sorting are already reflected
     * in the current table.
     */
    const printEmployees = () => {
        window.print();
    };

    return (
        <>
            <Head title="Employees" />

            {/* =====================================================
                PRINT CSS
            ====================================================== */}
            <style>{`
                @media print {
                    @page {
                        size: A4 landscape;
                        margin: 12mm;
                    }

                    body {
                        background: white !important;
                    }

                    .no-print {
                        display: none !important;
                    }

                    .print-container {
                        width: 100% !important;
                        max-width: none !important;
                        padding: 0 !important;
                        margin: 0 !important;
                    }

                    .print-table-wrapper {
                        overflow: visible !important;
                        box-shadow: none !important;
                        border-radius: 0 !important;
                    }

                    .print-table {
                        width: 100% !important;
                        min-width: 0 !important;
                        border-collapse: collapse !important;
                    }

                    .print-table th,
                    .print-table td {
                        border: 1px solid #d1d5db !important;
                        padding: 8px !important;
                        font-size: 11px !important;
                    }

                    .print-table thead {
                        background: #1f2937 !important;
                    }

                    .print-table thead th {
                        color: white !important;
                    }

                    .print-title {
                        display: block !important;
                    }
                }

                .print-title {
                    display: none;
                }
            `}</style>

            <div className="min-h-screen bg-gray-100 p-6">
                <div className="print-container mx-auto max-w-7xl">

                    {/* =====================================================
                        PRINT ONLY TITLE
                    ====================================================== */}
                    <div className="print-title mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Employee List
                        </h1>

                        <p className="mt-1 text-sm text-gray-600">
                            Employee Management System
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                            Printed on:{' '}
                            {new Date().toLocaleDateString(
                                'en-IN',
                            )}
                        </p>
                    </div>

                    {/* =====================================================
                        SUCCESS MESSAGE
                    ====================================================== */}
                    {flash.success && (
                        <div
                            className="no-print mb-6 rounded-lg border border-green-200 bg-green-50 px-5 py-4 font-medium text-green-800"
                            role="alert"
                        >
                            ✓ {flash.success}
                        </div>
                    )}

                    {/* =====================================================
                        HEADER
                    ====================================================== */}
                    <div className="no-print mb-6 flex flex-col gap-4 rounded-xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">

                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Employees
                            </h1>

                            <p className="mt-1 text-gray-600">
                                Manage your employees
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">

                            {/* Dashboard */}
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center justify-center rounded-lg bg-slate-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-slate-800 hover:shadow-md"
                            >
                                ← Dashboard
                            </Link>

                            {/* Export CSV */}
                            <button
                                type="button"
                                onClick={exportCsv}
                                className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md"
                            >
                                ↓ Export CSV
                            </button>

                            {/* Print Employee List */}
                            <button
                                type="button"
                                onClick={printEmployees}
                                className="inline-flex items-center justify-center rounded-lg bg-violet-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-violet-700 hover:shadow-md"
                            >
                                🖨 Print Employee List
                            </button>

                            {/* Add Employee */}
                            <Link
                                href="/employees/create"
                                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
                            >
                                + Add Employee
                            </Link>

                        </div>
                    </div>

                    {/* =====================================================
                        FILTER SECTION
                    ====================================================== */}
                    <div className="no-print mb-6 rounded-xl bg-white p-5 shadow-sm">

                        {/* =================================================
                            SEARCH + DEPARTMENT
                        ================================================== */}
                        <div className="grid gap-4 md:grid-cols-2">

                            {/* Search */}
                            <div>
                                <label
                                    htmlFor="employee-search"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Search Employees
                                </label>

                                <div className="relative">
                                    <input
                                        id="employee-search"
                                        type="text"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Search by code, name, email, phone, department or position..."
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-10 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    />

                                    {/* Clear Search */}
                                    {search && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setSearch('')
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-400 hover:text-gray-700"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Department Filter */}
                            <div>
                                <label
                                    htmlFor="department-filter"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Filter by Department
                                </label>

                                <select
                                    id="department-filter"
                                    value={department}
                                    onChange={(e) =>
                                        setDepartment(
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                >
                                    <option value="">
                                        All Departments
                                    </option>

                                    {departments.map((item) => (
                                        <option
                                            key={item.id}
                                            value={
                                                item.department_code
                                            }
                                        >
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                        </div>

                        {/* =================================================
                            SALARY RANGE
                        ================================================== */}
                        <div className="mt-4">

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Filter by Salary Range
                            </label>

                            <div className="grid gap-4 sm:grid-cols-2">

                                {/* Minimum Salary */}
                                <div>
                                    <label
                                        htmlFor="min-salary"
                                        className="mb-1 block text-sm text-gray-600"
                                    >
                                        Minimum Salary
                                    </label>

                                    <input
                                        id="min-salary"
                                        type="number"
                                        min="500"
                                        max="100000"
                                        value={minSalary}
                                        onChange={(e) =>
                                            setMinSalary(
                                                e.target.value,
                                            )
                                        }
                                        placeholder="500"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    />

                                    <p className="mt-1 text-xs text-gray-500">
                                        Minimum: ₹500
                                    </p>
                                </div>

                                {/* Maximum Salary */}
                                <div>
                                    <label
                                        htmlFor="max-salary"
                                        className="mb-1 block text-sm text-gray-600"
                                    >
                                        Maximum Salary
                                    </label>

                                    <input
                                        id="max-salary"
                                        type="number"
                                        min="500"
                                        max="100000"
                                        value={maxSalary}
                                        onChange={(e) =>
                                            setMaxSalary(
                                                e.target.value,
                                            )
                                        }
                                        placeholder="100000"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    />

                                    <p className="mt-1 text-xs text-gray-500">
                                        Maximum: ₹100,000
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* =================================================
                            JOINING DATE FILTER
                        ================================================== */}
                        <div className="mt-4">

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Filter by Joining Date
                            </label>

                            <div className="grid gap-4 sm:grid-cols-2">

                                {/* From Date */}
                                <div>
                                    <label
                                        htmlFor="from-date"
                                        className="mb-1 block text-sm text-gray-600"
                                    >
                                        From Joining Date
                                    </label>

                                    <input
                                        id="from-date"
                                        type="date"
                                        value={fromDate}
                                        max={
                                            toDate || undefined
                                        }
                                        onChange={(e) =>
                                            setFromDate(
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    />
                                </div>

                                {/* To Date */}
                                <div>
                                    <label
                                        htmlFor="to-date"
                                        className="mb-1 block text-sm text-gray-600"
                                    >
                                        To Joining Date
                                    </label>

                                    <input
                                        id="to-date"
                                        type="date"
                                        value={toDate}
                                        min={
                                            fromDate || undefined
                                        }
                                        onChange={(e) =>
                                            setToDate(
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    />
                                </div>

                            </div>
                        </div>

                        {/* =================================================
                            SORTING
                        ================================================== */}
                        <div className="mt-4">

                            <label
                                htmlFor="sort-by"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                Sort Employees
                            </label>

                            <select
                                id="sort-by"
                                value={`${sortBy}:${sortDirection}`}
                                onChange={(e) => {
                                    const [
                                        newSortBy,
                                        newSortDirection,
                                    ] =
                                        e.target.value.split(':');

                                    setSortBy(newSortBy);
                                    setSortDirection(
                                        newSortDirection,
                                    );
                                }}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            >
                                <option value="created_at:desc">
                                    Sort By
                                </option>

                                <option value="name:asc">
                                    Name: A → Z
                                </option>

                                <option value="name:desc">
                                    Name: Z → A
                                </option>

                                <option value="employee_code:asc">
                                    Employee Code: A → Z
                                </option>

                                <option value="employee_code:desc">
                                    Employee Code: Z → A
                                </option>

                                <option value="joining_date:asc">
                                    Joining Date: Oldest → Newest
                                </option>

                                <option value="joining_date:desc">
                                    Joining Date: Newest → Oldest
                                </option>

                                <option value="salary:asc">
                                    Salary: Low → High
                                </option>

                                <option value="salary:desc">
                                    Salary: High → Low
                                </option>
                            </select>

                        </div>

                        {/* =================================================
                            CLEAR FILTERS
                        ================================================== */}
                        {hasFilters && (
                            <div className="mt-4">
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="rounded-lg bg-gray-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}

                    </div>

                    {/* =====================================================
                        EMPLOYEE TABLE
                    ====================================================== */}
                    <div className="print-table-wrapper overflow-hidden rounded-xl bg-white shadow-sm">

                        <div className="overflow-x-auto">

                            <table className="print-table w-full min-w-[900px]">

                                {/* Table Header */}
                                <thead className="bg-gray-800">
                                    <tr>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                                            Code
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                                            Name
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                                            Email
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                                            Department
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                                            Position
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                                            Status
                                        </th>

                                        <th className="no-print px-6 py-4 text-left text-sm font-semibold text-white">
                                            Actions
                                        </th>

                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody className="divide-y divide-gray-200">

                                    {employees.data.length > 0 ? (
                                        employees.data.map(
                                            (employee) => (
                                                <tr
                                                    key={employee.id}
                                                    className="transition hover:bg-gray-50"
                                                >

                                                    {/* Code */}
                                                    <td className="px-6 py-4 text-sm font-semibold text-gray-700">
                                                        {
                                                            employee.employee_code
                                                        }
                                                    </td>

                                                    {/* Name */}
                                                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                                        {employee.name}
                                                    </td>

                                                    {/* Email */}
                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {employee.email}
                                                    </td>

                                                    {/* Department */}
                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {employee.department ||
                                                            '-'}
                                                    </td>

                                                    {/* Position */}
                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {employee.position ||
                                                            '-'}
                                                    </td>

                                                    {/* Status */}
                                                    <td className="px-6 py-4">

                                                        <span
                                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                                                                employee.status ===
                                                                'active'
                                                                    ? 'bg-green-100 text-green-700'
                                                                    : 'bg-red-100 text-red-700'
                                                            }`}
                                                        >
                                                            {
                                                                employee.status
                                                            }
                                                        </span>

                                                    </td>

                                                    {/* Actions */}
                                                    <td className="no-print px-6 py-4">

                                                        <div className="flex flex-wrap gap-2">

                                                            {/* View */}
                                                            <Link
                                                                href={`/employees/${employee.id}`}
                                                                className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                                                            >
                                                                👁 View
                                                            </Link>

                                                            {/* Edit */}
                                                            <Link
                                                                href={`/employees/${employee.id}/edit`}
                                                                className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                                                            >
                                                                ✏ Edit
                                                            </Link>

                                                            {/* Delete */}
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const confirmed =
                                                                        window.confirm(
                                                                            `Are you sure you want to delete ${employee.name}?`,
                                                                        );

                                                                    if (
                                                                        confirmed
                                                                    ) {
                                                                        router.delete(
                                                                            `/employees/${employee.id}`,
                                                                        );
                                                                    }
                                                                }}
                                                                className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                                                            >
                                                                🗑 Delete
                                                            </button>

                                                        </div>

                                                    </td>

                                                </tr>
                                            ),
                                        )
                                    ) : (

                                        /* No Employees */
                                        <tr>

                                            <td
                                                colSpan={7}
                                                className="px-6 py-12 text-center"
                                            >

                                                <div className="text-4xl">
                                                    👥
                                                </div>

                                                <p className="mt-3 font-semibold text-gray-700">
                                                    No employees found.
                                                </p>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    {hasFilters
                                                        ? 'Try different filters.'
                                                        : 'Add your first employee to get started.'}
                                                </p>

                                                {!hasFilters && (
                                                    <Link
                                                        href="/employees/create"
                                                        className="no-print mt-5 inline-flex rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                                                    >
                                                        + Add Employee
                                                    </Link>
                                                )}

                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                        {/* =================================================
                            PAGINATION FOOTER
                        ================================================== */}
                        <div className="no-print flex flex-col gap-4 border-t border-gray-200 bg-gray-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">

                            {/* Showing Count */}
                            <div className="text-sm font-medium text-gray-600">

                                Showing{' '}

                                <span className="font-bold text-gray-900">
                                    {employees.data.length}
                                </span>{' '}

                                of{' '}

                                <span className="font-bold text-gray-900">
                                    {employees.total}
                                </span>{' '}

                                employees

                            </div>

                            {/* Pagination */}
                            {employees.last_page > 1 && (
                                <div className="flex items-center gap-2">

                                    {/* Previous */}
                                    <button
                                        type="button"
                                        disabled={
                                            employees.current_page ===
                                            1
                                        }
                                        onClick={() =>
                                            goToPage(
                                                employees.current_page -
                                                    1,
                                            )
                                        }
                                        className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                                            employees.current_page ===
                                            1
                                                ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                                                : 'bg-white text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-100'
                                        }`}
                                    >
                                        ← Previous
                                    </button>

                                    {/* Page Numbers */}
                                    <div className="flex items-center gap-1">

                                        {Array.from(
                                            {
                                                length:
                                                    employees.last_page,
                                            },
                                            (_, index) =>
                                                index + 1,
                                        ).map((page) => (
                                            <button
                                                key={page}
                                                type="button"
                                                onClick={() =>
                                                    goToPage(
                                                        page,
                                                    )
                                                }
                                                className={`min-w-10 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                                                    employees.current_page ===
                                                    page
                                                        ? 'bg-blue-600 text-white shadow-sm'
                                                        : 'bg-white text-gray-700 ring-1 ring-gray-300 hover:bg-gray-100'
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        ))}

                                    </div>

                                    {/* Next */}
                                    <button
                                        type="button"
                                        disabled={
                                            employees.current_page ===
                                            employees.last_page
                                        }
                                        onClick={() =>
                                            goToPage(
                                                employees.current_page +
                                                    1,
                                            )
                                        }
                                        className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                                            employees.current_page ===
                                            employees.last_page
                                                ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                                                : 'bg-blue-600 text-white shadow-sm hover:bg-blue-700'
                                        }`}
                                    >
                                        Next →
                                    </button>

                                </div>
                            )}

                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}