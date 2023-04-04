// import "firebase/firestore";
// import "firebase/functions";
import * as FirebaseAuth from "react-firebase-hooks/auth";
import * as FirebaseFirestore from "react-firebase-hooks/firestore";

import { FirebaseError, initializeApp } from "firebase/app";
import {
  User as FirebaseUser,
  GoogleAuthProvider,
  UserCredential,
  AuthError,
  getAuth,
} from "firebase/auth";
import {
  DocumentChange,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Timestamp,
  QuerySnapshot,
  QueryDocumentSnapshot,
  serverTimestamp,
  collection,
  getFirestore,
  doc,
  getDocs,
  query,
  limitToLast,
  startAfter,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

export { FirebaseError, getAuth, GoogleAuthProvider };
export type {
  AuthError,
  DocumentChange,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  FirebaseUser,
  Timestamp,
  QuerySnapshot,
  QueryDocumentSnapshot,
  UserCredential,
};

interface LoginSuccess {
  type: "success";
  accessToken?: string;
  idToken?: string;
  refreshToken?: string;
}

export const firebaseConfig = {
  apiKey: "AIzaSyA0QwzJ1I_i4w-jO-9Vk1W5YKHFAyVSal4",
  authDomain: "cloud-lightning-lite.firebaseapp.com",
  projectId: "cloud-lightning-lite",
  storageBucket: "cloud-lightning-lite.appspot.com",
  messagingSenderId: "607208296062",
  appId: "1:607208296062:web:17cfe68400f2a65ddcd22f",
  measurementId: "G-R55E0ZP42N",
};

const app = initializeApp(firebaseConfig);

// export const getFirestore = () => {
//   var firestore = firebase.firestore();
//   // if (false && location.hostname === 'localhost') {
//   //     firestore.settings({
//   //         host: 'localhost:8080',
//   //     })
//   // }
//   return firestore;
// };
// export const firebaseAuth = firebase.auth;
// export const firebaseFunctions = firebase.functions;
// export const firebaseFirestore = firebase.firestore;
// export const firestoreMessenging = firebase.messaging;

export const getCurrentTimeStamp = () => serverTimestamp();
export const getCurrentUser = () => getAuth().currentUser;

export const useAuthState = () => FirebaseAuth.useAuthState(getAuth());

export const getCollection = (collectionPath: string) =>
  collection(getFirestore(), collectionPath);
export const useCollection = (
  collectionPath: string,
  includeMetadataChanges = false
) => {
  try {
    return FirebaseFirestore.useCollection(getCollection(collectionPath), {
      snapshotListenOptions: { includeMetadataChanges },
    });
  } catch (error) {
    return [undefined, false, error];
  }
};

export const useCollectionOnce = (collectionPath: string) => {
  try {
    return FirebaseFirestore.useCollectionOnce(getCollection(collectionPath));
  } catch (error) {
    return [undefined, false, error];
  }
};

export const useCollectionData = (collectionPath: string) => {
  try {
    return FirebaseFirestore.useCollectionData(getCollection(collectionPath));
  } catch (error) {
    return [undefined, false, error];
  }
};

export const useCollectionDataOnce = (collectionPath: string) => {
  try {
    return FirebaseFirestore.useCollectionDataOnce(
      getCollection(collectionPath)
    );
  } catch (error) {
    return [undefined, false, error];
  }
};

export const getDocumentRef = (documentPath: string) =>
  doc(getFirestore(), documentPath);

export const useDocument = (
  documentPath: string,
  includeMetadataChanges = true
) => {
  try {
    return FirebaseFirestore.useDocument(getDocumentRef(documentPath), {
      snapshotListenOptions: { includeMetadataChanges },
    });
  } catch (error) {
    return [undefined, false, error] as [
      DocumentSnapshot<DocumentData> | undefined,
      boolean,
      FirebaseError | undefined
    ];
  }
};

export const useDocumentOnce = (documentPath: string) => {
  try {
    return FirebaseFirestore.useDocumentOnce(getDocumentRef(documentPath));
  } catch (error) {
    return [undefined, false, error];
  }
};

export const useDocumentData = (
  documentPath: string,
  includeMetadataChanges = false
) => {
  try {
    return FirebaseFirestore.useDocumentData(getDocumentRef(documentPath), {
      snapshotListenOptions: { includeMetadataChanges },
    });
  } catch (error) {
    return [undefined, false, error];
  }
};

export const useDocumentDataOnce = (documentPath: string) => {
  try {
    return FirebaseFirestore.useDocumentDataOnce(getDocumentRef(documentPath));
  } catch (error) {
    return [undefined, false, error];
  }
};

// export const getData = async (
//   querySnapshot: QuerySnapshot<DocumentData>,
//   orderBy?: string,
//   length?: number,
//   firstItem?: any
// ) => {
//   const db = querySnapshot.query.firestore;
//   const collectionRef = collection(db, querySnapshot.query);

//   if (!orderBy) return await getDocs(querySnapshot.query);
//   else if (!length)
//     return await getDocs(
//       query(db, collection(getFirestore(), querySnapshot.query), orderBy)
//     );
//   else if (!firstItem)
//     return await getDocs(
//       query(
//         db,
//         collection(getFirestore(), querySnapshot.query),
//         orderBy,
//         limitToLast(length)
//       )
//     );
//   else
//     return await getDocs(
//       query(
//         db,
//         collection(getFirestore(), querySnapshot.query),
//         orderBy,
//         limitToLast(length),
//         startAfter(firstItem)
//       )
//     );
// };

export const getDocumentsDataWithId = (
  querySnapshot: QuerySnapshot<DocumentData>
) => {
  let docs: DocumentData[] = [];
  querySnapshot.docs.forEach((doc) => {
    const data = doc.data();
    // Adds the doc's id to it's own data
    data.id = doc.id;
    docs.push(data);
  });
  return docs;
};

export const collectionContains = async (
  collectionName: string,
  docId: string
) => {
  const collectionRef = collection(getFirestore(), collectionName);
  const docRef = doc(collectionRef, docId);
  return (await getDoc(docRef)).exists();
};

// Returns a promise
export const callFirebaseFunction = (funcName: string, data: any) =>
  httpsCallable(getFunctions(), funcName)(data);

export async function deleteCollection(
  doc: DocumentReference<DocumentData>,
  collectionName: string
) {
  const fullCollectionName = `${doc.path}/${collectionName}`;
  const collectionRef = collection(getFirestore(), fullCollectionName);
  const snapshot = await getDocs(collectionRef);
  snapshot.forEach((doc) => {
    deleteDoc(doc.ref);
  });
}

export default app;

// export async function deleteCollection(doc: DocumentReference<DocumentData>, collectionName: string, batchSize: number) {
//   const collectionRef = doc.collection(collectionName);
//   const query = collectionRef.limit(batchSize);

//   return new Promise((resolve, reject) => {
//     deleteQueryBatch(query, resolve).catch(reject);
//   });
// }

// async function deleteQueryBatch(query: firebase.firestore.Query<firebase.firestore.DocumentData>, resolve: any) {
//   const snapshot = await query.get();

//   const batchSize = snapshot.size;
//   if (batchSize === 0) {
//     // When there are no documents left, we are done
//     resolve();
//     return;
//   }

//   // Delete documents in a batch
//   const batch = getFirestore().batch();
//   snapshot.docs.forEach((doc) => {
//     batch.delete(doc.ref);
//   });
//   await batch.commit();

//   // Recurse on the next process tick, to avoid
//   // exploding the stack.
//   process.nextTick(() => {
//     deleteQueryBatch(query, resolve);
//   });
// }
