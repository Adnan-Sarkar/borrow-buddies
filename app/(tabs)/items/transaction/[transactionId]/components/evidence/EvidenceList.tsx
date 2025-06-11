import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import EvidenceDetailModal from "./EvidenceDetailModal";

type Evidence = {
  id: string;
  transactionId: string;
  type: "PICKUP" | "HANDOVER" | "RETURN" | "DAMAGE";
  images: string[];
  notes?: string;
  submittedBy: string;
  createdAt: string;
};

type EvidenceListProps = {
  title: string;
  evidence: Evidence[];
  icon: string;
  iconColor: string;
};

export default function EvidenceList({
  title,
  evidence,
  icon,
  iconColor,
}: EvidenceListProps) {
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(
    null
  );

  const handleViewEvidence = (evidence: Evidence) => {
    setSelectedEvidence(evidence);
  };

  return (
    <View className="mb-4">
      <View className="flex-row items-center mb-2">
        <Ionicons name={icon as any} size={18} color={iconColor} />
        <Text className="ml-2 text-neutral-800 font-medium">{title}</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {evidence.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleViewEvidence(item)}
            className="mr-3 bg-neutral-50 rounded-lg overflow-hidden"
          >
            <Image
              source={{ uri: item.images[0] }}
              className="w-24 h-24"
              resizeMode="cover"
            />
            <View className="p-2">
              <Text className="text-xs text-neutral-600 mb-1">
                {formatDistanceToNow(new Date(item.createdAt), {
                  addSuffix: true,
                })}
              </Text>
              {item.notes && (
                <Text className="text-xs text-neutral-800" numberOfLines={1}>
                  {item.notes}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedEvidence && (
        <EvidenceDetailModal
          evidence={selectedEvidence}
          visible={!!selectedEvidence}
          onClose={() => setSelectedEvidence(null)}
        />
      )}
    </View>
  );
}
