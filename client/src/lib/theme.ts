import { createSystem, defaultConfig } from "@chakra-ui/react";
import "@fontsource-variable/montserrat";

export const theme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        light: {
          foreground: {
            value: "#090F17",
          },
          background: {
            value: "#F0F5FA",
          },
          primary: {
            value: "#457FC4",
          },
          secondary: {
            value: "#8AB0DE",
          },
          accent: {
            value: "#5C94D7",
          },
        },
        dark: {
          foreground: {
            value: "#E9EFF6",
          },
          background: {
            value: "#050A0F",
          },
          primary: {
            value: "#3B74BA",
          },
          secondary: {
            value: "#214673",
          },
          accent: {
            value: "#2860A4",
          },
        },
        go: {
          value: "#00ADD8",
        },
        goOpacity: {
          value: "rgba(0, 173, 216, 0.1)",
        },
      },
      fonts: {
        heading: {
          value: `'Montserrat Variable', sans-serif`,
        },
        body: {
          value: `'Montserrat Variable', sans-serif`,
        },
      },
    },
  },
});
