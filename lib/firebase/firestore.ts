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
} from "firebase/firestore";

import { db } from "./clientApp";
import { questions } from "../../pages/quiz";

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
  const results = {
    1: { "Yes 👍": 0, "No 👎": 0 },
    2: {
      "Monumental 🇦🇷": 0,
      "Gigante de Arroyito 🇦🇷": 0,
      "Bernabeu 🇪🇸": 0,
      None: 0,
    },
  };

  // Aggregate results
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    results[1][data[1]]++;
    results[2][data[2]]++;
  });

  return results;
}
