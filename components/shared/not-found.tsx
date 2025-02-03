"use client";

import React from "react";
import { AbsoluteCenter, VStack } from "@chakra-ui/react";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layouts/main-layout";
import { useRedirect } from "@/hooks/useRedirect";

export default function NotFound() {
  const { goBack } = useRedirect();

  return (
    <MainLayout>
      <AbsoluteCenter>
        <VStack align="center" gap={4}>
          <h2 className="text-lg font-medium">Not Found</h2>
          <p className="text-error">This page currently doesn't exist.</p>
          <Button className="btn border border-green-500" onClick={goBack}>
            <ChevronLeft /> Back
          </Button>
        </VStack>
      </AbsoluteCenter>
    </MainLayout>
  );
}
