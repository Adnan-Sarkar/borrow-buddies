export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  images: string[];
  sender?: {
    id: string;
    name: string;
    profilePicture: string;
  };
};
