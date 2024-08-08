import React, { useEffect, useState } from "react";
import Question from "./question";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import { useSession } from "next-auth/react";
import SuccessBanner from "./successBanner";
import SignInDisclosureBanner from "./signInDisclousureBanner";
import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import { CircularProgress } from "@mui/joy";
import { track } from "@vercel/analytics";
import { Poll } from "../lib/types";
import Snackbar from "./snackbar";

interface QuestionnaireProps {
  pollId: string;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ pollId }) => {
  const { data: session } = useSession();
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [poll, setPoll] = useState<Poll | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [responseCount, setResponseCount] = useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "warning" | "error"
  >("success");
  const userId = session?.user?.name ?? null;

  useEffect(() => {
    fetchPoll();
    if (userId) {
      setLoading(true);
      fetch(`/api/polls/${pollId}/answers/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.answers) {
            setAnswers(data.answers);
            setResponseCount(data.count);
            setIsAnswered(true);
          }
        })
        .catch((error) => console.error("Error fetching user answers:", error))
        .finally(() => setLoading(false));
    }
  }, [userId]);

  const fetchPoll = async () => {
    try {
      const response = await fetch(`/api/polls/${pollId}`);
      const data = await response.json();
      console.log("response", data);
      setPoll(data);
    } catch (error) {
      console.error("Error fetching poll:", error);
    }
  };

  const handleChange = (id: number, answer: string) => {
    setAnswers({ ...answers, [id]: answer });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAnswered && userId) {
      setSubmitting(true);
      fetch(`/api/polls/${pollId}/answers/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers, userId }),
      })
        .then((response) => {
          if (response.ok) {
            setIsAnswered(true);
            setSnackbarMessage("¡Respuestas enviadas con éxito!");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
          } else {
            setSnackbarMessage("Error al enviar las respuestas.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
          }
        })
        .catch((error) => {
          console.error("Error submitting answers:", error);
          setSnackbarMessage("Error al enviar las respuestas.");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        })
        .finally(() => setSubmitting(false));
    }
  };

  if (loading) {
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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        padding: "16px",
        maxWidth: "600px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <Typography level="h3" mb={3}>
        Bienvenido a la primer encuesta de humanos verificados.
      </Typography>
      {!userId && <SignInDisclosureBanner />}
      {isAnswered && <SuccessBanner totalResponses={responseCount} />}
      {poll != null &&
        poll.questions.map((question) => (
          <FormControl key={question.id}>
            <Question
              question={question}
              onChange={handleChange}
              disabled={isAnswered}
              value={answers[question.id] || ""}
            />
            <FormHelperText></FormHelperText>
          </FormControl>
        ))}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          type="submit"
          sx={{
            width: "100%",
            backgroundColor: isAnswered ? "grey" : "primary.main",
            color: "white",
            padding: "10px",
            borderRadius: "md",
            "&:hover": {
              backgroundColor: isAnswered ? "grey" : "primary.dark",
            },
          }}
          disabled={isAnswered || !userId}
          loading={submitting}
        >
          Enviar
        </Button>
      </Box>
      <Typography level="body-sm" mt={3} textAlign={"center"}>
        Developed by{" "}
        <a
          href="https://blockchainrd.xyz"
          style={{ color: "gray" }}
          onClick={(e) => {
            track("blockchainrd_link_click");
          }}
        >
          Blockchain R&D
        </a>
      </Typography>

      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        autoHideDuration={6000}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default Questionnaire;
