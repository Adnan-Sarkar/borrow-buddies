import { format, formatDistanceToNow } from "date-fns";

export function formatDate(
  dateString: string,
  formatPattern: string = "MMM d"
): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    const now = new Date();
    const isLessThan24h = now.getTime() - date.getTime() < 24 * 60 * 60 * 1000;

    return isLessThan24h
      ? formatDistanceToNow(date, { addSuffix: true })
      : format(date, formatPattern);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Unknown date";
  }
}
