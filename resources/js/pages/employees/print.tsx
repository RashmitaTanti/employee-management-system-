import { Head, Link } from '@inertiajs/react';
import { useEffect } from 'react';

interface Employee {
    id: number;
    employee_code: string;
    name: string;
    email: string;
    phone: string | null;
    department_code: string | null;
    department: string | null;
    position: string | null;
    joining_date: string | null;
    salary: string | number | null;
    status: 'active' | 'inactive';
}

interface Filters {
    search?: string | null;
    department?: string | null;
    min_salary?: string | null;
    max_salary?: string | null;
    from_date?: string | null;
    to_date?: string | null;
    sort_by?: string | null;
    sort_direction?: string | null;
}

interface PrintPageProps {
    employees: Employee[];
    filters: Filters;
}

export default function PrintEmployees({
    employees,
    filters,
}: PrintPageProps) {
    /*
    |--------------------------------------------------------------------------
    | Automatically Open Browser Print
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        const timer = window.setTimeout(() => {
            window.print();
        }, 800);

        return () => {
            window.clearTimeout(timer);
        };
    }, []);

    /*
    |--------------------------------------------------------------------------
    | Format Date
    |--------------------------------------------------------------------------
    */

    const formatDate = (date: string | null) => {
        if (!date) {
            return '-';
        }

        const cleanDate = date.substring(0, 10);
        const [year, month, day] = cleanDate.split('-');

        if (!year || !month || !day) {
            return date;
        }

        return `${day}-${month}-${year}`;
    };

    /*
    |--------------------------------------------------------------------------
    | Format Salary
    |--------------------------------------------------------------------------
    */

    const formatSalary = (salary: string | number | null) => {
        if (
            salary === null ||
            salary === undefined ||
            salary === ''
        ) {
            return '-';
        }

        const amount = Number(salary);

        if (Number.isNaN(amount)) {
            return String(salary);
        }

        return `₹${amount.toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    };

    /*
    |--------------------------------------------------------------------------
    | Sorting Label
    |--------------------------------------------------------------------------
    */

    const sortLabels: Record<string, string> = {
        employee_code: 'Employee Code',
        name: 'Name',
        joining_date: 'Joining Date',
        salary: 'Salary',
        created_at: 'Created Date',
    };

    const sortLabel = filters.sort_by
        ? sortLabels[filters.sort_by] ?? filters.sort_by
        : 'Default';

    const sortDirection =
        filters.sort_direction === 'asc'
            ? 'Ascending'
            : 'Descending';

    /*
    |--------------------------------------------------------------------------
    | Check Filters
    |--------------------------------------------------------------------------
    */

    const hasFilters =
        Boolean(filters.search) ||
        Boolean(filters.department) ||
        Boolean(filters.min_salary) ||
        Boolean(filters.max_salary) ||
        Boolean(filters.from_date) ||
        Boolean(filters.to_date);

    return (
        <>
            <Head title="Employee List - Print" />

            <div className="print-page">

                {/* =====================================================
                    SCREEN ONLY TOOLBAR
                ===================================================== */}

                <div className="no-print toolbar">

                    <Link
                        href="/employees"
                        className="back-button"
                    >
                        ← Back to Employees
                    </Link>

                    <button
                        type="button"
                        className="print-button"
                        onClick={() => window.print()}
                    >
                        🖨 Print Employee List
                    </button>

                </div>

                {/* =====================================================
                    PRINT HEADER
                ===================================================== */}

                <div className="print-header">

                    <div>
                        <h1>Employee List</h1>

                        <p>
                            Employee Management System
                        </p>
                    </div>

                    <div className="print-info">

                        <div>
                            <strong>Printed:</strong>{' '}
                            {new Date().toLocaleDateString('en-IN')}
                        </div>

                        <div>
                            <strong>Total Employees:</strong>{' '}
                            {employees.length}
                        </div>

                    </div>

                </div>

                {/* =====================================================
                    FILTER INFORMATION
                ===================================================== */}

                {hasFilters && (
                    <div className="filter-box">

                        <strong>Filters:</strong>

                        {filters.search && (
                            <span>
                                Search: {filters.search}
                            </span>
                        )}

                        {filters.department && (
                            <span>
                                Department: {filters.department}
                            </span>
                        )}

                        {filters.min_salary && (
                            <span>
                                Min Salary: ₹{filters.min_salary}
                            </span>
                        )}

                        {filters.max_salary && (
                            <span>
                                Max Salary: ₹{filters.max_salary}
                            </span>
                        )}

                        {filters.from_date && (
                            <span>
                                From:{' '}
                                {formatDate(filters.from_date)}
                            </span>
                        )}

                        {filters.to_date && (
                            <span>
                                To:{' '}
                                {formatDate(filters.to_date)}
                            </span>
                        )}

                        <span>
                            Sort: {sortLabel} ({sortDirection})
                        </span>

                    </div>
                )}

                {/* =====================================================
                    EMPLOYEE TABLE
                ===================================================== */}

                <table className="employee-table">

                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Department</th>
                            <th>Position</th>
                            <th>Joining Date</th>
                            <th>Salary</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        {employees.length > 0 ? (

                            employees.map((employee) => (
                                <tr key={employee.id}>

                                    <td>
                                        {employee.employee_code}
                                    </td>

                                    <td>
                                        {employee.name}
                                    </td>

                                    <td>
                                        {employee.email}
                                    </td>

                                    <td>
                                        {employee.phone ?? '-'}
                                    </td>

                                    <td>
                                        {employee.department ?? '-'}
                                    </td>

                                    <td>
                                        {employee.position ?? '-'}
                                    </td>

                                    <td>
                                        {formatDate(
                                            employee.joining_date
                                        )}
                                    </td>

                                    <td className="salary">
                                        {formatSalary(
                                            employee.salary
                                        )}
                                    </td>

                                    <td>

                                        <span
                                            className={
                                                employee.status ===
                                                'active'
                                                    ? 'status-active'
                                                    : 'status-inactive'
                                            }
                                        >
                                            {employee.status.toUpperCase()}
                                        </span>

                                    </td>

                                </tr>
                            ))

                        ) : (

                            <tr>
                                <td
                                    colSpan={9}
                                    className="no-data"
                                >
                                    No employees found.
                                </td>
                            </tr>

                        )}

                    </tbody>

                </table>

                {/* =====================================================
                    FOOTER
                ===================================================== */}

                <div className="print-footer">
                    Employee Management System
                </div>

            </div>

            {/* =========================================================
                STYLE
            ========================================================= */}

            <style>{`

                * {
                    box-sizing: border-box;
                }

                html,
                body {
                    margin: 0;
                    padding: 0;
                    background: #ffffff;
                    color: #111827;
                    font-family: Arial, Helvetica, sans-serif;
                }

                .print-page {
                    width: 100%;
                    padding: 20px;
                    background: #ffffff;
                }

                /* =====================================================
                   SCREEN TOOLBAR
                ===================================================== */

                .toolbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    padding: 12px 15px;
                    background: #f3f4f6;
                    border-radius: 8px;
                }

                .back-button,
                .print-button {
                    border: none;
                    border-radius: 7px;
                    padding: 9px 15px;
                    font-size: 14px;
                    font-weight: 600;
                    text-decoration: none;
                    cursor: pointer;
                }

                .back-button {
                    background: #e5e7eb;
                    color: #111827;
                }

                .print-button {
                    background: #4f46e5;
                    color: #ffffff;
                }

                /* =====================================================
                   PRINT HEADER
                ===================================================== */

                .print-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 10px;
                    padding-bottom: 8px;
                    border-bottom: 2px solid #111827;
                }

                .print-header h1 {
                    margin: 0;
                    font-size: 24px;
                }

                .print-header p {
                    margin: 3px 0 0;
                    font-size: 11px;
                    color: #4b5563;
                }

                .print-info {
                    text-align: right;
                    font-size: 10px;
                    line-height: 1.5;
                }

                /* =====================================================
                   FILTER BOX
                ===================================================== */

                .filter-box {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 5px;
                    margin-bottom: 8px;
                    padding: 6px;
                    background: #f9fafb;
                    border: 1px solid #d1d5db;
                    font-size: 9px;
                }

                .filter-box span {
                    padding: 2px 5px;
                    background: #ffffff;
                    border: 1px solid #d1d5db;
                }

                /* =====================================================
                   EMPLOYEE TABLE
                ===================================================== */

                .employee-table {
                    width: 100%;
                    border-collapse: collapse;
                    table-layout: fixed;
                    font-size: 8px;
                }

                /*
                 * Repeat header on every printed page.
                 */

                .employee-table thead {
                    display: table-header-group;
                }

                .employee-table tbody {
                    display: table-row-group;
                }

                /*
                 * Keep each employee row together.
                 *
                 * IMPORTANT:
                 * This does NOT create one page per employee.
                 */

                .employee-table tr {
                    break-inside: avoid;
                    page-break-inside: avoid;
                }

                .employee-table th {
                    padding: 5px 4px;
                    border: 1px solid #111827;
                    background: #e5e7eb;
                    color: #111827;
                    font-weight: 700;
                    text-align: left;
                }

                .employee-table td {
                    padding: 4px;
                    border: 1px solid #6b7280;
                    vertical-align: middle;
                    word-break: break-word;
                }

                .employee-table tbody tr:nth-child(even) {
                    background: #f9fafb;
                }

                /* =====================================================
                   COLUMN WIDTHS
                ===================================================== */

                .employee-table th:nth-child(1) {
                    width: 8%;
                }

                .employee-table th:nth-child(2) {
                    width: 11%;
                }

                .employee-table th:nth-child(3) {
                    width: 16%;
                }

                .employee-table th:nth-child(4) {
                    width: 10%;
                }

                .employee-table th:nth-child(5) {
                    width: 14%;
                }

                .employee-table th:nth-child(6) {
                    width: 12%;
                }

                .employee-table th:nth-child(7) {
                    width: 10%;
                }

                .employee-table th:nth-child(8) {
                    width: 10%;
                }

                .employee-table th:nth-child(9) {
                    width: 9%;
                }

                .salary {
                    white-space: nowrap;
                }

                /* =====================================================
                   STATUS
                ===================================================== */

                .status-active,
                .status-inactive {
                    display: inline-block;
                    padding: 2px 4px;
                    border-radius: 3px;
                    font-size: 7px;
                    font-weight: 700;
                }

                .status-active {
                    background: #dcfce7;
                    color: #166534;
                }

                .status-inactive {
                    background: #fee2e2;
                    color: #991b1b;
                }

                .no-data {
                    padding: 20px !important;
                    text-align: center;
                }

                /* =====================================================
                   FOOTER
                ===================================================== */

                .print-footer {
                    margin-top: 8px;
                    padding-top: 5px;
                    border-top: 1px solid #9ca3af;
                    font-size: 8px;
                    color: #4b5563;
                }

                /* =====================================================
                   A4 LANDSCAPE
                ===================================================== */

                @page {
                    size: A4 landscape;
                    margin: 8mm;
                }

                /* =====================================================
                   PRINT MODE
                ===================================================== */

                @media print {

                    html,
                    body {
                        width: 100%;
                        margin: 0;
                        padding: 0;
                        background: #ffffff;
                    }

                    .print-page {
                        width: 100%;
                        margin: 0;
                        padding: 0;
                    }

                    .no-print {
                        display: none !important;
                    }

                    /*
                     * IMPORTANT:
                     * No forced page breaks.
                     *
                     * The table will continue:
                     *
                     * Page 1
                     * Page 2
                     * Page 3
                     * ...
                     */

                    .employee-table {
                        width: 100%;
                        border-collapse: collapse;
                        page-break-after: auto;
                        break-after: auto;
                    }

                    /*
                     * Repeat table header.
                     */

                    .employee-table thead {
                        display: table-header-group;
                    }

                    /*
                     * Keep employee rows together.
                     */

                    .employee-table tr {
                        break-inside: avoid;
                        page-break-inside: avoid;
                    }

                    /*
                     * Print table header colors.
                     */

                    .employee-table th {
                        background: #e5e7eb !important;
                        color: #111827 !important;

                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }

                    /*
                     * Alternate rows.
                     */

                    .employee-table tbody tr:nth-child(even) {
                        background: #f9fafb !important;

                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }

                    /*
                     * Active status.
                     */

                    .status-active {
                        background: #dcfce7 !important;
                        color: #166534 !important;

                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }

                    /*
                     * Inactive status.
                     */

                    .status-inactive {
                        background: #fee2e2 !important;
                        color: #991b1b !important;

                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }

                    .print-footer {
                        margin-top: 5px;
                    }
                }

            `}</style>
        </>
    );
}