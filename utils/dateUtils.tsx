import { subDays, format } from "date-fns";

export function substractDaysFromTodaysDate(DAY_COUNT: number) {
  // Get today's date and subtract count days
  const substractedDayAgo = subDays(new Date(), DAY_COUNT);
  return format(substractedDayAgo, "yyyy-MM-dd"); // Format the date as desired
}
