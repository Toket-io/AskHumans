import React, { useEffect, useState } from "react";
import PieChart from "../../../components/pieChart";
import Head from "next/head";
import Layout from "../../../components/layout";
import CircularProgress from "@mui/joy/CircularProgress";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import { useRouter } from "next/router";

interface AnswersData {
  labels: string[];
  data: number[];
}

interface PollData {
  answers: { [key: number]: AnswersData };
  count: number;
}

const Results: React.FC = () => {
  const router = useRouter();
  const { pollId } = router.query;

  const [data, setData] = useState<{ [key: number]: AnswersData } | null>(null);
  const [responseCount, setResponseCount] = useState<number | null>(null);

  useEffect(() => {
    if (!pollId) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/polls/${pollId}/answers`);
        const result: PollData = await response.json();
        setData(result.answers);
        setResponseCount(result.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [pollId]);

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

        {Object.entries(data).map(([questionId, answerData]) => (
          <PieChart
            key={questionId}
            labels={answerData.labels}
            data={answerData.data}
            title={`Question ${questionId}`}
            chartId={questionId}
          />
        ))}
      </main>
    </Layout>
  );
};

export default Results;
