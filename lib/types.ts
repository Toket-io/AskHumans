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
