export interface Question {
  id: number;
  text: string;
  type: "option";
  options: string[];
  multipleAnswers?: boolean;
}

export interface NewPoll {
  userId: string;
  title: string;
  questions: Question[];
}

export interface Poll extends NewPoll {
  id: string;
  timestamp: Date;
  updated: Date;
  isVisible: boolean;
}

export interface Answer {
  questionId: number;
  answer: string | string[];
}

export interface PollResult {
  userId: string;
  pollId: string;
  answers: Answer[];
  timestamp: Date;
}

export interface FormattedResults {
  [key: string]: {
    question: string;
    labels: string[];
    data: number[];
  };
}
