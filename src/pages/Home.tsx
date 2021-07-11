import { Page, Button } from "../components";
import { H2, Dialog } from "@blueprintjs/core";
import { useState } from "react";
import { getCssVar, setCssVar } from '../components/ThemeContext'

export function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  console.log('HELLO')
  console.log(getCssVar('--app-background-color'))

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
      <Page>
        <H2>Welcome Home!</H2>
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
