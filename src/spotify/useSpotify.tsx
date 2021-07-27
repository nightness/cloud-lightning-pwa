import React, { useEffect, useRef, useState } from "react";
import { clientId } from "../private";
import SpotifyApi from "spotify-web-api-node";

export const authRequestUrl = "https://accounts.spotify.com/authorize";

export interface ISpotify {
  authorize: () => any;
  setAccessToken: (code: string) => any;
  test: () => any;
}

export function useSpotify(redirectUri: string) {
  const url =
    `https://accounts.spotify.com/authorize?` +
    `client_id=${clientId}&` +
    `response_type=token&` +    
    `redirect_uri=${redirectUri}&` +
    `scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state&`;
  const [spotifyApi, setSpotifyApi] = useState(
    new SpotifyApi({ redirectUri, clientId })
  );

  useEffect(() => {}, []);

  const authorize = () => {
    window.open(url, "_blank", "width=150,height=300");
  };

  const setAccessToken = (code: string) => {
    console.log("Access Token Set")
    spotifyApi.setAccessToken(code)
  };

  const test = () => {
    spotifyApi.getMe().then((response) => {
      console.log(response.body.uri)
    })    
  }

  const result: ISpotify = {
    authorize,
    setAccessToken,
    test
  };

  // Return an object for handling the spotify api
  return result;
}

export default useSpotify;
