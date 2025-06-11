import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendChatMessage: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/chat/messages/${userId}`,
        method: "POST",
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: [tagTypes.conversation],
    }),

    getChatMessages: builder.query({
      query: (userId) => ({
        url: `/chat/messages/${userId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.conversation],
    }),
  }),
});

export const { useSendChatMessageMutation, useGetChatMessagesQuery } = chatApi;
