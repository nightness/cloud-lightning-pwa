import { useState } from "react";
import { Button, ConsoleContainer, Page } from "../components";

function TestPage() {
  const [messages, setMessages] = useState<string[]>([]);

  const push = (value: string | string[]) => {
    const newMessages = [...messages];
    Array.isArray(value) ? newMessages.push(...value) : newMessages.push(value);
    setMessages(newMessages);
  };

  return (
    <Page>
      <Button
        text="Test"
        onClick={() => {
          push([`${Math.random()}`]);
        }}
      />
      <ConsoleContainer messages={messages} />
    </Page>
  );
}

export default TestPage;
