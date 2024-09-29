import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { appStore } from './redux/store';
import { browserRouter } from './routes/AppRouter';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={appStore}>
    <RouterProvider router={browserRouter} />
  </Provider>
);
