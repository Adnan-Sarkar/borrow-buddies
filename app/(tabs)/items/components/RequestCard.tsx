import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Link, useRouter } from "expo-router";
import type { RequestCardProps } from "./RequestCardComponents/types";
import ImageHeader from "./RequestCardComponents/ImageHeader";
import DateAndCategory from "./RequestCardComponents/DateAndCategory";
import UserInfo from "./RequestCardComponents/UserInfo";
import StatusTimeline from "./RequestCardComponents/StatusTimeline";
import PaymentDetails from "./RequestCardComponents/PaymentDetails";
import ActionButtons from "./RequestCardComponents/ActionButtons";
import {
  useApproveTransactionRequestMutation,
  useRejectTransactionRequestMutation,
} from "@/redux/api/transactionApi";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { Ionicons } from "@expo/vector-icons";

export default function RequestCard({
  request,
  type,
  onAction,
}: RequestCardProps) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [approveRequest] = useApproveTransactionRequestMutation();
  const [rejectRequest] = useRejectTransactionRequestMutation();

  // Calculate total days
  const startDate = new Date(request.startDate);
  const endDate = new Date(request.endDate);
  const totalDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Calculate total amount
  const totalAmount =
    parseFloat(request.amount) +
    parseFloat(request.securityDeposit) +
    parseFloat(request.platformFee);

  const handleStatusUpdate = async (status: string) => {
    try {
      setIsProcessing(true);

      if (status === "APPROVED") {
        console.log(request?.id);
        await approveRequest(request?.id).unwrap();

        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Request Approved",
          textBody: "The request has been successfully approved.",
        });
      } else if (status === "REJECTED") {
        await rejectRequest(request?.id).unwrap();

        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: "Request Rejected",
          textBody: "The request has been successfully rejected.",
        });
      }

      onAction();
    } catch (error) {
      console.log(error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "An error occurred while updating the request status.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getUserDetails = () => {
    const user = type === "lendRequest" ? request.borrower : request.owner;
    return {
      imageUrl: user?.profilePicture || "https://via.placeholder.com/40",
      userName: user?.name || "Unknown User",
      userId: user?.id || "",
    };
  };

  const userDetails = getUserDetails();

  return (
    <View className="bg-white rounded-2xl shadow-sm mb-5 overflow-hidden">
      <ImageHeader
        item={request.item}
        status={request.status}
        totalDays={totalDays}
        onItemPress={() =>
          router.push(`/(tabs)/items/${request.itemId}` as any)
        }
      />

      <View className="p-4">
        <DateAndCategory
          startDate={request.startDate}
          endDate={request.endDate}
          category={request.item.category}
        />

        <UserInfo userDetails={userDetails} type={type} />

        <PaymentDetails
          amount={request.amount}
          securityDeposit={request.securityDeposit}
          platformFee={request.platformFee}
          totalAmount={totalAmount}
          paymentStatus={request.paymentStatus}
          paymentMethod={request.paymentMethod}
        />

        {type === "lendRequest" && (
          <View className="flex flex-col gap-3">
            <StatusTimeline
              status={request.status}
              updatedAt={request.updatedAt}
            />

            {(request.status === "APPROVED" ||
              request.status === "ACTIVE" ||
              request.status === "COMPLETED") && (
              <View className="mt-3 flex-row items-center justify-center">
                <Link href={`/(tabs)/items/transaction/${request.id}`} asChild>
                  <TouchableOpacity
                    className="flex-row items-center justify-center w-full py-3 px-4 bg-primary-500 rounded-lg shadow-sm active:opacity-90"
                    style={{ elevation: 1 }}
                  >
                    <Ionicons name="eye-outline" size={18} color="white" />
                    <Text className="text-white font-medium ml-2">
                      View Transaction Details
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>
            )}
          </View>
        )}

        {type === "lendRequest" && request.status === "REQUESTED" && (
          <ActionButtons
            onApprove={() => handleStatusUpdate("APPROVED")}
            onReject={() => handleStatusUpdate("REJECTED")}
            isProcessing={isProcessing}
          />
        )}

        {type === "myRequest" && request.status !== "REQUESTED" && (
          <View className="flex flex-col gap-3">
            <StatusTimeline
              status={request.status}
              updatedAt={request.updatedAt}
            />

            {(request.status === "APPROVED" ||
              request.status === "ACTIVE" ||
              request.status === "COMPLETE") && (
              <View className="mt-3 flex-row items-center justify-center">
                <Link href={`/(tabs)/items/transaction/${request.id}`} asChild>
                  <TouchableOpacity
                    className="flex-row items-center justify-center w-full py-3 px-4 bg-primary-500 rounded-lg shadow-sm active:opacity-90"
                    style={{ elevation: 1 }}
                  >
                    <Ionicons name="eye-outline" size={18} color="white" />
                    <Text className="text-white font-medium ml-2">
                      View Transaction Details
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
}
