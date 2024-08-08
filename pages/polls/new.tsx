import React, { useState } from "react";
import Head from "next/head";
import Layout from "../../components/layout";
import { NewPoll, Question } from "../../lib/types";

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
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - var(--header-height))", // Adjust for the header height
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <h1>Create a New Poll</h1>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", maxWidth: "600px" }}
        >
          <div>
            <label htmlFor="pollTitle">Poll Title</label>
            <input
              type="text"
              id="pollTitle"
              value={pollTitle}
              onChange={(e) => setPollTitle(e.target.value)}
              required
            />
          </div>
          {questions.map((question, qIndex) => (
            <div key={qIndex}>
              <h3>Question {qIndex + 1}</h3>
              <label htmlFor={`question-${qIndex}`}>Question Text</label>
              <input
                type="text"
                id={`question-${qIndex}`}
                value={question.text}
                onChange={(e) => {
                  const updatedQuestion = { ...question, text: e.target.value };
                  updateQuestion(qIndex, updatedQuestion);
                }}
                required
              />
              {question.options.map((option, oIndex) => (
                <div key={oIndex}>
                  <label htmlFor={`option-${qIndex}-${oIndex}`}>
                    Option {oIndex + 1}
                  </label>
                  <input
                    type="text"
                    id={`option-${qIndex}-${oIndex}`}
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(qIndex, oIndex, e.target.value)
                    }
                    required
                  />
                </div>
              ))}
              <button type="button" onClick={() => addOption(qIndex)}>
                Add Option
              </button>
            </div>
          ))}
          <button type="button" onClick={addQuestion}>
            Add Question
          </button>
          <button type="submit">Save Poll</button>
        </form>
      </main>
    </Layout>
  );
}
