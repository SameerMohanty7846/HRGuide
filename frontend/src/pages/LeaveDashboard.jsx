import React from 'react';
import { format, differenceInCalendarDays } from 'date-fns';
import { FaUserCircle, FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaBoxOpen } from 'react-icons/fa';

// --- UI-ONLY MOCK DATA ---
const mockRequests = [
    {
        id: 101,
        status: 'approved',
        start_date: '2025-08-20T00:00:00.000Z',
        end_date: '2025-08-22T00:00:00.000Z',
        reason: 'Family vacation to the mountains.',
        manager_comments: 'Approved. Enjoy your trip!',
        Employee: { id: 2, name: 'Jane Doe' },
        LeaveType: { name: 'Annual Leave' },
        employee_id: 2,
    },
    {
        id: 102,
        status: 'pending',
        start_date: '2025-09-01T00:00:00.000Z',
        end_date: '2025-09-01T00:00:00.000Z',
        reason: 'Doctor\'s appointment in the morning.',
        manager_comments: null,
        Employee: { id: 3, name: 'Peter Jones' },
        LeaveType: { name: 'Sick Leave' },
        employee_id: 3,
    },
    {
        id: 103,
        status: 'rejected',
        start_date: '2025-08-25T00:00:00.000Z',
        end_date: '2025-08-29T00:00:00.000Z',
        reason: 'Personal trip.',
        manager_comments: 'Rejected due to critical project deadlines.',
        Employee: { id: 4, name: 'Sam Wilson' },
        LeaveType: { name: 'Unpaid Leave' },
        employee_id: 4,
    },
    {
        id: 104,
        status: 'approved',
        start_date: '2025-09-05T00:00:00.000Z',
        end_date: '2025-09-05T00:00:00.000Z',
        reason: 'Attending a tech conference.',
        manager_comments: 'Approved.',
        Employee: { id: 2, name: 'Jane Doe' },
        LeaveType: { name: 'Work From Home' },
        employee_id: 2,
    },
];

