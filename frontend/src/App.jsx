import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from './features/auth/authSlice'
import { useRefreshQuery } from './features/auth/authApi'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

const App = () => {
  const dispatch = useDispatch()
  const { data, isSuccess } = useRefreshQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  })

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setCredentials(data.data))
    }
  }, [isSuccess, data, dispatch])

  return <RouterProvider router={router} />
}

export default App
