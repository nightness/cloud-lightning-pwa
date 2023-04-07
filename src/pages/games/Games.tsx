import { Page, Text } from "../../components";
import { NavLink } from "react-router-dom";

export function _() {
  return (
    <Page>
      <NavLink to="/games/TicTacToe">
        <Text size={1}>TicTacToe</Text>
      </NavLink>
      <NavLink to="/games/Tetris">
        <Text size={1}>Tetris</Text>
      </NavLink>
      <NavLink to="/games/ConnectFour">
        <Text size={1}>Connect Four</Text>
      </NavLink>
    </Page>
  );
}

export default _;
