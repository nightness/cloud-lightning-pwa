import React, { useState, useContext, useEffect, useRef } from "react";
import { Page, TextInput, Button, ThemeContext } from "../components";
import FirestoreCollectionView from "../database/FirestoreCollectionView";
import firebase, {
  DocumentData,
  QuerySnapshot,
  useCollection,
} from "../database/Firebase";
import Message from "./Message";
import { EditableText } from "@blueprintjs/core";
import { FirebaseContext } from "../database/FirebaseContext";

export default () => {
  const { currentUser } = useContext(FirebaseContext);
  const messageCollectionPath = `/walls/${currentUser?.uid}/messages`;
  const [snapshot, loadingCollection, errorCollection] = useCollection(
    messageCollectionPath,
    true
  );
  const [messageText, setMessageText] = useState<string | null>(null);
  const textInput = useRef<EditableText>();
  const querySnapshot = snapshot as QuerySnapshot<DocumentData>;

  // useEffect(() => {
  //   textInput.current?.focus()
  // }, [textInput]);

  // useEffect(() => {
  //   if (loadingCollection || errorCollection || !snapshot) return;
  //   //console.log("=> ", querySnapshot.docs);
  //   querySnapshot.docs.forEach((docRef) => {
  //     console.log("* ", docRef);
  //   });
  // }, [snapshot, loadingCollection, errorCollection]);

  const sendMessage = () => {
    if (!messageText || messageText.length === 0) return;
    console.log("Send: ", messageText);
    const postTime = `${Date.now()}`;
    firebase
      .firestore()
      .collection(`/walls/${currentUser?.uid}/messages`)
      .doc(postTime)
      .set({
        message: messageText,
        authorName: currentUser?.displayName,
        photoURL: currentUser?.photoURL,
      })
      .then(() => new Promise(() => setMessageText("")))
      .catch(console.error);
  };

  return (
    <Page>
      <div className="messenger-message-content">
        <FirestoreCollectionView<Message>
          collectionPath={messageCollectionPath}
          autoScrollToEnd={true}
          orderBy="postedAt"
          limitLength={25}
          // @ts-ignore
          renderItem={({ item }) => <Message item={item} />}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', paddingTop: '10px' }}>
        <TextInput
          value={messageText ?? ""}
          onChangeValue={(value) => setMessageText(value)}
          onKeyDown={(event) => {
            if (event.key !== "Enter") return;
            sendMessage();
          }}
        />
        <Button text="Send" onClick={sendMessage} />
      </div>
    </Page>
  );
};
