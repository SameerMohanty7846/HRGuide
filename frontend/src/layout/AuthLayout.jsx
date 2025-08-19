import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-white px-4 py-8">
      <div className="w-full max-w-md sm:max-w-lg bg-white shadow-xl rounded-xl p-6 sm:p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
