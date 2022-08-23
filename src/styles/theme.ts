import {
  ColorScheme,
  MantineThemeOverride,
  Tuple,
  DefaultMantineColor,
  MantineTheme,
} from "@mantine/core";

import themeModeValue from "../utils/themeModeValue";

type ExtendedCustomColors = "deepBlue" | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }
  export interface MantineThemeOther {
    modeValue: (theme: MantineTheme, lightValue: any, darkValue: any) => any;
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
          backgroundColor: themeModeValue(
            theme,
            theme.white,
            theme.colors.deepBlue[4]
          ),
        },
      }),
    },
  },
  other: {
    modeValue: themeModeValue,
  },
};

const getTheme = (colorScheme: ColorScheme): MantineThemeOverride => ({
  ...baseTheme,
  colorScheme,
});

export default getTheme;
