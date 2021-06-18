import { Text } from '../components';
import { Button } from '../components'
import { Container } from 'react-bootstrap'

export function Home() {
  return (
    <Container>
      <Text headerSize={1}>Hello World</Text>
      <Button
        onClick={() => {

        }}
      >
        <Text>Hello World</Text>
      </Button>
    </Container>
  );
}

export default Home