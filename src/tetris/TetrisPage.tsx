import { Page } from "../components";
import { TetrisBoard, TestPanel } from ".";

export default function Tetris() {
  return (
    <Page>
        <TetrisBoard />
        {/* <TestPanel /> */}
        <div>
          <h3>Use of a physical keyboard is the only way to interact atm</h3>
          <h4>Change piece with the following keys: I, J, L, O, S, T, X, Z</h4>
          <h4>Rotate piece with SpaceBar</h4>
          <h4>Use Left (-1), Right (1), Up (top), Down (bottom) to move the piece</h4>
        </div>
    </Page>
  );
}
