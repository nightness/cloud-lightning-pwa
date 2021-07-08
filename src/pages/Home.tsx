import { Text, Container, ActivityIndicator } from "../components";
import { H2, Button, Card, Dialog } from "@blueprintjs/core";
import { useState } from "react";

export function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Dialog
        isOpen={isDialogOpen}
        title="Hello World"
        onClose={() => {
          setIsDialogOpen(false);
        }}
      >
        <div>
          <H2 style={{ paddingLeft: 10 }}>Hello World</H2>
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
      <Container>
        <H2>Welcome Home!</H2>
        <Button
          intent="success"
          text="Open Dialog"
          onClick={() => {
            setIsDialogOpen(true);
          }}
        />
      </Container>
    </>
  );
}

export default Home;
