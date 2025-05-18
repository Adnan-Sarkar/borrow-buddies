import { View, Text, FlatList } from "react-native";
import { useGetPostCommentsQuery } from "../../../../../redux/api/communityApi";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import { LoadingIndicator, ErrorView } from "../../components/StateComponents";

interface CommentsSectionProps {
  postId: string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ postId }) => {
  const {
    data: commentsData,
    isLoading: isLoadingComments,
    isFetching: isFetchingComments,
    error: commentsError,
    refetch: refetchComments,
  } = useGetPostCommentsQuery({
    postId,
  });

  if (isLoadingComments && !isFetchingComments) {
    return <LoadingIndicator />;
  }

  if (commentsError) {
    return (
      <ErrorView message="Failed to load comments" onRetry={refetchComments} />
    );
  }

  const comments = commentsData?.comments ?? [];
  const totalComments = commentsData?._count?.comments ?? 0;

  return (
    <View className="pb-20">
      {/* Comment input */}
      <View className="px-4 py-3 border-t border-neutral-100">
        <CommentInput postId={postId} />
      </View>

      {/* Comments list */}
      <View className="px-4">
        <Text className="font-bold text-lg mb-4">
          {totalComments} Comment{totalComments !== 1 ? "s" : ""}
        </Text>

        {comments.length > 0 ? (
          <>
            <FlatList
              data={comments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <Comment comment={item} />}
              scrollEnabled={false}
            />
          </>
        ) : (
          <View className="py-10 items-center">
            <Text className="text-neutral-500">
              No comments yet. Be the first to comment!
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default CommentsSection;
