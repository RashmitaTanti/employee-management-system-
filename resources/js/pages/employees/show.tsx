import { Head, Link } from '@inertiajs/react';

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

type ShowProps = {
    employee: Employee;
};

export default function Show({ employee }: ShowProps) {
    const formattedSalary = employee.salary
        ? Number(employee.salary).toLocaleString('en-IN', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
          })
        : null;

    // Joining Date format: DD-MM-YYYY
    const formattedJoiningDate = employee.joining_date
        ? (() => {
              const date = employee.joining_date.substring(0, 10);
              const [year, month, day] = date.split('-');

              return `${day}-${month}-${year}`;
          })()
        : '-';

    return (
        <>
            <Head title={`Employee - ${employee.name}`} />

            <div className="min-h-screen bg-slate-100 p-4 md:p-6">
                <div className="mx-auto max-w-6xl">

                    {/* Header */}
                    <div className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">

                        <div>
                            <Link
                                href="/employees"
                                className="inline-flex items-center rounded-md bg-slate-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700"
                            >
                                ← Back to Employees
                            </Link>

                            <h1 className="mt-4 text-3xl font-bold text-slate-800">
                                Employee Details
                            </h1>

                            <p className="mt-1 text-slate-500">
                                View complete employee information
                            </p>
                        </div>

                        {/* Update Button */}
                        <Link
                            href={`/employees/${employee.id}/edit`}
                            className="inline-flex items-center justify-center rounded-lg bg-green-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-green-700 hover:shadow-md"
                        >
                            ✏ Update Employee
                        </Link>
                    </div>

                    {/* Main Employee Card */}
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm">

                        {/* Employee Profile Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 md:p-8">
                            <div className="flex flex-col items-center gap-6 md:flex-row">

                                {/* Employee Photo */}
                                <div className="shrink-0">
                                    {employee.photo ? (
                                        <img
                                            src={`/storage/${employee.photo}`}
                                            alt={employee.name}
                                            className="h-40 w-40 rounded-2xl border-4 border-white object-cover shadow-lg"
                                        />
                                    ) : (
                                        <div className="flex h-40 w-40 items-center justify-center rounded-2xl border-4 border-white bg-slate-200 text-sm font-semibold text-slate-500 shadow-lg">
                                            No Photo
                                        </div>
                                    )}
                                </div>

                                {/* Basic Information */}
                                <div className="text-center md:text-left">
                                    <h2 className="text-3xl font-bold text-white">
                                        {employee.name}
                                    </h2>

                                    <p className="mt-2 text-blue-100">
                                        Employee Code: {employee.employee_code}
                                    </p>

                                    <div className="mt-4">
                                        <span
                                            className={`inline-flex rounded-full px-4 py-2 text-sm font-bold uppercase ${
                                                employee.status === 'active'
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-red-500 text-white'
                                            }`}
                                        >
                                            ● {employee.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Employee Information */}
                        <div className="p-6 md:p-8">

                            <h3 className="mb-6 border-b border-slate-200 pb-3 text-xl font-bold text-slate-800">
                                Personal & Job Information
                            </h3>

                            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                                {/* Employee Code */}
                                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-sm font-semibold text-slate-500">
                                        Employee Code
                                    </p>

                                    <p className="mt-2 font-bold text-slate-800">
                                        {employee.employee_code}
                                    </p>
                                </div>

                                {/* Name */}
                                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-sm font-semibold text-slate-500">
                                        Full Name
                                    </p>

                                    <p className="mt-2 font-bold text-slate-800">
                                        {employee.name}
                                    </p>
                                </div>

                                {/* Email */}
                                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-sm font-semibold text-slate-500">
                                        Email
                                    </p>

                                    <p className="mt-2 break-all font-semibold text-slate-800">
                                        {employee.email}
                                    </p>
                                </div>

                                {/* Phone */}
                                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-sm font-semibold text-slate-500">
                                        Phone
                                    </p>

                                    <p className="mt-2 font-semibold text-slate-800">
                                        {employee.phone || '-'}
                                    </p>
                                </div>

                                {/* Department Code */}
                                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-sm font-semibold text-slate-500">
                                        Department Code
                                    </p>

                                    <p className="mt-2 font-semibold text-slate-800">
                                        {employee.department_code || '-'}
                                    </p>
                                </div>

                                {/* Department */}
                                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-sm font-semibold text-slate-500">
                                        Department
                                    </p>

                                    <p className="mt-2 font-semibold text-slate-800">
                                        {employee.department || '-'}
                                    </p>
                                </div>

                                {/* Position */}
                                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-sm font-semibold text-slate-500">
                                        Position
                                    </p>

                                    <p className="mt-2 font-semibold text-slate-800">
                                        {employee.position || '-'}
                                    </p>
                                </div>

                                {/* Joining Date */}
                                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-sm font-semibold text-slate-500">
                                        Joining Date
                                    </p>

                                    <p className="mt-2 font-semibold text-slate-800">
                                        {formattedJoiningDate}
                                    </p>
                                </div>

                                {/* Salary */}
                                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-sm font-semibold text-slate-500">
                                        Salary
                                    </p>

                                    <p className="mt-2 font-bold text-green-600">
                                        {formattedSalary
                                            ? `₹${formattedSalary}`
                                            : '-'}
                                    </p>
                                </div>

                                {/* Status */}
                                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-sm font-semibold text-slate-500">
                                        Status
                                    </p>

                                    <div className="mt-2">
                                        <span
                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase ${
                                                employee.status === 'active'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                            }`}
                                        >
                                            {employee.status}
                                        </span>
                                    </div>
                                </div>

                            </div>

                            {/* Bottom Actions */}
                            <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row">

                                <Link
                                    href={`/employees/${employee.id}/edit`}
                                    className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-green-700 hover:shadow-md"
                                >
                                    ✏ Update Employee
                                </Link>

                                <Link
                                    href="/employees"
                                    className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
                                >
                                    👥 All Employees
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}