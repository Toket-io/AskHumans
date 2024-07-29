import React from "react";

interface QuestionProps {
  question: {
    id: number;
    text: string;
    type: string;
    options?: string[];
  };
  onChange: (id: number, answer: string) => void;
}

const Question: React.FC<QuestionProps> = ({ question, onChange }) => {
  if (question.type === "text") {
    return (
      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "8px" }}>
          {question.text}
        </label>
        <input
          type="text"
          style={{
            padding: "8px",
            width: "100%",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
          onChange={(e) => onChange(question.id, e.target.value)}
        />
      </div>
    );
  } else if (question.type === "option") {
    return (
      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "8px" }}>
          {question.text}
        </label>
        <div
          style={{
            display: "grid",
            gap: "8px",
            gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
          }}
        >
          {question.options?.map((option) => (
            <div
              key={option}
              onClick={() => onChange(question.id, option)}
              style={{
                padding: "12px",
                textAlign: "center",
                borderRadius: "4px",
                border: "1px solid #ccc",
                cursor: "pointer",
                backgroundColor: "#f9f9f9",
              }}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default Question;