// UI-ONLY Component (Fully Responsive)
const LeaveDashboard = () => {
    const showEmployeeColumn = true;
    const canManage = true;
    
    const actionSlot = (request) => (
        <button 
            className="bg-blue-500 text-white text-xs font-semibold py-1 px-3 rounded-full hover:bg-blue-600 transition-colors disabled:bg-gray-400"
            disabled={request.status !== 'pending'}
        >
            Manage
        </button>
    );
    
    const getStatusInfo = (status) => {
        switch (status) {
            case 'approved':
                return { icon: <FaCheckCircle className="mr-1.5" />, textClass: 'text-green-800', bgClass: 'bg-green-100' };
            case 'rejected':
                return { icon: <FaTimesCircle className="mr-1.5" />, textClass: 'text-red-800', bgClass: 'bg-red-100' };
            default:
                return { icon: <FaHourglassHalf className="mr-1.5" />, textClass: 'text-yellow-800', bgClass: 'bg-yellow-100' };
        }
    };

    // This colSpan is for the "No requests found" row, it should be the max number of columns
    const maxColSpan = 10;

    return (
        <div className="bg-white rounded-xl shadow-lg p-2 sm:p-4 md:p-6">
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead className="bg-gray-50">
                        <tr className="border-b">
                            {/* RESPONSIVE CHANGE: Optimized padding and text size */}
                            <th className="p-2 md:p-4 text-xs md:text-sm font-semibold text-gray-600 text-left">SL</th>
                            
                            {/* RESPONSIVE CHANGE: This column is hidden on small screens (mobile) */}
                            <th className="hidden md:table-cell p-2 md:p-4 text-xs md:text-sm font-semibold text-gray-600 text-left">Application ID</th>
                            
                            {showEmployeeColumn && <th className="p-2 md:p-4 text-xs md:text-sm font-semibold text-gray-600 text-left">Employee</th>}
                            <th className="p-2 md:p-4 text-xs md:text-sm font-semibold text-gray-600 text-left">Leave Type</th>
                            <th className="p-2 md:p-4 text-xs md:text-sm font-semibold text-gray-600 text-left">Dates</th>
                            <th className="p-2 md:p-4 text-xs md:text-sm font-semibold text-gray-600 text-center">Days</th>
                            <th className="p-2 md:p-4 text-xs md:text-sm font-semibold text-gray-600 text-left">Status</th>
                            
                            {/* RESPONSIVE CHANGE: These columns are hidden on small screens */}
                            <th className="hidden md:table-cell p-2 md:p-4 text-xs md:text-sm font-semibold text-gray-600 text-left">Reason</th>
                            <th className="hidden md:table-cell p-2 md:p-4 text-xs md:text-sm font-semibold text-gray-600 text-left">Comments</th>

                            {canManage && <th className="p-2 md:p-4 text-xs md:text-sm font-semibold text-gray-600 text-center">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {mockRequests.length > 0 ? (
                            mockRequests.map((request, i) => {
                                const statusInfo = getStatusInfo(request.status);
                                return (
                                    <tr key={request.id} className="hover:bg-gray-50 transition-colors border-b">
                                        <td className="p-2 md:p-4 text-sm font-medium text-gray-700">{i + 1}</td>
                                        
                                        {/* RESPONSIVE CHANGE: This cell is hidden on small screens */}
                                        <td className="hidden md:table-cell p-2 md:p-4 text-sm text-gray-500">{request.id}</td>

                                        {showEmployeeColumn && (
                                            <td className="p-2 md:p-4 text-sm">
                                                <div className="flex items-center space-x-2">
                                                    <FaUserCircle className="text-2xl text-gray-400" />
                                                    <div>
                                                        <div className="font-semibold text-gray-800">{request.Employee?.name || 'N/A'}</div>
                                                        <div className="text-xs text-gray-500">ID: {request.Employee?.id || 'N/A'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                        )}
                                        <td className="p-2 md:p-4 text-sm text-gray-700">{request.LeaveType?.name || 'N/A'}</td>
                                        <td className="p-2 md:p-4 text-sm text-gray-700">{`${format(new Date(request.start_date), 'MMM dd')} - ${format(new Date(request.end_date), 'MMM dd, yyyy')}`}</td>
                                        <td className="p-2 md:p-4 text-center font-bold text-lg text-blue-700">
                                            {differenceInCalendarDays(new Date(request.end_date), new Date(request.start_date)) + 1}
                                        </td>
                                        <td className="p-2 md:p-4">
                                            <span className={`capitalize font-semibold text-xs py-1 px-2.5 rounded-full inline-flex items-center ${statusInfo.bgClass} ${statusInfo.textClass}`}>
                                                {statusInfo.icon}
                                                <span className="hidden sm:inline">{request.status}</span>
                                            </span>
                                        </td>

                                        {/* RESPONSIVE CHANGE: These cells are hidden on small screens */}
                                        <td className="hidden md:table-cell p-2 md:p-4 text-sm text-gray-600 truncate max-w-[150px]" title={request.reason}>
                                            {request.reason || <span className="text-gray-400">N/A</span>}
                                        </td>
                                        <td className="hidden md:table-cell p-2 md:p-4 text-sm text-gray-600 truncate max-w-[150px]" title={request.manager_comments}>
                                            {request.manager_comments || <span className="text-gray-400">N/A</span>}
                                        </td>
                                        {canManage && (
                                            <td className="p-2 md:p-4 text-center">
                                                {actionSlot(request)}
                                            </td>
                                        )}
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={maxColSpan}>
                                    <div className="flex flex-col items-center justify-center text-center py-16">
                                        <FaBoxOpen className="text-5xl text-gray-300 mb-4" />
                                        <h3 className="text-xl font-semibold text-gray-700">No Leave Requests Found</h3>
                                        <p className="text-gray-500 mt-1">When new requests are made, they will appear here.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeaveDashboard;