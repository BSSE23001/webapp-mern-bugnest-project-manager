import { useSelector } from 'react-redux'
import AdminDashboard from '../features/analytics/pages/AdminDashboard'
import UserDashboard from '../features/analytics/pages/UserDashboard'

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)

  return user?.role === 'admin' ? <AdminDashboard /> : <UserDashboard />
}

export default Dashboard
