import React, { useEffect, useState } from "react";
import PieChart from "../components/pieChart";
import Head from "next/head";
import Layout from "../components/layout";
import CircularProgress from "@mui/joy/CircularProgress";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

import { questions } from "."; // Adjust the import based on your project structure

interface AnswersData {
  labels: string[];
  data: number[];
}

const Results: React.FC = () => {
  const [data, setData] = useState<{ [key: number]: AnswersData } | null>(null);
  const [responseCount, setResponseCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/answers")
      .then((response) => response.json())
      .then((data) => {
        setData(data.answers);
        setResponseCount(data.count);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Resultados</title>
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
        <Typography level="h1" mb={2}>
          Resultados
        </Typography>

        {responseCount !== null && (
          <Typography level="h3" mb={3}>
            {responseCount} humanos ya respondieron esta encuesta
          </Typography>
        )}

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
