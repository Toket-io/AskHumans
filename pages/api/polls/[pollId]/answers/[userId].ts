// This is an example of to protect an API route

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]";

import type { NextApiRequest, NextApiResponse } from "next";
import { getFirestore } from "firebase/firestore";
// import { getAuthenticatedAppForUser } from "../../../lib/firebase/serverApp";
import {
  countQuizResults,
  getPollResultsByUserId,
  getQuizResultsByUserId,
  savePollResults,
  saveQuizResults,
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
    case "POST":
      handlePost(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  const userId: string = req.query.userId as string;
  const pollId: string = req.query.pollId as string;

  // TODO: Check protected routes

  if (!pollId || !userId) {
    res.status(400).json({ error: "Data required" });
    return;
  }

  try {
    const pollResult = await getPollResultsByUserId(pollId, userId);
    return res.send({
      ...pollResult,
    });
  } catch (error) {
    console.error("Error submitting poll answer: ", error);
    res.status(500).json({ error: "Error submitting poll answer" });
    return;
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { answers } = req.body;

  const userId: string = req.query.userId as string;
  const pollId: string = req.query.pollId as string;

  // TODO: Check protected routes

  if (!pollId || !userId || !answers) {
    res.status(400).json({ error: "Data required" });
    return;
  }

  try {
    const pollResult = await savePollResults(pollId, userId, answers);
    return res.send({
      ...pollResult,
    });
  } catch (error) {
    console.error("Error submitting poll answer: ", error);
    res.status(500).json({ error: "Error submitting poll answer" });
    return;
  }
}
