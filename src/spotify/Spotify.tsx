import React, { useContext, useEffect, useState } from "react";
import { Button, Page } from "../components";
import SpotifyApi from "spotify-web-api-node";
import { clientSecret, clientId } from "../private";
import { useSpotify } from "./useSpotify";
import { FirebaseContext } from "../database/FirebaseContext"
import { useDocument } from "../database/Firebase";

export const redirectUri = encodeURI("http://localhost:3000/home/spotify");

export default function Spotify() {
  const spotify = useSpotify(redirectUri);
  const { currentUser } = useContext(FirebaseContext)
  const [doc, loading, error] = useDocument(`private/${currentUser?.uid}`)
  const code = new URLSearchParams(window.location.search).get("code");

  useEffect(() => {
    if (!doc || loading || error) return
    console.log("testing: ", doc, loading, error)
    const data = doc.data()

    console.log(data);
  }, [doc, loading, error])

  useEffect(() => {
    if (code && doc && currentUser) {
      const docRef = doc.ref;
      docRef.set({
        code
      })
      window.close();
    }
  }, [code, doc, currentUser]);

  // const [spotifyApi, setSpotifyApi] = useState(
  //   new SpotifyApi({
  //     redirectUri: "http://localhost:3000",
  //     clientId,
  //     clientSecret,
  //   })
  // );

  useEffect(() => {
    console.log("code: ", code);
    if (code) {
      // spotifyApi.authorizationCodeGrant(code, (error, response) => {
      //   if (error) {
      //     console.log("Error")
      //     return;
      //   }
      //   spotifyApi.setAccessToken(response.body.access_token)
      //   spotifyApi.setRefreshToken(response.body.refresh_token)
      //   //const expiresIn = response.body.expires_in
      //   console.log("Spotify is signed-in")
      // })
    }
  }, [code]);

  return (
    <Page>
      <Button text="Login" onClick={() => spotify.authorize()} />
    </Page>
  );
}
