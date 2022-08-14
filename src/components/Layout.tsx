import { FC, memo, PropsWithChildren } from "react";
import { AppShell, Container, Header } from "@mantine/core";
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
