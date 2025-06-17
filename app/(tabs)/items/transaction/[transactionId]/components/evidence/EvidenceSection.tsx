import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";
import { format } from "date-fns";
import AddEvidenceModal from "./AddEvidenceModal";

const { width, height } = Dimensions.get("window");

type EvidenceUser = {
  id: string;
  name: string;
  profilePicture: string | null;
};

type Evidence = {
  id: string;
  type: "PICKUP" | "HANDOVER" | "RETURN" | "DAMAGE";
  images: string[];
  notes?: string;
  createdAt: string;
  user?: EvidenceUser;
};

type EvidenceSectionProps = {
  evidence: Evidence[];
  transactionId: string;
  canAddEvidence: boolean;
  isOwner: boolean;
  status: string;
  onRefresh: () => void;
};

export default function EvidenceSection({
  evidence,
  transactionId,
  canAddEvidence,
  isOwner,
  status,
  onRefresh,
}: EvidenceSectionProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<
    "PICKUP" | "HANDOVER" | "RETURN" | "DAMAGE"
  >("PICKUP");
  const [viewerVisible, setViewerVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Check if certain evidence types already exist
  const hasHandover = evidence.some((e) => e.type === "HANDOVER");
  const hasPickup = evidence.some((e) => e.type === "PICKUP");
  const hasReturn = evidence.some((e) => e.type === "RETURN");

  // Determine which actions are available based on role and status
  const getAvailableActions = () => {
    if (!canAddEvidence) return [];

    if (isOwner) {
      // Owner actions
      if (status === "APPROVED" && !hasHandover) {
        return [{ type: "HANDOVER", label: "Handover Item" }];
      } else if (status === "ACTIVE" && hasPickup && !hasReturn) {
        return [{ type: "RETURN", label: "Confirm Return" }];
      } else {
        return [{ type: "DAMAGE", label: "Report Damage" }];
      }
    } else {
      // Borrower actions
      if (status === "APPROVED" && hasHandover && !hasPickup) {
        return [{ type: "PICKUP", label: "Confirm Pickup" }];
      } else if (status === "ACTIVE" && !hasReturn) {
        return [{ type: "RETURN", label: "Return Item" }];
      } else {
        return [{ type: "DAMAGE", label: "Report Damage" }];
      }
    }
  };

  const actions = getAvailableActions();

  const openImageViewer = (images: string[], index: number) => {
    setSelectedImages(images);
    setSelectedIndex(index);
    setViewerVisible(true);
  };

  const renderTypeIcon = (type: string) => {
    switch (type) {
      case "PICKUP":
        return "log-in-outline";
      case "HANDOVER":
        return "hand-left-outline";
      case "RETURN":
        return "log-out-outline";
      case "DAMAGE":
        return "alert-circle-outline";
      default:
        return "document-text-outline";
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (e) {
      return dateString;
    }
  };

  return (
    <View className="mb-8 px-4">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-xl font-semibold text-neutral-800">Evidence</Text>
        {actions.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setSelectedType(actions[0].type as any);
              setModalVisible(true);
            }}
            className="bg-primary-500 py-2 px-4 rounded-full flex-row items-center"
          >
            <Ionicons
              name="add-circle-outline"
              size={18}
              color="white"
              style={{ marginRight: 4 }}
            />
            <Text className="text-white font-medium">{actions[0].label}</Text>
          </TouchableOpacity>
        )}
      </View>

      {evidence.length === 0 ? (
        <View className="p-5 bg-neutral-50 rounded-xl items-center">
          <Ionicons
            name="images-outline"
            size={40}
            color={COLORS.NEUTRAL[300]}
          />
          <Text className="mt-2 text-neutral-500 text-center">
            No evidence has been added yet.
          </Text>
        </View>
      ) : (
        <View>
          {evidence.map((item) => (
            <View
              key={item.id}
              className="mb-5 bg-white rounded-xl overflow-hidden shadow-sm"
            >
              {/* Header with avatar and info */}
              <View className="p-4 flex-row items-center">
                {item.user?.profilePicture ? (
                  <Image
                    source={{ uri: item.user.profilePicture }}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <View className="w-10 h-10 rounded-full bg-primary-100 items-center justify-center">
                    <Text className="text-primary-500 font-semibold">
                      {item.user?.name?.[0]?.toUpperCase() || "?"}
                    </Text>
                  </View>
                )}

                <View className="ml-3 flex-1">
                  <Text className="font-semibold text-neutral-800">
                    {item.user?.name || "Unknown User"}
                  </Text>
                  <View className="flex-row items-center">
                    <View className="px-2 py-0.5 bg-neutral-100 rounded-full mr-2 flex-row items-center">
                      <Ionicons
                        name={renderTypeIcon(item.type) as any}
                        size={12}
                        color={COLORS.NEUTRAL[500]}
                        style={{ marginRight: 3 }}
                      />
                      <Text className="text-xs text-neutral-500 capitalize">
                        {item.type.toLowerCase()}
                      </Text>
                    </View>
                    <Text className="text-xs text-neutral-400">
                      {formatDate(item.createdAt)}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Notes if available */}
              {item.notes && (
                <View className="px-4 pb-3">
                  <Text className="text-neutral-700">{item.notes}</Text>
                </View>
              )}

              {/* Images */}
              {item.images && item.images.length > 0 && (
                <View className="px-4 pb-4">
                  <View className="flex-row flex-wrap -mx-1">
                    {item.images.slice(0, 3).map((image, imgIndex) => (
                      <TouchableOpacity
                        key={imgIndex}
                        className={`${
                          item.images.length === 1
                            ? "w-full"
                            : item.images.length === 2
                            ? "w-1/2"
                            : "w-1/3"
                        } p-1`}
                        onPress={() => openImageViewer(item.images, imgIndex)}
                      >
                        <Image
                          source={{ uri: image }}
                          className="rounded-lg"
                          style={{
                            height: item.images.length === 1 ? 200 : 90,
                            width: "100%",
                          }}
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    ))}
                    {item.images.length > 3 && (
                      <TouchableOpacity
                        className="w-1/3 p-1 relative"
                        onPress={() => openImageViewer(item.images, 3)}
                      >
                        <Image
                          source={{ uri: item.images[3] }}
                          className="rounded-lg"
                          style={{ height: 90, width: "100%" }}
                          resizeMode="cover"
                        />
                        {item.images.length > 4 && (
                          <View className="absolute inset-0 bg-black/50 rounded-lg items-center justify-center">
                            <Text className="text-white font-medium">
                              +{item.images.length - 3}
                            </Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Image Viewer Modal */}
      <Modal visible={viewerVisible} transparent animationType="fade">
        <View className="flex-1 bg-black">
          <TouchableOpacity
            className="absolute top-10 right-5 z-10 bg-black/40 p-2 rounded-full"
            onPress={() => setViewerVisible(false)}
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>

          <FlatList
            data={selectedImages}
            horizontal
            pagingEnabled
            initialScrollIndex={selectedIndex}
            getItemLayout={(_, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            renderItem={({ item }) => (
              <View style={{ width, height, justifyContent: "center" }}>
                <Image
                  source={{ uri: item }}
                  style={{ width, height: height * 0.8 }}
                  resizeMode="contain"
                />
              </View>
            )}
            keyExtractor={(_, i) => `img-${i}`}
          />

          {selectedImages.length > 1 && (
            <View className="absolute bottom-10 self-center bg-black/40 px-3 py-1 rounded-full">
              <Text className="text-white">
                {selectedIndex + 1} / {selectedImages.length}
              </Text>
            </View>
          )}
        </View>
      </Modal>

      {/* Add Evidence Modal */}
      <AddEvidenceModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        transactionId={transactionId}
        evidenceType={selectedType}
        onSuccess={() => {
          setModalVisible(false);
          onRefresh();
        }}
      />
    </View>
  );
}
