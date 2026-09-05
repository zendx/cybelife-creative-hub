import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { getCspNonce } from "./lib/csp";

export const getRouter = () => {
  const queryClient = new QueryClient();
  const nonce = getCspNonce();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    ssr: nonce ? { nonce } : {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
