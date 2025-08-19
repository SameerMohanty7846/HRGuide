import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Content Section */}
      <div className="flex flex-1 relative">
        {/* Sidebar (fixed only on mobile) */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(false)} />

        {/* Main Content */}
        <main className="flex-1 p-4 bg-gray-50 min-h-[calc(100vh-4rem)] sm:min-h-0">
          <Outlet />
        </main>
      </div>

      {/* Footer always stays at the bottom */}
      <Footer />
    </div>
  );
};

export default MainLayout;
