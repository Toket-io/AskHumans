import React, { useState } from "react";
import Head from "next/head";
import Layout from "../../components/layout";
import { NewPoll, Question } from "../../lib/types";

import {
  Box,
  Button,
  Container,
  Input,
  Typography,
  Switch,
  Snackbar,
  Alert,
} from "@mui/joy";

export default function NewPollPage() {
  const [pollTitle, setPollTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, text: "", type: "option", options: [""], multipleAnswers: false },
  ]);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

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

  const handleMultipleAnswersChange = (qIndex: number, value: boolean) => {
    const updatedQuestion = { ...questions[qIndex], multipleAnswers: value };
    updateQuestion(qIndex, updatedQuestion);
  };

  const validatePoll = (): boolean => {
    if (!pollTitle.trim()) return false;
    for (const question of questions) {
      if (!question.text.trim()) return false;
      for (const option of question.options) {
        if (!option.trim()) return false;
      }
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validatePoll()) {
      setSnackbarMessage(
        "Please ensure the poll title, questions, and all options are filled out."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);

    const newPoll: NewPoll = { title: pollTitle, questions };

    try {
      const response = await fetch("/api/polls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPoll),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setSnackbarMessage("Poll created successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      console.log("New Poll:", data);
    } catch (error) {
      setSnackbarMessage(`Failed to create poll: ${error.message}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
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
          <Typography level="h1" sx={{ mb: 2 }}>
            Create a New Poll
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ width: "100%", maxWidth: "600px", mt: 2 }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography level="h2" sx={{ mb: 1 }}>
                Poll Title
              </Typography>
              <Input
                type="text"
                value={pollTitle}
                onChange={(e) => setPollTitle(e.target.value)}
                required
                fullWidth
              />
            </Box>
            {questions.map((question, qIndex) => (
              <Box
                key={qIndex}
                sx={{
                  border: "1px solid #ccc",
                  padding: "16px",
                  marginBottom: "16px",
                  borderRadius: 2,
                }}
              >
                <Typography level="h3" sx={{ mb: 2 }}>
                  Question {qIndex + 1}
                </Typography>
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
                  sx={{ mt: 2 }}
                >
                  Add Option
                </Button>
                <Button
                  variant="outlined"
                  color="danger"
                  onClick={() => deleteQuestion(qIndex)}
                  sx={{ mt: 2, ml: 2 }}
                >
                  Delete Question
                </Button>
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <Switch
                    checked={question.multipleAnswers}
                    onChange={(e) =>
                      handleMultipleAnswersChange(qIndex, e.target.checked)
                    }
                  />
                  <Typography sx={{ ml: 1 }}>Allow Multiple Answers</Typography>
                </Box>
              </Box>
            ))}
            <Button
              variant="soft"
              color="neutral"
              onClick={addQuestion}
              sx={{ mb: 3 }}
            >
              Add Question
            </Button>
            <Button
              type="submit"
              variant="solid"
              color="primary"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Poll"}
            </Button>
          </Box>
          <Snackbar
            open={snackbarOpen}
            onClose={() => setSnackbarOpen(false)}
            autoHideDuration={6000}
          >
            <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
          </Snackbar>
        </Box>
      </Container>
    </Layout>
  );
}
