import { Outlet } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'

const AdminLayout = () => {
  return (
    <div className='min-h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white'>
      <header className='p-4 bg-gray-200 dark:bg-gray-800 flex justify-between'>
        <h1 className='text-xl font-bold'>Admin Panel</h1>
        <ThemeToggle />
      </header>
      <main className='flex-1 p-4'>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
