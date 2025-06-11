import React, { useState, useEffect, useRef } from "react";
import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "@/constants/Colors";

import ChatHeader from "./ChatHeader";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import DateSeparator from "./DateSeparator";
import EmptyChat from "./EmptyChat";
import SelectedImages from "./SelectedImages";
import type { Message } from "./types";
import {
  useGetChatMessagesQuery,
  useSendChatMessageMutation,
} from "@/redux/api/chatApi";

type ChatModalProps = {
  visible: boolean;
  onClose: () => void;
  currentUserId: string;
  otherUser: {
    id: string;
    name: string;
    profilePicture: string;
  };
};

export default function ChatModal({
  visible,
  onClose,
  currentUserId,
  otherUser,
}: ChatModalProps) {
  const [message, setMessage] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const {
    data: messagesData,
    refetch,
    isLoading,
  } = useGetChatMessagesQuery(otherUser?.id, {
    selectFromResult: (result) => ({
      ...result,
      data: result?.data?.data || [],
    }),
    pollingInterval: visible ? 5000 : 0,
  });

  const getMessages = () => {
    if (
      messagesData &&
      typeof messagesData === "object" &&
      "messages" in messagesData
    ) {
      return messagesData.messages || [];
    }

    if (Array.isArray(messagesData)) {
      return messagesData;
    }

    return [];
  };

  const messages = getMessages();

  const [sendMessage] = useSendChatMessageMutation();

  useEffect(() => {
    if (visible && messages?.length) {
      setTimeout(() => {
        if (flatListRef.current) {
          flatListRef.current?.scrollToEnd({ animated: true });
        }
      }, 500);
    }
  }, [visible, messages]);

  useEffect(() => {
    if (messages?.length && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if ((!message.trim() && images.length === 0) || isSending) return;

    try {
      setIsSending(true);

      const formData = new FormData();

      formData.append("content", message.trim());

      if (images.length > 0) {
        images.forEach((imageUri, index) => {
          const imageUriParts = imageUri.split(".");
          const fileType = imageUriParts[imageUriParts.length - 1];

          formData.append("images", {
            uri: imageUri,
            name: `photo_${index}.${fileType}`,
            type: `image/${fileType}`,
          } as any);
        });
      }

      await sendMessage({
        userId: otherUser?.id,
        data: formData,
      }).unwrap();

      setMessage("");
      setImages([]);
      refetch();
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const shouldShowDate = (
    currentMessage: Message,
    previousMessage: Message | undefined
  ) => {
    if (!previousMessage) return true;

    const currentDate = new Date(currentMessage.createdAt).toDateString();
    const previousDate = new Date(previousMessage.createdAt).toDateString();

    return currentDate !== previousDate;
  };

  const renderMessage = ({ item, index }: { item: Message; index: number }) => {
    const previousMessage = index > 0 ? messages[index - 1] : undefined;
    const isCurrentUser = item.senderId === currentUserId;
    const showDate = shouldShowDate(item, previousMessage);

    return (
      <>
        {showDate && <DateSeparator date={item.createdAt} />}
        <ChatBubble
          message={item}
          isCurrentUser={isCurrentUser}
          formatTime={(date) => formatTime(date)}
        />
      </>
    );
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 bg-white">
          <ChatHeader
            onClose={onClose}
            recipientName={otherUser?.name}
            profilePicture={otherUser?.profilePicture}
          />

          {/* Messages */}
          {isLoading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color={COLORS.PRIMARY[500]} />
            </View>
          ) : messages?.length ? (
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderMessage}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ padding: 16 }}
              onLayout={() =>
                flatListRef.current?.scrollToEnd({ animated: false })
              }
              onContentSizeChange={() =>
                flatListRef.current?.scrollToEnd({ animated: false })
              }
              maintainVisibleContentPosition={{
                minIndexForVisible: 0,
                autoscrollToTopThreshold: 10,
              }}
            />
          ) : (
            <EmptyChat recipientName={otherUser?.name} />
          )}

          {/* Selected Images */}
          {images.length > 0 && (
            <SelectedImages images={images} onRemoveImage={removeImage} />
          )}

          {/* Input */}
          <ChatInput
            message={message}
            onChangeMessage={setMessage}
            onSend={handleSendMessage}
            onAddImages={setImages}
            isSending={isSending}
            disableSend={(!message.trim() && images.length === 0) || isSending}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
