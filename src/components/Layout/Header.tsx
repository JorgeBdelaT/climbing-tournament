import {
  Button,
  Container,
  createStyles,
  Group,
  Menu,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IconLogout,
  IconBrandGoogle,
  IconBrandFacebook,
  IconChevronDown,
} from "@tabler/icons";

import MobileMenu from "./MobileMenu";
import ToggleThemeBtn from "@/components/ToggleThemeBtn/ToggleThemeBtn";
import ToggleLanguageBtn from "@/components/ToggleLanguageBtn/ToggleLanguageBtn";
import useTranslations from "@/hooks/useTranslations";

const useStyles = createStyles((theme) => ({
  header: {
    height: "100%",
    padding: theme.spacing.xl,
    display: "flex",
    alignItems: "center",
  },
  container: {
    width: "100%",
  },
  logoContainer: {
    cursor: "pointer",
    padding: 0,
    margin: 0,
  },
  actionsContainer: {
    padding: theme.spacing.xs,
    [theme.fn.smallerThan("sm")]: { display: "none" },
  },
  button: {
    height: 30,
  },
  dropdown: {
    background: theme.other.modeValue(
      theme,
      theme.white,
      theme.colors.deepBlue[4]
    ),
  },
}));

const Header = () => {
  const { data: session } = useSession();
  const { classes } = useStyles();
  const t = useTranslations();

  return (
    <Container className={classes.header} fluid>
      <Group className={classes.container} position="apart">
        <Link href="/">
          <Group className={classes.logoContainer} spacing={8}>
            <Image
              src="/favicon-32x32.png"
              alt="App logo"
              width="24"
              height="24"
            />
            <Title order={3}>Climbing Tournament</Title>
          </Group>
        </Link>
        <Group className={classes.actionsContainer} spacing={24}>
          <ToggleThemeBtn />
          <ToggleLanguageBtn />
          {session ? (
            <Button
              leftIcon={<IconLogout size={18} />}
              onClick={() => signOut()}
              variant="light"
              className={classes.button}
            >
              {t.signOut}
            </Button>
          ) : (
            <Menu
              transition="pop-top-right"
              position="top-end"
              classNames={{ dropdown: classes.dropdown }}
            >
              <Menu.Target>
                <Button
                  rightIcon={<IconChevronDown size={18} stroke={1.5} />}
                  className={classes.button}
                >
                  {t.signIn}
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => signIn("google")}
                  icon={
                    <ThemeIcon variant="light" radius="xl" color="violet">
                      <IconBrandGoogle size={18} />
                    </ThemeIcon>
                  }
                >
                  {t.withGoogle}
                </Menu.Item>
                <Menu.Item
                  onClick={() => signIn("facebook")}
                  icon={
                    <ThemeIcon variant="light" radius="xl" color="violet">
                      <IconBrandFacebook stroke={1.5} size={18} />
                    </ThemeIcon>
                  }
                >
                  {t.withFacebook}
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>
      </Group>
      <MobileMenu />
    </Container>
  );
};

export default Header;
