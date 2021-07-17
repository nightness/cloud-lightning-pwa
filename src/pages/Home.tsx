import { Page, Button } from "../components";
import { H2, Dialog } from "@blueprintjs/core";
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
      </Page>
    </>
  );
}

export default Home;
