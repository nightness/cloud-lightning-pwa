import { createContext } from "react";
import SpotifyApi from "spotify-web-api-node";

// GET https://accounts.spotify.com/authorize

/*
GET https://accounts.spotify.com/authorize?
    client_id=5fe01282e44241328a84e7c5cc169165&
    response_type=code&
    redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&
    scope=user-read-private%20user-read-email&
    state=34fFs29kd09
*/

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
