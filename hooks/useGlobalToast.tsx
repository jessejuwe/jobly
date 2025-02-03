"use client";

import { toaster } from "@/components/ui/toaster";
import { ToastType } from "@/types/general";

type ToastProps = { title: string; type: ToastType; description?: string };

export const useGlobalToast = () => {
  const showToast = ({ title, type, description }: ToastProps) => {
    if (!toaster.isVisible("global-toast")) {
      toaster.create({
        id: "global-toast",
        description,
        title,
        type,
        ...(type !== "loading" && { duration: 3000 }),
      });
    }
  };

  const updateToast = ({ title, type, description }: ToastProps) => {
    if (toaster.isVisible("global-toast")) {
      toaster.update("global-toast", { title, type, description });
    } else {
      showToast({ title, type });
    }
  };

  const isVisible = toaster.isVisible("global-toast");
  const clearToast = () => toaster.dismiss("global-toast");

  const toast = { clearToast, isVisible };

  return { isVisible, showToast, updateToast, toast };
};
