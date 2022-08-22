import type { NextPage } from "next";
import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";
import { trpc } from "../utils/trpc";
import ToggleThemeBtn from "../components/ToggleThemeBtn/ToggleThemeBtn";
import { Button, Group } from "@mantine/core";

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { data } = trpc.useQuery(["example.hello", { text: "from tRPC" }]);
  const examples = trpc.useQuery(["example.getAll"]);

  console.log({ session });
  console.log({ examples });

  return (
    <>
      <Head>
        <title>Climbing Tournament</title>
        <meta
          name="description"
          content="Create all kind of climbing tournaments"
        />
        <link rel="icon" href="/favicon.ico?" />
      </Head>
      <main>
        <Group spacing={24}>
          <ToggleThemeBtn />
          {!session ? (
            <Button onClick={() => signIn()}>Sign in</Button>
          ) : (
            <Button onClick={() => signOut()}>Sign out</Button>
          )}
        </Group>
        {session && <h2>Hello {session.user?.email}</h2>}
        {data ? <p>{data.greeting}</p> : <p>Loading..</p>}
      </main>
    </>
  );
};

export default Home;
