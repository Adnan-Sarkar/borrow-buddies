import { uploadFormData, createFileObject } from "../../utils/formDataUploader";
import { tagTypes } from "../tag-types";

export type CreatePostData = {
  title: string;
  content: string;
  images?: Array<{
    uri: string;
    type: string;
    name: string;
  }>;
};

export type UpdatePostData = {
  title?: string;
  content?: string;
  images?: Array<{
    uri: string;
    type: string;
    name: string;
  }>;
  existingImages?: string[];
};

export type CreateCommentData = {
  content: string;
  postId: string;
  parentCommentId?: string;
};

export type UpdateCommentData = {
  content: string;
  commentId: string;
};

export const createPost = async (data: CreatePostData) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("content", data.content);

  if (data.images && data.images.length > 0) {
    data.images.forEach((image) => {
      const processedImage = createFileObject(
        image.uri,
        image.type,
        image.name
      );
      formData.append("images", processedImage as any);
    });
  }

  return await uploadFormData(
    "/community/posts",
    formData,
    "POST",
    tagTypes.communityPost
  );
};

export const updatePost = async (postId: string, data: UpdatePostData) => {
  const formData = new FormData();

  if (data.title) {
    formData.append("title", data.title);
  }

  if (data.content) {
    formData.append("content", data.content);
  }

  // Add existing images to keep
  if (data.existingImages) {
    formData.append("existingImages", JSON.stringify(data.existingImages));
  } else if (data.existingImages === null) {
    // If explicitly set to null, send empty array to remove all images
    formData.append("existingImages", JSON.stringify([]));
  }

  // Add new images if provided
  if (data.images && data.images.length > 0) {
    data.images.forEach((image) => {
      const processedImage = createFileObject(
        image.uri,
        image.type,
        image.name
      );
      formData.append("images", processedImage as any);
    });
  }

  return await uploadFormData(
    `/community/posts/${postId}`,
    formData,
    "PATCH",
    tagTypes.communityPost
  );
};
