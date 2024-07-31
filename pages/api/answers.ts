import type { NextApiRequest, NextApiResponse } from "next";
import { getQuizResults } from "../../lib/firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const results = await getQuizResults();

  return res.send({
    results,
    answers: [1, 3, 55, 13],
  });
}
