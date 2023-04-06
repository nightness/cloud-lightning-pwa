import { CSSProperties, useContext, useState } from "react";
import { SpotifyContext } from "./SpotifyContext";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player() {
  const spotify = useContext(SpotifyContext);
  const [isHidden, setIsHidden] = useState(false);

  const style: CSSProperties = isHidden
    ? {
        maxHeight: "0px",
        overflow: "hidden",
        width: "90vw",
        maxWidth: "70%",
      }
    : {
        width: "90vw",
        maxWidth: "70%",
      };

  return (
    <div className="spotify-player">
      <div style={style}>
        <SpotifyPlayer
          autoPlay
          magnifySliderOnHover
          token={spotify.api.getAccessToken() ?? ""}
          showSaveIcon={false}
          callback={spotify.callback ?? undefined}
          play={spotify.isPlaying}
          uris={spotify.trackUris}
          styles={{ height: 50 }}
        />
      </div>
      <div
        className="spotify-player-toggle"
        onClick={() => {
          setIsHidden(!isHidden);
        }}
      >
        <h3 className="spotify-player-button">
          {isHidden ? "Show Player" : "Hide Player"}
        </h3>
      </div>
    </div>
  );
}
