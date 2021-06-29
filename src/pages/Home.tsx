import { Text, Container, ActivityIndicator } from '../components'
import { H1, Button, Card, Dialog } from "@blueprintjs/core";
import { useState } from 'react';

export function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <Dialog
        isOpen={isDialogOpen} 
        title='Hello World'
        onClose={() => {
          setIsDialogOpen(false)
        }}

      >
        <Card>
          <H1>Hello World</H1>
          <Button
            intent='success'
            text='Ok'
            onClick={() => {
              setIsDialogOpen(false)
            }}
          />
        </Card>
      </Dialog>
      <Container>
        <Card>
          <H1>Hello World</H1>
          <Button
            intent='success'
            text='Open Dialog'
            onClick={() => {
              setIsDialogOpen(true)
            }}
          />
        </Card>
      </Container>
    </>
  );
}

export default Home