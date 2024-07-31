// pages/results.tsx
import React, { useEffect, useState } from "react";
import PieChart from "../components/pieChart";
import Head from "next/head";
import Layout from "../components/layout";

import { questions } from "./quiz";

interface AnswersData {
  yes: number;
  no: number;
}

const Results: React.FC = () => {
  const [data, setData] = useState<AnswersData | null>(null);

  useEffect(() => {
    fetch("/api/answers")
      .then((response) => response.json())
      .then((data) => setData(data.answers))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Head>
        <title>Quiz Results</title>
      </Head>
      <main
      // style={{
      //   // minHeight: "100vh",
      //   display: "flex",
      //   alignItems: "center",
      //   justifyContent: "center",
      //   backgroundColor: "#f0f0f0",
      // }}
      >
        <h1>Quiz Results</h1>

        {questions.map((question, index) => (
          <PieChart
            key={question.id}
            labels={question.options}
            data={data}
            title={question.text}
            chartId={question.id.toString()}
          />
        ))}
      </main>
    </Layout>
  );
};

export default Results;
