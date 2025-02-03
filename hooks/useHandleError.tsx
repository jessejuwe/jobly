"use client";

import { useCallback } from "react";

import { useGlobalToast } from "./useGlobalToast";
import { Error } from "@/types/general";

export const useHandleError = () => {
  const { updateToast } = useGlobalToast();

  const handleError = useCallback((error: Error) => {
    let message = error?.message;

    const condition = navigator?.onLine ? "online" : "offline";
    const status = error?.response?.status;
    const data = error?.response?.data;
    const isString = typeof data?.message === "string";

    // If user is offline
    if (condition === "offline") {
      message = "Please check your internet connection.";
    }

    // If user is un-authenticated
    if (status === 401) {
      message = "Your session has expired.";
      updateToast({ title: "Unauthenticated", type: "error", description: message }); // prettier-ignore
      return;
    }

    // If api responds with error
    if (data) {
      const errorMessage = isString ? data?.message : data?.message?.[0]; // prettier-ignore
      if (errorMessage) message = errorMessage as string;
    }

    updateToast({
      title: "Error found",
      type: "error",
      description: message || "Something went wrong!",
    });
  }, []);

  return handleError;
};
