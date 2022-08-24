import { Box, Center, SegmentedControl } from "@mantine/core";
import { useRouter } from "next/router";

type LocaleOptions = "es" | "en";

// TODO: Use cookie or localstorage
const ToggleLanguageBtn = () => {
  const router = useRouter();
  const { route, locale, locales } = router;
  console.log({ locales });

  const handleLanguageChange = (v: LocaleOptions) => {
    router.push(route, route, { locale: v });
  };

  return (
    <SegmentedControl
      onChange={handleLanguageChange}
      value={locale}
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
