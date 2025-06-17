import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createItemRequestTransaction: builder.mutation({
      query: ({ itemId, data }) => ({
        url: `/transactions/items/${itemId}/request`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.transaction],
    }),

    getMyBorrowingRequests: builder.query({
      query: (params) => ({
        url: "/transactions/my-borrowing-requests",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.transaction],
    }),

    getTransactionDetails: builder.query({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.transaction],
    }),

    getMyLendingRequests: builder.query({
      query: (params) => ({
        url: "/transactions/my-lending-requests",
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.transaction],
    }),

    approveTransactionRequest: builder.mutation({
      query: (id) => ({
        url: `/transactions/${id}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.transaction],
    }),

    rejectTransactionRequest: builder.mutation({
      query: (id) => ({
        url: `/transactions/${id}/reject`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.transaction],
    }),

    completeTransactionRequest: builder.mutation({
      query: (id) => ({
        url: `/transactions/${id}/complete`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.transaction],
    }),

    submitEvidence: builder.mutation({
      query: ({ id, evidence }) => ({
        url: `/transactions/${id}/evidence`,
        method: "POST",
        data: evidence,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: [tagTypes.transaction],
    }),
  }),
});

export const {
  useCreateItemRequestTransactionMutation,
  useGetMyBorrowingRequestsQuery,
  useGetTransactionDetailsQuery,
  useGetMyLendingRequestsQuery,
  useApproveTransactionRequestMutation,
  useRejectTransactionRequestMutation,
  useCompleteTransactionRequestMutation,
  useSubmitEvidenceMutation,
} = transactionApi;
