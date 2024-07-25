import React, { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const location = useLocation();
  const sidebarData = location.state?.tile || [];

  return (
    <div className="dashboard">
      <Sidebar data={sidebarData} isVisible={isSidebarVisible} />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
