import {
  AppShell,
  Footer as FooterContainer,
  Header as HeaderContainer,
  MantineTheme,
  useMantineTheme,
} from "@mantine/core";
import { FC, ReactNode, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const getFooterColors = (theme: MantineTheme) =>
  theme.colorScheme === "dark" ? theme.colors.deepBlue[4] : theme.white;

const getHeaderColors = (theme: MantineTheme) =>
  theme.colorScheme === "dark" ? theme.colors.deepBlue[4] : theme.white;

const getMainColors = (theme: MantineTheme) =>
  theme.colorScheme === "dark"
    ? theme.colors.deepBlue[7]
    : theme.colors.gray[0];

const Layout: FC<LayoutProps> = ({ children }) => {
  const theme = useMantineTheme();

  return (
    <AppShell
      styles={{
        main: {
          background: getMainColors(theme),
        },
      }}
      // navbarOffsetBreakpoint="sm"
      // navbar={
      //   <Navbar
      //     p="md"
      //     hiddenBreakpoint="xl"
      //     hidden={!opened}
      //     width={{ sm: 200, lg: 300 }}
      //   >
      //     <Text>Application navbar</Text>
      //   </Navbar>
      // }
      footer={
        <FooterContainer
          height={40}
          styles={{
            root: {
              background: getFooterColors(theme),
            },
          }}
        >
          <Footer />
        </FooterContainer>
      }
      header={
        <HeaderContainer
          height={50}
          style={{
            backgroundColor: getHeaderColors(theme),
            boxShadow: "0px 0px 5px rgba(0, 0, 0, .25)",
          }}
        >
          <Header />
        </HeaderContainer>
      }
    >
      {children}
    </AppShell>
  );
};

export default Layout;
