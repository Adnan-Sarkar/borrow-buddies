import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/profile",
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.profile],
    }),

    getProfileById: builder.query({
      query: (id) => ({
        url: `/profile/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.userProfile],
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
  useGetProfileByIdQuery,
} = profileApi;
