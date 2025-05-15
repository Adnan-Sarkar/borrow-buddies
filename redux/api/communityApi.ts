import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const communityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (params = {}) => ({
        url: `/community/posts`,
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.communityPost],
    }),

    // Get a single post by ID with comments
    getPostById: builder.query({
      query: (id) => ({
        url: `/community/posts/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.communityPost, tagTypes.communityReport],
    }),

    // Delete a post by ID
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/community/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: tagTypes.communityPost, id },
        { type: tagTypes.communityPost, id: "LIST" },
      ],
    }),

    // create a comment on a post
    createPostComment: builder.mutation({
      query: ({ postId, content }) => ({
        url: `/community/comments`,
        method: "POST",
        data: { postId, content },
      }),
      invalidatesTags: [tagTypes.communityPost, tagTypes.communityComment],
    }),

    // Get comments
    getPostComments: builder.query({
      query: ({ postId }) => ({
        url: `/community/posts/${postId}/comments`,
        method: "GET",
      }),
      providesTags: [tagTypes.communityComment],
    }),

    // Like or unlike a post
    togglePostLike: builder.mutation({
      query: (id) => ({
        url: `/community/reactions`,
        method: "POST",
        data: {
          postId: id,
        },
      }),
      invalidatesTags: [tagTypes.communityPost],
    }),

    // Report a post
    reportPost: builder.mutation({
      query: ({ postId, data }) => ({
        url: `/community/reports/post/${postId}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.communityReport],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useDeletePostMutation,
  useCreatePostCommentMutation,
  useGetPostCommentsQuery,
  useTogglePostLikeMutation,
  useReportPostMutation,
} = communityApi;
