import {
  ActionIcon,
  Container,
  Kbd,
  Text,
  Tooltip,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons";
import useThemeModeValue from "../../hooks/useThemeModeValue";

const TooltipLabel = (
  <Container p={4}>
    <Text size="sm">
      Press <Kbd>cmd</Kbd> or <Kbd>ctrl</Kbd> + <Kbd>j</Kbd> to toggle theme.
    </Text>
  </Container>
);

const ToggleThemeBtn = () => {
  const { toggleColorScheme } = useMantineColorScheme();
  const { themeModeValue } = useThemeModeValue();

  return (
    <Tooltip label={TooltipLabel}>
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
