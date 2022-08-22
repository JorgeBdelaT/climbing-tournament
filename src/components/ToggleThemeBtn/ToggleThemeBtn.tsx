import {
  ActionIcon,
  Container,
  Kbd,
  Text,
  Tooltip,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons";

const TooltipLabel = (
  <Container p={4}>
    <Text size="sm">
      Press <Kbd>cmd</Kbd> or <Kbd>ctrl</Kbd> + <Kbd>j</Kbd> to toggle theme.
    </Text>
  </Container>
);

const ToggleThemeBtn = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Tooltip label={TooltipLabel}>
      <ActionIcon
        color="primary"
        radius="xl"
        variant="light"
        onClick={() => toggleColorScheme()}
      >
        {dark ? <IconSun size={18} /> : <IconMoon size={18} />}
      </ActionIcon>
    </Tooltip>
  );
};

export default ToggleThemeBtn;
