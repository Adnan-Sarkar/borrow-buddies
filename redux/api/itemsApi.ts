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

    getItemDetails: builder.query({
      query: (itemId) => ({
        url: `/items/${itemId}`,
        method: "GET",
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

    updateItem: builder.mutation({
      query: (data) => ({
        url: `/items/${data?.id}`,
        method: "PATCH",
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
  useGetItemDetailsQuery,
  useCretaeItemMutation,
  useUpdateItemMutation,
} = itemsApi;
