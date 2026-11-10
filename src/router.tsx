import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { getCspNonce } from "./lib/csp";

export const getRouter = () => {
  const nonce = getCspNonce();

  const router = createRouter({
    routeTree,
    trailingSlash: "never",
    ssr: nonce ? { nonce } : {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
