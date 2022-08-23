import {
  Burger,
  Button,
  Container,
  Group,
  MediaQuery,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import ToggleThemeBtn from "../ToggleThemeBtn/ToggleThemeBtn";

const Header = () => {
  const theme = useMantineTheme();
  const [showMenu, setShowMenu] = useState(false);
  const { data: session } = useSession();

  return (
    <Container sx={{ height: "100%" }} p="xs">
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={showMenu}
            onClick={() => setShowMenu((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <Text>Climbing Tournament</Text>

        <Group spacing={24} p="xs">
          <ToggleThemeBtn />
          {!session ? (
            <Button onClick={() => signIn()}>Sign in</Button>
          ) : (
            <Button onClick={() => signOut()}>Sign out</Button>
          )}
          <Button loading>loading</Button>
        </Group>
      </div>
    </Container>
  );
};

export default Header;
