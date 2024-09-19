import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { formatDistance, subDays } from "date-fns";

export function calculateDateDistance(laterDate: Date, earlierDate: Date) {
  return formatDistance(laterDate, earlierDate, {
    addSuffix: true,
    includeSeconds: true,
  });
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function copyToClipboard(str: string) {
  await navigator.clipboard.writeText(str);
}
