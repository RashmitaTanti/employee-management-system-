import { Head, Link } from '@inertiajs/react';

type Employee = {
    id: number;
    employee_code: string;
    name: string;
    email: string;
    phone: string;
    department_code: string;
    department: string;
    position: string;
    joining_date: string;
    salary: string | number;
    status: 'active' | 'inactive';
    photo: string | null;
};

type Props = {
    employee: Employee;
};

export default function MyProfile({ employee }: Props) {
    const photoUrl = employee.photo
        ? `/storage/${employee.photo}`
        : null;

    const joiningDate = employee.joining_date
        ? employee.joining_date.split('T')[0]
        : '-';

    const salary = Number(employee.salary || 0).toLocaleString('en-IN');

    return (
        <>
            <Head title="My Profile" />

            <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">

                    {/* Header */}
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">
                                My Profile
                            </h1>

                            <p className="mt-1 text-slate-600">
                                View your employee information
                            </p>
                        </div>

                        <Link
                            href="/dashboard"
                            className="inline-flex w-fit items-center rounded-lg bg-slate-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-slate-800"
                        >
                            ← Dashboard
                        </Link>
                    </div>

                    {/* Profile Card */}
                    <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">

                        {/* Profile Header */}
                        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-10 sm:px-10">
                            <div className="flex flex-col items-center gap-6 sm:flex-row">

                                {/* Photo */}
                                <div className="flex h-36 w-36 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-slate-200 shadow-xl">
                                    {photoUrl ? (
                                        <img
                                            src={photoUrl}
                                            alt={employee.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-5xl font-bold text-slate-500">
                                            {employee.name
                                                .charAt(0)
                                                .toUpperCase()}
                                        </span>
                                    )}
                                </div>

                                {/* Name */}
                                <div className="text-center text-white sm:text-left">
                                    <h2 className="text-3xl font-bold">
                                        {employee.name}
                                    </h2>

                                    <p className="mt-2 text-lg text-blue-100">
                                        {employee.position}
                                    </p>

                                    <span
                                        className={`mt-3 inline-flex rounded-full px-4 py-1.5 text-sm font-bold ${
                                            employee.status === 'active'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                        }`}
                                    >
                                        {employee.status.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Information */}
                        <div className="p-6 sm:p-10">

                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-slate-900">
                                    Employee Information
                                </h3>

                                <p className="mt-1 text-slate-500">
                                    Your personal employment information
                                </p>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">

                                {/* Employee Code */}
                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                                    <p className="text-sm font-medium text-slate-500">
                                        Employee Code
                                    </p>

                                    <p className="mt-1 text-lg font-bold text-slate-900">
                                        {employee.employee_code}
                                    </p>
                                </div>

                                {/* Email */}
                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                                    <p className="text-sm font-medium text-slate-500">
                                        Email
                                    </p>

                                    <p className="mt-1 break-all text-lg font-bold text-slate-900">
                                        {employee.email}
                                    </p>
                                </div>

                                {/* Phone */}
                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                                    <p className="text-sm font-medium text-slate-500">
                                        Phone
                                    </p>

                                    <p className="mt-1 text-lg font-bold text-slate-900">
                                        {employee.phone}
                                    </p>
                                </div>

                                {/* Department */}
                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                                    <p className="text-sm font-medium text-slate-500">
                                        Department
                                    </p>

                                    <p className="mt-1 text-lg font-bold text-slate-900">
                                        {employee.department}
                                    </p>
                                </div>

                                {/* Department Code */}
                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                                    <p className="text-sm font-medium text-slate-500">
                                        Department Code
                                    </p>

                                    <p className="mt-1 text-lg font-bold text-slate-900">
                                        {employee.department_code}
                                    </p>
                                </div>

                                {/* Position */}
                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                                    <p className="text-sm font-medium text-slate-500">
                                        Position
                                    </p>

                                    <p className="mt-1 text-lg font-bold text-slate-900">
                                        {employee.position}
                                    </p>
                                </div>

                                {/* Joining Date */}
                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                                    <p className="text-sm font-medium text-slate-500">
                                        Joining Date
                                    </p>

                                    <p className="mt-1 text-lg font-bold text-slate-900">
                                        {joiningDate}
                                    </p>
                                </div>

                                {/* Salary */}
                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                                    <p className="text-sm font-medium text-slate-500">
                                        Salary
                                    </p>

                                    <p className="mt-1 text-lg font-bold text-slate-900">
                                        ₹{salary}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Information Notice */}
                    <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4 text-center text-sm text-blue-800">
                        You can view your employee information here. Contact
                        your administrator if any information needs to be
                        changed.
                    </div>

                </div>
            </div>
        </>
    );
}