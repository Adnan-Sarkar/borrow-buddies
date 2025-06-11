import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../../../../constants/Colors";
import { useGetItemDetailsQuery } from "../../../../redux/api/itemsApi";
import ImageSlider from "./components/ImageSlider";
import OwnerInfo from "./components/OwnerInfo";
import FeaturesList from "./components/FeaturesList";
import LocationSection from "./components/LocationSection";
import RulesSection from "./components/RulesSection";
import ActionBar from "./components/ActionBar";
import OwnerProfileModal from "./components/OwnerProfileModal";
import UpdateItemDetails from "./components/UpdateItemDetails";
import { Ionicons } from "@expo/vector-icons";
import getCurrentUserDetails from "@/utils/getCurrentUserDetails";

export default function ItemDetailScreen() {
  const params = useLocalSearchParams();
  const { itemId } = params;
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isOwnerModalVisible, setIsOwnerModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const {
    data: response,
    isLoading,
    error,
  } = useGetItemDetailsQuery(itemId as string);

  const item = response?.data;

  const handleRequestItem = () => {
    if (isUSerIsOwner) {
      handleEditItem();
    } else {
      router.push({
        pathname: "/items/request",
        params: { itemId },
      });
    }
  };

  useEffect(() => {
    const setCurrentUserInfo = async () => {
      const currentUser = await getCurrentUserDetails();
      if (currentUser) {
        setCurrentUserId(currentUser?.id);
      }
    };

    setCurrentUserInfo();
  }, []);

  const handleEditItem = () => {
    setIsUpdateModalVisible(true);
  };

  const handleOwnerProfile = () => {
    if (item?.owner?.id) {
      setIsOwnerModalVisible(true);
    }
  };

  const handleCloseOwnerModal = () => {
    setIsOwnerModalVisible(false);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalVisible(false);
  };

  const isUSerIsOwner = currentUserId === item?.owner?.id;
  const isUserAlreadyRequested = item?.userRequestStatus?.exists;

  if (isLoading) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color={COLORS.PRIMARY[500]} />
        <Text className="text-neutral-500 mt-4">Loading item details...</Text>
      </View>
    );
  }

  if (error || !item) {
    return (
      <View className="flex-1 bg-white items-center justify-center p-6">
        <Text className="text-xl font-bold text-neutral-900 mb-2">Oops!</Text>
        <Text className="text-neutral-600 text-center mb-6">
          We couldn't load the item details. Please try again.
        </Text>
        <TouchableOpacity
          className="bg-primary-500 py-3 px-6 rounded-full"
          onPress={() => router.back()}
        >
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* Images slider */}
      <ImageSlider
        images={item.images}
        insets={insets}
        onBackPress={() => router.back()}
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-5">
          {/* Category and item name */}
          <View className="flex-row mb-2">
            <View className="flex-row items-center bg-white border border-primary-100 rounded-full px-3 py-1.5">
              <View className="w-6 h-6 rounded-full bg-primary-50 items-center justify-center mr-1.5">
                <Ionicons
                  name={(item.category?.icon?.trim() || "grid-outline") as any}
                  size={14}
                  color={COLORS.PRIMARY[600]}
                />
              </View>
              <Text className="text-primary-600 font-medium">
                {item.category?.name || "Item"}
              </Text>
            </View>
          </View>
          <Text className="text-2xl font-bold text-neutral-900 mb-2">
            {item.title}
          </Text>

          {/* Price */}
          <View className="flex-row items-center mb-4">
            <Text className="text-2xl font-bold text-primary-500">
              ${item.dailyPrice}
            </Text>
            <Text className="text-neutral-600 ml-1">/day</Text>
            <View className="h-4 w-[1px] bg-neutral-300 mx-3" />
            <Text className="text-neutral-600">
              ${item.securityDeposit} deposit
            </Text>
          </View>

          {/* Owner info */}
          <OwnerInfo owner={item.owner} onPress={handleOwnerProfile} />

          {/* Description */}
          <View className="mb-10">
            <View className="flex-row items-center mb-4">
              <Text className="mx-3 text-neutral-700 font-semibold">
                Product Details
              </Text>

              <View className="flex-1 h-[1px] bg-neutral-200" />
            </View>
            <Text className="text-neutral-700 leading-5">
              {item.description}
            </Text>
          </View>

          {/* Features */}
          <FeaturesList features={item.features} />

          {/* Location */}
          <LocationSection
            location={item.location}
            latitude={item.latitude}
            longitude={item.longitude}
          />

          {/* Rules */}
          <RulesSection rules={item.rules} />
        </View>
      </ScrollView>

      {/* Bottom action bar */}
      {isUserAlreadyRequested ? (
        <View className="p-4 border-t border-neutral-200 bg-white shadow-sm">
          <View className="flex-row items-center justify-between">
            {/* REQUESTED state */}
            {item?.userRequestStatus?.status === "REQUESTED" && (
              <>
                <View className="flex-row items-center">
                  <View className="w-8 h-8 rounded-full bg-warning-100 items-center justify-center mr-2.5">
                    <Ionicons
                      name="time-outline"
                      size={16}
                      color={COLORS.WARNING[600]}
                    />
                  </View>
                  <View>
                    <Text className="text-warning-700 font-medium">
                      Request Pending
                    </Text>
                    <Text className="text-neutral-400 text-sm">
                      You have already requested this item.
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  className="bg-primary-600 px-3.5 py-1.5 rounded-lg"
                  onPress={() => router.push("/(tabs)/items/my-requests")}
                >
                  <Text className="text-white font-medium text-sm">
                    View Details
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {/* APPROVED state */}
            {item?.userRequestStatus?.status === "APPROVED" && (
              <>
                <View className="flex-row items-center">
                  <View className="w-8 h-8 rounded-full bg-success-100 items-center justify-center mr-2.5">
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color={COLORS.SUCCESS[600]}
                    />
                  </View>
                  <View>
                    <Text className="text-success-700 font-medium">
                      Request Approved
                    </Text>
                    <Text className="text-neutral-400 text-sm">
                      Your request has been approved by the owner.
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  className="bg-primary-600 px-3.5 py-1.5 rounded-lg"
                  onPress={() => router.push("/(tabs)/items/my-requests")}
                >
                  <Text className="text-white font-medium text-sm">
                    View Details
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {/* ACTIVE state */}
            {item?.userRequestStatus?.status === "ACTIVE" && (
              <>
                <View className="flex-row items-center">
                  <View className="w-8 h-8 rounded-full bg-primary-100 items-center justify-center mr-2.5">
                    <Ionicons
                      name="play-circle"
                      size={16}
                      color={COLORS.PRIMARY[600]}
                    />
                  </View>
                  <View>
                    <Text className="text-primary-700 font-medium">
                      Rental Active
                    </Text>
                    <Text className="text-neutral-400 text-sm">
                      You have an active rental for this item.
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  className="bg-primary-600 px-3.5 py-1.5 rounded-lg"
                  onPress={() => router.push("/(tabs)/items/my-requests")}
                >
                  <Text className="text-white font-medium text-sm">
                    View Details
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      ) : (
        <ActionBar
          onRequestPress={handleRequestItem}
          onEditPress={handleEditItem}
          isProductOwner={isUSerIsOwner}
        />
      )}

      {/* Owner Profile Modal */}
      {item?.owner && (
        <OwnerProfileModal
          owner={item.owner}
          visible={isOwnerModalVisible}
          onClose={handleCloseOwnerModal}
        />
      )}

      {/* Update Item Modal */}
      {isUSerIsOwner && (
        <UpdateItemDetails
          visible={isUpdateModalVisible}
          onClose={handleCloseUpdateModal}
          item={item}
        />
      )}
    </View>
  );
}
