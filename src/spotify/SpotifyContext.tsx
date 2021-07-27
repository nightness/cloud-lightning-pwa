import { createContext } from "react";

type ContextType = {};

export const SpotifyContext = createContext<ContextType>({});

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const SpotifyProvider = ({ children }: Props) => {
  return (
    <>
      {/* <FirebaseNotifications currentUser={currentUser} /> */}
      <SpotifyContext.Provider value={{

      }}>
        {children}
      </SpotifyContext.Provider>
    </>
  );
};
