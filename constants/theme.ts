import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

import { primary, primaryDark, secondary } from "./colors";

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: { primary, primaryDark, secondary },
      fonts: {
        heading: { value: "var(--font-outfit)" },
        body: { value: "var(--font-outfit)" },
      },
    },
    semanticTokens: {
      colors: {
        primary: {
          solid: { value: "{colors.primary.500}" },
          contrast: { value: "{colors.primary.100}" },
          fg: { value: "{colors.primary.700}" },
          muted: { value: "{colors.primary.100}" },
          subtle: { value: "{colors.primary.200}" },
          emphasized: { value: "{colors.primary.300}" },
          focusRing: { value: "{colors.primary.500}" },
        },
        secondary: {
          solid: { value: "{colors.secondary.500}" },
          contrast: { value: "{colors.secondary.100}" },
          fg: { value: "{colors.secondary.700}" },
          muted: { value: "{colors.secondary.100}" },
          subtle: { value: "{colors.secondary.200}" },
          emphasized: { value: "{colors.secondary.300}" },
          focusRing: { value: "{colors.secondary.500}" },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
