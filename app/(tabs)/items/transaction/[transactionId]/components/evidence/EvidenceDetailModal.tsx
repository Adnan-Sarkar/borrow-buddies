import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";
import { format } from "date-fns";

type Evidence = {
  id: string;
  transactionId: string;
  type: "PICKUP" | "HANDOVER" | "RETURN" | "DAMAGE";
  images: string[];
  notes?: string;
  submittedBy: string;
  createdAt: string;
};

type EvidenceDetailModalProps = {
  evidence: Evidence;
  visible: boolean;
  onClose: () => void;
};

export default function EvidenceDetailModal({
  evidence,
  visible,
  onClose,
}: EvidenceDetailModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const getTypeInfo = (type: string) => {
    switch (type) {
      case "PICKUP":
        return {
          title: "Pickup Evidence",
          icon: "log-in-outline",
          color: COLORS.PRIMARY[500],
          bgColor: COLORS.PRIMARY[50],
        };
      case "HANDOVER":
        return {
          title: "Handover Evidence",
          icon: "camera-outline",
          color: COLORS.PRIMARY[500],
          bgColor: COLORS.PRIMARY[50],
        };
      case "RETURN":
        return {
          title: "Return Evidence",
          icon: "log-out-outline",
          color: COLORS.SUCCESS[500],
          bgColor: COLORS.SUCCESS[50],
        };
      case "DAMAGE":
        return {
          title: "Damage Evidence",
          icon: "alert-circle-outline",
          color: COLORS.ERROR[500],
          bgColor: COLORS.ERROR[50],
        };
      default:
        return {
          title: "Evidence",
          icon: "document-outline",
          color: COLORS.NEUTRAL[500],
          bgColor: COLORS.NEUTRAL[50],
        };
    }
  };

  const typeInfo = getTypeInfo(evidence.type);

  const formattedDate = format(
    new Date(evidence.createdAt),
    "MMM d, yyyy • h:mm a"
  );

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        {/* Header */}
        <View className="px-4 py-3 border-b border-neutral-100 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={onClose}
            className="w-9 h-9 rounded-full items-center justify-center"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close" size={24} color={COLORS.NEUTRAL[700]} />
          </TouchableOpacity>

          <View className="flex-row items-center">
            <View
              className="w-8 h-8 rounded-full items-center justify-center mr-2"
              style={{ backgroundColor: typeInfo.bgColor }}
            >
              <Ionicons
                name={typeInfo.icon as any}
                size={18}
                color={typeInfo.color}
              />
            </View>
            <Text className="font-bold text-base text-neutral-800">
              {typeInfo.title}
            </Text>
          </View>

          <View className="w-9 h-9" />
        </View>

        {/* Date info */}
        <View className="bg-neutral-50 px-4 py-2 flex-row items-center">
          <Ionicons
            name="calendar-outline"
            size={14}
            color={COLORS.NEUTRAL[500]}
          />
          <Text className="text-neutral-500 text-xs ml-1">{formattedDate}</Text>
        </View>

        {/* Main Image */}
        <View className="flex-1 bg-neutral-100 justify-center items-center">
          <Image
            source={{ uri: evidence.images[activeImageIndex] }}
            style={{
              width: windowWidth,
              height: windowHeight * 0.4,
              backgroundColor: COLORS.NEUTRAL[200],
            }}
            resizeMode="contain"
          />
        </View>

        {/* Image Counter */}
        <View className="absolute top-20 right-4 bg-black/60 px-2 py-1 rounded-full">
          <Text className="text-white text-xs">
            {activeImageIndex + 1} / {evidence.images.length}
          </Text>
        </View>

        {/* Bottom Panel */}
        <View className="bg-white">
          {/* Thumbnails */}
          {evidence.images.length > 1 && (
            <View className="px-4 py-3 border-t border-neutral-100">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {evidence.images.map((uri, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setActiveImageIndex(index)}
                    className={`mr-2 rounded-lg overflow-hidden ${
                      activeImageIndex === index
                        ? "border-2 border-primary-500"
                        : "border border-neutral-200"
                    }`}
                    style={{ opacity: activeImageIndex === index ? 1 : 0.7 }}
                  >
                    <Image
                      source={{ uri }}
                      className="w-16 h-16"
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Notes */}
          {evidence.notes && (
            <View className="px-4 py-3 border-t border-neutral-100">
              <Text className="text-neutral-800 font-semibold mb-1">Notes</Text>
              <Text className="text-neutral-600 text-sm">{evidence.notes}</Text>
            </View>
          )}

          {/* Submitted by */}
          <View className="px-4 py-3 border-t border-neutral-100 flex-row items-center">
            <View className="w-7 h-7 bg-primary-100 rounded-full items-center justify-center mr-2">
              <Text className="text-primary-700 font-medium text-xs">
                {evidence.submittedBy.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View>
              <Text className="text-neutral-500 text-xs">Submitted by</Text>
              <Text className="text-neutral-800 font-medium text-sm">
                {evidence.submittedBy}
              </Text>
            </View>
          </View>

          {/* Close button */}
          <View className="px-4 py-3 border-t border-neutral-100">
            <TouchableOpacity
              className="bg-neutral-100 py-3 rounded-lg items-center"
              onPress={onClose}
            >
              <Text className="text-neutral-700 font-medium">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
