import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const itemsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllItems: builder.query({
      query: (params) => ({
        url: "/items",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.items],
    }),

    getFeaturedItems: builder.query({
      query: (params) => ({
        url: "/items/featured",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.items],
    }),

    getNearbyItems: builder.query({
      query: (params) => ({
        url: "/items/nearby",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.items],
    }),

    cretaeItem: builder.mutation({
      query: (data) => ({
        url: "/items",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.items],
    }),
  }),
});

export const {
  useGetAllItemsQuery,
  useGetFeaturedItemsQuery,
  useGetNearbyItemsQuery,
  useCretaeItemMutation,
} = itemsApi;
