import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

type Department = {
    id: number;
    department_code: string;
    name: string;
    description: string | null;
};

type DepartmentForm = {
    department_code: string;
    name: string;
    description: string;
};

type EditProps = {
    department: Department;
};

export default function Edit({ department }: EditProps) {
    const { data, setData, post, processing, errors } =
        useForm<DepartmentForm>({
            department_code: department.department_code,
            name: department.name,
            description: department.description ?? '',
        });

    function submit(e: FormEvent) {
        e.preventDefault();

        post(`/departments/${department.id}`, {
            headers: {
                'X-HTTP-Method-Override': 'PUT',
            },
        });
    }

    return (
        <>
            <Head title={`Edit Department - ${department.name}`} />

            <div className="min-h-screen bg-slate-100 p-4 md:p-6">
                <div className="mx-auto max-w-4xl">

                    {/* Header */}
                    <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
                        <Link
                            href="/departments"
                            className="inline-flex items-center rounded-md bg-slate-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700"
                        >
                            ← Back to Departments
                        </Link>

                        <h1 className="mt-4 text-3xl font-bold text-slate-800">
                            Edit Department
                        </h1>

                        <p className="mt-1 text-slate-500">
                            Update department information.
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={submit}
                        className="rounded-xl bg-white p-6 shadow-sm md:p-8"
                    >
                        <div className="grid gap-6 md:grid-cols-2">

                            {/* Department Code */}
                            <div>
                                <label className="mb-2 block font-semibold text-slate-700">
                                    Department Code *
                                </label>

                                <input
                                    type="text"
                                    required
                                    value={data.department_code}
                                    onChange={(e) =>
                                        setData(
                                            'department_code',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                />

                                {errors.department_code && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.department_code}
                                    </p>
                                )}
                            </div>

                            {/* Department Name */}
                            <div>
                                <label className="mb-2 block font-semibold text-slate-700">
                                    Department Name *
                                </label>

                                <input
                                    type="text"
                                    required
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                />

                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block font-semibold text-slate-700">
                                    Description
                                </label>

                                <textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData(
                                            'description',
                                            e.target.value,
                                        )
                                    }
                                    rows={5}
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                />

                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.description}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-green-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing
                                    ? 'Updating...'
                                    : 'Update Department'}
                            </button>

                            <Link
                                href="/departments"
                                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}