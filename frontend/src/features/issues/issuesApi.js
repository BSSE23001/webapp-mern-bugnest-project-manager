import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const issuesApi = createApi({
  reducerPath: 'issuesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1/issues',
    credentials: 'include',
  }),
  tagTypes: ['Issues'],
  endpoints: (builder) => ({
    createIssue: builder.mutation({
      query: (body) => ({
        url: `/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Issues'],
    }),
    getAllIssues: builder.query({
      query: (params) => ({
        url: '/',
        params,
      }),
      providesTags: ['Issues'],
    }),
    getIssueById: builder.query({
      query: (id) => `/${id}`,
      providesTags: ['Issues'],
    }),
    updateIssue: builder.mutation({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Issues'],
    }),
    softDeleteIssue: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Projects'],
    }),
    restoreIssue: builder.mutation({
      query: (id) => ({
        url: `/restore/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Projects'],
    }),
  }),
})

export const {
  useCreateIssueMutation,
  useGetAllIssuesQuery,
  useGetIssueByIdQuery,
  useUpdateIssueMutation,
  useSoftDeleteIssueMutation,
  useRestoreIssueMutation,
} = issuesApi
