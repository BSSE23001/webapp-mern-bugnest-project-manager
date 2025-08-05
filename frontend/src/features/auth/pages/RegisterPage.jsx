import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRegisterMutation } from '../authApi'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../authSlice'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
})

const RegisterPage = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user) {
      navigate(`/${user.role}`, { replace: true })
    }
  }, [user])
  const dispatch = useDispatch()
  const [registerUser, { isLoading }] = useRegisterMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data).unwrap()
      dispatch(setCredentials(res.data))
    } catch (err) {
      console.error('Registration failed', err)
    }
  }

  return (
    <motion.div
      className='min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md space-y-4'
      >
        <h2 className='text-xl font-semibold dark:text-white'>Register</h2>
        <div>
          <input
            type='text'
            placeholder='Name'
            {...register('name')}
            className='w-full p-2 rounded border dark:bg-gray-700 dark:text-white'
          />
          <p className='text-red-500 text-sm'>{errors.name?.message}</p>
        </div>
        <div>
          <input
            type='email'
            placeholder='Email'
            {...register('email')}
            className='w-full p-2 rounded border dark:bg-gray-700 dark:text-white'
          />
          <p className='text-red-500 text-sm'>{errors.email?.message}</p>
        </div>
        <div>
          <input
            type='password'
            placeholder='Password'
            {...register('password')}
            className='w-full p-2 rounded border dark:bg-gray-700 dark:text-white'
          />
          <p className='text-red-500 text-sm'>{errors.password?.message}</p>
        </div>
        <button
          type='submit'
          disabled={isLoading}
          className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded'
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </motion.div>
  )
}

export default RegisterPage
