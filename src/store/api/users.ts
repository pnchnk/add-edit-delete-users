import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { Product } from "../../types";

export const productsApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com/" }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<any, void>({
      query: () => `users`,
    }),
    getUser: builder.query<any, number | string>({
      query: (id) => `users/${id}`,
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
    }),
    updateUser: builder.mutation<any, Partial<any>>({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: 'PUT',
        body: user,
      }),
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } = productsApi;

export default productsApi;
