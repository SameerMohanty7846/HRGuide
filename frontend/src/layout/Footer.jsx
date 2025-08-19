import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 via-sky-500 to-cyan-500 text-white shadow-inner">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
        {/* App Name / Logo */}
        <div className="text-sm sm:text-base font-semibold tracking-wide">
          © {new Date().getFullYear()} HrGuide. All rights reserved.
        </div>

        {/* Optional Links */}
        <div className="mt-2 sm:mt-0 flex space-x-4 text-sm">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
