import { MantineTheme } from "@mantine/core";

const themeModeValue = (theme: MantineTheme, lightValue: any, darkValue: any) =>
  theme.colorScheme === "dark" ? darkValue : lightValue;

export default themeModeValue;
