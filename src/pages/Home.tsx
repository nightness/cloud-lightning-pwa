import { Text } from '../components'
import { Button } from "@blueprintjs/core"; 
import { Container } from 'react-bootstrap'

export function Home() {
  return (
    <Container>
      <Text headerSize={1}>Hello World</Text>
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