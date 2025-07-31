import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../features/auth/authApi'
import authReducer from '../features/auth/authSlice'
import { analyticsApi } from '../features/analytics/analyticsApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [analyticsApi.reducerPath]: analyticsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, analyticsApi.middleware),
})
