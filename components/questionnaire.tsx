import React, { useState } from "react";
import Question from "./question";

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
      style={{ padding: "16px", maxWidth: "400px", margin: "0 auto" }}
    >
      {questions.map((question) => (
        <Question
          key={question.id}
          question={question}
          onChange={handleChange}
        />
      ))}
      <button
        type="submit"
        style={{
          marginTop: "16px",
          padding: "10px",
          width: "100%",
          backgroundColor: "#0070f3",
          color: "#fff",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default Questionnaire;
