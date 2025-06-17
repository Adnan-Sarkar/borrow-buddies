import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";
import AddEvidenceModal from "./evidence/AddEvidenceModal";

type HandoverButtonProps = {
  isOwner: boolean;
  status: string;
  transactionId: string;
  startDate: string;
  onSuccess: () => void;
};

export default function HandoverButton({
  isOwner,
  status,
  transactionId,
  startDate,
  onSuccess,
}: HandoverButtonProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isHandoverDay, setIsHandoverDay] = useState(false);
  const [daysUntilHandover, setDaysUntilHandover] = useState(0);

  useEffect(() => {
    const checkHandoverDay = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const handoverDate = new Date(startDate);
      handoverDate.setHours(0, 0, 0, 0);

      // Calculate days until handover
      const timeDiff = handoverDate.getTime() - today.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setDaysUntilHandover(Math.max(0, daysDiff));

      setIsHandoverDay(today >= handoverDate);
    };

    checkHandoverDay();

    // Recheck at midnight
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const timeUntilMidnight = midnight.getTime() - new Date().getTime();

    const timer = setTimeout(() => {
      checkHandoverDay();
    }, timeUntilMidnight);

    return () => clearTimeout(timer);
  }, [startDate]);

  // Only show for owners when the transaction is approved
  if (!isOwner || status !== "APPROVED") {
    return null;
  }

  return (
    <View className="px-4 my-6">
      <Text className="text-neutral-800 font-semibold text-lg mb-3">
        Add Evidence
      </Text>
      <View className="p-4 border border-neutral-200 border-dashed">
        <TouchableOpacity
          className={`py-3 px-4 rounded-lg flex-row items-center justify-center ${
            isHandoverDay ? "bg-primary-600" : "bg-neutral-300"
          }`}
          onPress={() => isHandoverDay && setIsModalVisible(true)}
          disabled={!isHandoverDay}
        >
          <Ionicons
            name="camera-outline"
            size={20}
            color={isHandoverDay ? "white" : COLORS.NEUTRAL[500]}
          />
          <Text
            className={`font-semibold ml-2 ${
              isHandoverDay ? "text-white" : "text-neutral-500"
            }`}
          >
            Document Item Handover
          </Text>
        </TouchableOpacity>

        {!isHandoverDay ? (
          <Text className="text-error-500 text-xs text-center mt-2">
            Available on handover day ({daysUntilHandover}{" "}
            {daysUntilHandover === 1 ? "day" : "days"} remaining)
          </Text>
        ) : (
          <Text className="text-neutral-500 text-xs text-center mt-2">
            Add photos of the item at the time of handover to the borrower
          </Text>
        )}
      </View>

      <AddEvidenceModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        transactionId={transactionId}
        evidenceType={isOwner ? "HANDOVER" : "PICKUP"}
        onSuccess={() => {
          setIsModalVisible(false);
          onSuccess();
        }}
      />
    </View>
  );
}
