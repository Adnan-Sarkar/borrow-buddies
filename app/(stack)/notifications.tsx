import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, RefreshControl, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { COLORS } from "../../constants/Colors";
import {
  getUserNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../../utils/notificationService";
import { getValidToken } from "../../utils/jwt-helper";
import NotificationHeader from "./components/NotificationHeader";
import NotificationItem from "./components/NotificationItem";
import EmptyNotificationsState from "./components/EmptyNotificationsState";
import MarkAllAsReadButton from "./components/MarkAllAsReadButton";
import NotificationSkeleton from "./components/NotificationSkeleton";

type NotificationSender = {
  id: string;
  name: string;
  profilePicture?: string;
};

type NotificationData = {
  commentId?: string;
  postId?: string;
  senderId?: string;
  senderName?: string;
  senderProfilePicture?: string;
};

type Notification = {
  id: string;
  isRead: boolean;
  title: string;
  body: string;
  createdAt: string;
  updatedAt?: string;
  type?: string;
  referenceId?: string;
  userId?: string;
  sender?: NotificationSender;
  data?: NotificationData;
};

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  // Load notifications
  const fetchNotifications = useCallback(
    async (pageNumber = 1, shouldReplace = true) => {
      try {
        setLoading(true);

        const token = await getValidToken();
        if (!token) {
          router.replace("/auth/login");
          return;
        }

        const result = await getUserNotifications(pageNumber, 10);

        if (result) {
          const notifications = result.data || result;
          const meta = result.meta || { totalPages: 1 };

          if (shouldReplace) {
            setNotifications(Array.isArray(notifications) ? notifications : []);
          } else {
            setNotifications((prev) => [
              ...prev,
              ...(Array.isArray(notifications) ? notifications : []),
            ]);
          }

          setHasMore(pageNumber < (meta.totalPages || pageNumber));
          setPage(pageNumber);
        } else {
          if (shouldReplace) {
            setNotifications([]);
          }
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        if (shouldReplace) {
          setNotifications([]);
        }
        setHasMore(false);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [router]
  );

  // Load unread count
  const loadUnreadCount = useCallback(async () => {
    try {
      const count = await getUnreadNotificationCount();
      setUnreadCount(count);
    } catch (error) {
      console.error("Error fetching unread count:", error);
      setUnreadCount(0);
    }
  }, []);

  // Refresh handler
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNotifications(1);
    loadUnreadCount();
  }, [fetchNotifications, loadUnreadCount]);

  // Load more handler
  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchNotifications(page + 1, false);
    }
  }, [loading, hasMore, page, fetchNotifications]);

  // Mark as read handler
  const handleMarkAsRead = useCallback(
    async (notificationId: string) => {
      const success = await markNotificationAsRead(notificationId);

      if (success) {
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notificationId ? { ...n, isRead: true } : n
          )
        );
        loadUnreadCount();
      }

      return success;
    },
    [loadUnreadCount]
  );

  // Mark all as read handler
  const handleMarkAllAsRead = useCallback(async () => {
    const success = await markAllNotificationsAsRead();

    if (success) {
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    }

    return success;
  }, []);

  // Initialize
  useEffect(() => {
    fetchNotifications(1);
    loadUnreadCount();

    // Set up interval to refresh count
    const interval = setInterval(loadUnreadCount, 60000);

    return () => clearInterval(interval);
  }, [fetchNotifications, loadUnreadCount]);

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />

      <NotificationHeader />

      {unreadCount > 0 && <MarkAllAsReadButton onPress={handleMarkAllAsRead} />}

      {loading && !refreshing ? (
        <NotificationSkeleton count={3} />
      ) : (
        <FlatList
          data={notifications}
          renderItem={({ item }) => (
            <NotificationItem notification={item} onPress={handleMarkAsRead} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={!loading ? <EmptyNotificationsState /> : null}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[COLORS.PRIMARY[500]]}
              tintColor={COLORS.PRIMARY[500]}
            />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
});
