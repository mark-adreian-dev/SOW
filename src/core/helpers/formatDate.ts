import { format } from "date-fns";

export type DateFormatType = "default" | "short" | "long" | "time" | "datetime" | "iso";

/**
 * Format date using predefined formats
 */
export function formatDate(dateInput: Date | string | number, type: DateFormatType = "default"): string {
  const date = new Date(dateInput);

  if (isNaN(date.getTime())) return "Invalid date";

  const formats: Record<DateFormatType, string> = {
    default: "yyyy-MM-dd",
    short: "MM/dd/yyyy",
    long: "MMMM dd, yyyy",
    time: "hh:mm a",
    datetime: "MMMM dd, yyyy hh:mm a",
    iso: "yyyy-MM-dd'T'HH:mm:ss",
  };

  return format(date, formats[type]);
}
