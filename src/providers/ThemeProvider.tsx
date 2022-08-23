import {
  ColorScheme,
  ColorSchemeProvider,
  Global,
  MantineProvider,
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { setCookie } from "cookies-next";
import { FC, ReactNode, useState } from "react";
import getTheme from "../styles/theme";

interface ThemeProviderProps {
  children: ReactNode;
  defaultColorScheme: ColorScheme;
}

const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  defaultColorScheme,
}) => {
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(defaultColorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookie("prefered-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "none",
      secure: true,
    });
  };

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={getTheme(colorScheme)}
      >
        <Global
          styles={(theme) => ({
            "*, *::before, *::after": {
              boxSizing: "border-box",
            },
            body: {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.deepBlue[7]
                  : theme.colors.gray[0],
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.gray[0]
                  : theme.black,
            },
          })}
        />
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default ThemeProvider;
