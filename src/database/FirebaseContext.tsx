import { createContext, useState, useEffect } from "react";
import {
  ActivityIndicator,
  Container,
  DisplayError,
  Page,
  Text,
} from "../components";
import { useAuthState, FirebaseUser, getDocumentRef } from "./Firebase";
import { getDoc, setDoc } from "firebase/firestore";

export type UserProfile = {
  displayName?: string;
  photoUrl?: string;
};

type ContextType = {
  getCurrentUserProfile: () => UserProfile | undefined;
  getCurrentUsername: () => string | undefined;
  currentUser?: FirebaseUser | null;
  authToken?: string;
};

export const FirebaseContext = createContext<ContextType>({
  getCurrentUserProfile: () => undefined,
  getCurrentUsername: () => undefined,
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const FirebaseProvider = ({ children }: Props) => {
  const getCurrentUserProfile = () =>
    ({
      displayName: currentUser?.displayName,
      protoUrl: currentUser?.photoURL,
    } as UserProfile);
  const [currentUser, loadingUser, errorUser] = useAuthState();
  const [authToken, setAuthToken] = useState();

  const updateUserToken = async () => {
    if (!currentUser) {
      setAuthToken(undefined);
      return;
    }

    const token: any = await currentUser.getIdToken(true);
    setAuthToken(token);
  };

  const getCurrentUsername = () => {
    return currentUser?.displayName
      ? `${currentUser?.displayName} (${currentUser?.email})`
      : undefined || currentUser?.email || currentUser?.uid;
  };

  useEffect(() => {
    updateUserToken();
    // This code is responsible for creating the user's profile
    // entry from the authentication token.
    if (currentUser) {
      const doc = getDocumentRef(
        `/profiles/${currentUser ? currentUser.uid : "empty"}`
      );
      getDoc(doc)
        .then((dataRef) => {
          if (!dataRef.exists) {
            setDoc(doc, {
              displayName: currentUser?.displayName ?? "",
              photoUrl: currentUser?.photoURL ?? "",
            }).catch(console.error);
          }
        })
        .catch(console.error);
    }
  }, [currentUser]);

  if (loadingUser) return <ActivityIndicator size="gigantic" fullscreen />;
  else if (errorUser)
    return (
      <DisplayError permissionDenied={errorUser.name === "permission-denied"} />
    );
  return (
    <>
      {/* <FirebaseNotifications currentUser={currentUser} /> */}
      <FirebaseContext.Provider
        value={{
          currentUser,
          authToken,
          getCurrentUsername,
          getCurrentUserProfile,
        }}
      >
        {children}
      </FirebaseContext.Provider>
    </>
  );
};
