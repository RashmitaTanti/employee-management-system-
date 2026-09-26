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

            <div className="dashboard-page min-h-screen p-4 md:p-6">
                <div className="mx-auto max-w-7xl">

                    {/* ================= HEADER ================= */}
                    <div className="glossy-card header-card mb-6 rounded-3xl p-6 md:p-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                            <div>
                                <div className="flex items-center gap-4">
                                    <div className="dashboard-icon flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl text-white">
                                        {isAdmin ? '📊' : '👤'}
                                    </div>

                                    <div>
                                        <h1 className="text-2xl font-extrabold tracking-tight text-slate-800 md:text-4xl">
                                            {isAdmin
                                                ? 'Employee & Department Dashboard'
                                                : 'Employee Dashboard'}
                                        </h1>

                                        <p className="mt-1 text-sm text-slate-500 md:text-base">
                                            Welcome, {user.name}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <span className="role-label">
                                        Role:
                                    </span>

                                    <span className="role-badge">
                                        {user.role}
                                    </span>
                                </div>
                            </div>

                            {/* Header Actions */}
                            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">

                                {/* Admin Only */}
                                {isAdmin && (
                                    <Link
                                        href="/employees/create"
                                        className="header-action employee-action inline-flex items-center justify-center rounded-xl px-5 py-3 font-bold text-white"
                                    >
                                        <span className="mr-2 text-lg">+</span>
                                        Add Employee
                                    </Link>
                                )}

                                {/* Admin Only */}
                                {isAdmin && (
                                    <Link
                                        href="/departments/create"
                                        className="header-action department-action inline-flex items-center justify-center rounded-xl px-5 py-3 font-bold text-white"
                                    >
                                        <span className="mr-2 text-lg">+</span>
                                        Add Department
                                    </Link>
                                )}

                                {/* Everyone */}
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="header-action logout-action inline-flex items-center justify-center rounded-xl px-5 py-3 font-bold text-white"
                                >
                                    <span className="mr-2 text-lg">🚪</span>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ================= ADMIN CONTENT ================= */}
                    {isAdmin && (
                        <>
                            {/* ================= STATISTICS ================= */}
                            <div className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                                {/* Total Employees */}
                                <div className="stat-card total-card rounded-3xl p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="stat-label">
                                                Total Employees
                                            </p>

                                            <p className="stat-number text-slate-800">
                                                {stats.totalEmployees}
                                            </p>
                                        </div>

                                        <div className="stat-icon total-icon">
                                            👥
                                        </div>
                                    </div>

                                    <div className="stat-line total-line" />
                                </div>

                                {/* Active Employees */}
                                <div className="stat-card active-card rounded-3xl p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="stat-label">
                                                Active Employees
                                            </p>

                                            <p className="stat-number text-emerald-600">
                                                {stats.activeEmployees}
                                            </p>
                                        </div>

                                        <div className="stat-icon active-icon">
                                            ✓
                                        </div>
                                    </div>

                                    <div className="stat-line active-line" />
                                </div>

                                {/* Inactive Employees */}
                                <div className="stat-card inactive-card rounded-3xl p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="stat-label">
                                                Inactive Employees
                                            </p>

                                            <p className="stat-number text-red-600">
                                                {stats.inactiveEmployees}
                                            </p>
                                        </div>

                                        <div className="stat-icon inactive-icon">
                                            !
                                        </div>
                                    </div>

                                    <div className="stat-line inactive-line" />
                                </div>

                                {/* Departments */}
                                <div className="stat-card department-card rounded-3xl p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="stat-label">
                                                Departments
                                            </p>

                                            <p className="stat-number text-purple-600">
                                                {stats.totalDepartments}
                                            </p>
                                        </div>

                                        <div className="stat-icon department-icon">
                                            🏢
                                        </div>
                                    </div>

                                    <div className="stat-line department-line" />
                                </div>
                            </div>

                            {/* ================= QUICK ACTIONS ================= */}
                            <div className="glossy-card mb-6 rounded-3xl p-6 md:p-7">
                                <div className="flex items-center gap-3">
                                    <div className="section-icon">
                                        ⚡
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-extrabold text-slate-800">
                                            Quick Actions
                                        </h2>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Quickly access the main employee
                                            and department management features.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                                    <Link
                                        href="/employees"
                                        className="quick-action employees-view"
                                    >
                                        <span className="quick-icon">
                                            👥
                                        </span>
                                        <span>
                                            View All Employees
                                        </span>
                                    </Link>

                                    <Link
                                        href="/employees/create"
                                        className="quick-action employees-add"
                                    >
                                        <span className="quick-icon">
                                            +
                                        </span>
                                        <span>
                                            Add New Employee
                                        </span>
                                    </Link>

                                    <Link
                                        href="/departments"
                                        className="quick-action departments-view"
                                    >
                                        <span className="quick-icon">
                                            🏢
                                        </span>
                                        <span>
                                            View All Departments
                                        </span>
                                    </Link>

                                    <Link
                                        href="/departments/create"
                                        className="quick-action departments-add"
                                    >
                                        <span className="quick-icon">
                                            +
                                        </span>
                                        <span>
                                            Add New Department
                                        </span>
                                    </Link>

                                </div>
                            </div>

                            {/* ================= RECENT EMPLOYEES ================= */}
                            <div className="glossy-card overflow-hidden rounded-3xl">

                                <div className="list-header px-6 py-6 md:px-7">
                                    <div className="flex items-center gap-3">
                                        <div className="section-icon">
                                            👥
                                        </div>

                                        <div>
                                            <h2 className="text-xl font-extrabold text-slate-800">
                                                Recent Employees
                                            </h2>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Latest employee records added
                                                to the system.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[900px]">

                                        <thead className="table-head">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-sm font-bold text-white">
                                                    Code
                                                </th>

                                                <th className="px-6 py-4 text-left text-sm font-bold text-white">
                                                    Name
                                                </th>

                                                <th className="px-6 py-4 text-left text-sm font-bold text-white">
                                                    Department
                                                </th>

                                                <th className="px-6 py-4 text-left text-sm font-bold text-white">
                                                    Position
                                                </th>

                                                <th className="px-6 py-4 text-left text-sm font-bold text-white">
                                                    Status
                                                </th>

                                                <th className="px-6 py-4 text-left text-sm font-bold text-white">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {recentEmployees.length > 0 ? (
                                                recentEmployees.map(
                                                    (employee) => (
                                                        <tr
                                                            key={employee.id}
                                                            className="employee-row"
                                                        >
                                                            <td className="px-6 py-5 text-sm">
                                                                <span className="code-badge">
                                                                    {
                                                                        employee.employee_code
                                                                    }
                                                                </span>
                                                            </td>

                                                            <td className="px-6 py-5">
                                                                <div>
                                                                    <p className="font-bold text-slate-800">
                                                                        {
                                                                            employee.name
                                                                        }
                                                                    </p>

                                                                    <p className="mt-1 text-sm text-slate-500">
                                                                        {
                                                                            employee.email
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </td>

                                                            <td className="px-6 py-5 text-sm text-slate-600">
                                                                {employee.department ||
                                                                    '-'}
                                                            </td>

                                                            <td className="px-6 py-5 text-sm text-slate-600">
                                                                {employee.position ||
                                                                    '-'}
                                                            </td>

                                                            <td className="px-6 py-5">
                                                                <span
                                                                    className={`status-badge ${
                                                                        employee.status ===
                                                                        'active'
                                                                            ? 'status-active'
                                                                            : 'status-inactive'
                                                                    }`}
                                                                >
                                                                    <span className="status-dot" />
                                                                    {
                                                                        employee.status
                                                                    }
                                                                </span>
                                                            </td>

                                                            <td className="px-6 py-5">
                                                                <Link
                                                                    href={`/employees/${employee.id}`}
                                                                    className="view-button inline-flex items-center rounded-lg px-4 py-2 text-sm font-bold text-white"
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
                                                        className="px-6 py-16 text-center"
                                                    >
                                                        <div className="empty-icon mx-auto flex h-20 w-20 items-center justify-center rounded-3xl text-4xl">
                                                            👥
                                                        </div>

                                                        <p className="mt-5 text-lg font-bold text-slate-700">
                                                            No employees found.
                                                        </p>

                                                        <p className="mt-1 text-sm text-slate-500">
                                                            Add your first
                                                            employee to see it
                                                            here.
                                                        </p>

                                                        <Link
                                                            href="/employees/create"
                                                            className="empty-add-button mt-5 inline-flex rounded-xl px-5 py-3 font-bold text-white"
                                                        >
                                                            + Add Employee
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="table-footer border-t border-slate-200/70 px-6 py-5">
                                    <Link
                                        href="/employees"
                                        className="view-all-link"
                                    >
                                        View all employees →
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}

                    {/* ================= EMPLOYEE CONTENT ================= */}
                    {!isAdmin && (
                        <div className="glossy-card rounded-3xl p-8 md:p-12">
                            <div className="text-center">

                                <div className="employee-profile-icon mx-auto flex h-24 w-24 items-center justify-center rounded-3xl text-5xl">
                                    👤
                                </div>

                                <h2 className="mt-6 text-2xl font-extrabold text-slate-800 md:text-3xl">
                                    Welcome, {user.name}
                                </h2>

                                <p className="mt-2 text-slate-500">
                                    You are logged in as an Employee.
                                </p>

                                <div className="employee-info-card mx-auto mt-7 max-w-md rounded-2xl p-6">

                                    <div className="info-row">
                                        <span>Email</span>
                                        <strong>{user.email}</strong>
                                    </div>

                                    <div className="info-row">
                                        <span>Role</span>

                                        <strong className="uppercase text-blue-600">
                                            {user.role}
                                        </strong>
                                    </div>

                                    <Link
                                        href="/my-profile"
                                        className="profile-button mt-6 inline-flex w-full items-center justify-center rounded-xl px-5 py-3 font-bold text-white"
                                    >
                                        👤 My Profile
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ================= GLOSSY STYLES ================= */}
            <style>{`
                .dashboard-page {
                    background:
                        radial-gradient(
                            circle at 8% 8%,
                            rgba(124, 58, 237, 0.13),
                            transparent 30%
                        ),
                        radial-gradient(
                            circle at 92% 12%,
                            rgba(37, 99, 235, 0.13),
                            transparent 30%
                        ),
                        radial-gradient(
                            circle at 50% 92%,
                            rgba(236, 72, 153, 0.09),
                            transparent 35%
                        ),
                        linear-gradient(
                            135deg,
                            #eef2ff 0%,
                            #f8fafc 48%,
                            #f1f5f9 100%
                        );
                }

                .glossy-card {
                    position: relative;
                    border: 1px solid rgba(255, 255, 255, 0.82);
                    background: rgba(255, 255, 255, 0.78);
                    backdrop-filter: blur(18px);
                    -webkit-backdrop-filter: blur(18px);
                    box-shadow:
                        0 20px 50px rgba(15, 23, 42, 0.08),
                        inset 0 1px 0 rgba(255, 255, 255, 0.9);
                }

                .glossy-card::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 5%;
                    right: 5%;
                    height: 2px;
                    border-radius: 999px;
                    background: linear-gradient(
                        90deg,
                        #7c3aed,
                        #2563eb,
                        #ec4899
                    );
                    opacity: 0.85;
                }

                .header-card {
                    overflow: hidden;
                }

                .dashboard-icon {
                    background: linear-gradient(
                        135deg,
                        #7c3aed,
                        #2563eb
                    );
                    box-shadow:
                        0 12px 28px rgba(99, 102, 241, 0.30),
                        inset 0 1px 0 rgba(255, 255, 255, 0.4);
                }

                .role-label {
                    color: #64748b;
                    font-size: 0.875rem;
                    font-weight: 700;
                    margin-right: 8px;
                }

                .role-badge {
                    display: inline-flex;
                    border-radius: 999px;
                    padding: 5px 12px;
                    background: linear-gradient(
                        135deg,
                        #ede9fe,
                        #dbeafe
                    );
                    color: #6d28d9;
                    font-size: 0.75rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    box-shadow:
                        inset 0 1px 0 rgba(255, 255, 255, 0.9),
                        0 4px 10px rgba(99, 102, 241, 0.08);
                }

                .header-action {
                    border: 1px solid rgba(255, 255, 255, 0.25);
                    box-shadow:
                        0 10px 22px rgba(15, 23, 42, 0.14),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3);
                    transition: all 0.25s ease;
                }

                .header-action:hover {
                    transform: translateY(-3px);
                }

                .employee-action {
                    background: linear-gradient(
                        135deg,
                        #2563eb,
                        #3b82f6
                    );
                }

                .department-action {
                    background: linear-gradient(
                        135deg,
                        #7c3aed,
                        #9333ea
                    );
                }

                .logout-action {
                    background: linear-gradient(
                        135deg,
                        #dc2626,
                        #ef4444
                    );
                }

                .stat-card {
                    position: relative;
                    overflow: hidden;
                    border: 1px solid rgba(255, 255, 255, 0.85);
                    background: rgba(255, 255, 255, 0.80);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    box-shadow:
                        0 15px 35px rgba(15, 23, 42, 0.07),
                        inset 0 1px 0 rgba(255, 255, 255, 0.95);
                    transition:
                        transform 0.25s ease,
                        box-shadow 0.25s ease;
                }

                .stat-card:hover {
                    transform: translateY(-5px);
                    box-shadow:
                        0 22px 42px rgba(15, 23, 42, 0.12),
                        inset 0 1px 0 rgba(255, 255, 255, 0.95);
                }

                .stat-card::after {
                    content: "";
                    position: absolute;
                    width: 110px;
                    height: 110px;
                    right: -45px;
                    top: -45px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.25);
                }

                .stat-label {
                    color: #64748b;
                    font-size: 0.875rem;
                    font-weight: 700;
                }

                .stat-number {
                    margin-top: 8px;
                    font-size: 2.25rem;
                    font-weight: 900;
                    line-height: 1;
                }

                .stat-icon {
                    position: relative;
                    z-index: 1;
                    display: flex;
                    height: 58px;
                    width: 58px;
                    align-items: center;
                    justify-content: center;
                    border-radius: 17px;
                    font-size: 1.5rem;
                    box-shadow:
                        inset 0 1px 0 rgba(255, 255, 255, 0.8),
                        0 8px 18px rgba(15, 23, 42, 0.08);
                }

                .total-icon {
                    background: linear-gradient(
                        135deg,
                        #dbeafe,
                        #bfdbfe
                    );
                }

                .active-icon {
                    background: linear-gradient(
                        135deg,
                        #dcfce7,
                        #bbf7d0
                    );
                    color: #059669;
                }

                .inactive-icon {
                    background: linear-gradient(
                        135deg,
                        #fee2e2,
                        #fecaca
                    );
                    color: #dc2626;
                }

                .department-icon {
                    background: linear-gradient(
                        135deg,
                        #ede9fe,
                        #ddd6fe
                    );
                }

                .stat-line {
                    position: absolute;
                    bottom: 0;
                    left: 24px;
                    right: 24px;
                    height: 3px;
                    border-radius: 999px;
                }

                .total-line {
                    background: linear-gradient(
                        90deg,
                        #2563eb,
                        #60a5fa
                    );
                }

                .active-line {
                    background: linear-gradient(
                        90deg,
                        #059669,
                        #34d399
                    );
                }

                .inactive-line {
                    background: linear-gradient(
                        90deg,
                        #dc2626,
                        #f87171
                    );
                }

                .department-line {
                    background: linear-gradient(
                        90deg,
                        #7c3aed,
                        #c084fc
                    );
                }

                .section-icon {
                    display: flex;
                    height: 44px;
                    width: 44px;
                    align-items: center;
                    justify-content: center;
                    border-radius: 13px;
                    background: linear-gradient(
                        135deg,
                        #ede9fe,
                        #dbeafe
                    );
                    box-shadow:
                        inset 0 1px 0 rgba(255, 255, 255, 0.9),
                        0 5px 15px rgba(99, 102, 241, 0.10);
                }

                .quick-action {
                    display: flex;
                    min-height: 58px;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    border-radius: 13px;
                    padding: 12px 18px;
                    color: white;
                    font-weight: 800;
                    border: 1px solid rgba(255, 255, 255, 0.25);
                    box-shadow:
                        0 10px 22px rgba(15, 23, 42, 0.13),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3);
                    transition: all 0.25s ease;
                }

                .quick-action:hover {
                    transform: translateY(-3px);
                }

                .quick-icon {
                    font-size: 1.1rem;
                }

                .employees-view {
                    background: linear-gradient(
                        135deg,
                        #2563eb,
                        #3b82f6
                    );
                }

                .employees-add {
                    background: linear-gradient(
                        135deg,
                        #059669,
                        #10b981
                    );
                }

                .departments-view {
                    background: linear-gradient(
                        135deg,
                        #7c3aed,
                        #9333ea
                    );
                }

                .departments-add {
                    background: linear-gradient(
                        135deg,
                        #ea580c,
                        #f97316
                    );
                }

                .list-header {
                    border-bottom: 1px solid rgba(226, 232, 240, 0.7);
                }

                .table-head {
                    background: linear-gradient(
                        135deg,
                        #172033,
                        #1e293b,
                        #273449
                    );
                }

                .employee-row {
                    border-bottom: 1px solid rgba(226, 232, 240, 0.8);
                    background: rgba(255, 255, 255, 0.72);
                    transition: all 0.2s ease;
                }

                .employee-row:hover {
                    background: linear-gradient(
                        90deg,
                        rgba(248, 250, 252, 0.98),
                        rgba(239, 246, 255, 0.88)
                    );
                    box-shadow:
                        inset 4px 0 0 #7c3aed;
                }

                .code-badge {
                    display: inline-flex;
                    align-items: center;
                    border-radius: 8px;
                    padding: 6px 10px;
                    background: linear-gradient(
                        135deg,
                        #f1f5f9,
                        #e2e8f0
                    );
                    color: #475569;
                    font-weight: 800;
                    letter-spacing: 0.03em;
                    box-shadow:
                        inset 0 1px 0 rgba(255, 255, 255, 0.9),
                        0 3px 8px rgba(15, 23, 42, 0.06);
                }

                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    border-radius: 999px;
                    padding: 6px 11px;
                    font-size: 0.72rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    box-shadow:
                        inset 0 1px 0 rgba(255, 255, 255, 0.7),
                        0 4px 9px rgba(15, 23, 42, 0.05);
                }

                .status-dot {
                    height: 7px;
                    width: 7px;
                    border-radius: 50%;
                }

                .status-active {
                    background: #dcfce7;
                    color: #15803d;
                }

                .status-active .status-dot {
                    background: #16a34a;
                }

                .status-inactive {
                    background: #fee2e2;
                    color: #b91c1c;
                }

                .status-inactive .status-dot {
                    background: #dc2626;
                }

                .view-button {
                    background: linear-gradient(
                        135deg,
                        #2563eb,
                        #3b82f6
                    );
                    box-shadow:
                        0 7px 15px rgba(37, 99, 235, 0.20),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3);
                    transition: all 0.2s ease;
                }

                .view-button:hover {
                    transform: translateY(-2px);
                    box-shadow:
                        0 10px 20px rgba(37, 99, 235, 0.28);
                }

                .table-footer {
                    background: linear-gradient(
                        135deg,
                        rgba(248, 250, 252, 0.96),
                        rgba(241, 245, 249, 0.94)
                    );
                }

                .view-all-link {
                    color: #2563eb;
                    font-weight: 800;
                    transition: color 0.2s ease;
                }

                .view-all-link:hover {
                    color: #1d4ed8;
                }

                .empty-icon,
                .employee-profile-icon {
                    background: linear-gradient(
                        135deg,
                        #ede9fe,
                        #dbeafe
                    );
                    box-shadow:
                        0 14px 30px rgba(99, 102, 241, 0.12),
                        inset 0 1px 0 rgba(255, 255, 255, 0.9);
                }

                .empty-add-button,
                .profile-button {
                    background: linear-gradient(
                        135deg,
                        #2563eb,
                        #7c3aed
                    );
                    box-shadow:
                        0 10px 22px rgba(79, 70, 229, 0.22),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3);
                    transition: all 0.2s ease;
                }

                .empty-add-button:hover,
                .profile-button:hover {
                    transform: translateY(-2px);
                    box-shadow:
                        0 14px 28px rgba(79, 70, 229, 0.30);
                }

                .employee-info-card {
                    background: linear-gradient(
                        135deg,
                        rgba(239, 246, 255, 0.95),
                        rgba(245, 243, 255, 0.95)
                    );
                    border: 1px solid rgba(191, 219, 254, 0.7);
                    box-shadow:
                        inset 0 1px 0 rgba(255, 255, 255, 0.9),
                        0 12px 25px rgba(59, 130, 246, 0.08);
                }

                .info-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                    border-bottom: 1px solid rgba(148, 163, 184, 0.2);
                    padding: 11px 0;
                    text-align: left;
                }

                .info-row:last-of-type {
                    border-bottom: 0;
                }

                .info-row span {
                    color: #64748b;
                    font-size: 0.875rem;
                    font-weight: 600;
                }

                .info-row strong {
                    color: #334155;
                    font-size: 0.875rem;
                    text-align: right;
                    word-break: break-word;
                }

                @media (max-width: 640px) {
                    .dashboard-page {
                        padding: 12px;
                    }

                    .glossy-card,
                    .stat-card {
                        border-radius: 20px;
                    }

                    .header-card {
                        padding: 20px;
                    }

                    .dashboard-icon {
                        height: 48px;
                        width: 48px;
                        font-size: 20px;
                    }

                    .stat-number {
                        font-size: 2rem;
                    }
                }
            `}</style>
        </>
    );
}