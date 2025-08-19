import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left-aligned Logo */}
        <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-wider drop-shadow-sm">
          HrGuide
        </h1>

        {/* Right side placeholder for future icons/menu */}
        <div className="sm:hidden">
          {/* Mobile menu or icon space (optional) */}
        </div>
      </div>
    </header>
  );
};

export default Header;
