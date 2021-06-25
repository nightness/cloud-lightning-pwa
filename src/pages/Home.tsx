import { Text, ActivityIndicator } from '../components'
import { H1, Button } from "@blueprintjs/core";

export function Home() {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <H1>Hello World</H1>
          <ActivityIndicator size='huge' />
          <Button
            intent='success'
            text='Hello World'
            onClick={() => {

            }}
          />        
      </div>
    </div>
  );
}

export default Home