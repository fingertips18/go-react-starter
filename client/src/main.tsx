import { ChakraProvider } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import { theme } from "./lib/theme.ts";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>
);
