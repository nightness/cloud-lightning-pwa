import { Page, Text } from "../../components";
import { NavLink } from "react-router-dom";

export function Home() {
  return (
    <Page>
      <div>
        <NavLink to="/games/TicTacToe">
          <Text size={1}>TicTacToe</Text>
        </NavLink>
        <br />
        <NavLink to="/games/Tetris">
          <Text size={1}>Tetris</Text>
        </NavLink>
      </div>
    </Page>
  );
}

export default Home;
