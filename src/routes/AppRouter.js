import { Cart, Layout } from '../components';
import { ContactPage, Error, Home, LoginPage, RestaurantMenuPage } from '../pages';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Grocery = lazy(() => import('../pages/GroceryPage'));
const About = lazy(() => import('../pages/AboutPage'));

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
        element: (
          <Suspense fallback={<div>Loading About Page...</div>}>
            <About />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: '/contact',
        element: <ContactPage />,
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
      {
        path: '/cart',
        element: <Cart/>,
        errorElement: <Error />,
      }
    ],
    errorElement: <Error />,
  },
  {
    path: '*', 
    element: <Navigate to="/" replace />,
  },
]);
