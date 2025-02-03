"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { getQueryClient } from "@/app/get-query-client";
import { Provider as ChakraProvider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import { ErrorListener, ScrollToTop } from "@/components/shared";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Toaster />
        <ErrorListener />
        <ScrollToTop />
        {children}
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
