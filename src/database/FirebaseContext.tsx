import { createContext, useState, useEffect } from "react";
import { ActivityIndicator, DisplayError } from "../components";
import { useAuthState, FirebaseUser } from "./Firebase";

export type UserProfile = {
  displayName?: string;
  photoUrl?: string;
}

type ContextType = {
  getCurrentUserProfile: () => UserProfile | undefined
  currentUser?: FirebaseUser | null;
  authToken?: string;
};

export const FirebaseContext = createContext<ContextType>({
  getCurrentUserProfile: () => undefined
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const FirebaseProvider = ({ children }: Props) => {
  const getCurrentUserProfile = () => ({
    displayName: currentUser?.displayName,
    protoUrl: currentUser?.photoURL
  }) as UserProfile
  const [currentUser, loadingUser, errorUser] = useAuthState();
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile>(getCurrentUserProfile())
  const [authToken, setAuthToken] = useState();

  const updateUserToken = async () => {
    if (!currentUser) {
      setAuthToken(undefined);
      return;
    }

    const token: any = await currentUser.getIdToken(true);
    setAuthToken(token);
    //console.log(token);
  };

  useEffect(() => {
    updateUserToken();
    //if (currentUser) {
    //  console.log(currentUser);
    //}
  }, [currentUser]);

  if (loadingUser) return <ActivityIndicator fullscreen={true} />;
  else if (errorUser)
    return (
      <DisplayError permissionDenied={errorUser.code === "permission-denied"} />
    );
  return (
    <>
      {/* <FirebaseNotifications currentUser={currentUser} /> */}
      <FirebaseContext.Provider
        value={{
          currentUser,
          authToken,
          getCurrentUserProfile
        }}
      >
        {children}
      </FirebaseContext.Provider>
    </>
  );
};
