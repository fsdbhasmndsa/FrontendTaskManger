import React from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Header */}
        <Header />

        {/* Dynamic Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
