import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,RouterProvider,
} from "react-router-dom";
import App from './App';
import './index.scss';
import Login from './Login';

const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
  },
  {
    path:"/Login",
    element: <Login/>,
  },
  {
    path:"/a",
    element: {},
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);