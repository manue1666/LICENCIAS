import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,RouterProvider,
} from "react-router-dom";
import App from './App';
import './index.scss';
import UserHome from './UserHome';
import AdminHome from './AdminHome';

const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
  },
  {
    path:"/UserHome",
    element: <UserHome/>,
  },
  {
    path:"/AdminHome",
    element: <AdminHome/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);