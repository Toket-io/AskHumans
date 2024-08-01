import Head from "next/head";
import Questionnaire from "../components/questionnaire";
import Layout from "../components/layout";

export const questions = [
  {
    id: 1,
    text: "¿Crees que debería haber un partido de despedida para Ángel Di María?",
    type: "option",
    options: ["Sí 👍", "No 👎"],
  },
  {
    id: 2,
    text: "¿Dónde crees que debería celebrarse el partido de despedida?",
    type: "option",
    options: [
      "Monumental 🇦🇷",
      "Gigante de Arroyito 🇦🇷",
      "Bernabeu 🇪🇸",
      "Ninguno",
    ],
  },
];

export default function Home() {
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
          padding: "16px",
          boxSizing: "border-box",
        }}
      >
        <Questionnaire questions={questions} />
      </main>
    </Layout>
  );
}
