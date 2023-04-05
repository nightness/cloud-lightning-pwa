import React, { useState, useContext, useRef } from "react";
import { TextInput, Button, Container } from "../components";
import FirestoreCollectionView from "../database/FirestoreCollectionView";
import {
  // DocumentData,
  // QuerySnapshot,
  useCollection,
} from "../database/Firebase";
import Message from "./Message";
// import { EditableText } from "@blueprintjs/core";
import { FirebaseContext } from "../database/FirebaseContext";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";

function WallMessenger() {
  const { currentUser } = useContext(FirebaseContext);
  const messageCollectionPath = `/walls/${currentUser?.uid}/messages`;
  const [snapshot, loadingCollection, errorCollection] = useCollection(
    messageCollectionPath,
    true
  );
  const [messageText, setMessageText] = useState<string | null>(null);
  // const textInput = useRef<EditableText>();
  // const querySnapshot = snapshot as QuerySnapshot<DocumentData>;

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
    const collectionRef = collection(
      getFirestore(),
      `/walls/${currentUser?.uid}/messages`
    );
    const docRef = doc(collectionRef, postTime);
    setDoc(docRef, {
      message: messageText,
      authorName: currentUser?.displayName,
      photoURL: currentUser?.photoURL,
    })
      .then(() => new Promise(() => setMessageText("")))
      .catch(console.error);
  };

  return (
    <Container>
      <div className="messenger-message-content">
        <FirestoreCollectionView<Message>
          collectionPath={messageCollectionPath}
          autoScrollToEnd={true}
          orderBy="sentAt"
          limitLength={25}
          // @ts-ignore
          renderItem={({ item }) => <Message item={item} />}
        />
      </div>
      <div
        style={{
          display: "relative",
          justifyContent: "center",
          alignContent: "center",
          bottom: 0,
          left: 0,
          width: "100%",
          paddingTop: "10px",
          paddingLeft: "5px",
          marginLeft: "5px",
          paddingRight: "5px",
          marginRight: "5px",
        }}
      >
        <TextInput
          style={{ width: "70vw" }}
          value={messageText ?? ""}
          onChangeValue={(value) => setMessageText(value)}
          onKeyDown={(event) => {
            if (event.key !== "Enter") return;
            sendMessage();
          }}
        />
        <Button
          style={{ minWidth: "15vw" }}
          text="Send"
          onClick={sendMessage}
        />
      </div>
    </Container>
  );
}

export default WallMessenger;
