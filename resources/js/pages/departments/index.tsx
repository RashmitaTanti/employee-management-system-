import { Head, Link, router, usePage } from '@inertiajs/react';

type Department = {
    id: number;
    department_code: string;
    name: string;
    description: string | null;
};

type DepartmentsPageProps = {
    departments: {
        data: Department[];
        current_page: number;
        last_page: number;
        total: number;
    };
};

type PageProps = {
    flash: {
        success?: string;
        error?: string;
    };
};

export default function Index({ departments }: DepartmentsPageProps) {
    const { flash } = usePage<PageProps>().props;

    const goToPage = (page: number) => {
        router.get(
            '/departments',
            { page },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <>
            <Head title="Department Management" />

            <div className="department-page min-h-screen p-4 md:p-6">
                <div className="mx-auto max-w-7xl">

                    {/* Success Message */}
                    {flash.success && (
                        <div
                            className="success-alert mb-6 flex items-center rounded-2xl px-5 py-4 font-semibold"
                            role="alert"
                        >
                            <span className="alert-icon mr-3">✓</span>
                            <span>{flash.success}</span>
                        </div>
                    )}

                    {/* Error Message */}
                    {flash.error && (
                        <div
                            className="error-alert mb-6 flex items-center rounded-2xl px-5 py-4 font-semibold"
                            role="alert"
                        >
                            <span className="alert-icon mr-3">⚠</span>
                            <span>{flash.error}</span>
                        </div>
                    )}

                    {/* Header */}
                    <div className="glossy-card header-card mb-6 rounded-3xl p-6 md:p-8">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                            <div>
                                {/* Dashboard Button */}
                                <Link
                                    href="/dashboard"
                                    className="glossy-dashboard-btn inline-flex items-center rounded-xl px-5 py-2.5 text-sm font-bold text-white"
                                >
                                    ← Dashboard
                                </Link>

                                <div className="mt-6 flex items-center gap-4">
                                    <div className="title-icon flex h-14 w-14 items-center justify-center rounded-2xl text-2xl">
                                        🏢
                                    </div>

                                    <div>
                                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 md:text-4xl">
                                            Department Management
                                        </h1>

                                        <p className="mt-1 text-sm text-slate-500 md:text-base">
                                            Manage your departments and department information
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Add Department */}
                            <Link
                                href="/departments/create"
                                className="add-department-btn inline-flex items-center justify-center rounded-xl px-6 py-3.5 font-bold text-white"
                            >
                                <span className="mr-2 text-xl">+</span>
                                Add Department
                            </Link>
                        </div>
                    </div>

                    {/* Department List */}
                    <div className="glossy-card overflow-hidden rounded-3xl">

                        {/* List Header */}
                        <div className="list-header flex flex-col gap-3 border-b border-slate-200/70 px-6 py-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <div className="flex items-center gap-3">
                                    <div className="section-icon flex h-11 w-11 items-center justify-center rounded-xl text-xl">
                                        📋
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-extrabold text-slate-800">
                                            Department List
                                        </h2>

                                        <p className="mt-1 text-sm text-slate-500">
                                            All registered departments
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="total-badge rounded-xl px-4 py-2 text-sm font-bold">
                                Total Departments:{' '}
                                <span>{departments.total}</span>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[900px]">

                                <thead className="table-head">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-white">
                                            Code
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-bold text-white">
                                            Department Name
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-bold text-white">
                                            Description
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-bold text-white">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {departments.data.length > 0 ? (
                                        departments.data.map((department) => (
                                            <tr
                                                key={department.id}
                                                className="department-row"
                                            >
                                                {/* Code */}
                                                <td className="px-6 py-5 text-sm">
                                                    <span className="code-badge">
                                                        {department.department_code}
                                                    </span>
                                                </td>

                                                {/* Name */}
                                                <td className="px-6 py-5 text-sm font-bold text-slate-800">
                                                    {department.name}
                                                </td>

                                                {/* Description */}
                                                <td className="max-w-md px-6 py-5 text-sm text-slate-600">
                                                    {department.description || '-'}
                                                </td>

                                                {/* Actions */}
                                                <td className="px-6 py-5">
                                                    <div className="flex flex-wrap gap-2">

                                                        {/* View */}
                                                        <Link
                                                            href={`/departments/${department.id}`}
                                                            className="action-btn view-btn inline-flex items-center rounded-lg px-4 py-2 text-sm font-bold text-white"
                                                        >
                                                            <span className="mr-1.5">
                                                                👁
                                                            </span>
                                                            View
                                                        </Link>

                                                        {/* Edit */}
                                                        <Link
                                                            href={`/departments/${department.id}/edit`}
                                                            className="action-btn edit-btn inline-flex items-center rounded-lg px-4 py-2 text-sm font-bold text-white"
                                                        >
                                                            <span className="mr-1.5">
                                                                ✏
                                                            </span>
                                                            Edit
                                                        </Link>

                                                        {/* Delete */}
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const confirmed =
                                                                    window.confirm(
                                                                        `Are you sure you want to delete ${department.name}?`,
                                                                    );

                                                                if (confirmed) {
                                                                    router.delete(
                                                                        `/departments/${department.id}`,
                                                                    );
                                                                }
                                                            }}
                                                            className="action-btn delete-btn inline-flex items-center rounded-lg px-4 py-2 text-sm font-bold text-white"
                                                        >
                                                            <span className="mr-1.5">
                                                                🗑
                                                            </span>
                                                            Delete
                                                        </button>

                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="px-6 py-16 text-center"
                                            >
                                                <div className="empty-icon mx-auto flex h-20 w-20 items-center justify-center rounded-3xl text-4xl">
                                                    🏢
                                                </div>

                                                <p className="mt-5 text-lg font-bold text-slate-700">
                                                    No departments found.
                                                </p>

                                                <p className="mt-1 text-sm text-slate-500">
                                                    Add your first department to get started.
                                                </p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Footer */}
                        <div className="pagination-footer flex flex-col gap-4 border-t border-slate-200/70 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

                            {/* Showing */}
                            <div className="text-sm font-medium text-slate-600">
                                Showing{' '}
                                <span className="font-extrabold text-slate-800">
                                    {departments.data.length}
                                </span>{' '}
                                of{' '}
                                <span className="font-extrabold text-slate-800">
                                    {departments.total}
                                </span>{' '}
                                departments
                            </div>

                            {/* Pagination */}
                            {departments.last_page > 1 && (
                                <div className="flex flex-wrap items-center gap-2">

                                    {/* Previous */}
                                    <button
                                        type="button"
                                        disabled={departments.current_page === 1}
                                        onClick={() =>
                                            goToPage(
                                                departments.current_page - 1,
                                            )
                                        }
                                        className={`pagination-btn ${
                                            departments.current_page === 1
                                                ? 'pagination-disabled'
                                                : 'pagination-normal'
                                        }`}
                                    >
                                        ← Previous
                                    </button>

                                    {/* Page Numbers */}
                                    <div className="flex flex-wrap items-center gap-1">
                                        {Array.from(
                                            {
                                                length: departments.last_page,
                                            },
                                            (_, index) => index + 1,
                                        ).map((page) => (
                                            <button
                                                key={page}
                                                type="button"
                                                onClick={() => goToPage(page)}
                                                className={`page-number ${
                                                    departments.current_page ===
                                                    page
                                                        ? 'page-active'
                                                        : 'page-normal'
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
                                            departments.current_page ===
                                            departments.last_page
                                        }
                                        onClick={() =>
                                            goToPage(
                                                departments.current_page + 1,
                                            )
                                        }
                                        className={`pagination-btn ${
                                            departments.current_page ===
                                            departments.last_page
                                                ? 'pagination-disabled'
                                                : 'pagination-next'
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

            {/* Glossy Department Styles */}
            <style>{`
                .department-page {
                    background:
                        radial-gradient(
                            circle at 10% 10%,
                            rgba(139, 92, 246, 0.14),
                            transparent 30%
                        ),
                        radial-gradient(
                            circle at 90% 15%,
                            rgba(59, 130, 246, 0.13),
                            transparent 30%
                        ),
                        radial-gradient(
                            circle at 50% 90%,
                            rgba(236, 72, 153, 0.10),
                            transparent 35%
                        ),
                        linear-gradient(
                            135deg,
                            #eef2ff 0%,
                            #f8fafc 45%,
                            #f1f5f9 100%
                        );
                }

                .glossy-card {
                    position: relative;
                    border: 1px solid rgba(255, 255, 255, 0.8);
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

                .title-icon {
                    background: linear-gradient(
                        135deg,
                        #7c3aed,
                        #2563eb
                    );
                    color: white;
                    box-shadow:
                        0 10px 25px rgba(99, 102, 241, 0.30),
                        inset 0 1px 0 rgba(255, 255, 255, 0.4);
                }

                .section-icon {
                    background: linear-gradient(
                        135deg,
                        #ede9fe,
                        #dbeafe
                    );
                    box-shadow:
                        inset 0 1px 0 rgba(255, 255, 255, 0.9),
                        0 5px 15px rgba(99, 102, 241, 0.10);
                }

                .glossy-dashboard-btn {
                    background: linear-gradient(
                        135deg,
                        #334155,
                        #475569
                    );
                    box-shadow:
                        0 8px 18px rgba(51, 65, 85, 0.22),
                        inset 0 1px 0 rgba(255, 255, 255, 0.25);
                    transition: all 0.25s ease;
                }

                .glossy-dashboard-btn:hover {
                    transform: translateY(-2px);
                    box-shadow:
                        0 12px 24px rgba(51, 65, 85, 0.28),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3);
                }

                .add-department-btn {
                    background: linear-gradient(
                        135deg,
                        #7c3aed,
                        #9333ea,
                        #c026d3
                    );
                    box-shadow:
                        0 12px 28px rgba(124, 58, 237, 0.30),
                        inset 0 1px 0 rgba(255, 255, 255, 0.35);
                    transition: all 0.25s ease;
                }

                .add-department-btn:hover {
                    transform: translateY(-3px);
                    box-shadow:
                        0 18px 35px rgba(124, 58, 237, 0.38),
                        inset 0 1px 0 rgba(255, 255, 255, 0.4);
                }

                .success-alert {
                    background: linear-gradient(
                        135deg,
                        rgba(240, 253, 244, 0.96),
                        rgba(220, 252, 231, 0.92)
                    );
                    border: 1px solid rgba(34, 197, 94, 0.25);
                    color: #166534;
                    box-shadow:
                        0 12px 25px rgba(22, 101, 52, 0.08),
                        inset 0 1px 0 rgba(255, 255, 255, 0.8);
                }

                .error-alert {
                    background: linear-gradient(
                        135deg,
                        rgba(254, 242, 242, 0.96),
                        rgba(254, 226, 226, 0.92)
                    );
                    border: 1px solid rgba(239, 68, 68, 0.25);
                    color: #991b1b;
                    box-shadow:
                        0 12px 25px rgba(153, 27, 27, 0.08),
                        inset 0 1px 0 rgba(255, 255, 255, 0.8);
                }

                .alert-icon {
                    display: inline-flex;
                    height: 30px;
                    width: 30px;
                    align-items: center;
                    justify-content: center;
                    border-radius: 999px;
                    background: rgba(255, 255, 255, 0.65);
                }

                .total-badge {
                    background: linear-gradient(
                        135deg,
                        rgba(237, 233, 254, 0.9),
                        rgba(219, 234, 254, 0.9)
                    );
                    color: #475569;
                    box-shadow:
                        inset 0 1px 0 rgba(255, 255, 255, 0.9),
                        0 5px 15px rgba(99, 102, 241, 0.08);
                }

                .total-badge span {
                    color: #7c3aed;
                }

                .table-head {
                    background: linear-gradient(
                        135deg,
                        #172033,
                        #1e293b,
                        #273449
                    );
                }

                .department-row {
                    border-bottom: 1px solid rgba(226, 232, 240, 0.8);
                    background: rgba(255, 255, 255, 0.72);
                    transition:
                        background 0.2s ease,
                        transform 0.2s ease,
                        box-shadow 0.2s ease;
                }

                .department-row:hover {
                    background: linear-gradient(
                        90deg,
                        rgba(248, 250, 252, 0.98),
                        rgba(239, 246, 255, 0.85)
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

                .action-btn {
                    border: 1px solid rgba(255, 255, 255, 0.22);
                    transition: all 0.22s ease;
                    box-shadow:
                        0 5px 12px rgba(15, 23, 42, 0.12),
                        inset 0 1px 0 rgba(255, 255, 255, 0.28);
                }

                .action-btn:hover {
                    transform: translateY(-2px);
                }

                .view-btn {
                    background: linear-gradient(
                        135deg,
                        #2563eb,
                        #3b82f6
                    );
                }

                .view-btn:hover {
                    box-shadow:
                        0 9px 20px rgba(37, 99, 235, 0.28),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3);
                }

                .edit-btn {
                    background: linear-gradient(
                        135deg,
                        #059669,
                        #10b981
                    );
                }

                .edit-btn:hover {
                    box-shadow:
                        0 9px 20px rgba(5, 150, 105, 0.28),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3);
                }

                .delete-btn {
                    background: linear-gradient(
                        135deg,
                        #dc2626,
                        #ef4444
                    );
                }

                .delete-btn:hover {
                    box-shadow:
                        0 9px 20px rgba(220, 38, 38, 0.28),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3);
                }

                .empty-icon {
                    background: linear-gradient(
                        135deg,
                        #ede9fe,
                        #dbeafe
                    );
                    box-shadow:
                        0 12px 25px rgba(99, 102, 241, 0.12),
                        inset 0 1px 0 rgba(255, 255, 255, 0.9);
                }

                .pagination-footer {
                    background: linear-gradient(
                        135deg,
                        rgba(248, 250, 252, 0.95),
                        rgba(241, 245, 249, 0.92)
                    );
                }

                .pagination-btn,
                .page-number {
                    border-radius: 10px;
                    font-size: 0.875rem;
                    font-weight: 700;
                    transition: all 0.2s ease;
                }

                .pagination-btn {
                    padding: 9px 15px;
                }

                .page-number {
                    min-width: 40px;
                    padding: 9px 12px;
                }

                .pagination-normal,
                .page-normal {
                    background: rgba(255, 255, 255, 0.9);
                    color: #475569;
                    border: 1px solid #cbd5e1;
                    box-shadow:
                        0 4px 10px rgba(15, 23, 42, 0.06),
                        inset 0 1px 0 rgba(255, 255, 255, 0.9);
                }

                .pagination-normal:hover,
                .page-normal:hover {
                    background: #f8fafc;
                    transform: translateY(-1px);
                    box-shadow:
                        0 7px 15px rgba(15, 23, 42, 0.09);
                }

                .pagination-next,
                .page-active {
                    color: white;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    background: linear-gradient(
                        135deg,
                        #7c3aed,
                        #9333ea
                    );
                    box-shadow:
                        0 8px 18px rgba(124, 58, 237, 0.24),
                        inset 0 1px 0 rgba(255, 255, 255, 0.28);
                }

                .pagination-next:hover,
                .page-active:hover {
                    transform: translateY(-1px);
                    box-shadow:
                        0 11px 22px rgba(124, 58, 237, 0.30),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3);
                }

                .pagination-disabled {
                    cursor: not-allowed;
                    background: #e2e8f0;
                    color: #94a3b8;
                    border: 1px solid #cbd5e1;
                    box-shadow: none;
                }

                @media (max-width: 640px) {
                    .department-page {
                        padding: 12px;
                    }

                    .glossy-card {
                        border-radius: 20px;
                    }

                    .header-card {
                        padding: 20px;
                    }

                    .title-icon {
                        height: 46px;
                        width: 46px;
                        font-size: 19px;
                    }
                }
            `}</style>
        </>
    );
}