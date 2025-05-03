import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        data: credentials,
      }),
    }),

    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/registration",
        method: "POST",
        data: userData,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useLoginMutation, useRegisterMutation } = authApi;
