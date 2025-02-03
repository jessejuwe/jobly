"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function useParams() {
  const router = useRouter();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const updateParams = (updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value.toString());
      else params.delete(key); // Remove if value is falsy
    });
    router.push(`?${params.toString()}`);
  };

  return { createQueryString, updateParams };
}
