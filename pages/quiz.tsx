import Head from "next/head";
import Questionnaire from "../components/questionnaire";

const questions = [
  { id: 1, text: "What is your name?", type: "text" },
  {
    id: 2,
    text: "What is your favorite color?",
    type: "option",
    options: ["Red", "Blue", "Green", "Yellow"],
  },
  { id: 3, text: "Describe yourself in one sentence.", type: "text" },
];

export default function Home() {
  return (
    <div>
      <Head>
        <title>Questionnaire App</title>
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
    </div>
  );
}
