import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const roleNavigation = {
  admin: [
    { path: '/admin/admindashboard', label: 'Admin Dashboard' },
    { path: '/admin/addemployee', label: 'Add Employee' },
    { path: '/admin/viewemployees', label: 'View Employees' },
    { path: '/admin/permissions', label: 'Employee Permission List' },
    { path: '/admin/change-password', label: 'Change Password' },
    { path: '/admin/leave-policy', label: 'HR Leave Policy' },
    { path: '/admin/attendance-report', label: 'Employee Attendance Report' },
    { path: '/admin/monthly-salary-report', label: 'Monthly Salary Report' },
    { path: '/admin/salary-policy', label: 'Salary Policy Form' },
    { path: '/admin/payroll', label: 'Employee Payroll' },
  ],
  employee: [
    { path: '/employee/employeedashboard', label: 'Employee Dashboard' },
    { path: '/employee/assign-task', label: 'Assign Task' },
    { path: '/employee/task-management', label: 'Task Management' },
    { path: '/employee/change-password', label: 'Change Password' },
    { path: '/employee/permissions', label: 'Granted Permissions' },
    { path: '/employee/leave-apply', label: 'Apply Leave' },
    { path: '/employee/leave-dashboard', label: 'Leave Dashboard' },
  ],
  hr: [
    { path: '/hr/hrdashboard', label: 'HR Dashboard' },
    { path: '/hr/viewemployees', label: 'View Employees' },
    { path: '/hr/policy', label: 'HR Policy' },
    { path: '/hr/leave-policy', label: 'Leave Policy' },
    { path: '/hr/assign-task', label: 'Assign Task' },
    { path: '/hr/task-management', label: 'Task Management' },
    { path: '/hr/change-password', label: 'Change Password' },
    { path: '/hr/permissions', label: 'Granted Permissions' },
    { path: '/hr/leave-applications', label: 'Leave Applications' },
  ],
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem('role') || 'employee';
  const menuItems = roleNavigation[role] || [];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 bg-gradient-to-b from-indigo-700 via-sky-600 to-cyan-600 text-white shadow-lg
        transform transition-transform duration-300 ease-in-out
        sm:relative sm:translate-x-0 sm:flex sm:flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        h-screen sm:h-auto flex flex-col`}
    >
      {/* Profile Circle */}
      <div className="flex items-center justify-center pt-12 sm:pt-6">
        <div className="w-20 h-20 rounded-full bg-white bg-opacity-25 flex items-center justify-center text-white text-sm font-semibold select-none shadow-md">
          Image
        </div>
      </div>

      {/* Navigation Menu (Scrollable) */}
      <nav className="flex-1 overflow-y-auto p-6 mt-8 space-y-3 scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-indigo-300">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={toggleSidebar}
            className={`block px-5 py-3 rounded-lg text-sm font-semibold transition duration-200
              ${
                location.pathname === item.path
                  ? 'bg-white text-indigo-700 shadow-lg'
                  : 'hover:bg-white hover:text-indigo-700 hover:shadow-md'
              }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-6 border-t border-indigo-500">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 hover:shadow-md font-semibold text-sm transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;