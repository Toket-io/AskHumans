import Head from "next/head";
import Questionnaire from "../components/questionnaire";
import Layout from "../components/layout";

export const questions = [
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
    options: ["Monumental 🇦🇷", "Gigante de Arroyito 🇦🇷", "Bernabeu 🇪🇸", "None"],
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
        <h1>Bienvenido a la primer encuesta de humanos verificados.</h1>
        <h3>
          Para entregar los resultados es necesario que hagas Sign In con World
          ID
        </h3>
        <Questionnaire questions={questions} />
      </main>
    </Layout>
  );
}
