import { JobEnum } from "@/types/jobs";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatJobType(jobType: JobEnum): string {
  return jobType
    ?.split("_") // Split by underscore
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    ?.join(" "); // Join with space
}
