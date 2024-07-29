import Head from "next/head";
import Questionnaire from "../components/questionnaire";
import Layout from "../components/layout";

const questions = [
  {
    id: 1,
    text: "Do you think there should be a farewell match for Angel Di María?",
    type: "option",
    options: ["Yes 👍", "No 👎"],
  },
  {
    id: 2,
    text: "Where do you think the farewell match should be held?",
    type: "option",
    options: [
      "Monumental 🇦🇷",
      "Cementerio de elefantes 🇦🇷",
      "Bernabeu 🇪🇸",
      "None",
    ],
  },
];

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Ask Humans</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f0f0",
        }}
      >
        <Questionnaire questions={questions} />
      </main>
    </Layout>
  );
}
