import React, { useContext, useEffect, useState } from "react";
import { Button, Page, TextInput } from "../components";
import { FirebaseContext } from "../database/FirebaseContext";
import { useDocument } from "../database/Firebase";
import { SpotifyContext, SpotifyFirebaseData } from "./SpotifyContext";
export const redirectUri = encodeURI("http://localhost:3000/home/spotify");

export default function Spotify() {
  const { spotify } = useContext(SpotifyContext);
  const { currentUser } = useContext(FirebaseContext);
  const [doc, loading, error] = useDocument(`private/${currentUser?.uid}`);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<SpotifyApi.TrackObjectFull[]>([])

  const parameters = new URLSearchParams(window.location.hash.substr(1));
  const accessTokenParam = parameters.get("access_token");
  const expiresInParam = parameters.get("expires_in");

  useEffect(() => {
    if (!doc || loading || error) return;
    const data = doc.data() as SpotifyFirebaseData;
    if (data && data.accessToken && data.expiresAt && data.expiresAt < Date.now()) {
      spotify.setAccessToken(data.accessToken);
      setAccessToken(data.accessToken);
    }
  }, [doc, loading, error]);

  useEffect(() => {
    if (accessTokenParam && expiresInParam && doc && currentUser) {
      const docRef = doc.ref;
      const expireTime = Date.now() + parseInt(expiresInParam);      
      docRef
        .set({
          accessToken: accessTokenParam,
          expiresAt: expireTime,
        })
        .then(() => {
          window.close();
        });
    }
  }, [accessTokenParam, expiresInParam, doc, currentUser]);

  useEffect(() => {
    if (!accessToken || !searchText || searchText === "") {
      setSearchResults([]);
      return;
    }
    spotify.api.searchTracks(searchText).then((response) => {
      setSearchResults(response.body.tracks?.items || [])
    })
  }, [searchText, accessToken])

  if (accessTokenParam) return <h3>Signing-in...</h3>;

  return (
    <Page>
      {!accessToken ? (
        <Button text="Login" onClick={() => spotify.authorize()} />
      ) : (
        <div className="flex-column">
          <div>
            <TextInput value={searchText} onChangeValue={setSearchText} placeholder='Search Songs/Albums' />
            <Button text="Search" onClick={() => console.log(searchResults)} />
          </div>
          <Button text="Test" onClick={() => spotify.test()} />
        </div>
      )}
    </Page>
  );
}
