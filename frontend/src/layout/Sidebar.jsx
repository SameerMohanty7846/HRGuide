import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  LayoutDashboard,
  Users,
  UserPlus,
  ShieldCheck,
  Key,
  FileText,
  Calendar,
  DollarSign,
  ClipboardList,
  LogOut,
  Building,
  ClipboardCheck,
  FileClock,
  UserCheck,
  Briefcase,
  FileSpreadsheet,
} from 'lucide-react';

const roleNavigation = {
  admin: [
    {
      label: 'Dashboard',
      path: '/admin/admindashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: 'Employee Management',
      icon: <Users size={20} />,
      submenu: [
        { path: '/admin/addemployee', label: 'Add Employee', icon: <UserPlus size={18} /> },
        { path: '/admin/viewemployees', label: 'View Employees', icon: <Users size={18} /> },
        { path: '/admin/permissions', label: 'Employee Permissions', icon: <ShieldCheck size={18} /> },
      ],
    },
    {
      label: 'HR & Policies',
      icon: <Building size={20} />,
      submenu: [
        { path: '/admin/leave-policy', label: 'HR Leave Policy', icon: <FileText size={18} /> },
        { path: '/admin/salary-policy', label: 'Salary Policy Form', icon: <FileSpreadsheet size={18} /> },
        { path: '/hr/policy', label: 'HR Policy', icon: <FileSpreadsheet size={18} /> },
      ],
    },
    {
      label: 'Reports & Payroll',
      icon: <Briefcase size={20} />,
      submenu: [
        { path: '/admin/attendance-report', label: 'Attendance Report', icon: <Calendar size={18} /> },
        { path: '/admin/monthly-salary-report', label: 'Monthly Salary Report', icon: <FileSpreadsheet size={18} /> },
        { path: '/admin/payroll', label: 'Employee Payroll', icon: <DollarSign size={18} /> },
      ],
    },
    { path: '/admin/change-password', label: 'Change Password', icon: <Key size={20} /> },
  ],
  employee: [
    { path: '/employee/employeedashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    {
      label: 'Task Management',
      icon: <ClipboardList size={20} />,
      submenu: [
        { path: '/employee/assign-task', label: 'Assign Task', icon: <ClipboardCheck size={18} /> },
        { path: '/employee/task-management', label: 'View Tasks', icon: <ClipboardList size={18} /> },
      ],
    },
    {
      label: 'Leave Management',
      icon: <FileClock size={20} />,
      submenu: [
        { path: '/employee/leave-apply', label: 'Apply Leave', icon: <FileText size={18} /> },
        { path: '/employee/leave-dashboard', label: 'Leave Dashboard', icon: <Calendar size={18} /> },
      ],
    },
    { path: '/employee/permissions', label: 'My Permissions', icon: <UserCheck size={20} /> },
    { path: '/employee/change-password', label: 'Change Password', icon: <Key size={20} /> },
  ],
  hr: [
    { path: '/hr/hrdashboard', label: 'HR Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/hr/viewemployees', label: 'View Employees', icon: <Users size={20} /> },
    {
      label: 'Policies',
      icon: <FileText size={20} />,
      submenu: [
        { path: '/hr/policy', label: 'HR Policy', icon: <FileText size={18} /> },
        { path: '/hr/leave-policy', label: 'Leave Policy', icon: <FileSpreadsheet size={18} /> },
      ],
    },
    {
      label: 'Task Management',
      icon: <ClipboardList size={20} />,
      submenu: [
        { path: '/hr/assign-task', label: 'Assign Task', icon: <ClipboardCheck size={18} /> },
        { path: '/hr/task-management', label: 'Task Management', icon: <ClipboardList size={18} /> },
      ],
    },
    { path: '/hr/leave-applications', label: 'Leave Applications', icon: <Calendar size={20} /> },
    { path: '/hr/permissions', label: 'Granted Permissions', icon: <UserCheck size={20} /> },
    { path: '/hr/change-password', label: 'Change Password', icon: <Key size={20} /> },
  ],
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem('role') || 'employee';
  const userData = JSON.parse(localStorage.getItem('userData')) || { name: 'Guest User' };
  const menuItems = roleNavigation[role] || [];
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const toggleSubmenu = (label) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const isSubmenuActive = (submenu) => {
    return submenu.some(item => location.pathname === item.path);
  };

  return (
    <>
      {/* Overlay backdrop only on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 sm:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-72 bg-white text-gray-800 border-r border-gray-200 shadow-lg
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          sm:relative sm:translate-x-0 sm:flex-shrink-0
          flex flex-col min-h-full sm:sticky sm:top-0 rounded-r-xl
        `}
      >
        {/* User Info */}
        <div className="flex items-center p-4 mt-2">
          <img
            src={`https://i.pravatar.cc/150?u=${userData.name}`}
            alt="User Avatar"
            className="w-12 h-12 rounded-full border-2 border-cyan-500"
          />
          <div className="ml-4">
            <p className="font-semibold text-md">{userData.name}</p>
            <p className="text-sm text-gray-500 capitalize">{role}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-gray-300">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.label)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium
                      transition duration-200 ${
                        isSubmenuActive(item.submenu)
                          ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow'
                          : 'hover:bg-gray-100'
                      }`}
                  >
                    <div className="flex items-center space-x-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-200 ${
                        openSubmenu === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openSubmenu === item.label && (
                    <div className="pl-6 mt-1 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          onClick={toggleSidebar}
                          className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition duration-200 ${
                            location.pathname === subItem.path
                              ? 'bg-cyan-100 text-cyan-700'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {subItem.icon}
                          <span>{subItem.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  onClick={toggleSidebar}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition duration-200 ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-red-500 hover:bg-red-100 font-semibold text-sm transition-colors duration-200"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
