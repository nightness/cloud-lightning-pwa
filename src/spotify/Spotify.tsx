import React, { useContext, useEffect, useState } from "react";
import { Button, Page, TextInput } from "../components";
import { FirebaseContext } from "../database/FirebaseContext";
import { useDocument } from "../database/Firebase";
import { SpotifyContext, SpotifyFirebaseData } from "./SpotifyContext";
import SpotifyPlayer from "react-spotify-web-playback";
export const redirectUri = encodeURI("http://localhost:3000/home/spotify");

export default function Spotify() {
  const { spotify } = useContext(SpotifyContext);
  const { currentUser } = useContext(FirebaseContext);
  const [doc, loading, error] = useDocument(`private/${currentUser?.uid}`);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [play, setPlay] = useState(false);
  const [trackUri, setTrackUri] = useState<string | null>(null);
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
    if (data && data.accessToken && remainingTime > 10000) {
      spotify.setAccessToken(data.accessToken);
      setAccessToken(data.accessToken);
    } else {
      spotify.authorize();
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
        <div className="flex-column test">
          <div>
            <TextInput
              value={searchText}
              onChangeValue={setSearchText}
              placeholder="Search Songs/Albums"
            />
            <Button text="Search" onClick={() => console.log(searchResults)} />
          </div>
          <div style={{ position: "relative", width: "100%" }}>
            {searchResults.map((track, index, array) => (
              <div
                className=""
                style={{
                  padding: "5px",
                  display: "grid",
                  gridTemplateColumns: "64px 45% 45%",
                  width: "100%",
                  cursor: "pointer",
                }}
                onClick={() => {
                  console.log("click", track.uri);
                  setTrackUri(track.uri);
                  setPlay(true);
                }}
                key={`${Math.random()}`}
              >
                <img
                  src={track.album.images[0].url}
                  style={{ width: 64, height: 64 }}
                />
                <div className="flex-column" style={{ justifyContent: 'center' }}>
                  <h3>{track.artists[0].name}</h3>
                  {track.album.name === track.artists[0].name ? (
                    <></>
                  ) : (
                    <h4>{track.album.name}</h4>
                  )}
                </div>
                <h2>{track.name}</h2>
              </div>
            ))}
          </div>
          {/* <Button text="Test" onClick={() => spotify.test()} /> */}
          <SpotifyPlayer
            token={accessToken}
            showSaveIcon
            callback={(state) => {
              if (!state.isPlaying) setPlay(false);
            }}
            play={play}
            uris={trackUri ? [trackUri] : []}
          />
        </div>
      )}
    </Page>
  );
}
