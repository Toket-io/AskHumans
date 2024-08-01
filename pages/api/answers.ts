import type { NextApiRequest, NextApiResponse } from "next";
import { countQuizResults, getQuizResults } from "../../lib/firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const results = await getQuizResults();
  const count = await countQuizResults();

  return res.send({
    answers: results,
    count,
  });
}
