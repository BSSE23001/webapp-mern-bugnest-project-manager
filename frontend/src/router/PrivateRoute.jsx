import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  if (!isAuthenticated) return <Navigate to='/auth/login' />
  return <Outlet />
}

export default PrivateRoute
