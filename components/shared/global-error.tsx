"use client";

import React from "react";

import { Button } from "@/components/ui/button";

type Props = { error: Error & { digest?: string }; reset: () => void };

const GlobalError: React.FC<Props> = ({ error, reset }) => {
  return (
    <div className="w-full h-screen bg-transparent flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-lg font-medium">Something went wrong!</h2>
        <h5 className="text-error">{error.message}</h5>
        <Button
          className="btn border border-green-500"
          onClick={reset}
          variant="outline"
        >
          Try again
        </Button>
      </div>
    </div>
  );
};

export default GlobalError;
