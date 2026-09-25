import { Head, Link, router } from '@inertiajs/react';

type Stats = {
    totalEmployees: number;
    activeEmployees: number;
    inactiveEmployees: number;
    totalDepartments: number;
};

type RecentEmployee = {
    id: number;
    employee_code: string;
    name: string;
    email: string;
    department: string | null;
    position: string | null;
    status: 'active' | 'inactive';
};

type DashboardUser = {
    name: string;
    email: string;
    role: 'admin' | 'employee';
};

type DashboardProps = {
    stats: Stats;
    recentEmployees: RecentEmployee[];
    user: DashboardUser;
};

export default function Dashboard({
    stats,
    recentEmployees,
    user,
}: DashboardProps) {
    const handleLogout = () => {
        router.post('/logout');
    };

    const isAdmin = user.role === 'admin';

    return (
        <>
            <Head title="Employee & Department Dashboard" />

            <div className="min-h-screen bg-slate-100 p-4 md:p-6">
                <div className="mx-auto max-w-7xl">

                    {/* Header */}
                    <div className="mb-6 flex flex-col gap-5 rounded-xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">

                        <div>
                            <h1 className="text-3xl font-bold text-slate-800">
                                {isAdmin
                                    ? 'Employee & Department Dashboard'
                                    : 'Employee Dashboard'}
                            </h1>

                            <p className="mt-1 text-slate-500">
                                Welcome, {user.name}
                            </p>

                            <p className="mt-1 text-sm font-semibold text-slate-500">
                                Role:{' '}
                                <span className="uppercase text-blue-600">
                                    {user.role}
                                </span>
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">

                            {/* Admin Only - Add Employee */}
                            {isAdmin && (
                                <Link
                                    href="/employees/create"
                                    className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
                                >
                                    <span className="mr-2 text-lg">+</span>
                                    Add Employee
                                </Link>
                            )}

                            {/* Admin Only - Add Department */}
                            {isAdmin && (
                                <Link
                                    href="/departments/create"
                                    className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-purple-700 hover:shadow-md"
                                >
                                    <span className="mr-2 text-lg">+</span>
                                    Add Department
                                </Link>
                            )}

                            {/* Logout - Everyone */}
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-red-700 hover:shadow-md"
                            >
                                <span className="mr-2 text-lg">🚪</span>
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* ================================================== */}
                    {/* ADMIN ONLY CONTENT */}
                    {/* ================================================== */}

                    {isAdmin && (
                        <>
                            {/* Statistics Cards */}
                            <div className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                                {/* Total Employees */}
                                <div className="rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-semibold text-slate-500">
                                                Total Employees
                                            </p>

                                            <p className="mt-2 text-3xl font-bold text-slate-800">
                                                {stats.totalEmployees}
                                            </p>
                                        </div>

                                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                                            👥
                                        </div>
                                    </div>
                                </div>

                                {/* Active Employees */}
                                <div className="rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-semibold text-slate-500">
                                                Active Employees
                                            </p>

                                            <p className="mt-2 text-3xl font-bold text-green-600">
                                                {stats.activeEmployees}
                                            </p>
                                        </div>

                                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-2xl">
                                            ✓
                                        </div>
                                    </div>
                                </div>

                                {/* Inactive Employees */}
                                <div className="rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-semibold text-slate-500">
                                                Inactive Employees
                                            </p>

                                            <p className="mt-2 text-3xl font-bold text-red-600">
                                                {stats.inactiveEmployees}
                                            </p>
                                        </div>

                                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-100 text-2xl">
                                            !
                                        </div>
                                    </div>
                                </div>

                                {/* Departments */}
                                <div className="rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-semibold text-slate-500">
                                                Departments
                                            </p>

                                            <p className="mt-2 text-3xl font-bold text-purple-600">
                                                {stats.totalDepartments}
                                            </p>
                                        </div>

                                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100 text-2xl">
                                            🏢
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Quick Actions */}
                            <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
                                <h2 className="text-xl font-bold text-slate-800">
                                    Quick Actions
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Quickly access the main employee and
                                    department management features.
                                </p>

                                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                                    {/* View All Employees */}
                                    <Link
                                        href="/employees"
                                        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                                    >
                                        👥 View All Employees
                                    </Link>

                                    {/* Add New Employee */}
                                    <Link
                                        href="/employees/create"
                                        className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                                    >
                                        + Add New Employee
                                    </Link>

                                    {/* View All Departments */}
                                    <Link
                                        href="/departments"
                                        className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
                                    >
                                        🏢 View All Departments
                                    </Link>

                                    {/* Add New Department */}
                                    <Link
                                        href="/departments/create"
                                        className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
                                    >
                                        + Add New Department
                                    </Link>

                                </div>
                            </div>

                            {/* Recent Employees */}
                            <div className="overflow-hidden rounded-xl bg-white shadow-sm">

                                <div className="border-b border-slate-200 px-6 py-5">
                                    <h2 className="text-xl font-bold text-slate-800">
                                        Recent Employees
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Latest employee records added to the
                                        system.
                                    </p>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[800px]">

                                        <thead className="bg-slate-800">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                                                    Code
                                                </th>

                                                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                                                    Name
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

                                                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-slate-200">

                                            {recentEmployees.length > 0 ? (
                                                recentEmployees.map(
                                                    (employee) => (
                                                        <tr
                                                            key={employee.id}
                                                            className="transition hover:bg-slate-50"
                                                        >
                                                            <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                                                                {employee.employee_code}
                                                            </td>

                                                            <td className="px-6 py-4">
                                                                <div>
                                                                    <p className="font-semibold text-slate-800">
                                                                        {employee.name}
                                                                    </p>

                                                                    <p className="text-sm text-slate-500">
                                                                        {employee.email}
                                                                    </p>
                                                                </div>
                                                            </td>

                                                            <td className="px-6 py-4 text-sm text-slate-600">
                                                                {employee.department || '-'}
                                                            </td>

                                                            <td className="px-6 py-4 text-sm text-slate-600">
                                                                {employee.position || '-'}
                                                            </td>

                                                            <td className="px-6 py-4">
                                                                <span
                                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase ${
                                                                        employee.status === 'active'
                                                                            ? 'bg-green-100 text-green-700'
                                                                            : 'bg-red-100 text-red-700'
                                                                    }`}
                                                                >
                                                                    {employee.status}
                                                                </span>
                                                            </td>

                                                            <td className="px-6 py-4">
                                                                <Link
                                                                    href={`/employees/${employee.id}`}
                                                                    className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                                                                >
                                                                    👁 View
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ),
                                                )
                                            ) : (
                                                <tr>
                                                    <td
                                                        colSpan={6}
                                                        className="px-6 py-12 text-center"
                                                    >
                                                        <div className="text-4xl">
                                                            👥
                                                        </div>

                                                        <p className="mt-3 font-semibold text-slate-700">
                                                            No employees found.
                                                        </p>

                                                        <p className="mt-1 text-sm text-slate-500">
                                                            Add your first
                                                            employee to see it
                                                            here.
                                                        </p>

                                                        <Link
                                                            href="/employees/create"
                                                            className="mt-5 inline-flex rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                                                        >
                                                            + Add Employee
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )}

                                        </tbody>
                                    </table>
                                </div>

                                <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
                                    <Link
                                        href="/employees"
                                        className="font-semibold text-blue-600 hover:text-blue-800"
                                    >
                                        View all employees →
                                    </Link>
                                </div>

                            </div>
                        </>
                    )}

                    {/* ================================================== */}
                    {/* EMPLOYEE ONLY CONTENT */}
                    {/* ================================================== */}

                    {!isAdmin && (
                        <div className="rounded-xl bg-white p-8 shadow-sm">
                            <div className="text-center">

                                <div className="text-6xl">
                                    👤
                                </div>

                                <h2 className="mt-4 text-2xl font-bold text-slate-800">
                                    Welcome, {user.name}
                                </h2>

                                <p className="mt-2 text-slate-500">
                                    You are logged in as an Employee.
                                </p>

                                <div className="mx-auto mt-6 max-w-md rounded-lg bg-blue-50 p-5">

                                    <p className="text-sm text-slate-600">
                                        <strong>Email:</strong> {user.email}
                                    </p>

                                    <p className="mt-2 text-sm text-slate-600">
                                        <strong>Role:</strong>{' '}
                                        <span className="font-bold uppercase text-blue-600">
                                            {user.role}
                                        </span>
                                    </p>

                                    {/* Employee My Profile */}
                                    <Link
                                        href="/my-profile"
                                        className="mt-5 inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                                    >
                                        👤 My Profile
                                    </Link>

                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}