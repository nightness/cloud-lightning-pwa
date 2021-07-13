import { Container } from ".";

interface Props {
  messages: string[]
  ref?: React.RefObject<HTMLDivElement>
}

export const ConsoleContainer = ({ messages, ref }: Props) => {
  return (
    <Container ref={ref}>
      <div className='console-container'>
        {messages.length > 0 ? messages.map((message, idx) => {
          return <p key={`${Math.random()}`}>{message}</p>;
        }) : undefined}
      </div>
    </Container>
  );
}

export default ConsoleContainer