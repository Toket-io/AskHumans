import React, { useEffect, useState } from "react";
import Question from "./question";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import { useSession } from "next-auth/react";
import SuccessBanner from "./successBanner";
import SignInDisclosureBanner from "./signInDisclousureBanner";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import { CircularProgress } from "@mui/joy";

interface QuestionnaireProps {
  questions: {
    id: number;
    text: string;
    type: string;
    options?: string[];
  }[];
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ questions }) => {
  const { data: session } = useSession();
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [responseCount, setResponseCount] = useState<number | null>(null);
  const userId = session?.user?.name ?? null;

  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetch(`/api/answers/${userId}`)
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

  const handleChange = (id: number, answer: string) => {
    setAnswers({ ...answers, [id]: answer });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAnswered && userId) {
      setSubmitting(true);
      fetch(`/api/answers/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers, userId }),
      })
        .then((response) => {
          if (response.ok) {
            setIsAnswered(true);
            alert("¡Respuestas enviadas con éxito!");
          } else {
            alert("Error al enviar las respuestas.");
          }
        })
        .catch((error) => console.error("Error submitting answers:", error))
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
        // gap: "12px",
      }}
    >
      <Typography level="h3" mb={3}>
        Bienvenido a la primer encuesta de humanos verificados.
      </Typography>

      {/* Show the SignInDisclosureBanner if the user is unauthenticated */}
      {!userId && <SignInDisclosureBanner />}
      {/* Show the SuccessBanner if the quiz is already answered */}
      {isAnswered && <SuccessBanner totalResponses={responseCount} />}

      {questions.map((question) => (
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
    </Box>
  );
};

export default Questionnaire;
