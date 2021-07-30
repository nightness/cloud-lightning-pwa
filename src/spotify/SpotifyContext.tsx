import { createContext } from "react";
import SpotifyApi from "spotify-web-api-node";
import { CallbackState } from "react-spotify-web-playback/lib";
import React, { useEffect, useRef, useState } from "react";
import { clientId } from "../private";
import useInterval from "../hooks/useInterval";

export const redirectUri = window.location.host === 'localhost' ?
   encodeURI("http://localhost:3000/home/spotify") :
   encodeURI("https://cloud-lightning-lite.web.app/home/spotify");

export const authRequestUrl = "https://accounts.spotify.com/authorize";

export interface ISpotify {
  authorize: () => any;
  accessToken: string | null
  search?: [string, React.Dispatch<React.SetStateAction<string>>]
  results?: [SpotifyApi.TrackObjectFull[], React.Dispatch<React.SetStateAction<SpotifyApi.TrackObjectFull[]>>]
  setAccessToken: (accessToken: string) => any;
  callback: ((state: CallbackState) => any) | null;
  trackUris: string[];
  isPlaying: boolean;
  playTrack: (trackUri: string) => any;
  stop: () => any;
  test: () => any;
  api: SpotifyApi;
  popupWindow: Window | null;
}

export interface SpotifyFirebaseData {
  accessToken?: string;
  expiresAt?: number;
}

export const SpotifyContext = createContext<ISpotify>({
  authorize: () => null,
  accessToken: null,
  setAccessToken: (code: string) => null,
  callback: null,
  trackUris: [],
  isPlaying: false,
  playTrack: (trackUri: string) => undefined,
  stop: () => undefined,
  popupWindow: null,
  test: () => undefined,
  api: new SpotifyApi(),
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const SpotifyProvider = ({ children }: Props) => {
  const url =
    `https://accounts.spotify.com/authorize?` +
    `client_id=${clientId}&` +
    `response_type=token&` +
    `redirect_uri=${redirectUri}&` +
    `scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state&`;
  const [spotifyApi, setSpotifyApi] = useState(
    new SpotifyApi({ redirectUri, clientId })
  );
  const [accessToken, setAccessToken] = useState<string | null>()
  const [play, setPlay] = useState(false);
  const [popupWindow, setPopupWindow] = useState<Window | null>(null);
  const [trackUris, setTrackUris] = useState<string[]>([]);
  const [callback] = useState<((state: CallbackState) => any) | null>(
    (state) => {
      if (state && !state.isPlaying) setPlay(false);
    }
  );

  const authorize = () => {
    setPopupWindow(window.open(url, "_blank", "width=350,height=500"));
  };

  const setSpotifyAccessToken = (accessToken: string) => {
    setAccessToken(accessToken)
    spotifyApi.setAccessToken(accessToken);
  };

  const playTrack = (trackUri: string) => {
    setTrackUris([trackUri])
    setPlay(true)
  };

  const test = () => {
    spotifyApi.getMe().then((response) => {
      console.log(response.body.email);
    });
  };

  const stop = () => {
    setPlay(false)
  }

  return (
    <SpotifyContext.Provider
      value={{
        authorize,
        accessToken: accessToken ?? null,
        setAccessToken: setSpotifyAccessToken,
        test,
        callback,
        playTrack,
        stop,
        isPlaying: play,
        trackUris,
        api: spotifyApi,
        popupWindow,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};
