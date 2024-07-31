"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { CounterStoreProvider } from "./CounterStoreProvider";

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      {/* <CounterStoreProvider> */}
        {children}
      {/* </CounterStoreProvider> */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
