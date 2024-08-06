// This is an example of to protect an API route

import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

import type { NextApiRequest, NextApiResponse } from "next";
import { getFirestore } from "firebase/firestore";
// import { getAuthenticatedAppForUser } from "../../../lib/firebase/serverApp";
import { createNewPoll } from "../../lib/firebase/firestore";
import { NewPoll, Poll } from "../../lib/types";
import { randomUUID } from "crypto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
