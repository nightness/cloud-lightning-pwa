import { Page } from "../components";
import { TetrisBoard, TestPanel } from ".";
import { useState } from "react";

export default function Tetris() {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <Page>
      <TetrisBoard onStartedChanged={(started) => setIsStarted(started)} />
      {/* <TestPanel /> */}
      {!isStarted ? (
        <div>
          <h3>Use of a physical keyboard is the only way to interact atm</h3>
          <h4>The R key will start/re-start, and P key will pause the game</h4>
          <h4>Rotate piece with SpaceBar or Up</h4>
          <h4>Move the piece with: Left (-1x), Right (1x), Down (+1y)</h4>
        </div>
      ) : (
        <></>
      )}
    </Page>
  );
}
