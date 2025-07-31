import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const analyticsApi = createApi({
  reducerPath: 'analyticsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1/analytics',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getStatusStats: builder.query({ query: () => '/status' }),
    getTimelineStats: builder.query({ query: () => '/timeline' }),
    getProjectStats: builder.query({ query: () => '/project' }),
    getAdminStats: builder.query({ query: () => '/admin-stats' }),
  }),
})

export const {
  useGetStatusStatsQuery,
  useGetTimelineStatsQuery,
  useGetProjectStatsQuery,
  useGetAdminStatsQuery,
} = analyticsApi
