import { memo, useMemo, useState } from "react";
import {
  createStyles,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Text,
  Menu,
  Avatar,
  UnstyledButton,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChevronDown,
  IconLogout,
  IconSettings,
  IconSwitchHorizontal,
} from "@tabler/icons";
import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1,
    height: HEADER_HEIGHT,
  },

  logo: {
    cursor: "pointer",
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

const links = [
  {
    link: "/",
    label: "Home",
  },
  {
    link: "/tournaments",
    label: "Tournaments",
  },
];

const Navbar = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { classes, cx } = useStyles();
  const { route } = useRouter();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { data: session } = useSession();

  const items = useMemo(
    () =>
      links.map((link) => (
        <Link key={link.label} href={link.link}>
          <a
            className={cx(classes.link, {
              [classes.linkActive]: route === link.link,
            })}
            onClick={close}
          >
            {link.label}
          </a>
        </Link>
      )),
    [classes.link, classes.linkActive, close, cx, route]
  );

  return (
    <div className={classes.root}>
      <Container className={classes.header}>
        <Link href="/">
          <Text className={classes.logo} variant="gradient">
            Climbing Tournament
          </Text>
        </Link>
        <Group spacing={5} className={classes.links}>
          {items}
          {session?.user ? (
            <Menu
              width={260}
              position="bottom-end"
              transition="pop-top-right"
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, {
                    [classes.userActive]: userMenuOpened,
                  })}
                >
                  <Group spacing={7}>
                    <Avatar
                      src={session.user.image}
                      alt={session.user.email || "avatar"}
                      radius="xl"
                      size={20}
                    />
                    <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                      {session.user.email}
                    </Text>
                    <IconChevronDown size={12} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Settings</Menu.Label>
                <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>
                  Account settings
                </Menu.Item>
                <Menu.Item
                  icon={<IconSwitchHorizontal size={14} stroke={1.5} />}
                >
                  Change account
                </Menu.Item>
                <Menu.Item
                  onClick={() => signOut()}
                  icon={<IconLogout size={14} stroke={1.5} />}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Menu transition="pop-top-right" position="top-end">
              <Menu.Target>
                <Button
                  rightIcon={<IconChevronDown size={18} stroke={1.5} />}
                  ml={12}
                  style={{ height: 30 }}
                >
                  Sign in
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={() => signIn("google")}>
                  with Google
                </Menu.Item>
                <Menu.Item onClick={() => signIn("facebook")}>
                  with Facebook
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
              {session?.user ? (
                <div onClick={() => signOut()} className={classes.link}>
                  Logout
                </div>
              ) : (
                <>
                  <div
                    onClick={() => signIn("google")}
                    className={classes.link}
                  >
                    Sign in with Google
                  </div>
                  <div
                    onClick={() => signIn("facebook")}
                    className={classes.link}
                  >
                    Sign in with Facebook
                  </div>
                </>
              )}
            </Paper>
          )}
        </Transition>
      </Container>
    </div>
  );
};

export default memo(Navbar);
