import "./index.css";
import { Container } from ".";

interface Props {
  messages: string[]
}

export const ConsoleContainer = ({ messages }: Props) => {
  return (
    <Container>
      <div className='console-container'>
        {messages.length > 0 ? messages.map((message, idx) => {
          return <p key={`${Math.random()}`}>{message}</p>;
        }) : undefined}
      </div>
    </Container>
  );
}

export default ConsoleContainer