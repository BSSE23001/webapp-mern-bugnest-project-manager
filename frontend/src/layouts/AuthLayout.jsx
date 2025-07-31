import ThemeToggle from '../components/ThemeToggle'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AuthLayout = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth)

  if (isAuthenticated && user) {
    return <Navigate to={`/${user.role}`} replace />
  }

  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white'>
      <div className='absolute top-4 right-4'>
        <ThemeToggle />
      </div>
      <Outlet />
    </div>
  )
}

export default AuthLayout
