import { Page, Button, Text, Link } from "../components";
import { NavLink, LinkProps, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { FirebaseContext } from "../database/FirebaseContext";

export function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { currentUser } = useContext(FirebaseContext);

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

{
  /* <Dialog
isOpen={isDialogOpen}
title="Hello World"
onClose={() => {
  setIsDialogOpen(false);
}}
>
<div>
  <h2 style={{ paddingLeft: 10 }}>Hello World</h2>
  <div style={{ width: "100%", textAlign: "center" }}>
    <Button
      intent="success"
      text="Ok"
      onClick={() => {
        setIsDialogOpen(false);
      }}
    />
  </div>
</div>
</Dialog>
<Page>
<h2>Welcome Home!</h2>
<Button
  intent="success"
  text="Open Dialog"
  onClick={() => {
    setIsDialogOpen(true);
  }}
/>
</Page> */
}
