import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

const AuthNavbar = () => {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120 }}
      className='bg-white dark:bg-gray-900 shadow-md transition-colors duration-500'
    >
      <div className='container mx-auto p-4 flex justify-between items-center'>
        <Link
          to='/'
          className='text-xl font-bold text-gray-900 dark:text-white'
        >
          MyApp
        </Link>
        <div className='flex items-center space-x-4'>
          <Link
            to='/auth/login'
            className='text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-300'
          >
            Login
          </Link>
          <Link
            to='/auth/register'
            className='text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-300'
          >
            Register
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  )
}

export default AuthNavbar
