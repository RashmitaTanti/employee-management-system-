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

    const [search, setSearch] = useState(
        filters?.search ?? '',
    );

    const [department, setDepartment] = useState(
        filters?.department ?? '',
    );

    const [minSalary, setMinSalary] = useState(
        filters?.min_salary ?? '',
    );

    const [maxSalary, setMaxSalary] = useState(
        filters?.max_salary ?? '',
    );

    const [fromDate, setFromDate] = useState(
        filters?.from_date ?? '',
    );

    const [toDate, setToDate] = useState(
        filters?.to_date ?? '',
    );

    const [sortBy, setSortBy] = useState(
        filters?.sort_by ?? 'created_at',
    );

    const [sortDirection, setSortDirection] = useState(
        filters?.sort_direction ?? 'desc',
    );

    /*
    |--------------------------------------------------------------------------
    | AJAX STYLE FILTERING
    |--------------------------------------------------------------------------
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
    |--------------------------------------------------------------------------
    | PAGINATION
    |--------------------------------------------------------------------------
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
    |--------------------------------------------------------------------------
    | CLEAR FILTERS
    |--------------------------------------------------------------------------
    */

    const clearFilters = () => {
        setSearch('');
        setDepartment('');
        setMinSalary('');
        setMaxSalary('');
        setFromDate('');
        setToDate('');
        setSortBy('created_at');
        setSortDirection('desc');
    };

    /*
    |--------------------------------------------------------------------------
    | FILTER STATUS
    |--------------------------------------------------------------------------
    */

    const hasFilters =
        Boolean(search) ||
        Boolean(department) ||
        Boolean(minSalary) ||
        Boolean(maxSalary) ||
        Boolean(fromDate) ||
        Boolean(toDate);

    const activeFilterCount = [
        search,
        department,
        minSalary,
        maxSalary,
        fromDate,
        toDate,
    ].filter(Boolean).length;

    /*
    |--------------------------------------------------------------------------
    | EXPORT CSV
    |--------------------------------------------------------------------------
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
    |--------------------------------------------------------------------------
    | PRINT EMPLOYEE LIST
    |--------------------------------------------------------------------------
    */

    const printEmployees = () => {
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

        const printUrl = queryString
            ? `/employees/print?${queryString}`
            : '/employees/print';

        window.open(printUrl, '_blank');
    };

    return (
        <>
            <Head title="Employees" />

            <style>{`
                .glossy-page {
                    background:
                        radial-gradient(
                            circle at top left,
                            rgba(59, 130, 246, 0.16),
                            transparent 32%
                        ),
                        radial-gradient(
                            circle at top right,
                            rgba(139, 92, 246, 0.14),
                            transparent 30%
                        ),
                        linear-gradient(
                            135deg,
                            #f8fafc 0%,
                            #eef2ff 50%,
                            #f8fafc 100%
                        );
                }

                .glossy-card {
                    background: rgba(255, 255, 255, 0.92);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border: 1px solid rgba(255, 255, 255, 0.8);
                    box-shadow:
                        0 20px 45px rgba(15, 23, 42, 0.08),
                        inset 0 1px 0 rgba(255, 255, 255, 0.9);
                }

                .glossy-input {
                    background:
                        linear-gradient(
                            135deg,
                            rgba(248, 250, 252, 0.95),
                            rgba(255, 255, 255, 0.98)
                        );
                    box-shadow:
                        inset 0 1px 2px rgba(15, 23, 42, 0.04),
                        0 4px 14px rgba(15, 23, 42, 0.04);
                }

                .glossy-input:hover {
                    box-shadow:
                        0 6px 18px rgba(59, 130, 246, 0.08),
                        inset 0 1px 2px rgba(15, 23, 42, 0.04);
                }

                .glossy-input:focus {
                    box-shadow:
                        0 0 0 4px rgba(59, 130, 246, 0.12),
                        0 8px 24px rgba(59, 130, 246, 0.10);
                }

                .glossy-button {
                    box-shadow:
                        0 8px 20px rgba(15, 23, 42, 0.12),
                        inset 0 1px 0 rgba(255, 255, 255, 0.25);
                }

                .glossy-button:hover {
                    transform: translateY(-1px);
                    box-shadow:
                        0 12px 26px rgba(15, 23, 42, 0.18),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3);
                }

                .filter-section {
                    position: relative;
                    overflow: hidden;
                }

                .filter-section::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: linear-gradient(
                        90deg,
                        #3b82f6,
                        #8b5cf6,
                        #06b6d4,
                        #10b981
                    );
                }

                .filter-box {
                    background:
                        linear-gradient(
                            135deg,
                            rgba(255, 255, 255, 0.95),
                            rgba(248, 250, 252, 0.9)
                        );
                    border: 1px solid rgba(226, 232, 240, 0.9);
                    box-shadow:
                        inset 0 1px 0 rgba(255, 255, 255, 0.9),
                        0 8px 25px rgba(15, 23, 42, 0.04);
                }

                .gradient-icon {
                    box-shadow:
                        0 8px 20px rgba(59, 130, 246, 0.16),
                        inset 0 1px 0 rgba(255, 255, 255, 0.7);
                }

                .table-row:hover {
                    background: linear-gradient(
                        90deg,
                        rgba(239, 246, 255, 0.8),
                        rgba(245, 243, 255, 0.65)
                    );
                }

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

            <div className="glossy-page min-h-screen p-4 sm:p-6">
                <div className="print-container mx-auto max-w-7xl">

                    {/* PRINT TITLE */}

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

                    {/* SUCCESS MESSAGE */}

                    {flash.success && (
                        <div className="no-print mb-6 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-white px-5 py-4 font-semibold text-emerald-800 shadow-sm">
                            ✓ {flash.success}
                        </div>
                    )}

                    {/* =====================================================
                        PAGE HEADER
                    ====================================================== */}

                    <div className="no-print glossy-card mb-6 overflow-hidden rounded-3xl">

                        <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 px-6 py-7 sm:px-8">

                            <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-blue-400/20 blur-3xl" />

                            <div className="absolute -bottom-24 left-1/3 h-52 w-52 rounded-full bg-violet-400/20 blur-3xl" />

                            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                                <div>
                                    <div className="flex items-center gap-4">

                                        <div className="gradient-icon flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl ring-1 ring-white/20">
                                            👥
                                        </div>

                                        <div>
                                            <h1 className="text-3xl font-black tracking-tight text-white">
                                                Employees
                                            </h1>

                                            <p className="mt-1 text-sm text-blue-100">
                                                Manage and search your employees
                                            </p>
                                        </div>

                                    </div>
                                </div>

                                <div className="relative flex flex-wrap gap-2">

                                    <Link
                                        href="/dashboard"
                                        className="glossy-button inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
                                    >
                                        ← Dashboard
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={exportCsv}
                                        className="glossy-button inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-2.5 text-sm font-semibold text-white transition-all"
                                    >
                                        ↓ Export CSV
                                    </button>

                                    <button
                                        type="button"
                                        onClick={printEmployees}
                                        className="glossy-button inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition-all"
                                    >
                                        🖨 Print
                                    </button>

                                    <Link
                                        href="/employees/create"
                                        className="glossy-button inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-all"
                                    >
                                        + Add Employee
                                    </Link>

                                </div>

                            </div>
                        </div>

                        <div className="grid grid-cols-2 divide-x border-t border-slate-100 bg-white/80 sm:grid-cols-4">

                            <div className="px-5 py-5">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Total Employees
                                </p>

                                <p className="mt-1 text-2xl font-black text-slate-900">
                                    {employees.total}
                                </p>
                            </div>

                            <div className="px-5 py-5">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Current Page
                                </p>

                                <p className="mt-1 text-2xl font-black text-slate-900">
                                    {employees.current_page}
                                </p>
                            </div>

                            <div className="px-5 py-5">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Departments
                                </p>

                                <p className="mt-1 text-2xl font-black text-slate-900">
                                    {departments.length}
                                </p>
                            </div>

                            <div className="bg-blue-50/40 px-5 py-5">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Active Filters
                                </p>

                                <p className="mt-1 text-2xl font-black text-blue-600">
                                    {activeFilterCount}
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* =====================================================
                        SEARCH & FILTER PANEL
                    ====================================================== */}

                    <div className="no-print filter-section glossy-card mb-6 rounded-3xl">

                        {/* FILTER HEADER */}

                        <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:px-7">

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                <div className="flex items-center gap-3">

                                    <div className="gradient-icon flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 text-xl">
                                        🎛️
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-black text-slate-900">
                                            Search & Filters
                                        </h2>

                                        <p className="text-xs text-slate-500">
                                            Quickly find the employees you need
                                        </p>
                                    </div>

                                </div>

                                {hasFilters && (
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="glossy-button inline-flex w-fit items-center gap-2 rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-white px-4 py-2.5 text-sm font-bold text-red-600 transition-all hover:border-red-300 hover:bg-red-100"
                                    >
                                        ↺ Clear Filters
                                    </button>
                                )}

                            </div>
                        </div>

                        {/* FILTER CONTENT */}

                        <div className="space-y-5 p-5 sm:p-7">

                            {/* SEARCH + DEPARTMENT */}

                            <div className="grid gap-5 lg:grid-cols-2">

                                {/* SEARCH */}

                                <div className="filter-box rounded-2xl p-4">

                                    <label
                                        htmlFor="employee-search"
                                        className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-700"
                                    >
                                        <span className="gradient-icon flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-sm">
                                            🔎
                                        </span>

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
                                            className="glossy-input w-full rounded-xl border border-slate-200 px-4 py-3.5 pr-12 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
                                        />

                                        {search && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSearch('')
                                                }
                                                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-slate-100 text-lg font-bold text-slate-500 transition hover:bg-red-100 hover:text-red-600"
                                                aria-label="Clear search"
                                            >
                                                ×
                                            </button>
                                        )}

                                    </div>
                                </div>

                                {/* DEPARTMENT */}

                                <div className="filter-box rounded-2xl p-4">

                                    <label
                                        htmlFor="department-filter"
                                        className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-700"
                                    >
                                        <span className="gradient-icon flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-sm">
                                            🏢
                                        </span>

                                        Filter by Department
                                    </label>

                                    <div className="relative">

                                        <select
                                            id="department-filter"
                                            value={department}
                                            onChange={(e) =>
                                                setDepartment(
                                                    e.target.value,
                                                )
                                            }
                                            className="glossy-input w-full appearance-none rounded-xl border border-slate-200 px-4 py-3.5 pr-12 text-sm font-medium text-slate-800 outline-none transition-all focus:border-purple-500 focus:bg-white"
                                        >
                                            <option value="">
                                                All Departments
                                            </option>

                                            {departments.map(
                                                (item) => (
                                                    <option
                                                        key={
                                                            item.id
                                                        }
                                                        value={
                                                            item.department_code
                                                        }
                                                    >
                                                        {item.name}
                                                    </option>
                                                ),
                                            )}
                                        </select>

                                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                                            ▾
                                        </span>

                                    </div>
                                </div>

                            </div>

                            {/* SALARY */}

                            <div className="filter-box rounded-2xl border-emerald-100 bg-gradient-to-br from-emerald-50/80 via-white to-green-50/40 p-5">

                                <div className="mb-4 flex items-center gap-3">

                                    <div className="gradient-icon flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-green-200 text-lg">
                                        💰
                                    </div>

                                    <div>
                                        <h3 className="font-black text-slate-900">
                                            Filter by Salary Range
                                        </h3>

                                        <p className="text-xs text-slate-500">
                                            Set minimum and maximum salary
                                        </p>
                                    </div>

                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">

                                    {/* MINIMUM */}

                                    <div>
                                        <label
                                            htmlFor="min-salary"
                                            className="mb-2 block text-sm font-bold text-slate-600"
                                        >
                                            Minimum Salary
                                        </label>

                                        <div className="relative">

                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-emerald-600">
                                                ₹
                                            </span>

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
                                                className="glossy-input w-full rounded-xl border border-emerald-100 bg-white py-3.5 pl-9 pr-4 text-sm font-semibold text-slate-900 outline-none transition-all focus:border-emerald-500"
                                            />

                                        </div>

                                        <p className="mt-2 text-xs font-medium text-slate-400">
                                            Minimum: ₹500
                                        </p>
                                    </div>

                                    {/* MAXIMUM */}

                                    <div>
                                        <label
                                            htmlFor="max-salary"
                                            className="mb-2 block text-sm font-bold text-slate-600"
                                        >
                                            Maximum Salary
                                        </label>

                                        <div className="relative">

                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-emerald-600">
                                                ₹
                                            </span>

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
                                                className="glossy-input w-full rounded-xl border border-emerald-100 bg-white py-3.5 pl-9 pr-4 text-sm font-semibold text-slate-900 outline-none transition-all focus:border-emerald-500"
                                            />

                                        </div>

                                        <p className="mt-2 text-xs font-medium text-slate-400">
                                            Maximum: ₹100,000
                                        </p>
                                    </div>

                                </div>
                            </div>

                            {/* JOINING DATE */}

                            <div className="filter-box rounded-2xl border-orange-100 bg-gradient-to-br from-orange-50/80 via-white to-amber-50/40 p-5">

                                <div className="mb-4 flex items-center gap-3">

                                    <div className="gradient-icon flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-amber-200 text-lg">
                                        📅
                                    </div>

                                    <div>
                                        <h3 className="font-black text-slate-900">
                                            Filter by Joining Date
                                        </h3>

                                        <p className="text-xs text-slate-500">
                                            Select an employee joining period
                                        </p>
                                    </div>

                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">

                                    {/* FROM */}

                                    <div>
                                        <label
                                            htmlFor="from-date"
                                            className="mb-2 block text-sm font-bold text-slate-600"
                                        >
                                            From Joining Date
                                        </label>

                                        <input
                                            id="from-date"
                                            type="date"
                                            value={fromDate}
                                            max={
                                                toDate ||
                                                undefined
                                            }
                                            onChange={(e) =>
                                                setFromDate(
                                                    e.target.value,
                                                )
                                            }
                                            className="glossy-input w-full rounded-xl border border-orange-100 bg-white px-4 py-3.5 text-sm font-semibold text-slate-800 outline-none transition-all focus:border-orange-500"
                                        />
                                    </div>

                                    {/* TO */}

                                    <div>
                                        <label
                                            htmlFor="to-date"
                                            className="mb-2 block text-sm font-bold text-slate-600"
                                        >
                                            To Joining Date
                                        </label>

                                        <input
                                            id="to-date"
                                            type="date"
                                            value={toDate}
                                            min={
                                                fromDate ||
                                                undefined
                                            }
                                            onChange={(e) =>
                                                setToDate(
                                                    e.target.value,
                                                )
                                            }
                                            className="glossy-input w-full rounded-xl border border-orange-100 bg-white px-4 py-3.5 text-sm font-semibold text-slate-800 outline-none transition-all focus:border-orange-500"
                                        />
                                    </div>

                                </div>
                            </div>

                            {/* SORT */}

                            <div className="filter-box rounded-2xl border-indigo-100 bg-gradient-to-br from-indigo-50/70 via-white to-violet-50/40 p-5">

                                <div className="mb-4 flex items-center gap-3">

                                    <div className="gradient-icon flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-violet-200 text-lg">
                                        ↕️
                                    </div>

                                    <div>
                                        <h3 className="font-black text-slate-900">
                                            Sort Employees
                                        </h3>

                                        <p className="text-xs text-slate-500">
                                            Choose how employees should be displayed
                                        </p>
                                    </div>

                                </div>

                                <div className="relative">

                                    <select
                                        id="sort-by"
                                        value={`${sortBy}:${sortDirection}`}
                                        onChange={(e) => {
                                            const [
                                                newSortBy,
                                                newSortDirection,
                                            ] =
                                                e.target.value.split(
                                                    ':',
                                                );

                                            setSortBy(
                                                newSortBy,
                                            );

                                            setSortDirection(
                                                newSortDirection,
                                            );
                                        }}
                                        className="glossy-input w-full appearance-none rounded-xl border border-indigo-100 bg-white px-4 py-3.5 pr-12 text-sm font-semibold text-slate-800 outline-none transition-all focus:border-indigo-500"
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

                                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                                        ▾
                                    </span>

                                </div>
                            </div>

                            {/* ACTIVE FILTERS */}

                            {hasFilters && (
                                <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-indigo-50 to-violet-50 px-5 py-4 shadow-sm">

                                    <div className="flex flex-wrap items-center gap-2">

                                        <span className="mr-1 text-sm font-black text-blue-800">
                                            Active filters:
                                        </span>

                                        {search && (
                                            <span className="rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-bold text-blue-700 shadow-sm">
                                                🔎 Search
                                            </span>
                                        )}

                                        {department && (
                                            <span className="rounded-full border border-purple-100 bg-white px-3 py-1.5 text-xs font-bold text-purple-700 shadow-sm">
                                                🏢 Department
                                            </span>
                                        )}

                                        {(minSalary ||
                                            maxSalary) && (
                                            <span className="rounded-full border border-emerald-100 bg-white px-3 py-1.5 text-xs font-bold text-emerald-700 shadow-sm">
                                                💰 Salary
                                            </span>
                                        )}

                                        {(fromDate ||
                                            toDate) && (
                                            <span className="rounded-full border border-orange-100 bg-white px-3 py-1.5 text-xs font-bold text-orange-700 shadow-sm">
                                                📅 Joining Date
                                            </span>
                                        )}

                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* =====================================================
                        EMPLOYEE TABLE
                    ====================================================== */}

                    <div className="print-table-wrapper glossy-card overflow-hidden rounded-3xl">

                        <div className="overflow-x-auto">

                            <table className="print-table w-full min-w-[900px]">

                                <thead className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950">

                                    <tr>

                                        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-white">
                                            Code
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-white">
                                            Name
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-white">
                                            Email
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-white">
                                            Department
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-white">
                                            Position
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-white">
                                            Status
                                        </th>

                                        <th className="no-print px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-white">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>

                                <tbody className="divide-y divide-slate-100">

                                    {employees.data.length > 0 ? (
                                        employees.data.map(
                                            (employee) => (
                                                <tr
                                                    key={
                                                        employee.id
                                                    }
                                                    className="table-row transition-all"
                                                >

                                                    <td className="px-6 py-5 text-sm font-black text-slate-700">
                                                        {
                                                            employee.employee_code
                                                        }
                                                    </td>

                                                    <td className="px-6 py-5">

                                                        <div className="font-bold text-slate-900">
                                                            {
                                                                employee.name
                                                            }
                                                        </div>

                                                        <div className="mt-1 text-xs font-medium text-slate-400">
                                                            {
                                                                employee.phone ||
                                                                '-'
                                                            }
                                                        </div>

                                                    </td>

                                                    <td className="px-6 py-5 text-sm font-medium text-slate-600">
                                                        {
                                                            employee.email
                                                        }
                                                    </td>

                                                    <td className="px-6 py-5 text-sm font-medium text-slate-600">
                                                        {
                                                            employee.department ||
                                                            '-'
                                                        }
                                                    </td>

                                                    <td className="px-6 py-5 text-sm font-medium text-slate-600">
                                                        {
                                                            employee.position ||
                                                            '-'
                                                        }
                                                    </td>

                                                    <td className="px-6 py-5">

                                                        <span
                                                            className={`inline-flex rounded-full px-3 py-1.5 text-xs font-black uppercase shadow-sm ${
                                                                employee.status ===
                                                                'active'
                                                                    ? 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700'
                                                                    : 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700'
                                                            }`}
                                                        >
                                                            {
                                                                employee.status
                                                            }
                                                        </span>

                                                    </td>

                                                    <td className="no-print px-6 py-5">

                                                        <div className="flex flex-wrap gap-2">

                                                            <Link
                                                                href={`/employees/${employee.id}`}
                                                                className="glossy-button inline-flex items-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 px-3 py-2 text-sm font-bold text-white transition-all"
                                                            >
                                                                👁 View
                                                            </Link>

                                                            <Link
                                                                href={`/employees/${employee.id}/edit`}
                                                                className="glossy-button inline-flex items-center rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 px-3 py-2 text-sm font-bold text-white transition-all"
                                                            >
                                                                ✏ Edit
                                                            </Link>

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
                                                                className="glossy-button inline-flex items-center rounded-lg bg-gradient-to-r from-red-500 to-rose-600 px-3 py-2 text-sm font-bold text-white transition-all"
                                                            >
                                                                🗑 Delete
                                                            </button>

                                                        </div>

                                                    </td>

                                                </tr>
                                            ),
                                        )
                                    ) : (
                                        <tr>

                                            <td
                                                colSpan={7}
                                                className="px-6 py-16 text-center"
                                            >

                                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 text-3xl shadow-sm">
                                                    👥
                                                </div>

                                                <p className="mt-4 font-black text-slate-700">
                                                    No employees found.
                                                </p>

                                                <p className="mt-1 text-sm text-slate-500">
                                                    {hasFilters
                                                        ? 'Try different filters.'
                                                        : 'Add your first employee to get started.'}
                                                </p>

                                                {!hasFilters && (
                                                    <Link
                                                        href="/employees/create"
                                                        className="glossy-button no-print mt-5 inline-flex rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-3 font-bold text-white transition-all"
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

                        {/* PAGINATION */}

                        <div className="no-print flex flex-col gap-4 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                            <div className="text-sm font-medium text-slate-600">

                                Showing{' '}

                                <span className="font-black text-slate-900">
                                    {employees.data.length}
                                </span>{' '}

                                of{' '}

                                <span className="font-black text-slate-900">
                                    {employees.total}
                                </span>{' '}

                                employees

                            </div>

                            {employees.last_page > 1 && (
                                <div className="flex flex-wrap items-center gap-2">

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
                                        className={`rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                                            employees.current_page ===
                                            1
                                                ? 'cursor-not-allowed bg-slate-200 text-slate-400'
                                                : 'glossy-button bg-white text-slate-700 ring-1 ring-slate-300 hover:bg-slate-100'
                                        }`}
                                    >
                                        ← Previous
                                    </button>

                                    <div className="flex flex-wrap items-center gap-1">

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
                                                className={`min-w-10 rounded-xl px-3 py-2 text-sm font-bold transition-all ${
                                                    employees.current_page ===
                                                    page
                                                        ? 'glossy-button bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                                                        : 'bg-white text-slate-700 ring-1 ring-slate-300 hover:bg-blue-50 hover:text-blue-700'
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        ))}

                                    </div>

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
                                        className={`rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                                            employees.current_page ===
                                            employees.last_page
                                                ? 'cursor-not-allowed bg-slate-200 text-slate-400'
                                                : 'glossy-button bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
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