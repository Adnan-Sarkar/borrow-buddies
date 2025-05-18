import React, { useState } from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { COLORS } from "../../../../../constants/Colors";
import Button from "../../../../../components/common/Button";
import CustomTextArea from "../../../../../components/common/CustomTextArea";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { useReportPostMutation } from "@/redux/api/communityApi";

// Enum for report reasons
export enum ReportReason {
  SPAM = "SPAM",
  HARASSMENT = "HARASSMENT",
  INAPPROPRIATE_CONTENT = "INAPPROPRIATE_CONTENT",
  FALSE_INFORMATION = "FALSE_INFORMATION",
  HATE_SPEECH = "HATE_SPEECH",
  VIOLENCE = "VIOLENCE",
}

// Human-readable labels for report reasons
const reportReasonLabels: Record<ReportReason, string> = {
  [ReportReason.SPAM]: "Spam or misleading",
  [ReportReason.HARASSMENT]: "Harassment or bullying",
  [ReportReason.INAPPROPRIATE_CONTENT]: "Inappropriate content",
  [ReportReason.FALSE_INFORMATION]: "False information",
  [ReportReason.HATE_SPEECH]: "Hate speech",
  [ReportReason.VIOLENCE]: "Violence or dangerous content",
};

// Icons for each reason
const reportReasonIcons: Record<ReportReason, string> = {
  [ReportReason.SPAM]: "mail-unread-outline",
  [ReportReason.HARASSMENT]: "people-outline",
  [ReportReason.INAPPROPRIATE_CONTENT]: "alert-circle-outline",
  [ReportReason.FALSE_INFORMATION]: "close-circle-outline",
  [ReportReason.HATE_SPEECH]: "chatbox-ellipses-outline",
  [ReportReason.VIOLENCE]: "warning-outline",
};

// Validation schema
const createReportValidationSchema = z.object({
  reason: z.enum(
    [
      ReportReason.SPAM,
      ReportReason.HARASSMENT,
      ReportReason.INAPPROPRIATE_CONTENT,
      ReportReason.FALSE_INFORMATION,
      ReportReason.HATE_SPEECH,
      ReportReason.VIOLENCE,
    ],
    {
      required_error: "Report reason is required",
      invalid_type_error: "Invalid report reason",
    }
  ),
  description: z.string({
    invalid_type_error: "Additional details must be a string",
    required_error: "Additional details is required",
  }),
});

type ReportFormData = z.infer<typeof createReportValidationSchema>;

interface ReportModalProps {
  visible: boolean;
  onClose: () => void;
  postId: string;
  onSuccess?: () => void;
}

const { height } = Dimensions.get("window");

const ReportModal: React.FC<ReportModalProps> = ({
  visible,
  onClose,
  postId,
  onSuccess,
}) => {
  const [selectedReason, setSelectedReason] = useState<ReportReason | null>(
    null
  );
  const [createReport, { isLoading }] = useReportPostMutation();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ReportFormData>({
    resolver: zodResolver(createReportValidationSchema),
    defaultValues: {
      reason: undefined,
      description: "",
    },
  });

  const handleSelectReason = (reason: ReportReason) => {
    setSelectedReason(reason);
    setValue("reason", reason);
  };

  const handleSubmitReport = async (data: ReportFormData) => {
    console.log("Report SUBMIT", data);
    try {
      await createReport({
        postId: postId,
        data: {
          reason: data.reason,
          description: data.description,
          postId: postId,
        },
      }).unwrap();

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Report Submitted",
        textBody:
          "Thank you for helping to keep our community safe. We'll review this report.",
      });

      if (onSuccess) {
        onSuccess();
      }

      onClose();
    } catch (error: any) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Report Failed",
        textBody:
          error?.data?.message ||
          "Could not submit your report. Please try again.",
      });
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/50 justify-end">
          <TouchableWithoutFeedback>
            <View
              style={{ maxHeight: height * 0.9 }}
              className="bg-white rounded-t-3xl overflow-hidden"
            >
              {/* Header */}
              <View className="border-b border-neutral-100 px-6 py-4">
                <View className="flex-row justify-between items-center">
                  <Text className="text-xl font-bold text-neutral-800">
                    Report Post
                  </Text>
                  <TouchableOpacity
                    onPress={onClose}
                    className="h-10 w-10 rounded-full items-center justify-center"
                  >
                    <Ionicons
                      name="close"
                      size={24}
                      color={COLORS.NEUTRAL[500]}
                    />
                  </TouchableOpacity>
                </View>

                <Text className="text-neutral-600 mt-1">
                  Let us know why you think this post shouldn't be on our
                  community
                </Text>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
              >
                {/* Instructions */}
                <View className="mb-6 bg-neutral-50 p-4 rounded-xl border border-neutral-100 flex-row items-start">
                  <Ionicons
                    name="information-circle"
                    size={22}
                    color={COLORS.PRIMARY[500]}
                  />
                  <Text className="text-neutral-700 ml-3 flex-1">
                    Your report will helps us maintain a safe community for
                    everyone.
                  </Text>
                </View>

                {/* Reason selection */}
                <Text className="font-medium text-neutral-800 mb-3 text-base">
                  Why are you reporting this post?
                </Text>

                <Controller
                  control={control}
                  name="reason"
                  render={({ field: { value } }) => (
                    <View>
                      {Object.values(ReportReason).map((reason) => (
                        <TouchableOpacity
                          key={reason}
                          className={`border rounded-xl mb-3 p-4 flex-row items-center ${
                            selectedReason === reason
                              ? "border-primary-500 bg-primary-50"
                              : "border-neutral-200"
                          }`}
                          onPress={() => handleSelectReason(reason)}
                        >
                          <View
                            className={`w-10 h-10 rounded-full ${
                              selectedReason === reason
                                ? "bg-primary-100"
                                : "bg-neutral-100"
                            } items-center justify-center mr-3`}
                          >
                            <Ionicons
                              name={reportReasonIcons[reason] as any}
                              size={20}
                              color={
                                selectedReason === reason
                                  ? COLORS.PRIMARY[600]
                                  : COLORS.NEUTRAL[500]
                              }
                            />
                          </View>
                          <Text
                            className={`text-base ${
                              selectedReason === reason
                                ? "font-medium text-neutral-800"
                                : "text-neutral-700"
                            }`}
                          >
                            {reportReasonLabels[reason]}
                          </Text>
                        </TouchableOpacity>
                      ))}

                      {errors.reason && (
                        <Text className="text-red-500 text-sm mb-4">
                          {errors.reason.message}
                        </Text>
                      )}
                    </View>
                  )}
                />

                {/* Additional details */}
                <View className="mt-2 mb-6">
                  <CustomTextArea
                    control={control}
                    name="description"
                    label="Additional details (optional)"
                    placeholder="Please provide any additional information that might help us understand the issue"
                    error={errors.description}
                    numberOfLines={4}
                  />
                </View>

                {/* Submit button */}
                <Button
                  title="Submit Report"
                  onPress={handleSubmit(handleSubmitReport)}
                  variant="primary"
                  fullWidth
                  isLoading={isLoading}
                  disabled={!selectedReason || isLoading}
                />

                <TouchableOpacity
                  onPress={onClose}
                  className="mt-4 items-center py-3"
                >
                  <Text className="text-neutral-500 font-medium">Cancel</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ReportModal;
