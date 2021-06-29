import { Container } from "../components";
import { H1, Button } from "@blueprintjs/core"

export const About = () => {

  return (
    <Container>
      <H1>About</H1>
      <Button
        intent='success'
        text='Ok'
        onClick={() => {

        }}
      />
    </Container>
  );
}

export default About