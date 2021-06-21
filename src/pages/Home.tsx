import { Text, ActivityIndicator } from '../components'
import { Button } from "@blueprintjs/core"; 
import { Container } from 'react-bootstrap'

export function Home() {
  return (
    <Container>
      <Text headerSize={1}>Hello World</Text>
      <ActivityIndicator size='huge' />
      <Button
        intent='success'
        text='Hello World'
        onClick={() => {

        }}
      />
    </Container>
  );
}

export default Home