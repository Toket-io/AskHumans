import {
  collection,
  onSnapshot,
  query,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  orderBy,
  Timestamp,
  runTransaction,
  where,
  addDoc,
  setDoc,
  getFirestore,
  limit,
  count,
  getCountFromServer,
} from "firebase/firestore";

import { db } from "./clientApp";
import { questions } from "../../pages";
import { Poll, Answer, PollResult, NewPoll, FormattedResults } from "../types"; // Adjust the import based on your chosen structure

// export async function getQuizResultsByUserIdServer(db, userId: string) {
//   if (!userId) {
//     console.log("Error: Invalid userId received: ", userId);
//     return;
//   }

//   const q = query(
//     collection(db, "answers", userId),
//     orderBy("timestamp", "desc"),
//     limit(1)
//   );

//   const results = await getDocs(q);
//   return results.docs.map((doc) => {
//     return {
//       id: doc.id,
//       ...doc.data(),
//       // Only plain objects can be passed to Client Components from Server Components
//       timestamp: doc.data().timestamp.toDate(),
//     };
//   });
// }

export async function getQuizResultsByUserId(userId: string) {
  if (!userId) {
    console.log("Error: Invalid userId received: ", userId);
    return;
  }

  const userAnswersRef = doc(collection(db, "answers"), userId);
  const userAnswersSnap = await getDoc(userAnswersRef);

  if (!userAnswersSnap.exists()) {
    console.log("No such document!");
    return;
  }

  return {
    id: userAnswersSnap.id,
    ...userAnswersSnap.data(),
    // Only plain objects can be passed to Client Components from Server Components
    // timestamp: restaurantSnap.data().timestamp.toDate(),
  };
}

export async function saveQuizResults(userId: string, answers: any) {
  if (!userId) {
    console.log("Error: Invalid userId received: ", userId);
    return;
  }

  const userAnswersRef = doc(collection(db, "answers"), userId);

  try {
    await setDoc(userAnswersRef, {
      userId,
      ...answers,
      timestamp: Timestamp.now(),
    });
    console.log("Document successfully written!");
  } catch (e) {
    console.error("Error writing document: ", e);
  }
}

export async function getQuizResults() {
  const q = query(collection(db, "answers"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);

  // Initialize counters for each question's options
  const results = {};
  questions.forEach((question) => {
    results[question.id] = {};
    question.options.forEach((option) => {
      results[question.id][option] = 0;
    });
  });

  // Aggregate results
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    Object.keys(data).forEach((key) => {
      if (key !== "userId" && key !== "timestamp") {
        results[key][data[key]]++;
      }
    });
  });

  // Format results as required
  const formattedResults = {};
  Object.keys(results).forEach((key) => {
    formattedResults[key] = {
      labels: Object.keys(results[key]),
      data: Object.values(results[key]),
    };
  });

  return formattedResults;
}

export async function countQuizResults() {
  const q = query(collection(db, "answers"));
  const snapshot = await getCountFromServer(q);

  // Format the count with thousands separator
  const formattedCount = snapshot.data().count.toLocaleString("es-AR");
  return formattedCount;
}

// <<<<<<<<--------- NEW VERSION --------->>>>>>>>>
export async function createNewPoll(newPoll: NewPoll): Promise<Poll> {
  if (!newPoll) {
    throw new Error("Error: Invalid request data received");
  }

  const pollRef = doc(collection(db, "polls"));

  try {
    // Save new poll
    const timestamp = new Date();

    await setDoc(pollRef, {
      ...newPoll,
      timestamp: timestamp,
    });

    const poll: Poll = {
      id: pollRef.id,
      ...newPoll,
      timestamp: timestamp,
    };

    return poll;
  } catch (e) {
    throw new Error("Error writing document: " + e);
  }
}

export async function getPollById(pollId: string): Promise<Poll> {
  if (!pollId) {
    throw new Error("Error: Invalid request data received");
  }

  const pollRef = doc(db, "polls", pollId);
  const pollSnap = await getDoc(pollRef);

  if (!pollSnap.exists()) {
    throw new Error("No such document!");
  }

  const pollSnapData = pollSnap.data();

  return {
    id: pollSnap.id,
    userId: pollSnapData.userId,
    title: pollSnapData.title,
    questions: pollSnapData.questions,
    timestamp: pollSnap.data().timestamp.toDate(),
  };
}

export async function savePollResults(
  pollId: string,
  userId: string,
  answers: Answer[]
): Promise<PollResult> {
  if (!pollId || !userId || !answers) {
    throw new Error("Error: Invalid request data received");
  }

  const userAnswersRef = doc(
    collection(db, "polls"),
    pollId,
    "answers",
    userId
  );

  const pollResult: PollResult = {
    userId,
    pollId,
    answers,
    timestamp: new Date(),
  };

  try {
    await setDoc(userAnswersRef, pollResult);

    return pollResult;
  } catch (e) {
    throw new Error("Error writing document: " + e);
  }
}

export async function getPollResultsByUserId(pollId: string, userId: string) {
  if (!pollId || !userId) {
    throw new Error("Error: Invalid request data received");
  }

  const userAnswersRef = doc(
    collection(db, "polls"),
    pollId,
    "answers",
    userId
  );
  const userAnswersSnap = await getDoc(userAnswersRef);

  if (!userAnswersSnap.exists()) {
    throw new Error("No such document!");
  }

  return {
    ...userAnswersSnap.data(),
    timestamp: userAnswersSnap.data().timestamp.toDate(),
  };
}

export async function getPollResultsCount(pollId: string) {
  const q = query(collection(db, "polls", pollId, "answers"));
  const snapshot = await getCountFromServer(q);

  // Format the count with thousands separator
  const formattedCount = snapshot.data().count.toLocaleString("es-AR");
  return formattedCount;
}

export async function getPollResults(
  pollId: string
): Promise<FormattedResults> {
  const poll = await getPollById(pollId);

  const answersQuery = query(
    collection(db, "polls", pollId, "answers"),
    orderBy("timestamp", "desc")
  );
  const querySnapshot = await getDocs(answersQuery);

  // Initialize counters for each question's options
  const results: { [key: string]: { [option: string]: number } } = {};
  poll.questions.forEach((question) => {
    results[question.id] = {};
    question.options.forEach((option) => {
      results[question.id][option] = 0;
    });
  });

  // Aggregate results
  querySnapshot.forEach((doc) => {
    const data: PollResult = doc.data() as PollResult;
    Object.keys(data.answers).forEach((key) => {
      if (key !== "userId" && key !== "timestamp") {
        results[key][data.answers[key]]++;
      }
    });
  });

  // Format results as required
  const formattedResults: FormattedResults = {};
  poll.questions.forEach((question) => {
    formattedResults[question.id] = {
      question: question.text,
      labels: Object.keys(results[question.id]),
      data: Object.values(results[question.id]),
    };
  });

  return formattedResults;
}

// TODO: Check all throw errors and validation
