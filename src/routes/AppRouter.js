import { AboutPage, Contact, Error, Home, LoginPage } from '../pages';

import { createBrowserRouter } from 'react-router-dom';

export const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />, 
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
]);
