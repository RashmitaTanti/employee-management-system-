import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

type Department = {
    id: number;
    department_code: string;
    name: string;
};

type EmployeeForm = {
    employee_code: string;
    name: string;
    email: string;
    phone: string;
    department_code: string;
    department: string;
    position: string;
    joining_date: string;
    salary: string;
    status: 'active' | 'inactive';
    photo: File | null;
};

type CreateProps = {
    departments: Department[];
};

export default function Create({ departments }: CreateProps) {
    const { data, setData, post, processing, errors } =
        useForm<EmployeeForm>({
            employee_code: '',
            name: '',
            email: '',
            phone: '',
            department_code: '',
            department: '',
            position: '',
            joining_date: '',
            salary: '',
            status: 'active',
            photo: null,
        });

    function submit(e: FormEvent) {
        e.preventDefault();

        post('/employees', {
            forceFormData: true,
        });
    }

    function handleDepartmentChange(value: string) {
        const selectedDepartment = departments.find(
            (department) => department.id.toString() === value,
        );

        if (selectedDepartment) {
            setData((currentData) => ({
                ...currentData,
                department_code: selectedDepartment.department_code,
                department: selectedDepartment.name,
            }));
        } else {
            setData((currentData) => ({
                ...currentData,
                department_code: '',
                department: '',
            }));
        }
    }

    return (
        <>
            <Head title="Add Employee" />

            <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">

                    {/* Header */}
                    <div className="mb-6">
                        <Link
                            href="/employees"
                            className="inline-flex items-center text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                        >
                            ← Back to Employees
                        </Link>

                        <h1 className="mt-3 text-3xl font-bold text-slate-900">
                            Add Employee
                        </h1>

                        <p className="mt-1 text-slate-600">
                            Create a new employee record and login account.
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={submit}
                        className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:p-8"
                    >
                        <div className="grid gap-6 md:grid-cols-2">

                            {/* Employee Code */}
                            <div>
                                <label
                                    htmlFor="employee_code"
                                    className="mb-2 block font-semibold text-slate-700"
                                >
                                    Employee Code *
                                </label>

                                <input
                                    id="employee_code"
                                    type="text"
                                    required
                                    value={data.employee_code}
                                    onChange={(e) =>
                                        setData(
                                            'employee_code',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    placeholder="EMP001"
                                />

                                {errors.employee_code && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.employee_code}
                                    </p>
                                )}
                            </div>

                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block font-semibold text-slate-700"
                                >
                                    Name *
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    required
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    placeholder="Employee name"
                                />

                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block font-semibold text-slate-700"
                                >
                                    Email *
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    placeholder="employee@example.com"
                                />

                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.email}
                                    </p>
                                )}

                                <p className="mt-1 text-sm text-slate-500">
                                    This email will be used for employee login.
                                </p>
                            </div>

                            {/* Phone */}
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="mb-2 block font-semibold text-slate-700"
                                >
                                    Phone *
                                </label>

                                <input
                                    id="phone"
                                    type="text"
                                    required
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData('phone', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    placeholder="Phone number"
                                />

                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            {/* Department */}
                            <div>
                                <label
                                    htmlFor="department"
                                    className="mb-2 block font-semibold text-slate-700"
                                >
                                    Department *
                                </label>

                                <select
                                    id="department"
                                    required
                                    value={
                                        departments.find(
                                            (department) =>
                                                department.name ===
                                                data.department,
                                        )?.id.toString() ?? ''
                                    }
                                    onChange={(e) =>
                                        handleDepartmentChange(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                >
                                    <option value="">
                                        Select Department
                                    </option>

                                    {departments.map((department) => (
                                        <option
                                            key={department.id}
                                            value={department.id}
                                        >
                                            {department.name}
                                        </option>
                                    ))}
                                </select>

                                {errors.department && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.department}
                                    </p>
                                )}

                                {errors.department_code && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.department_code}
                                    </p>
                                )}

                                {departments.length === 0 && (
                                    <p className="mt-1 text-sm text-red-600">
                                        No departments available. Please add a
                                        department first.
                                    </p>
                                )}
                            </div>

                            {/* Position */}
                            <div>
                                <label
                                    htmlFor="position"
                                    className="mb-2 block font-semibold text-slate-700"
                                >
                                    Position *
                                </label>

                                <input
                                    id="position"
                                    type="text"
                                    required
                                    value={data.position}
                                    onChange={(e) =>
                                        setData('position', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    placeholder="Manager"
                                />

                                {errors.position && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.position}
                                    </p>
                                )}
                            </div>

                            {/* Joining Date */}
                            <div>
                                <label
                                    htmlFor="joining_date"
                                    className="mb-2 block font-semibold text-slate-700"
                                >
                                    Joining Date *
                                </label>

                                <input
                                    id="joining_date"
                                    type="date"
                                    required
                                    value={data.joining_date}
                                    onChange={(e) =>
                                        setData(
                                            'joining_date',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                />

                                {errors.joining_date && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.joining_date}
                                    </p>
                                )}
                            </div>

                            {/* Salary */}
                            <div>
                                <label
                                    htmlFor="salary"
                                    className="mb-2 block font-semibold text-slate-700"
                                >
                                    Salary *
                                </label>

                                <input
                                    id="salary"
                                    type="number"
                                    required
                                    min="0"
                                    step="0.01"
                                    value={data.salary}
                                    onChange={(e) =>
                                        setData('salary', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    placeholder="50000"
                                />

                                {errors.salary && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.salary}
                                    </p>
                                )}
                            </div>

                            {/* Status */}
                            <div>
                                <label
                                    htmlFor="status"
                                    className="mb-2 block font-semibold text-slate-700"
                                >
                                    Status *
                                </label>

                                <select
                                    id="status"
                                    required
                                    value={data.status}
                                    onChange={(e) =>
                                        setData(
                                            'status',
                                            e.target.value as
                                                | 'active'
                                                | 'inactive',
                                        )
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>

                                {errors.status && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.status}
                                    </p>
                                )}
                            </div>

                            {/* Employee Photo */}
                            <div className="md:col-span-2">
                                <label
                                    htmlFor="photo"
                                    className="mb-2 block font-semibold text-slate-700"
                                >
                                    Employee Photo *
                                </label>

                                <input
                                    id="photo"
                                    type="file"
                                    required
                                    accept=".jpg,.jpeg,.png,.svg,image/jpeg,image/png,image/svg+xml"
                                    onChange={(e) =>
                                        setData(
                                            'photo',
                                            e.target.files?.[0] ?? null,
                                        )
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                                />

                                <p className="mt-1 text-sm text-slate-500">
                                    JPG, JPEG, PNG or SVG. Maximum 2MB.
                                </p>

                                {errors.photo && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.photo}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <button
                                type="submit"
                                disabled={
                                    processing || departments.length === 0
                                }
                                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing
                                    ? 'Saving...'
                                    : 'Save Employee'}
                            </button>

                            <Link
                                href="/employees"
                                className="rounded-lg border border-slate-300 px-6 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-50"
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