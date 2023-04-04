import React, { useState, useEffect, useContext } from "react";
import { useCollection, DocumentData, QuerySnapshot } from "./Firebase";
import { ActivityIndicator, DisplayError, ThemeContext } from "../components";
import { FirebaseError } from "./Firebase";
import Message from "../messenger/Message";

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
    <>
      {messages.map((message, ind) => (
        <Message item={message} key={`${Math.random()}`} />
      ))}
    </>
  );
}
