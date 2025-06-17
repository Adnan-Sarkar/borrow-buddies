import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { COLORS } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ChatModal from "./components/chat";
import ItemDetails from "./components/ItemDetails";
import ParticipantDetails from "./components/ParticipantDetails";
import PaymentSummary from "./components/PaymentSummary";
import TimelineSection from "./components/TimelineSection";
import EvidenceSection from "./components/evidence/EvidenceSection";
import ActionButtons from "./components/ActionButtons";
import ReviewModal from "./components/ReviewModal";
import ReportModal from "./components/ReportModal";
import { useGetTransactionDetailsQuery } from "@/redux/api/transactionApi";
import StatusBanner from "./components/StatusBanner";
import HandoverButton from "./components/HandoverButton";
import getCurrentUserDetails from "@/utils/getCurrentUserDetails";
import TransactionLocation from "./components/TransactionLocation";
import CompleteTransactionButton from "./components/CompleteTransactionButton";

export default function TransactionDetailsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { transactionId } = useLocalSearchParams();
  const [isChatModalVisible, setIsChatModalVisible] = useState(false);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    async function getUser() {
      const user = await getCurrentUserDetails();
      if (user) {
        setCurrentUserId(user.id);
      } else {
        console.error("User not found");
      }
    }

    getUser();
  }, []);

  const {
    data: transaction,
    isLoading,
    refetch,
  } = useGetTransactionDetailsQuery(transactionId, {
    selectFromResult: (result) => ({
      ...result,
      data: result?.data?.data,
    }),
  });

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color={COLORS.PRIMARY[500]} />
      </View>
    );
  }

  if (!transaction) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-neutral-800 text-lg mb-2">
          Transaction Not Found
        </Text>
        <Text className="text-neutral-500 text-center px-6 mb-4">
          The transaction you're looking for could not be found or has been
          removed.
        </Text>
        <TouchableOpacity
          className="bg-primary-50 px-4 py-2 rounded-lg"
          onPress={() => router.back()}
        >
          <Text className="text-primary-600 font-medium">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const safeTransaction = {
    ...transaction,
    item: transaction.item || {},
    owner: transaction.owner || { name: "Unknown Owner", profilePicture: null },
    borrower: transaction.borrower || {
      name: "Unknown Borrower",
      profilePicture: null,
    },
    Evidence: transaction.Evidence || [],
    amount: transaction.amount || "0",
    securityDeposit: transaction.securityDeposit || "0",
    platformFee: transaction.platformFee || "0",
    paymentStatus: Boolean(transaction.paymentStatus),
    paymentMethod: transaction.paymentMethod || "Unknown",
    status: transaction.status || "UNKNOWN",
    startDate: transaction.startDate || new Date().toISOString(),
    endDate: transaction.endDate || new Date().toISOString(),
    createdAt: transaction.createdAt || new Date().toISOString(),
    updatedAt: transaction.updatedAt || new Date().toISOString(),
  };

  // User role determination // Replace with actual user ID from auth
  const isOwner = safeTransaction.ownerId === currentUserId;
  const isBorrower = safeTransaction.borrowerId === currentUserId;
  const otherUserId = isOwner
    ? safeTransaction.borrowerId
    : safeTransaction.ownerId;
  const otherUserName = isOwner
    ? safeTransaction.borrower.name
    : safeTransaction.owner.name;

  // Permission checks
  const canReview =
    safeTransaction.status === "COMPLETED" && !safeTransaction.hasReviewed;
  const canAddEvidence = ["APPROVED", "ACTIVE"].includes(
    safeTransaction.status
  );

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* Status Banner */}

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <StatusBanner
          status={safeTransaction.status}
          startDate={safeTransaction.startDate}
          endDate={safeTransaction.endDate}
        />

        {/* Item Details */}
        <ItemDetails item={safeTransaction.item} />

        {/* Handover/Pickup evidence */}
        <HandoverButton
          isOwner={isOwner}
          status={safeTransaction.status}
          transactionId={safeTransaction.id}
          startDate={safeTransaction.startDate}
          onSuccess={refetch}
        />

        {/* Pickup location in Mapview */}
        <TransactionLocation
          destinationLocation={
            safeTransaction.item.location || "Pickup Location"
          }
          destinationLatitude={safeTransaction.item.latitude}
          destinationLongitude={safeTransaction.item.longitude}
        />

        {/* Participant Details */}
        <ParticipantDetails
          owner={safeTransaction.owner}
          borrower={safeTransaction.borrower}
          isOwner={isOwner}
        />

        {/* Payment Summary */}
        <PaymentSummary
          amount={safeTransaction.amount}
          securityDeposit={safeTransaction.securityDeposit}
          platformFee={safeTransaction.platformFee}
          paymentStatus={safeTransaction.paymentStatus}
          paymentMethod={safeTransaction.paymentMethod}
        />

        {/* Transaction Complete */}
        <CompleteTransactionButton
          transactionId={safeTransaction.id}
          isOwner={isOwner}
          status={safeTransaction.status}
          onSuccess={refetch}
        />

        {/* Timeline Section */}
        <TimelineSection
          status={safeTransaction.status}
          createdAt={safeTransaction.createdAt}
          updatedAt={safeTransaction.updatedAt}
          startDate={safeTransaction.startDate}
          endDate={safeTransaction.endDate}
        />

        {/* Evidence Section */}
        <EvidenceSection
          evidence={safeTransaction.Evidence}
          transactionId={safeTransaction.id}
          canAddEvidence={canAddEvidence}
          onRefresh={refetch}
          isOwner={isOwner}
          status={safeTransaction.status}
        />
      </ScrollView>

      {/* Action Buttons */}
      <ActionButtons
        status={safeTransaction.status}
        isOwner={isOwner}
        isBorrower={isBorrower}
        canReview={canReview}
        onChatPress={() => setIsChatModalVisible(true)}
        onReviewPress={() => setIsReviewModalVisible(true)}
        onReportPress={() => setIsReportModalVisible(true)}
      />

      {/* Chat Modal */}
      <ChatModal
        visible={isChatModalVisible}
        onClose={() => setIsChatModalVisible(false)}
        currentUserId={currentUserId}
        otherUser={isOwner ? safeTransaction?.borrower : safeTransaction?.owner}
      />

      {/* Review Modal */}
      {/* <ReviewModal
        visible={isReviewModalVisible}
        onClose={() => setIsReviewModalVisible(false)}
        transaction={safeTransaction}
        itemId={safeTransaction.itemId}
        reviewerId={currentUserId}
        recipientId={otherUserId}
        onReviewSubmitted={refetch}
      /> */}

      {/* Report Modal */}
      {/* <ReportModal
        visible={isReportModalVisible}
        onClose={() => setIsReportModalVisible(false)}
        transactionId={safeTransaction.id}
      /> */}
    </View>
  );
}
