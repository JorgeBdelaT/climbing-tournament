import {
  ActionIcon,
  Container,
  Kbd,
  Text,
  Tooltip,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons";
import useThemeModeValue from "@/hooks/useThemeModeValue";
import useTranslations from "@/hooks/useTranslations";

const TooltipLabel = () => {
  const t = useTranslations();
  return (
    <Container p={4}>
      <Text size="sm">
        {t.press} <Kbd>cmd</Kbd> {t.or} <Kbd>ctrl</Kbd> + <Kbd>j</Kbd>{" "}
        {t.toToggleTheme}
      </Text>
    </Container>
  );
};

const ToggleThemeBtn = () => {
  const { toggleColorScheme } = useMantineColorScheme();
  const { themeModeValue } = useThemeModeValue();

  return (
    <Tooltip label={<TooltipLabel />}>
      <ActionIcon
        color="primary"
        radius="xl"
        variant="light"
        onClick={() => toggleColorScheme()}
      >
        {themeModeValue(<IconMoon size={18} />, <IconSun size={18} />)}
      </ActionIcon>
    </Tooltip>
  );
};

export default ToggleThemeBtn;
