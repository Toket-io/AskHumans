// This is an example of to protect an API route

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";

import type { NextApiRequest, NextApiResponse } from "next";
import { getFirestore } from "firebase/firestore";
// import { getAuthenticatedAppForUser } from "../../../lib/firebase/serverApp";
import {
  countQuizResults,
  getPollById,
  getQuizResultsByUserId,
  saveQuizResults,
  updatePoll,
} from "../../../../lib/firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      handleGet(req, res);
      break;
    case "PATCH":
      handlePatch(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "PATCH"]);
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
    const poll = await getPollById(pollId);
    return res.send({
      ...poll,
    });
  } catch (error) {
    console.error("Error fetching poll: ", error);
    res.status(500).json({ error: "Error fetching poll" });
    return;
  }
}

async function handlePatch(req: NextApiRequest, res: NextApiResponse) {
  // TODO: Check protected routes
  const session = await getServerSession(req, res, authOptions);

  const pollId: string = req.query.pollId as string;
  const isVisible: boolean = req.body.isVisible;

  if (typeof isVisible !== "boolean") {
    res.status(400).json({ error: "isVisible must be a boolean value" });
    return;
  }

  if (!pollId) {
    res.status(400).json({ error: "Poll ID is required" });
    return;
  }

  try {
    const poll = await updatePoll(pollId, isVisible);
    return res.send({
      ...poll,
    });
  } catch (error) {
    console.error("Error updating poll: ", error);
    res.status(500).json({ error: "Error updating poll" });
    return;
  }
}
