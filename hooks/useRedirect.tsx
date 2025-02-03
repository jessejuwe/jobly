"use client";

import { useRouter } from "next/navigation";

export const useRedirect = () => {
  const router = useRouter();

  function redirectTo(path: string) {
    if (typeof window !== "undefined") {
      // Safe to use window or browser APIs
      router.push(path);
    }
  }

  function goBack() {
    if (typeof window !== "undefined") {
      // Safe to use window or browser APIs
      router.back();
    }
  }

  return { goBack, redirectTo };
};
