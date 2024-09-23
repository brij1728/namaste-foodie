import './Layout.css';

import { Footer } from '../Footer';
import { Header } from '../Header';
import { Outlet } from 'react-router-dom';
import React from 'react';

export const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <main>
        <div className="content-container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};
