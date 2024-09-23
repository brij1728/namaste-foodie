import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { browserRouter } from './routes/AppRouter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={browserRouter} />);
