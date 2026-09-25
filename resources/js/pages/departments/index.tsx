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

export default function Index({
    departments,
}: DepartmentsPageProps) {
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
            <Head title="Departments" />

            <div className="min-h-screen bg-slate-100 p-4 md:p-6">
                <div className="mx-auto max-w-7xl">

                    {/* Success Message */}
                    {flash.success && (
                        <div
                            className="mb-6 flex items-center rounded-lg border border-green-200 bg-green-50 px-5 py-4 font-medium text-green-800 shadow-sm"
                            role="alert"
                        >
                            <span className="mr-2 text-xl">✓</span>
                            {flash.success}
                        </div>
                    )}

                    {/* Error Message */}
                    {flash.error && (
                        <div
                            className="mb-6 flex items-center rounded-lg border border-red-200 bg-red-50 px-5 py-4 font-medium text-red-800 shadow-sm"
                            role="alert"
                        >
                            <span className="mr-2 text-xl">⚠</span>
                            {flash.error}
                        </div>
                    )}

                    {/* Header */}
                    <div className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">

                        <div>
                            {/* Dashboard Button */}
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center rounded-lg bg-slate-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700"
                            >
                                ← Dashboard
                            </Link>

                            <h1 className="mt-4 text-3xl font-bold text-slate-800">
                                Department Management
                            </h1>

                            <p className="mt-1 text-slate-500">
                                Manage your departments and department information
                            </p>
                        </div>

                        {/* Add Department */}
                        <Link
                            href="/departments/create"
                            className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-purple-700 hover:shadow-md"
                        >
                            <span className="mr-2 text-lg">+</span>
                            Add Department
                        </Link>
                    </div>

                    {/* Department List */}
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm">

                        {/* Table Header */}
                        <div className="border-b border-slate-200 px-6 py-5">
                            <h2 className="text-xl font-bold text-slate-800">
                                Department List
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Total Departments:{' '}
                                <span className="font-semibold text-slate-800">
                                    {departments.total}
                                </span>
                            </p>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[800px]">

                                <thead className="bg-slate-800">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                                            Code
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                                            Department Name
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                                            Description
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-200">

                                    {departments.data.length > 0 ? (
                                        departments.data.map((department) => (
                                            <tr
                                                key={department.id}
                                                className="transition hover:bg-slate-50"
                                            >
                                                {/* Code */}
                                                <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                                                    {department.department_code}
                                                </td>

                                                {/* Name */}
                                                <td className="px-6 py-4 text-sm font-bold text-slate-800">
                                                    {department.name}
                                                </td>

                                                {/* Description */}
                                                <td className="max-w-md px-6 py-4 text-sm text-slate-600">
                                                    {department.description || '-'}
                                                </td>

                                                {/* Actions */}
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-2">

                                                        {/* View */}
                                                        <Link
                                                            href={`/departments/${department.id}`}
                                                            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
                                                        >
                                                            👁 View
                                                        </Link>

                                                        {/* Edit */}
                                                        <Link
                                                            href={`/departments/${department.id}/edit`}
                                                            className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 hover:shadow-md"
                                                        >
                                                            ✏ Edit
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
                                                            className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 hover:shadow-md"
                                                        >
                                                            🗑 Delete
                                                        </button>

                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="px-6 py-12 text-center"
                                            >
                                                <div className="text-4xl">
                                                    🏢
                                                </div>

                                                <p className="mt-3 font-semibold text-slate-700">
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
                        <div className="flex flex-col gap-4 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">

                            {/* Showing */}
                            <div className="text-sm font-medium text-slate-600">
                                Showing{' '}
                                <span className="font-bold text-slate-800">
                                    {departments.data.length}
                                </span>{' '}
                                of{' '}
                                <span className="font-bold text-slate-800">
                                    {departments.total}
                                </span>{' '}
                                departments
                            </div>

                            {/* Pagination */}
                            {departments.last_page > 1 && (
                                <div className="flex items-center gap-2">

                                    {/* Previous */}
                                    <button
                                        type="button"
                                        disabled={
                                            departments.current_page === 1
                                        }
                                        onClick={() =>
                                            goToPage(
                                                departments.current_page - 1,
                                            )
                                        }
                                        className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                                            departments.current_page === 1
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
                                                length: departments.last_page,
                                            },
                                            (_, index) => index + 1,
                                        ).map((page) => (
                                            <button
                                                key={page}
                                                type="button"
                                                onClick={() =>
                                                    goToPage(page)
                                                }
                                                className={`min-w-10 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                                                    departments.current_page ===
                                                    page
                                                        ? 'bg-purple-600 text-white shadow-sm'
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
                                            departments.current_page ===
                                            departments.last_page
                                        }
                                        onClick={() =>
                                            goToPage(
                                                departments.current_page + 1,
                                            )
                                        }
                                        className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                                            departments.current_page ===
                                            departments.last_page
                                                ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                                                : 'bg-purple-600 text-white shadow-sm hover:bg-purple-700'
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