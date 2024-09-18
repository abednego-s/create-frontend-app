import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import Webpack from './routes/webpack';

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
        element: <div>Parcel</div>,
      },
      {
        path: 'esbuild',
        element: <div>ESBuild</div>,
      },
    ],
  },
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
