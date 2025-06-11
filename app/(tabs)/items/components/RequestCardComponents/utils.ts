import { COLORS } from "@/constants/Colors";
import type { StatusInfo } from "./types";

export const getStatusInfo = (status: string): StatusInfo => {
  switch (status) {
    case "REQUESTED":
      return {
        bgColor: "bg-warning-50",
        textColor: "text-warning-700",
        borderColor: "border-warning-200",
        icon: "time-outline",
        iconColor: COLORS.WARNING[500],
        label: "Pending Approval",
      };
    case "APPROVED":
      return {
        bgColor: "bg-success-50",
        textColor: "text-success-700",
        borderColor: "border-success-200",
        icon: "checkmark-circle-outline",
        iconColor: COLORS.SUCCESS[500],
        label: "Approved",
      };
    case "REJECTED":
      return {
        bgColor: "bg-error-50",
        textColor: "text-error-700",
        borderColor: "border-error-200",
        icon: "close-circle-outline",
        iconColor: COLORS.ERROR[500],
        label: "Rejected",
      };
    case "COMPLETED":
      return {
        bgColor: "bg-neutral-50",
        textColor: "text-neutral-700",
        borderColor: "border-neutral-200",
        icon: "checkbox-outline",
        iconColor: COLORS.NEUTRAL[500],
        label: "Completed",
      };
    default:
      return {
        bgColor: "bg-neutral-50",
        textColor: "text-neutral-700",
        borderColor: "border-neutral-200",
        icon: "help-circle-outline",
        iconColor: COLORS.NEUTRAL[500],
        label: "Unknown",
      };
  }
};
