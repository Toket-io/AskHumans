// This is an example of to protect an API route

import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import type { NextApiRequest, NextApiResponse } from "next";
import { getFirestore } from "firebase/firestore";
// import { getAuthenticatedAppForUser } from "../../../lib/firebase/serverApp";
import {
  createNewPoll,
  getGalleryPolls,
} from "../../../lib/firebase/firestore";
import { NewPoll } from "../../../lib/types";

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

  // TODO: Check protected routes

  try {
    const polls = await getGalleryPolls();
    return res.send({
      polls,
    });
  } catch (error) {
    console.error("Error fetching polls: ", error);
    res.status(500).json({ error: "Error fetching polls" });
    return;
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const pollData: NewPoll = req.body;

  // TODO: Check protected routes

  if (!pollData) {
    res.status(400).json({ error: "Missing data" });
    return;
  }

  try {
    const poll = await createNewPoll(pollData);
    return res.send({
      ...poll,
    });
  } catch (error) {
    console.error("Error creating new poll: ", error);
    res.status(500).json({ error: "Error creating new poll" });
    return;
  }
}
