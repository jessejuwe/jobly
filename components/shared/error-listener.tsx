"use client";

import { useEffect } from "react";

import { useHandleError } from "@/hooks/useHandleError";
import { Error } from "@/types/general";
import { errorEmitter } from "@/utils/eventEmitter";

const ErrorListener: React.FC = () => {
  const handleError = useHandleError();

  useEffect(() => {
    const onError = (error: Error) => handleError(error);

    errorEmitter.on("error", onError);

    return () => {
      errorEmitter.off("error", onError);
    };
  }, [handleError]);

  return null;
};

export default ErrorListener;
