import { Page } from "../components";
import { TetrisBoard, TestPanel } from ".";

export default function Tetris() {
  return (
    <Page>
        <TetrisBoard />
        {/* <TestPanel /> */}
        <div>
          <h3>Use of a physical keyboard is the only way to interact atm</h3>
          <h4>The R key will reset the the game</h4>
          <h4>The P key will pause the game</h4>
          <h4>Change piece with the following keys: I, J, L, O, S, T, X, Z</h4>
          <h4>Rotate piece with SpaceBar</h4>
          <h4>Move the piece with: Left (-1x), Right (1x), Up (top), Down (+1y)</h4>
        </div>
    </Page>
  );
}
