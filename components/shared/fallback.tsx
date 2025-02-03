"use client";

import React from "react";
import { AbsoluteCenter, Box, Spinner, Text, VStack } from "@chakra-ui/react";

export default function Fallback() {
  return (
    <Box
      className="w-full h-[80vh] bg-background relative"
      colorPalette="primary"
    >
      <AbsoluteCenter axis="both">
        <VStack>
          <Spinner
            color="colorPalette.500"
            borderWidth="4px"
            animationDuration="moderate"
            padding={6}
            size="xl"
          />
          <Text color="colorPalette.500">Loading...</Text>
        </VStack>
      </AbsoluteCenter>
    </Box>
  );
}
