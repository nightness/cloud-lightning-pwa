import React, { useEffect, useRef, useState } from "react";
import { clientId } from "../private";
import SpotifyApi from "spotify-web-api-node";
import { ISpotify } from "./SpotifyContext";
import useInterval from "../hooks/useInterval";

export const authRequestUrl = "https://accounts.spotify.com/authorize";

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

  const authorize = () => {
    window.open(url, "_blank", "width=350,height=500");
  };

  const setAccessToken = (code: string) => {
    spotifyApi.setAccessToken(code)
  };

  const test = () => {
    spotifyApi.getMe().then((response) => {
      console.log(response.body.email)
    })    
  }

  const result: ISpotify = {
    authorize,
    setAccessToken,
    test,
    api: spotifyApi
  };

  // Return an object for handling the spotify api
  return result;
}

export default useSpotify;
