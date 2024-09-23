import { AboutPage, Contact, Error, Home, LoginPage, RestaurantMenuPage } from '../pages';

import { Layout } from '../components';
import { createBrowserRouter } from 'react-router-dom';

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
      }
    ],
    errorElement: <Error />,
  },
]);
