import React from "react";
import Box from "@mui/joy/Box";
import FormLabel from "@mui/joy/FormLabel";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import Input from "@mui/joy/Input";

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
      <Box sx={{ width: "100%", marginBottom: "16px" }}>
        <FormLabel
          id={`question-${question.id}`}
          sx={{
            mb: 2,
            fontWeight: "xl",
            textTransform: "uppercase",
            fontSize: "xs",
            letterSpacing: "0.15rem",
          }}
        >
          {question.text}
        </FormLabel>
        <Input
          type="text"
          placeholder={question.text}
          onChange={(e) => onChange(question.id, e.target.value)}
          sx={{
            padding: "8px",
            width: "100%",
            borderRadius: "md",
            borderColor: "neutral.outlinedBorder",
            "&:hover": {
              borderColor: "neutral.outlinedHoverBorder",
            },
          }}
        />
      </Box>
    );
  } else if (question.type === "option") {
    return (
      <Box sx={{ width: "100%", marginBottom: "16px" }}>
        <FormLabel
          id={`question-${question.id}`}
          sx={{
            mb: 2,
            fontWeight: "xl",
            textTransform: "uppercase",
            fontSize: "xs",
            letterSpacing: "0.15rem",
          }}
        >
          {question.text}
        </FormLabel>
        <RadioGroup
          aria-labelledby={`question-${question.id}`}
          size="lg"
          sx={{ gap: 1.5 }}
          onChange={(e) =>
            onChange(question.id, (e.target as HTMLInputElement).value)
          }
        >
          {question.options?.map((value) => (
            <Sheet
              key={value}
              sx={{
                p: 2,
                borderRadius: "md",
                boxShadow: "sm",
                cursor: "pointer",
                "&:hover": {
                  boxShadow: "md",
                },
              }}
            >
              <Radio
                label={value}
                overlay
                disableIcon
                value={value}
                slotProps={{
                  label: ({ checked }) => ({
                    sx: {
                      fontWeight: "lg",
                      fontSize: "md",
                      color: checked ? "text.primary" : "text.secondary",
                    },
                  }),
                  action: ({ checked }) => ({
                    sx: (theme) => ({
                      ...(checked && {
                        "--variant-borderWidth": "2px",
                        "&&": {
                          borderColor: theme.vars.palette.primary[500],
                        },
                      }),
                    }),
                  }),
                }}
              />
            </Sheet>
          ))}
        </RadioGroup>
      </Box>
    );
  }
  return null;
};

export default Question;
