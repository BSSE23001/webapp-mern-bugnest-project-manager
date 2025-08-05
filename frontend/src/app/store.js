import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../features/auth/authApi'
import authReducer from '../features/auth/authSlice'
import { analyticsApi } from '../features/analytics/analyticsApi'
import { projectsApi } from '../features/projects/projectsApi'
import { usersApi } from '../features/users/usersApi'
import { issuesApi } from '../features/issues/issuesApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [analyticsApi.reducerPath]: analyticsApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [issuesApi.reducerPath]: issuesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      analyticsApi.middleware,
      projectsApi.middleware,
      issuesApi.middleware,
      usersApi.middleware,
    ),
})
