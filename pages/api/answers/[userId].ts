// This is an example of to protect an API route

import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import type { NextApiRequest, NextApiResponse } from "next";
import { getFirestore } from "firebase/firestore";
// import { getAuthenticatedAppForUser } from "../../../lib/firebase/serverApp";
import {
  getQuizResultsByUserId,
  saveQuizResults,
} from "../../../lib/firebase/firestore";

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

  const answers = await getQuizResultsByUserId(userId);

  console.log("*AC answers", answers);

  // TODO: Check protected routes

  res.send({
    answers,
  });
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { userId, answers } = req.body;

  console.log("*AC body", req.body);
  console.log("*AC userId", userId);

  // TODO: Check protected routes

  if (!userId || !answers) {
    res.status(400).json({ error: "User ID and data are required" });
    return;
  }

  const saveResult = await saveQuizResults(userId, answers);
  console.log("*AC saveResult: ", saveResult);

  // Process the userId and data for POST request
  res.status(200).json({ message: `Data received for user ID ${userId}` });
}
