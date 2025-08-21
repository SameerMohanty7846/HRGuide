import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


// Pages
import Login from './pages/Login';
import AddEmployee from './pages/AddEmployee';
import ApplyLeave from './pages/ApplyLeave';
import AssignTask from './pages/AssignTask';
import ChangePassword from './pages/ChangePassword';
import EmployeeAttendanceReport from './pages/EmployeeAttendanceReport';
import EmployeePayroll from './pages/EmployeePayroll';
import GrantedPermissions from './pages/GrantedPermissions';
import HRLeavePolicy from './pages/HRLeavePolicy';
import HRPolicy from './pages/HRPolicy';
import LeaveDashboard from './pages/LeaveDashboard';
import MonthlySalaryReport from './pages/MonthlySalaryReport';
import SalaryPolicyForm from './pages/SalaryPolicyForm';
import TaskManagement from './pages/TaskManagement';
import ViewEmployees from './pages/ViewEmployees';
import PrivateRoute from './routes/PrivateRoute';

import MainLayout from './layout/MainLayout'
import AuthLayout from './layout/AuthLayout'
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashbord from './pages/EmployeeDashbord';
import HrDashboard from './pages/HrDashboard';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Policies from './pages/Policies';
import Team from './pages/Team';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* ========== ADMIN ROUTES ========== */}
        <Route
          element={<PrivateRoute role="admin"><MainLayout /></PrivateRoute>}
        >
          <Route path="/admin/admindashboard" element={<AdminDashboard />} />
          <Route path="/admin/addemployee" element={<AddEmployee />} />
          <Route path="/admin/viewemployees" element={<ViewEmployees />} />
          <Route path="/admin/change-password" element={<ChangePassword />} />
          <Route path="/admin/leave-policy" element={<HRLeavePolicy />} />
          <Route path="/admin/attendance-report" element={<EmployeeAttendanceReport />} />
          <Route path="/admin/monthly-salary-report" element={<MonthlySalaryReport />} />
          <Route path="/admin/salary-policy" element={<SalaryPolicyForm />} />
          <Route path="/admin/payroll" element={<EmployeePayroll />} />

        </Route>

        {/* ========== EMPLOYEE ROUTES ========== */}
        <Route
          element={<PrivateRoute role="employee"><MainLayout /></PrivateRoute>}
        >
          <Route path="/employee/employeedashboard" element={<EmployeeDashbord />} />
          <Route path="/employee/assign-task" element={<AssignTask />} />
          <Route path="/employee/task-management" element={<TaskManagement />} />
          <Route path="/employee/change-password" element={<ChangePassword />} />
          <Route path="/employee/permissions" element={<GrantedPermissions />} />
          <Route path="/employee/leave-apply" element={<ApplyLeave />} />
          <Route path="/employee/leave-dashboard" element={<LeaveDashboard />} />
        </Route>

        {/* ========== HR ROUTES ========== */}
        <Route
          element={<PrivateRoute role="hr"><MainLayout /></PrivateRoute>}
        >
          <Route path="/hr/hrdashboard" element={<HrDashboard />} />

          <Route path="/hr/policy" element={<HRPolicy />} />
          <Route path="/hr/leave-policy" element={<HRLeavePolicy />} />
          <Route path="/hr/leave-applications" element={<LeaveDashboard />} />
          <Route path="/hr/viewemployees" element={<ViewEmployees />} />
          <Route path="/hr/addemployee" element={<AddEmployee />} />
          <Route path="/hr/change-password" element={<ChangePassword />} />
          <Route path="/hr/assign-task" element={<AssignTask />} />
          <Route path="/hr/task-management" element={<TaskManagement />} />
          <Route path="/hr/permissions" element={<GrantedPermissions />} />
        </Route>

        {/* ========== AUTH ROUTES ========== */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
        {/* Home Page */}
        <Route path="/" element={<HomePage />} />


        <Route path="/about" element={<About />} />

        <Route path="/policies" element={<Policies />} />


        <Route path="/team" element={<Team />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
