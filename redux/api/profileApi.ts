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
  }),
});

export const { useGetMyProfileQuery } = profileApi;
