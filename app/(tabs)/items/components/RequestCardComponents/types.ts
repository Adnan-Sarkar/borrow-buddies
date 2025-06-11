import type { ComponentProps } from "react";
import { Ionicons } from "@expo/vector-icons";

export type RequestItem = {
  id: string;
  title: string;
  images: string[];
  category: {
    name: string;
    icon: string;
  };
};

export type RequestUser = {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
};

export type Request = {
  id: string;
  itemId: string;
  borrowerId: string;
  ownerId: string;
  startDate: string;
  endDate: string;
  status: string;
  amount: string;
  securityDeposit: string;
  platformFee: string;
  paymentStatus: boolean;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  item: RequestItem;
  owner?: RequestUser;
  borrower?: RequestUser;
};

export type RequestCardProps = {
  request: Request;
  type: "lendRequest" | "myRequest";
  onAction: () => void;
};

export type StatusInfo = {
  bgColor: string;
  textColor: string;
  borderColor: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  iconColor: string;
  label: string;
};

export type UserDetailsType = {
  imageUrl: string;
  userName: string;
  userId: string;
};

export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
