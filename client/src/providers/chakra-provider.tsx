import { ChakraProvider as Provider } from "@chakra-ui/react";
import { ReactNode } from "react";

import { theme } from "@/lib/theme.ts";

import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode-provider";

interface ChakraProviderProps extends ColorModeProviderProps {
  children: ReactNode;
}

export function ChakraProvider({
  children,
  ...props
}: Readonly<ChakraProviderProps>) {
  return (
    <Provider value={theme}>
      <ColorModeProvider {...props}>{children}</ColorModeProvider>
    </Provider>
  );
}
