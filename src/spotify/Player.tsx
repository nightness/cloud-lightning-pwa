import { CSSProperties, useContext, useState } from "react";
import { SpotifyContext, SpotifyFirebaseData } from "./SpotifyContext";
import SpotifyPlayer, { CallbackState } from "react-spotify-web-playback";
import { Button } from "../components";

export default function Player() {
  const spotify = useContext(SpotifyContext);
  const [isHidden, setIsHidden] = useState(false);

  const style: CSSProperties = isHidden
    ? {
        maxHeight: "0px",
        overflow: "hidden",
        width: "90vw",
      }
    : {
        width: "90vw",
      };

  return (
    <div className="spotify-player">
      <div style={style}>
        <SpotifyPlayer
          token={spotify.api.getAccessToken() ?? ""}
          showSaveIcon
          callback={spotify.callback ?? undefined}
          play={spotify.isPlaying}
          uris={spotify.trackUris}
        />
      </div>
      <Button
        className="spotify-player-toggle"
        text={isHidden ? "Show" : "Hide"}
        onClick={() => {
          setIsHidden(!isHidden);
        }}
      />
    </div>
  );
}
