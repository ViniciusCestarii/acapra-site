"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { client } from "../client/client.gen";

const queryClient = new QueryClient();

client.setConfig({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
});

export function TanstackQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
