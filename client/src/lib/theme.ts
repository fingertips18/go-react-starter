import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/react";
import "@fontsource-variable/montserrat";

export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        backgroundColor: mode("light.background", "dark.background")(props),
      },
    }),
  },
  fonts: {
    heading: `'Montserrat Variable', sans-serif`,
    body: `'Montserrat Variable', sans-serif`,
  },
  colors: {
    light: {
      foreground: "#090F17",
      background: "#F0F5FA",
      primary: "#457FC4",
      secondary: "#8AB0DE",
      accent: "#5C94D7",
    },
    dark: {
      foreground: "#E9EFF6",
      background: "#050A0F",
      primary: "#3B74BA",
      secondary: "#214673",
      accent: "#2860A4",
    },
    go: "#00ADD8",
  },
});
