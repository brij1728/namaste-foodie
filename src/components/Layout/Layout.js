import './Layout.css';

import { Footer } from '../Footer';
import { Header } from '../Header';
import { Outlet } from 'react-router-dom';
import React from 'react';
import { useOnlineStatus } from '../../utils/';

export const Layout = () => {
  const onlineStatus = useOnlineStatus(); 
  
  return (
    <div className="layout">
      <Header />

      {!onlineStatus && (
        <div className="offline-banner">
          <p>You are currently offline. Some features may not be available.</p>
        </div>
      )}

      <main>
        <div className="content-container">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};
