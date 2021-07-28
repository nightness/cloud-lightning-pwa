import React, { useContext, useEffect, useState } from "react";
import { Button, Page } from "../components";
import { FirebaseContext } from "../database/FirebaseContext";
import { useDocument } from "../database/Firebase";
import { SpotifyContext, SpotifyFirebaseData } from "./SpotifyContext";

export const redirectUri = encodeURI("http://localhost:3000/home/spotify");

export default function Spotify() {
  const { spotify } = useContext(SpotifyContext);
  const { currentUser } = useContext(FirebaseContext);
  const [doc, loading, error] = useDocument(`private/${currentUser?.uid}`);
  const [code, setCode] = useState<string | null>(null);
  const parameters = new URLSearchParams(window.location.hash.substr(1))
  const accessToken = parameters.get("access_token")
  const expiresIn = parameters.get("expires_in")

  useEffect(() => {
    if (!doc || loading || error) return;
    console.log("testing: ", doc, loading, error);
    const data = doc.data() as SpotifyFirebaseData;
    if (data?.accessToken) {
      spotify.setAccessToken(data.accessToken)
      setCode(data.accessToken);
    }
    console.log("accessToken: ", data.accessToken);
  }, [doc, loading, error]);

  useEffect(() => {
    if (accessToken && expiresIn && doc && currentUser) {
      const docRef = doc.ref;
      docRef
        .set({
          accessToken,
          expiresIn
        })
        .then(() => {
          window.close();
        });
    }
  }, [accessToken, expiresIn, doc, currentUser]);

  if (accessToken) return <h3>Signing-in...</h3>;

  // http://localhost:3000/home/spotify#
  // access_token=BQCwYXm7MzVOLriMMMnSnBC3PPl4Viu2pw40wvggQyuUeMQ2z_B8C2TWgfzk8wlXcwTvxNQ1a40yr_TdhuZVs__9msvDWeUlMtSBEne9t0L_gUa_RoTTYDCVJX8uk5xD83u_4LsXkSMeXuCC_X2BmiqRLG5VE_TixffT_GwHWs0GYNtLX1K3o9rkAVDf
  // &token_type=Bearer&expires_in=3600

  return (
    <Page>
      <Button
        text="Login"
        onClick={() => spotify.authorize()}
      />
      <Button
        text="Test"
        onClick={() => spotify.test()}
      />
    </Page>
  );
}
