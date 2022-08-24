import { Box, Center, SegmentedControl } from "@mantine/core";

import useToggleLanguage from "../../hooks/useToggleLanguage";

// TODO: Use cookie or localstorage
const ToggleLanguageBtn = () => {
  const { currentLocale, toggleLanguage } = useToggleLanguage();

  return (
    <SegmentedControl
      onChange={toggleLanguage}
      value={currentLocale}
      styles={(theme) => ({
        root: {
          background: theme.other.modeValue(
            theme,
            theme.colors.gray[1],
            theme.colors.deepBlue[7]
          ),
        },
        controlActive: {
          background: theme.other.modeValue(
            theme,
            theme.white,
            theme.colors.deepBlue[3]
          ),
        },
      })}
      size="xs"
      data={[
        {
          label: (
            <Center>
              🇪🇸
              <Box ml={10}>ES</Box>
            </Center>
          ),
          value: "es",
        },
        {
          label: (
            <Center>
              🇺🇸
              <Box ml={10}>EN</Box>
            </Center>
          ),
          value: "en",
        },
      ]}
    />
  );
};

export default ToggleLanguageBtn;
