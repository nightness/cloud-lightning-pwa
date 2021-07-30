import { useContext, useState } from "react";
import { SpotifyContext, SpotifyFirebaseData } from "./SpotifyContext";
import SpotifyPlayer, { CallbackState } from "react-spotify-web-playback";

export default function Player() {
  const spotify = useContext(SpotifyContext);

  return (
    <div className="spotify-player">
      <SpotifyPlayer
        token={spotify.api.getAccessToken() ?? ""}
        showSaveIcon
        callback={spotify.callback ?? undefined}
        play={spotify.isPlaying}
        uris={spotify.trackUris}
      />
    </div>
  );
}
