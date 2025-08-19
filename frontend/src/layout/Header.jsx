import React from 'react';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 shadow-lg relative z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left-aligned Logo */}
        <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-wider drop-shadow-sm">
          HrGuide
        </h1>

        {/* Hamburger icon for mobile */}
        <div className="sm:hidden">
          <button
            type="button"
            onClick={toggleSidebar}
            className="p-2 text-white bg-indigo-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
