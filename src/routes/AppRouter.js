import { AboutPage, Contact, Error, Home, LoginPage, RestaurantMenuPage } from '../pages';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import { Layout } from '../components';

const Grocery = lazy(() => import('../pages/GroceryPage'));
export const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <AboutPage />,
        errorElement: <Error />,
      },
      {
        path: '/contact',
        element: <Contact />,
        errorElement: <Error />,
      },
      {
        path: '/login',
        element: <LoginPage />,
        errorElement: <Error />,
      },
      {
        path: '/restaurants/:restaurantId',
        element: <RestaurantMenuPage />,
      },
      {
        path: '/grocery',
        element: (
          <Suspense fallback={<div>Loading Grocery Page...</div>}>
            <Grocery />
          </Suspense>
        ),
      },
    ],
    errorElement: <Error />,
  },
  {
    path: '*', 
    element: <Navigate to="/" replace />,
  },
]);
