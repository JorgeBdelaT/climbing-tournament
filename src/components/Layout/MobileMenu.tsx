import {
  Burger,
  createStyles,
  Divider,
  Drawer,
  Group,
  NavLink,
  Stack,
  ThemeIcon,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useSession, signIn, signOut } from "next-auth/react";
import { useMemo, useState } from "react";
import React from "react";
import Link from "next/link";
import {
  IconLogout,
  IconBrandGoogle,
  IconBrandFacebook,
  IconHome,
  IconTournament,
  IconLanguage,
} from "@tabler/icons";
import { useRouter } from "next/router";

import ToggleThemeBtn from "../ToggleThemeBtn/ToggleThemeBtn";
import useThemeModeValue from "../../hooks/useThemeModeValue";
import useTranslations from "../../hooks/useTranslations";
import useToggleLanguage from "../../hooks/useToggleLanguage";

const useStyles = createStyles((theme) => ({
  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
  drawerHeader: { marginBottom: theme.spacing.xl },
  drawerTitle: { fontSize: theme.fontSizes.xl, fontWeight: 600 },
  drawerBody: {
    background: theme.other.modeValue(
      theme,
      theme.white,
      theme.colors.deepBlue[7]
    ),
  },
  section: { margin: 0, padding: 0, marginBottom: theme.spacing.sm },
  sectionTitle: { marginBottom: theme.spacing.sm },
  sectionItem: {
    margin: 0,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.other.modeValue(theme, theme.black, theme.colors.gray[0]),
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    cursor: "pointer",

    "&:hover": {
      backgroundColor: theme.other.modeValue(
        theme,
        theme.colors.gray[0],
        theme.colors.deepBlue[4]
      ),
    },
  },
  link: {
    width: "unset",
    flexGrow: 1,
    padding: 0,

    "&:hover": {
      backgroundColor: "inherit",
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

const MobileMenu = () => {
  const { theme, themeModeValue } = useThemeModeValue();
  const [showMenu, setShowMenu] = useState(false);
  const { data: session } = useSession();
  const { classes, cx } = useStyles();
  const { route } = useRouter();
  const { toggleColorScheme } = useMantineColorScheme();
  const t = useTranslations();
  const { toggleLanguage } = useToggleLanguage();

  const links = useMemo(
    () => [
      {
        link: "/",
        label: t.home,
        icon: <IconHome size={18} />,
      },
      {
        link: "/tournaments",
        label: t.tournaments,
        icon: <IconTournament size={18} />,
      },
    ],
    [t]
  );

  return (
    <>
      <Burger
        className={classes.burger}
        opened={showMenu}
        onClick={() => setShowMenu((o) => !o)}
        size="sm"
        color={themeModeValue(theme.colors.violet[7], theme.colors.gray[6])}
      />

      <Drawer
        title={t.menu}
        opened={showMenu}
        onClose={() => setShowMenu(false)}
        padding="xl"
        position="right"
        size="xl"
        overlayOpacity={0.55}
        overlayBlur={3}
        classNames={{
          title: classes.drawerTitle,
          header: classes.drawerHeader,
          drawer: classes.drawerBody,
        }}
      >
        <Stack className={classes.section} spacing={0}>
          <Title className={classes.sectionTitle} order={5}>
            {t.navigation}
          </Title>
          {links.map(({ label, link, icon }) => (
            <Group
              key={label}
              className={cx(classes.sectionItem, {
                [classes.linkActive]: route === link,
              })}
            >
              <ThemeIcon variant="light" radius="xl" color="violet">
                {icon}
              </ThemeIcon>
              <Link href={link} passHref>
                <NavLink
                  className={classes.link}
                  component="a"
                  label={label}
                  onClick={() => setShowMenu(false)}
                />
              </Link>
            </Group>
          ))}
          <Divider my="sm" />
        </Stack>

        <Stack className={classes.section} spacing={0}>
          <Title className={classes.sectionTitle} order={5}>
            {t.settings}
          </Title>
          <Group
            className={classes.sectionItem}
            onClick={() => toggleColorScheme()}
          >
            <ToggleThemeBtn /> {t.toggleTheme}
          </Group>
          <Group className={classes.sectionItem} onClick={toggleLanguage}>
            <ThemeIcon variant="light" radius="xl" color="violet">
              <IconLanguage size={18} />
            </ThemeIcon>
            {t.toggleLanguage}
          </Group>
          <Divider my="sm" />
        </Stack>

        <Stack className={classes.section} spacing={0}>
          <Title className={classes.sectionTitle} order={5}>
            {t.account}
          </Title>
          {session?.user ? (
            <Group className={classes.sectionItem} onClick={() => signOut()}>
              <ThemeIcon variant="light" radius="xl" color="violet">
                <IconLogout size={18} />
              </ThemeIcon>
              {t.signOut}
            </Group>
          ) : (
            <>
              <Group
                className={classes.sectionItem}
                onClick={() => signIn("google")}
              >
                <ThemeIcon variant="light" radius="xl" color="violet">
                  <IconBrandGoogle size={18} />
                </ThemeIcon>
                {t.signInwithGoogle}
              </Group>

              <Group
                className={classes.sectionItem}
                onClick={() => signIn("facebook")}
              >
                <ThemeIcon variant="light" radius="xl" color="violet">
                  <IconBrandFacebook stroke={1.5} size={18} />
                </ThemeIcon>
                {t.signInwithFacebook}
              </Group>
            </>
          )}
        </Stack>
      </Drawer>
    </>
  );
};

export default MobileMenu;
