import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../../constants/Colors";

type Owner = {
  id: string;
  name: string;
  email: string;
  location: string;
  profilePicture: string;
  avgRating: number;
  reviewCount: number;
};

type OwnerProfileModalProps = {
  owner: Owner;
  visible: boolean;
  onClose: () => void;
};

const OwnerProfileModal = ({
  owner,
  visible,
  onClose,
}: OwnerProfileModalProps) => {
  const handleSendEmail = () => {
    Linking.openURL(`mailto:${owner.email}`);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/50 justify-center items-center">
          <TouchableWithoutFeedback>
            <View className="w-[85%] bg-white rounded-2xl p-5 pb-6 shadow-md">
              {/* Close button */}
              <TouchableOpacity
                className="absolute right-4 top-4 z-10"
                onPress={onClose}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="close" size={24} color={COLORS.NEUTRAL[500]} />
              </TouchableOpacity>

              {/* Header with avatar and name */}
              <View className="flex-row items-center mb-4 mt-2">
                <Image
                  source={{
                    uri:
                      owner.profilePicture || "https://via.placeholder.com/150",
                  }}
                  className="w-[60px] h-[60px] rounded-full mr-4 bg-neutral-200"
                />
                <View className="flex-1">
                  <Text className="text-lg font-bold text-neutral-900 mb-1">
                    {owner.name}
                  </Text>
                  <View className="flex-row items-center">
                    <Ionicons
                      name="star"
                      size={14}
                      color={COLORS.WARNING[400]}
                    />
                    <Text className="ml-1 text-sm text-neutral-600">
                      {owner.avgRating > 0 ? owner.avgRating.toFixed(1) : "New"}{" "}
                      · {owner.reviewCount}{" "}
                      {owner.reviewCount === 1 ? "review" : "reviews"}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Divider */}
              <View className="h-[1px] bg-neutral-200 my-4" />

              {/* Details section */}
              <View className="mb-5">
                {/* Location */}
                <View className="flex-row items-center mb-4">
                  <View className="w-9 h-9 rounded-full bg-primary-50 items-center justify-center mr-3">
                    <Ionicons
                      name="location-outline"
                      size={18}
                      color={COLORS.PRIMARY[500]}
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs text-neutral-500 mb-0.5">
                      Location
                    </Text>
                    <Text className="text-[15px] text-neutral-800 font-medium">
                      {owner.location}
                    </Text>
                  </View>
                </View>

                {/* Email */}
                <TouchableOpacity
                  className="flex-row items-center mb-4"
                  onPress={handleSendEmail}
                  activeOpacity={0.7}
                >
                  <View className="w-9 h-9 rounded-full bg-primary-50 items-center justify-center mr-3">
                    <Ionicons
                      name="mail-outline"
                      size={18}
                      color={COLORS.PRIMARY[500]}
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs text-neutral-500 mb-0.5">
                      Email
                    </Text>
                    <Text className="text-[15px] text-neutral-800 font-medium">
                      {owner.email}
                    </Text>
                  </View>
                  <Ionicons
                    name="open-outline"
                    size={16}
                    color={COLORS.PRIMARY[500]}
                  />
                </TouchableOpacity>

                {/* Member since */}
                <View className="flex-row items-center mb-4">
                  <View className="w-9 h-9 rounded-full bg-primary-50 items-center justify-center mr-3">
                    <Ionicons
                      name="calendar-outline"
                      size={18}
                      color={COLORS.PRIMARY[500]}
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs text-neutral-500 mb-0.5">
                      Member since
                    </Text>
                    <Text className="text-[15px] text-neutral-800 font-medium">
                      June 2025
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default OwnerProfileModal;
