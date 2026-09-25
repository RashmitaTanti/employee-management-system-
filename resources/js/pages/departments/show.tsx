import { Head, Link } from '@inertiajs/react';

type Department = {
    id: number;
    department_code: string;
    name: string;
    description: string | null;
};

type ShowProps = {
    department: Department;
};

export default function Show({ department }: ShowProps) {
    return (
        <>
            <Head title={`Department - ${department.name}`} />

            <div className="min-h-screen bg-slate-100 p-4 md:p-6">
                <div className="mx-auto max-w-5xl">

                    {/* Header */}
                    <div className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
                        <div>
                            <Link
                                href="/departments"
                                className="inline-flex items-center rounded-md bg-slate-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700"
                            >
                                ← Back to Departments
                            </Link>

                            <h1 className="mt-4 text-3xl font-bold text-slate-800">
                                Department Details
                            </h1>

                            <p className="mt-1 text-slate-500">
                                View complete department information
                            </p>
                        </div>

                        <Link
                            href={`/departments/${department.id}/edit`}
                            className="inline-flex items-center justify-center rounded-lg bg-green-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-green-700 hover:shadow-md"
                        >
                            ✏ Edit Department
                        </Link>
                    </div>

                    {/* Department Card */}
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm">

                        {/* Profile Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 md:p-8">
                            <div className="flex flex-col items-center gap-5 md:flex-row">

                                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-white/20 text-4xl shadow-lg">
                                    🏢
                                </div>

                                <div className="text-center md:text-left">
                                    <h2 className="text-3xl font-bold text-white">
                                        {department.name}
                                    </h2>

                                    <p className="mt-2 text-blue-100">
                                        Department Code: {department.department_code}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Information */}
                        <div className="p-6 md:p-8">
                            <h3 className="mb-6 border-b border-slate-200 pb-3 text-xl font-bold text-slate-800">
                                Department Information
                            </h3>

                            <div className="grid gap-5 md:grid-cols-2">

                                {/* Department Code */}
                                <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                                    <p className="text-sm font-semibold text-slate-500">
                                        Department Code
                                    </p>

                                    <p className="mt-2 text-lg font-bold text-slate-800">
                                        {department.department_code}
                                    </p>
                                </div>

                                {/* Department Name */}
                                <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                                    <p className="text-sm font-semibold text-slate-500">
                                        Department Name
                                    </p>

                                    <p className="mt-2 text-lg font-bold text-slate-800">
                                        {department.name}
                                    </p>
                                </div>

                                {/* Description */}
                                <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 md:col-span-2">
                                    <p className="text-sm font-semibold text-slate-500">
                                        Description
                                    </p>

                                    <p className="mt-2 whitespace-pre-line text-slate-800">
                                        {department.description || '-'}
                                    </p>
                                </div>
                            </div>

                            {/* Bottom Actions */}
                            <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row">

                                <Link
                                    href={`/departments/${department.id}/edit`}
                                    className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-green-700 hover:shadow-md"
                                >
                                    ✏ Edit Department
                                </Link>

                                <Link
                                    href="/departments"
                                    className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
                                >
                                    🏢 All Departments
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}