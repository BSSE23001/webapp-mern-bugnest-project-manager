import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1/users',
    credentials: 'include',
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params) => ({
        url: '/',
        params,
      }),
      providesTags: ['Users'],
    }),
    updateUserRole: builder.mutation({
      query: ({ id, body }) => ({
        url: `/${id}/role`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Users'],
    }),
    toggleUserStatus: builder.mutation({
      query: ({ id, body }) => ({
        url: `/${id}/status`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Users'],
    }),
    getMyProfile: builder.query({
      query: () => '/me',
      providesTags: ['Users'],
    }),
    updateMyProfile: builder.mutation({
      query: (body) => ({
        url: `/me`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Users'],
    }),
    deleteMyAccount: builder.mutation({
      query: () => ({
        url: `/me`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
})

export const {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useToggleUserStatusMutation,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useDeleteMyAccountMutation,
} = usersApi
