import { ColorScheme, MantineThemeOverride } from "@mantine/core";

import { Tuple, DefaultMantineColor } from "@mantine/core";

type ExtendedCustomColors = "deepBlue" | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }
}

const baseTheme: MantineThemeOverride = {
  colorScheme: "light",
  cursorType: "pointer",
  colors: {
    deepBlue: [
      "#323A43",
      "#2C343F",
      "#262F3B",
      "#202B38",
      "#1A2636",
      "#142334",
      "#0F1F33",
      "#111C2B",
      "#111A24",
      "#11171F",
    ],
  },
  dateFormat: "DD MMMM, YYYY",
  primaryColor: "violet",
  primaryShade: { dark: 5, light: 7 },
  loader: "bars",
  components: {
    Card: {
      styles: (theme) => ({
        root: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.deepBlue[4]
              : theme.white,
        },
      }),
    },
  },
  other: {},
};

const getTheme = (colorScheme: ColorScheme): MantineThemeOverride => ({
  ...baseTheme,
  colorScheme,
});

export default getTheme;
