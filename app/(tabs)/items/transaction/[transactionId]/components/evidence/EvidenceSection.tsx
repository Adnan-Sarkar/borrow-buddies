import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";
import EvidenceList from "./EvidenceList";
import AddEvidenceModal from "./AddEvidenceModal";

type Evidence = {
  id: string;
  transactionId: string;
  type: "PICKUP" | "HANDOVER" | "RETURN" | "DAMAGE";
  images: string[];
  notes?: string;
  submittedBy: string;
  createdAt: string;
};

type EvidenceSectionProps = {
  evidence: Evidence[];
  transactionId: string;
  canAddEvidence: boolean;
  onRefresh: () => void;
};

export default function EvidenceSection({
  evidence,
  transactionId,
  canAddEvidence,
  onRefresh,
}: EvidenceSectionProps) {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<
    "PICKUP" | "HANDOVER" | "RETURN" | "DAMAGE"
  >("PICKUP");

  const pickupEvidence = evidence.filter((e) => e.type === "PICKUP");
  const returnEvidence = evidence.filter((e) => e.type === "RETURN");
  const damageEvidence = evidence.filter((e) => e.type === "DAMAGE");

  const handleAddEvidence = (
    type: "PICKUP" | "HANDOVER" | "RETURN" | "DAMAGE"
  ) => {
    setSelectedType(type);
    setIsAddModalVisible(true);
  };

  return (
    <View className="mt-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-semibold text-neutral-800">Evidence</Text>
        {canAddEvidence && (
          <TouchableOpacity
            onPress={() => setIsAddModalVisible(true)}
            className="flex-row items-center"
          >
            <Ionicons
              name="add-circle-outline"
              size={18}
              color={COLORS.PRIMARY[500]}
            />
            <Text className="ml-1 text-primary-500 font-medium">Add</Text>
          </TouchableOpacity>
        )}
      </View>

      {evidence.length === 0 ? (
        <View className="p-6 bg-neutral-50 rounded-lg items-center justify-center">
          <View className="w-12 h-12 rounded-full bg-neutral-100 items-center justify-center mb-3">
            <Ionicons
              name="images-outline"
              size={24}
              color={COLORS.NEUTRAL[400]}
            />
          </View>
          <Text className="text-neutral-600 text-sm text-center mb-1">
            No evidence has been added yet.
          </Text>
          {canAddEvidence && (
            <Text className="text-neutral-500 text-xs text-center">
              Add evidence to document the condition of the item.
            </Text>
          )}
        </View>
      ) : (
        <View>
          {pickupEvidence.length > 0 && (
            <EvidenceList
              title="Pickup Evidence"
              evidence={pickupEvidence}
              icon="log-in-outline"
              iconColor={COLORS.PRIMARY[500]}
            />
          )}

          {returnEvidence.length > 0 && (
            <EvidenceList
              title="Return Evidence"
              evidence={returnEvidence}
              icon="log-out-outline"
              iconColor={COLORS.SUCCESS[500]}
            />
          )}

          {damageEvidence.length > 0 && (
            <EvidenceList
              title="Damage Evidence"
              evidence={damageEvidence}
              icon="alert-circle-outline"
              iconColor={COLORS.ERROR[500]}
            />
          )}
        </View>
      )}

      {canAddEvidence && (
        <View className="mt-4 flex-row justify-around">
          <TouchableOpacity
            onPress={() => handleAddEvidence("PICKUP")}
            className="items-center"
          >
            <View className="w-10 h-10 rounded-full bg-primary-100 items-center justify-center mb-1">
              <Ionicons
                name="log-in-outline"
                size={20}
                color={COLORS.PRIMARY[500]}
              />
            </View>
            <Text className="text-xs text-neutral-600">Pickup</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleAddEvidence("HANDOVER")}
            className="items-center"
          >
            <View className="w-10 h-10 rounded-full bg-primary-100 items-center justify-center mb-1">
              <Ionicons
                name="hand-left-outline"
                size={20}
                color={COLORS.PRIMARY[500]}
              />
            </View>
            <Text className="text-xs text-neutral-600">Handover</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleAddEvidence("RETURN")}
            className="items-center"
          >
            <View className="w-10 h-10 rounded-full bg-success-100 items-center justify-center mb-1">
              <Ionicons
                name="log-out-outline"
                size={20}
                color={COLORS.SUCCESS[500]}
              />
            </View>
            <Text className="text-xs text-neutral-600">Return</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleAddEvidence("DAMAGE")}
            className="items-center"
          >
            <View className="w-10 h-10 rounded-full bg-error-100 items-center justify-center mb-1">
              <Ionicons
                name="alert-circle-outline"
                size={20}
                color={COLORS.ERROR[500]}
              />
            </View>
            <Text className="text-xs text-neutral-600">Damage</Text>
          </TouchableOpacity>
        </View>
      )}

      <AddEvidenceModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        transactionId={transactionId}
        evidenceType={selectedType}
        onSuccess={() => {
          setIsAddModalVisible(false);
          onRefresh();
        }}
      />
    </View>
  );
}
