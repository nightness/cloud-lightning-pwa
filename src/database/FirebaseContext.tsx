import { createContext, useState, useEffect } from "react";
import { ActivityIndicator, DisplayError } from "../components";
import { useAuthState, FirebaseUser } from "./Firebase";

type ContextType = {
  currentUser?: FirebaseUser | null;
  authToken?: string;
};

export const FirebaseContext = createContext<ContextType>({});

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const FirebaseProvider = ({ children }: Props) => {
  const [currentUser, loadingUser, errorUser] = useAuthState();
  const [authToken, setAuthToken] = useState();

  const updateUserToken = async () => {
    if (!currentUser) {
      setAuthToken(undefined);
      return;
    }

    const token: any = await currentUser.getIdToken(true);
    setAuthToken(token);
    console.log(token);
  };

  useEffect(() => {
    updateUserToken();
    if (currentUser) {
      console.log(currentUser);
    }
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
        }}
      >
        {children}
      </FirebaseContext.Provider>
    </>
  );
};
