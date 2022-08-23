import { useCallback } from "react";
import { useMantineTheme } from "@mantine/core";

import _themeModeValue from "@/utils/themeModeValue";

const useThemeModeValue = () => {
  const theme = useMantineTheme();

  const themeModeValue = useCallback(
    (lightValue: any, darkValue: any) =>
      _themeModeValue(theme, lightValue, darkValue),
    [theme]
  );

  return { themeModeValue, theme };
};

export default useThemeModeValue;
