import React, { useContext, useEffect, useState } from "react";
import { Button, Page, TextInput } from "../components";
import { FirebaseContext } from "../database/FirebaseContext";
import { useDocument } from "../database/Firebase";
import { SpotifyContext, SpotifyFirebaseData } from "./SpotifyContext";
import TrackResult from "./TrackResult";

export default function Spotify() {
  const spotify = useContext(SpotifyContext);
  const { currentUser } = useContext(FirebaseContext);
  const [doc, loading, error] = useDocument(`private/${currentUser?.uid}`);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<
    SpotifyApi.TrackObjectFull[]
  >([]);

  const parameters = new URLSearchParams(window.location.hash.substr(1));
  const accessTokenParam = parameters.get("access_token");
  const expiresInParam = parameters.get("expires_in");

  useEffect(() => {
    if (!doc || loading || error) return;
    const data = doc.data() as SpotifyFirebaseData;
    const remainingTime = data.expiresAt ? data.expiresAt - Date.now() : 0;
    //console.log("Test: ", data.accessToken, data?.expiresAt, Date.now(), remainingTime);
    if (data && data.accessToken && remainingTime > 30000) {
      spotify.setAccessToken(data.accessToken);
      setAccessToken(data.accessToken);
    } else {
      //spotify.authorize();
    }
  }, [doc, loading, error]);

  useEffect(() => {
    if (accessTokenParam && expiresInParam && doc && currentUser) {
      const docRef = doc.ref;
      const expireTime = Date.now() + parseInt(expiresInParam) * 1000;
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
    let cancel = false;
    spotify.api
      .searchTracks(searchText)
      .then((response) => {
        if (cancel) return;
        setSearchResults(response.body.tracks?.items || []);
      })
      .catch(() => {
        spotify.authorize();
      });
    return () => {
      cancel = true;
    };
  }, [searchText, accessToken]);

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  if (accessTokenParam) return <h3>Signing-in...</h3>;

  return (
    <Page>
      {!accessToken ? (
        <Button text="Login" onClick={() => spotify.authorize()} />
      ) : (
        <div className="flex-column" style={{ paddingBottom: "2.5rem" }}>
          <div style={{ position:'relative', width: '80%', left: '10%'}}>
            <TextInput
              value={searchText}
              onChangeValue={setSearchText}
              placeholder="Search Songs/Albums"
            />
          </div>
          <div style={{ position: "relative", width: "100%" }}>
            {searchResults.map((track, index, array) => (
              <TrackResult track={track} />
            ))}
          </div>
        </div>
      )}
    </Page>
  );
}
