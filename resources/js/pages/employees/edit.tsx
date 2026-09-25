import { Head, Link, useForm } from '@inertiajs/react';
import type { ChangeEvent, FormEvent } from 'react';

type Employee = {
    id: number;
    employee_code: string;
    name: string;
    email: string;
    phone: string | null;
    department_code: string | null;
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
    status: string;
    photo: File | null;
};

type EditProps = {
    employee: Employee;
    departments: Department[];
};

export default function Edit({ employee, departments }: EditProps) {
    const { data, setData, post, processing, errors } =
        useForm<EmployeeForm>({
            employee_code: employee.employee_code,
            name: employee.name,
            email: employee.email,
            phone: employee.phone ?? '',
            department_code: employee.department_code ?? '',
            department: employee.department ?? '',
            position: employee.position ?? '',
            joining_date: employee.joining_date
                ? employee.joining_date.substring(0, 10)
                : '',
            salary: employee.salary ?? '',
            status: employee.status,
            photo: null,
        });

    function submit(e: FormEvent) {
        e.preventDefault();

        post(`/employees/${employee.id}`, {
            forceFormData: true,
            headers: {
                'X-HTTP-Method-Override': 'PUT',
            },
        });
    }

    function handlePhotoChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null;
        setData('photo', file);
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

    const selectedDepartmentId =
        departments.find(
            (department) =>
                department.department_code === data.department_code &&
                department.name === data.department,
        )?.id.toString() ?? '';

    return (
        <>
            <Head title={`Edit - ${employee.name}`} />

            <div className="min-h-screen bg-gray-100 p-6">
                <div className="mx-auto max-w-4xl">

                    {/* Header */}
                    <div className="mb-6">
                        <Link
                            href={`/employees/${employee.id}`}
                            className="text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                            ← Back to Employee
                        </Link>

                        <h1 className="mt-3 text-3xl font-bold text-gray-900">
                            Edit Employee
                        </h1>

                        <p className="mt-1 text-gray-600">
                            Update employee information.
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={submit}
                        className="rounded-xl bg-white p-6 shadow"
                    >
                        <div className="grid gap-6 md:grid-cols-2">

                            {/* Employee Code */}
                            <div>
                                <label className="mb-2 block font-medium text-gray-700">
                                    Employee Code *
                                </label>

                                <input
                                    type="text"
                                    value={data.employee_code}
                                    onChange={(e) =>
                                        setData(
                                            'employee_code',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900"
                                />

                                {errors.employee_code && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.employee_code}
                                    </p>
                                )}
                            </div>

                            {/* Name */}
                            <div>
                                <label className="mb-2 block font-medium text-gray-700">
                                    Name *
                                </label>

                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900"
                                />

                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="mb-2 block font-medium text-gray-700">
                                    Email *
                                </label>

                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900"
                                />

                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="mb-2 block font-medium text-gray-700">
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData('phone', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900"
                                />

                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            {/* Department */}
                            <div>
                                <label className="mb-2 block font-medium text-gray-700">
                                    Department *
                                </label>

                                <select
                                    required
                                    value={selectedDepartmentId}
                                    onChange={(e) =>
                                        handleDepartmentChange(
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900"
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

                                {departments.length === 0 && (
                                    <p className="mt-1 text-sm text-red-600">
                                        No departments available. Please add a
                                        department first.
                                    </p>
                                )}
                            </div>

                            {/* Department Code */}
                            <div>
                                <label className="mb-2 block font-medium text-gray-700">
                                    Department Code
                                </label>

                                <input
                                    type="text"
                                    value={data.department_code}
                                    readOnly
                                    className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-gray-900"
                                />

                                {errors.department_code && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.department_code}
                                    </p>
                                )}
                            </div>

                            {/* Position */}
                            <div>
                                <label className="mb-2 block font-medium text-gray-700">
                                    Position
                                </label>

                                <input
                                    type="text"
                                    value={data.position}
                                    onChange={(e) =>
                                        setData('position', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900"
                                />

                                {errors.position && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.position}
                                    </p>
                                )}
                            </div>

                            {/* Joining Date */}
                            <div>
                                <label className="mb-2 block font-medium text-gray-700">
                                    Joining Date
                                </label>

                                <input
                                    type="date"
                                    value={data.joining_date}
                                    onChange={(e) =>
                                        setData(
                                            'joining_date',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900"
                                />

                                {errors.joining_date && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.joining_date}
                                    </p>
                                )}
                            </div>

                            {/* Salary */}
                            <div>
                                <label className="mb-2 block font-medium text-gray-700">
                                    Salary
                                </label>

                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.salary}
                                    onChange={(e) =>
                                        setData('salary', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900"
                                />

                                {errors.salary && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.salary}
                                    </p>
                                )}
                            </div>

                            {/* Status */}
                            <div>
                                <label className="mb-2 block font-medium text-gray-700">
                                    Status *
                                </label>

                                <select
                                    value={data.status}
                                    onChange={(e) =>
                                        setData('status', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">
                                        Inactive
                                    </option>
                                </select>

                                {errors.status && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.status}
                                    </p>
                                )}
                            </div>

                            {/* Employee Photo */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block font-medium text-gray-700">
                                    Employee Photo
                                </label>

                                {employee.photo && !data.photo && (
                                    <div className="mb-4">
                                        <p className="mb-2 text-sm font-medium text-gray-600">
                                            Current Photo
                                        </p>

                                        <img
                                            src={`/storage/${employee.photo}`}
                                            alt={employee.name}
                                            className="h-40 w-40 rounded-xl border border-gray-200 object-cover shadow"
                                        />
                                    </div>
                                )}

                                {data.photo && (
                                    <div className="mb-4">
                                        <p className="mb-2 text-sm font-medium text-gray-600">
                                            New Photo Preview
                                        </p>

                                        <img
                                            src={URL.createObjectURL(
                                                data.photo,
                                            )}
                                            alt="New employee preview"
                                            className="h-40 w-40 rounded-xl border border-gray-200 object-cover shadow"
                                        />
                                    </div>
                                )}

                                <input
                                    type="file"
                                    accept=".jpg,.jpeg,.png,.svg"
                                    onChange={handlePhotoChange}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900"
                                />

                                <p className="mt-2 text-sm text-gray-500">
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
                        <div className="mt-8 flex gap-3">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing
                                    ? 'Updating...'
                                    : 'Update Employee'}
                            </button>

                            <Link
                                href={`/employees/${employee.id}`}
                                className="rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
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