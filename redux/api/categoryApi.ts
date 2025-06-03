import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const CategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: (params) => ({
        url: "/categoris",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.category],
    }),
  }),
});

export const { useGetAllCategoriesQuery } = CategoryApi;
