import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AuthNavbar from '../components/AuthNavbar'

const AuthLayout = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth)

  if (isAuthenticated && user) {
    return <Navigate to={`/${user.role}`} replace />
  }

  return (
    <div className='min-h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-500'>
      <header>
        <AuthNavbar />
      </header>
      <main className='flex-1 p-4'>
        <Outlet />
      </main>
    </div>
  )
}

export default AuthLayout
