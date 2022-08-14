import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const TournamentPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Tournament</title>
        <meta name="description" content="Climbing Tournaments" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>tournament {id}</div>
    </>
  );
};

export default TournamentPage;
