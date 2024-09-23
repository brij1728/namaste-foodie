import { About, Contact, Home, Login } from '../pages';

// AppRouter.js
import { createBrowserRouter } from 'react-router-dom';

export const browserRouter = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/contact', element: <Contact /> },
  { path: '/login', element: <Login /> },
]);
