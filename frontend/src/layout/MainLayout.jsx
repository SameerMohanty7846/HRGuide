import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      {/* Content Section */}
      <div className="flex flex-1 w-full relative overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(false)} />

        {/* Main Content */}
        <main className="flex-1 p-4 bg-gray-50 overflow-auto min-h-[calc(100vh-64px-48px)]">
          {/* min-h calculation: viewport height - header height - footer height (adjust if needed) */}
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
