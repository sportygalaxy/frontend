"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CounterStoreProvider } from "./CounterStoreProvider";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient();

export default function ReactQueryProvider({
  children,
}: PropsWithChildren<{}>) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <CounterStoreProvider> */}
      {children}
      {/* </CounterStoreProvider> */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
