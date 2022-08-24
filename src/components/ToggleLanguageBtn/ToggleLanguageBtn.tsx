import {
  Box,
  Center,
  Container,
  Kbd,
  SegmentedControl,
  Text,
  Tooltip,
} from "@mantine/core";

import useToggleLanguage from "@/hooks/useToggleLanguage";
import useTranslations from "@/hooks/useTranslations";

const TooltipLabel = () => {
  const t = useTranslations();
  return (
    <Container p={4}>
      <Text size="sm">
        {t.press} <Kbd>cmd</Kbd> {t.or} <Kbd>ctrl</Kbd> + <Kbd>shift</Kbd> +{" "}
        <Kbd>K</Kbd> {t.toToggleLanguage}
      </Text>
    </Container>
  );
};

const ToggleLanguageBtn = () => {
  const { currentLocale, toggleLanguage } = useToggleLanguage();

  return (
    <Tooltip label={<TooltipLabel />}>
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
    </Tooltip>
  );
};

export default ToggleLanguageBtn;
