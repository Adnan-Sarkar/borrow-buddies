import React, { useState, useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import PostCard from "./PostCard";
import PostSkeleton from "./PostSkeleton";
import EmptyState from "./EmptyState";
import { COLORS } from "../../../../constants/Colors";
import { useGetPostsQuery } from "../../../../redux/api/communityApi";
import Pagination from "@/components/common/Pagination";

interface CommunityPostsProps {
  searchQuery?: string;
  sortBy?: "asc" | "desc";
}

const PAGE_SIZE = 10;

const CommunityPosts: React.FC<CommunityPostsProps> = ({
  searchQuery: externalSearchQuery,
  sortBy: externalSortBy,
}) => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(externalSearchQuery || "");
  const [sortBy, setSortBy] = useState<"asc" | "desc">(
    externalSortBy || "desc"
  );
  const router = useRouter();

  const { data, isLoading, isFetching, error, refetch } = useGetPostsQuery({
    page,
    limit: PAGE_SIZE,
    sort: sortBy,
    searchTerm: searchQuery || undefined,
  });

  const posts = data?.data || [];
  const meta = data?.meta || { page: 1, limit: PAGE_SIZE, total: 0 };
  const currentPage = meta?.page || page;
  const totalPages = Math.ceil(meta.total / meta.limit) || 1;

  useEffect(() => {
    if (
      externalSearchQuery !== undefined &&
      externalSearchQuery !== searchQuery
    ) {
      setSearchQuery(externalSearchQuery);
      setPage(1);
    }

    if (externalSortBy && externalSortBy !== sortBy) {
      setSortBy(externalSortBy);
      setPage(1);
    }
  }, [externalSearchQuery, externalSortBy]);

  const handleRefresh = () => {
    setPage(1);
    refetch();
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const renderEmpty = () => {
    if (isLoading || isFetching) {
      return (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      );
    }

    return (
      <EmptyState
        icon="chatbox-ellipses-outline"
        title={searchQuery ? "No results found" : "No posts yet"}
        message={
          searchQuery
            ? `We couldn't find any posts matching "${searchQuery}"`
            : "Be the first to share something with the community!"
        }
        buttonText={searchQuery ? "Clear Search" : "Create Post"}
        onButtonPress={
          searchQuery
            ? () => setSearchQuery("")
            : () => router.push("/community/create")
        }
      />
    );
  };

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostCard post={item} refetch={refetch} />}
      keyExtractor={(item) => `${item?.id}-${page}`}
      contentContainerStyle={{ paddingBottom: 80 }}
      ListEmptyComponent={renderEmpty}
      onEndReachedThreshold={0.3}
      refreshControl={
        <RefreshControl
          refreshing={isLoading && !isFetching && page === 1}
          onRefresh={handleRefresh}
          colors={[COLORS.PRIMARY[500]]}
          tintColor={COLORS.PRIMARY[500]}
        />
      }
      ListFooterComponent={
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      }
      style={{ paddingTop: 20 }}
    />
  );
};

export default CommunityPosts;
