import { Container } from "../components";
import { H1, Button, Dialog } from "@blueprintjs/core"
import { useState } from "react";

export const About = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  return (
    <Container>
      <Dialog
        isOpen={isDialogOpen}
        title='Hello World'
        onClose={() => {
          setIsDialogOpen(false)
        }}
      >
        <div>
          <H1 style={{ paddingLeft: 10 }}>Hello World</H1>
          <div
            style={{ width: '100%', textAlign: 'center' }}
          >
            <Button
              intent='success'
              text='Ok'
              onClick={() => {
                setIsDialogOpen(false)
              }}
            />
          </div>
        </div>
      </Dialog>

      <Button
        intent='success'
        text='Click ME!!!'
        onClick={() => {
          setIsDialogOpen(true)
        }}
      />
    </Container>
  );
}

export default About