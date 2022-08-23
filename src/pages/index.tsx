import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";

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
        <Card shadow="sm" p="lg" radius="md" sx={{ width: 400 }}>
          <Card.Section>
            <Image
              src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
              height={160}
              alt="Norway"
            />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>Norway Fjord Adventures</Text>
            <Badge color="pink" variant="light">
              On Sale
            </Badge>
          </Group>

          <Text size="sm" color="dimmed">
            With Fjord Tours you can explore more of the magical fjord
            landscapes with tours and activities on and around the fjords of
            Norway
          </Text>

          <Button variant="light" fullWidth mt="md" radius="md">
            Book classic tour now
          </Button>
        </Card>

        {session && <h2>Hello {session.user?.email}</h2>}
        {data ? <p>{data.greeting}</p> : <p>Loading..</p>}
      </main>
    </>
  );
};

export default Home;
