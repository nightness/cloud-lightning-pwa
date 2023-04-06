import React, { useState, useEffect, useContext, useRef } from "react";
import { useCollection, DocumentData, QuerySnapshot } from "./Firebase";
import { ActivityIndicator, DisplayError, ThemeContext } from "../components";
import { FirebaseError } from "./Firebase";
import Message from "../pages/messenger/Message";

// String Hash function
// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
function hashCode(obj: any) {
  const str = typeof obj === "string" ? obj : JSON.stringify(obj);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

interface Props<T> {
  collectionPath: string;
  orderBy?: string;
  limitLength?: number;
  initialNumToRender?: number;
  autoScrollToEnd?: boolean;
}

export default function _<T>({
  collectionPath,
  orderBy,
  limitLength,
  initialNumToRender,
  autoScrollToEnd,
  ...restProps
}: Props<T>) {
  const [snapshot, loadingCollection, errorCollection] =
    useCollection(collectionPath);
  const [messages, setMessages] = useState<any[]>([]);
  const [loadingData, setDataLoading] = useState(true);
  const [errorData, setDataError] = useState(false);
  const { activeTheme } = useContext(ThemeContext);
  const divRef = useRef<HTMLDivElement>(null);

  const fetchData = () => {
    const newMessages: any[] = [];
    const querySnapshot = snapshot as QuerySnapshot<DocumentData>;
    querySnapshot.docs.forEach((docRef) => {
      const data = docRef.data();
      newMessages.push({
        sentAt: docRef.id,
        ...data,
      });
    });
    setDataLoading(false);
    setMessages(newMessages);
  };

  useEffect(() => {
    if (autoScrollToEnd && divRef.current) {
      // divRef.current.scrollTop = divRef.current.scrollHeight;
      divRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages, autoScrollToEnd]);

  useEffect(() => {
    if (!loadingCollection && !errorCollection && snapshot) fetchData();
  }, [snapshot]);

  if (loadingCollection || loadingData)
    return <ActivityIndicator size="gigantic" fullscreen />;
  if (errorCollection || errorData) {
    const error =
      errorCollection === true
        ? new Error("Unknown Firebase Error")
        : (errorCollection !== undefined
            ? (errorCollection as Error)
            : undefined) ||
          (errorData === true
            ? new Error("Unknown Firebase Error")
            : undefined);
    return (
      <DisplayError
        permissionDenied={
          (errorCollection as FirebaseError)?.code === "permission-denied"
        }
        error={error}
      />
    );
  }

  return (
    <div ref={divRef}>
      {messages.map((message, ind) => (
        <Message item={message} key={`${hashCode(message)}`} />
      ))}
    </div>
  );
}
