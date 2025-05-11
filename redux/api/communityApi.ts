import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  hasLiked: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    profileImage?: string;
  };
}

interface PostDetail extends Post {
  commentList?: Comment[];
}

interface Comment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    profileImage?: string;
  };
}

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
    getPostById: builder.query<PostDetail, string>({
      query: (id) => ({
        url: `/community/posts/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.communityPost],
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
      query: ({ postId, reason }) => ({
        url: `/community/posts/${postId}/report`,
        method: "POST",
        data: { reason },
      }),
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
