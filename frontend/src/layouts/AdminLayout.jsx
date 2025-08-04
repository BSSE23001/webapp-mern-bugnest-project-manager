import { Outlet } from 'react-router-dom'
import AdminNavbar from '../components/AdminNavbar'

const AdminLayout = () => {
  return (
    <div className='min-h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-500'>
      <header>
        <AdminNavbar />
      </header>
      <main className='flex-1 p-4'>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
