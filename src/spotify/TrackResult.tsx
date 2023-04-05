import React, { useContext } from "react";
import { SpotifyContext } from "./SpotifyContext";

interface Props {
  track: SpotifyApi.TrackObjectFull;
}

export default function TrackResult({ track }: Props) {
  const spotify = useContext(SpotifyContext);
  return (
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
        spotify.playTrack(track.uri);
      }}
      key={`${Math.random()}`}
    >
      <img
        alt="some text"
        src={track.album.images[0].url}
        style={{ width: 64, height: 64 }}
      />
      <div
        className="flex-column-center"
        style={{ justifyContent: "center", alignContent: "center" }}
      >
        <h3>{track.artists[0].name}</h3>
        {/* Self-Titled Album check */}
        {track.album.name.toLowerCase() ===
        track.artists[0].name.toLowerCase() ? (
          <></>
        ) : (
          <h4>{track.album.name}</h4>
        )}
      </div>
      <h2 style={{ textAlign: "left" }}>{track.name}</h2>
    </div>
  );
}
