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
import { Poll, Answer, PollResult, NewPoll } from "../types"; // Adjust the import based on your chosen structure

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

export async function createNewPoll(newPoll: NewPoll): Promise<Poll> {
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

export async function getPollById(pollId: string) {
  const pollRef = doc(db, "polls", pollId);
  const pollSnap = await getDoc(pollRef);

  if (!pollSnap.exists()) {
    throw new Error("No such document!");
  }

  return {
    id: pollSnap.id,
    ...pollSnap.data(),
  };
}

