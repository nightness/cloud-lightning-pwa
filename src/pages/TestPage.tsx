import { useState } from "react";
import { Button, ConsoleContainer, Page, Text } from "../components";

export default () => {
  const [messages, setMessages] = useState<string[]>([])

  const push = (value: string | string[]) => {
    const newMessages = [...messages]
    console.log("* ", newMessages)
    if (Array.isArray(value))
      newMessages.push(...value)
    else
      newMessages.push(value)
    console.log("* ", newMessages)
    setMessages(newMessages)
  }

  return (
    <Page>
      <Button
        title="Test"
        onPress={() => {
          push([`${Math.random()}`]);
        }}
      />
      <ConsoleContainer messages={messages} />
    </Page>
  );
};
