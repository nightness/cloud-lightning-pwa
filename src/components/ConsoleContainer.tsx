import "./index.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Container, Text } from ".";
import { useForceUpdate } from "../hooks";

interface Props {
  messages: string[]
}

export const ConsoleContainer = ({ messages }: Props) => {
  return (
    <Container style={{ borderColor: 'black', borderWidth: 1, borderRadius: 5 }}>
      <div className='console-container'>
        {messages.length > 0 ? messages.map((message, idx) => {
          return <p key={`${Math.random()}`}>{message}</p>;
        }) : undefined}
      </div>
    </Container>
  );
}

export default ConsoleContainer