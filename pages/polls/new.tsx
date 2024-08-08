import React, { useState } from "react";
import Head from "next/head";
import Layout from "../../components/layout";
import { NewPoll, Question } from "../../lib/types";
import { Box, Button, Container, Input, Typography } from "@mui/joy";

export default function NewPollPage() {
  const [pollTitle, setPollTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, text: "", type: "option", options: [""], multipleAnswers: false },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        text: "",
        type: "option",
        options: [""],
        multipleAnswers: false,
      },
    ]);
  };

  const updateQuestion = (index: number, updatedQuestion: Question) => {
    const newQuestions = questions.map((question, i) =>
      i === index ? updatedQuestion : question
    );
    setQuestions(newQuestions);
  };

  const handleOptionChange = (
    qIndex: number,
    oIndex: number,
    value: string
  ) => {
    const updatedQuestion = { ...questions[qIndex] };
    updatedQuestion.options[oIndex] = value;
    updateQuestion(qIndex, updatedQuestion);
  };

  const addOption = (qIndex: number) => {
    const updatedQuestion = { ...questions[qIndex] };
    updatedQuestion.options.push("");
    updateQuestion(qIndex, updatedQuestion);
  };

  const deleteOption = (qIndex: number, oIndex: number) => {
    const updatedQuestion = { ...questions[qIndex] };
    updatedQuestion.options.splice(oIndex, 1);
    updateQuestion(qIndex, updatedQuestion);
  };

  const deleteQuestion = (qIndex: number) => {
    const newQuestions = questions.filter((_, i) => i !== qIndex);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newPoll: NewPoll = { title: pollTitle, questions };
    // Call your API to save the new poll
    console.log("New Poll:", newPoll);
  };

  return (
    <Layout>
      <Head>
        <title>New Poll</title>
      </Head>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "calc(100vh - var(--header-height))", // Adjust for the header height
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Typography level="h1">Create a New Poll</Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ width: "100%", maxWidth: "600px", mt: 2 }}
          >
            <Box>
              <Typography level="h2">Poll Title</Typography>
              <Input
                type="text"
                value={pollTitle}
                onChange={(e) => setPollTitle(e.target.value)}
                required
                fullWidth
                sx={{ mb: 2 }}
              />
            </Box>
            {questions.map((question, qIndex) => (
              <Box
                key={qIndex}
                sx={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: 2,
                }}
              >
                <Typography level="h3">Question {qIndex + 1}</Typography>
                <Input
                  type="text"
                  value={question.text}
                  onChange={(e) => {
                    const updatedQuestion = {
                      ...question,
                      text: e.target.value,
                    };
                    updateQuestion(qIndex, updatedQuestion);
                  }}
                  required
                  fullWidth
                  sx={{ mb: 2 }}
                />
                {question.options.map((option, oIndex) => (
                  <Box
                    key={oIndex}
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                  >
                    <Input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(qIndex, oIndex, e.target.value)
                      }
                      required
                      sx={{ flexGrow: 1, mr: 1 }}
                    />
                    <Button
                      variant="outlined"
                      color="danger"
                      onClick={() => deleteOption(qIndex, oIndex)}
                    >
                      Delete Option
                    </Button>
                  </Box>
                ))}
                <Button
                  variant="soft"
                  color="neutral"
                  onClick={() => addOption(qIndex)}
                  sx={{ mt: 1 }}
                >
                  Add Option
                </Button>
                <Button
                  variant="outlined"
                  color="danger"
                  onClick={() => deleteQuestion(qIndex)}
                  sx={{ mt: 1, ml: 1 }}
                >
                  Delete Question
                </Button>
              </Box>
            ))}
            <Button
              variant="soft"
              color="neutral"
              onClick={addQuestion}
              sx={{ mb: 2 }}
            >
              Add Question
            </Button>
            <Button type="submit" variant="solid" color="primary">
              Save Poll
            </Button>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}
