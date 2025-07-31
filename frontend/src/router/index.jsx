import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../features/auth/pages/LoginPage'
import RegisterPage from '../features/auth/pages/RegisterPage'
import PrivateRoute from './PrivateRoute'
import AuthLayout from '../layouts/AuthLayout'
import AdminLayout from '../layouts/AdminLayout'
import UserLayout from '../layouts/UserLayout'
import Dashboard from '../pages/Dashboard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: 'admin',
        element: <AdminLayout />,
        children: [{ index: true, element: <Dashboard /> }],
      },
      {
        path: 'user',
        element: <UserLayout />,
        children: [{ index: true, element: <Dashboard /> }],
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
])
