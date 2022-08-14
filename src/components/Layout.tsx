import { FC, memo, PropsWithChildren } from "react";
import { AppShell, Container, Footer, Header } from "@mantine/core";
import Navbar from "./Navbar";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppShell
        header={
          <Header height={60}>
            <Navbar />
          </Header>
        }
        footer={
          <Footer height={60} p="md">
            Made with ❤️ by{" "}
            <a
              href="https://github.com/JorgeBdelaT"
              target="_blank"
              rel="noreferrer"
            >
              jorge
            </a>
          </Footer>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <Container size="md">{children}</Container>
      </AppShell>
    </>
  );
};

export default memo(Layout);
