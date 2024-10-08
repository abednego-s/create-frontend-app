import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import Webpack from './routes/webpack';
import Parcel from './routes/parcel';
import Rollup from './routes/rollup';
import './style.css';

const domNode = document.getElementById('root') as HTMLElement;
const root = createRoot(domNode);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Webpack />,
      },
      {
        path: 'parcel',
        element: <Parcel />,
      },
      {
        path: 'rollup',
        element: <Rollup />,
      },
    ],
  },
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
