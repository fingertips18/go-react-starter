import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import ToastProvider from "@/providers/toast-provider.tsx";

import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "./providers/chakra-provider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider defaultTheme="dark">
          <ToastProvider>
            <App />
          </ToastProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
