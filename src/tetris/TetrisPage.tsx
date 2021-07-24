import { Page } from "../components";
import { TetrisBoard, TestPanel } from ".";

export default function Tetris() {
  return (
    <Page>
        <TetrisBoard />
        {/* <TestPanel /> */}
        <div>
          <h3>Use of a physical keyboard is the only way to interact atm</h3>
          <h4>The R key will reset, and P key will pause the game</h4>
          <h4>Rotate piece with SpaceBar or Up</h4>
          <h4>Move the piece with: Left (-1x), Right (1x), Down (+1y)</h4>
        </div>
    </Page>
  );
}
