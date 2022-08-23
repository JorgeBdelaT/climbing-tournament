import {
  AppShell,
  Footer as FooterContainer,
  Header as HeaderContainer,
} from "@mantine/core";
import { FC, ReactNode } from "react";
import useThemeModeValue from "../../hooks/useThemeModeValue";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { theme, themeModeValue } = useThemeModeValue();

  return (
    <AppShell
      styles={{
        main: {
          background: themeModeValue(
            theme.colors.gray[0],
            theme.colors.deepBlue[7]
          ),
          paddingLeft: "10%",
          paddingRight: "10%",
          paddingTop: 90,
        },
      }}
      footer={
        <FooterContainer
          height={40}
          styles={{
            root: {
              background: themeModeValue(theme.white, theme.colors.deepBlue[4]),
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
            backgroundColor: themeModeValue(
              theme.white,
              theme.colors.deepBlue[4]
            ),
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
