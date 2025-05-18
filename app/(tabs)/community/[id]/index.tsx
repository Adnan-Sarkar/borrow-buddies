import React, { useState } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Text,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useGetPostByIdQuery } from "../../../../redux/api/communityApi";
import { COLORS } from "../../../../constants/Colors";
import { ErrorView } from "../components/StateComponents";
import PostHeader from "./components/PostHeader";
import PostContent from "./components/PostContent";
import CommentsSection from "./components/CommentsSection";
import PageHeader from "../components/PageHeader";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: post,
    isLoading,
    error,
    refetch,
  } = useGetPostByIdQuery(id || "", {
    selectFromResult: (result) => ({
      ...result,
      data: result?.data?.data,
    }),
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (!id) {
    return (
      <View style={{ flex: 1 }}>
        <PageHeader title="Post" showBackButton />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: COLORS.NEUTRAL[600] }}>Post not found</Text>
        </View>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <PageHeader title="Post" showBackButton />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color={COLORS.PRIMARY[500]} />
        </View>
      </View>
    );
  }

  if (error || !post) {
    return (
      <View style={{ flex: 1 }}>
        <PageHeader title="Post" showBackButton />
        <ErrorView
          message="We couldn't load this post. Please try again."
          onRetry={refetch}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <PageHeader
        title={
          post?.title?.length > 20
            ? `${post?.title?.substring(0, 20)}...`
            : post?.title ?? "Post"
        }
        showBackButton
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.PRIMARY[500]]}
            tintColor={COLORS.PRIMARY[500]}
          />
        }
      >
        <PostHeader post={post} />
        <PostContent post={post} refetch={refetch} />
        <CommentsSection postId={id ?? ""} />
      </ScrollView>
    </View>
  );
}
