import { Page, Button, Text } from "../components";
import { NavLink, LinkProps, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { FirebaseContext } from "../database/FirebaseContext";

export function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { currentUser } = useContext(FirebaseContext);

  return (
    <Page>
      {!currentUser ? (
        <>
          <NavLink className="sidebar-link" to="/home/TicTacToe">
            TicTacToe isn't the only featured component here.
          </NavLink>
          <br />
          <NavLink className="sidebar-link" to="/auth">
            Login to see more!
          </NavLink>
        </>
      ) : (
        <>
          <h1>Welcome</h1>
        </>
      )}
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
