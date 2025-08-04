import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../features/auth/authApi'
import authReducer from '../features/auth/authSlice'
import { analyticsApi } from '../features/analytics/analyticsApi'
import { projectsApi } from '../features/projects/projectsApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [analyticsApi.reducerPath]: analyticsApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      analyticsApi.middleware,
      projectsApi.middleware,
    ),
})
