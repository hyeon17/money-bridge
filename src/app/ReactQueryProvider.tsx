"use client";

import ButtonModal from "@/components/common/ButtonModal";
import useApiError from "@/hooks/useApiError";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren, useState } from "react";

export default function ReactQueryProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());
  const { handleError, isOpen, modalContents, setIsOpen } = useApiError();

  queryClient.setDefaultOptions({
    queries: { onError: (error: any) => handleError(error), retry: 1 },
    mutations: {
      onError: (error: any) => {
        handleError(error);
      },
      retry: 1,
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {isOpen && <ButtonModal modalContents={modalContents} isOpen={isOpen} setIsOpen={setIsOpen} />}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
