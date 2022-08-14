import { Text, Title } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "..//utils/trpc";

const Home: NextPage = () => {
  const { data } = trpc.useQuery(["example.hello", { text: "from tRPC" }]);
  const examples = trpc.useQuery(["example.getAll"]);

  console.log({ examples });

  return (
    <>
      <Head>
        <title>Climbing Tournament</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <Title order={1}>Welcome to Climbing Tournament</Title>

        <div className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full">
          {data ? <p>{data.greeting}</p> : <p>Loading..</p>}
        </div>
      </section>
    </>
  );
};

export default Home;
