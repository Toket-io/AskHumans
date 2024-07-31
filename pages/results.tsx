import React, { useEffect, useState } from "react";
import PieChart from "../components/pieChart";
import Head from "next/head";
import Layout from "../components/layout";

import { questions } from ".";

interface AnswersData {
  labels: string[];
  data: number[];
}

const Results: React.FC = () => {
  const [data, setData] = useState<{ [key: number]: AnswersData } | null>(null);

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
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        <h1>Quiz Results</h1>

        {questions.map((question) => (
          <PieChart
            key={question.id}
            labels={data[question.id].labels}
            data={data[question.id].data}
            title={question.text}
            chartId={question.id.toString()}
          />
        ))}
      </main>
    </Layout>
  );
};

export default Results;
