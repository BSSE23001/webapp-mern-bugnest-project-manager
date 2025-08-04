import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

const AdminNavbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const user = useSelector((state) => state.auth.user)

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120 }}
      className='bg-white dark:bg-gray-900 shadow-md transition-colors duration-500'
    >
      <div className='container mx-auto p-4 flex justify-between items-center'>
        <Link
          to='/admin'
          className='text-2xl font-bold text-gray-900 dark:text-white'
        >
          Admin Dashboard
        </Link>

        <div className='flex items-center space-x-6'>
          <NavLink
            to='/admin'
            end
            className={({ isActive }) =>
              `text-gray-600 dark:text-gray-400 transition-colors duration-300 ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600'
                  : 'hover:text-blue-600 dark:hover:text-blue-400'
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to='/admin/projects'
            className={({ isActive }) =>
              `text-gray-600 dark:text-gray-400 transition-colors duration-300 ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600'
                  : 'hover:text-blue-600 dark:hover:text-blue-400'
              }`
            }
          >
            Projects
          </NavLink>

          <ThemeToggle />

          <div className='relative'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className='flex items-center space-x-2 text-gray-600 dark:text-gray-400'
            >
              <div className='h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold'>
                {user.name.charAt(0)}
              </div>
              <span>{user.name}</span>
            </motion.button>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className='absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5'
              >
                <div className='py-1'>
                  <Link
                    to='/admin/profile'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                  >
                    Profile
                  </Link>
                  <button
                    // onClick={handleLogout}
                    className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700'
                  >
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default AdminNavbar
