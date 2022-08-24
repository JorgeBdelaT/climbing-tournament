import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import CreateTournament from "@/components/tournaments/CreateTournament";
import { unstable_getServerSession as getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

// TODO: add notification after redirect
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

const NewTournament: NextPage = () => {
  return (
    <>
      <Head>
        <title>New Tournament</title>
        <meta name="description" content="Create new climbing tournament" />
        <link rel="icon" href="/favicon.ico?" />
      </Head>
      <section>
        <CreateTournament />
      </section>
    </>
  );
};

export default NewTournament;
