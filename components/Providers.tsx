"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "./ui/toaster";

const queryClient = new QueryClient();
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
