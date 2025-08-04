import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const projectsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1/projects',
    credentials: 'include',
  }),
  tagTypes: ['Projects'],
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Projects'],
    }),
    getProjects: builder.query({
      query: (params) => ({
        url: '/',
        params,
      }),
      providesTags: ['Projects'],
    }),
    getProjectById: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      providesTags: ['Projects'],
    }),
    updateProject: builder.mutation({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Projects'],
    }),
    softDeleteProject: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Projects'],
    }),
    restoreProject: builder.mutation({
      query: (id) => ({
        url: `/restore/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Projects'],
    }),
    getAllProjectsWithStats: builder.query({
      query: () => '/with-stats',
      providesTags: ['Projects'],
    }),
    addMember: builder.mutation({
      query: ({ id, body }) => ({
        url: `/${id}/members`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Projects'],
    }),
    removeMember: builder.mutation({
      query: ({ id, userId }) => ({
        url: `/${id}/members/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Projects'],
    }),
  }),
})

export const {
  useCreateProjectMutation,
  useGetProjectsQuery,
  useUpdateProjectMutation,
  useSoftDeleteProjectMutation,
  useRestoreProjectMutation,
  useGetAllProjectsWithStatsQuery,
  useAddMemberMutation,
  useRemoveMemberMutation,
} = projectsApi
