import React, { useEffect, useState } from "react";
import Question from "./question";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import { useSession } from "next-auth/react";
import SuccessBanner from "./successBanner";
import SignInDisclosureBanner from "./signInDisclousureBanner";

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
  const [isAnswered, setIsAnswered] = useState(false);
  const userId = session?.user?.name ?? null;

  useEffect(() => {
    if (userId) {
      fetch(`/api/answers/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.answers) {
            setAnswers(data.answers);
            setIsAnswered(true);
          }
        })
        .catch((error) => console.error("Error fetching user answers:", error));
    }
  }, [userId]);

  const handleChange = (id: number, answer: string) => {
    setAnswers({ ...answers, [id]: answer });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAnswered && userId) {
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
            alert("Answers submitted successfully!");
          } else {
            alert("Failed to submit answers.");
          }
        })
        .catch((error) => console.error("Error submitting answers:", error));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: "16px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <Typography level="h3">
        Bienvenido a la primer encuesta de humanos verificados.
      </Typography>

      {/* Show the SignInDisclosureBanner if the quiz is user is unauthenticated */}
      {!userId && <SignInDisclosureBanner />}
      {/* Show the SuccessBanner if the quiz is already answered */}
      {isAnswered && <SuccessBanner />}

      {questions.map((question) => (
        <Question
          key={question.id}
          question={question}
          onChange={handleChange}
          disabled={isAnswered}
          value={answers[question.id] || ""}
        />
      ))}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
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
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default Questionnaire;
