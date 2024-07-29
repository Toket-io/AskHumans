import React, { useState } from "react";
import Question from "./Question";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import SignInButton from "./SignInButton"; // Import the new SignInButton component

interface QuestionnaireProps {
  questions: {
    id: number;
    text: string;
    type: string;
    options?: string[];
  }[];
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ questions }) => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const handleChange = (id: number, answer: string) => {
    setAnswers({ ...answers, [id]: answer });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Answers:", answers);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ padding: "16px", maxWidth: "600px", margin: "0 auto" }}
    >
      {questions.map((question) => (
        <Question
          key={question.id}
          question={question}
          onChange={handleChange}
        />
      ))}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button
          type="submit"
          sx={{
            width: "100%",
            backgroundColor: "primary.main",
            color: "white",
            padding: "10px",
            borderRadius: "md",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Submit
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <SignInButton />
      </Box>
    </form>
  );
};

export default Questionnaire;
