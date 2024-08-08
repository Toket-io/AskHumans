import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";
import { getFirestore } from "firebase/firestore";
import {
  getPollResults,
  getPollResultsCount,
} from "../../../../../lib/firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      handleGet(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  const pollId: string = req.query.pollId as string;

  // TODO: Check protected routes

  if (!pollId) {
    res.status(400).json({ error: "Poll ID is required" });
    return;
  }

  try {
    const results = await getPollResults(pollId);
    const count = await getPollResultsCount(pollId);

    return res.send({
      answers: results,
      count,
    });
  } catch (error) {
    console.error("Error fetching poll: ", error);
    res.status(500).json({ error: "Error fetching poll" });
    return;
  }
}
