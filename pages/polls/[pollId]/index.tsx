import Head from "next/head";
import Questionnaire from "../../../components/questionnaire";
import { useRouter } from "next/router";
import Layout from "../../../components/layout";

export default function Polls() {
  const router = useRouter();
  const pollId: string = router.query.pollId as string;

  if (!pollId) {
    return <div>Poll not found</div>;
  }

  return (
    <Layout>
      <Head>
        <title>Ask Humans</title>
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
      </Head>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - var(--header-height))", // Adjust for the header height
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Questionnaire pollId={pollId} />
      </main>
    </Layout>
  );
}
