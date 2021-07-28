import { createContext } from "react";
import { redirectUri } from "./Spotify";
import { useSpotify} from "./useSpotify";
import SpotifyApi from 'spotify-web-api-node'

export interface ISpotify {
  authorize: () => any;
  setAccessToken: (code: string) => any;
  test: () => any;
  api: SpotifyApi
}

export interface SpotifyFirebaseData {
  accessToken?: string
  expiresIn?: string
}

type ContextType = {
  spotify: ISpotify;
};

export const SpotifyContext = createContext<ContextType>({
  spotify: {
    authorize: () => null,
    setAccessToken: (code: string) => null,
  } as ISpotify
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const SpotifyProvider = ({ children }: Props) => {
  const spotify = useSpotify(redirectUri);

  return (
    <SpotifyContext.Provider value={{spotify}}>
      {children}
    </SpotifyContext.Provider>
  );
};
