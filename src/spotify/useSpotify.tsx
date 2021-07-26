import React, { useEffect, useState } from "react";
import { clientId } from "../private";

export const authRequestUrl = "https://accounts.spotify.com/authorize";

export function useSpotify(redirectUri: string) {
  const [popup, setPopup] = useState<Window | null>(null);
  const url =
    `https://accounts.spotify.com/authorize?` +
    `client_id=${clientId}&` +
    `response_type=code&` +
    `redirect_uri=${redirectUri}&` +
    `scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state&`;

  useEffect(() => {}, []);

  const authorize = () => {
    setPopup(window.open(url, "Login with Spotify", "width=500,height=700"));
  };

  // Return an object for handling the spotify api
  return {
    authorize,
  };
}

export default useSpotify;
