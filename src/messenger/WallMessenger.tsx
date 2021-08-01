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

const messageCollectionPath = "/profiles";

export default () => {
  const [snapshot, loadingCollection, errorCollection] = useCollection(
    messageCollectionPath,
    true
  );
  const { currentUser } = useContext(FirebaseContext)
  const [members, setMembers] = useState<any[]>([]);
  //const [selectedMember, setSelectedMember] = useState<PickerItem>()
  const [messageText, setMessageText] = useState<string | null>(null);
  const textInput = useRef<EditableText>();
  const querySnapshot = snapshot as QuerySnapshot<DocumentData>;

  useEffect(() => {
    //textInput.current?.focus()
  }, [textInput]);

  useEffect(() => {
    if (loadingCollection || errorCollection || !snapshot) return;
    var newState: any[] = [];    
    //console.log("=> ", querySnapshot.docs);
    querySnapshot.docs.forEach((docRef) => {
      //console.log("*", docRef);
      const push = async (docRef: DocumentData) => {
        //if (docRef.id === currentUser?.uid) return
        const name = await docRef.get("displayName");
        newState.push({
          label: name || `{${docRef.id}}`,
          value: docRef.id,
        });
      };
      push(docRef)
        .then(() => setMembers(newState))
        .catch((err) => console.error(err));
    });
  }, [snapshot, loadingCollection, errorCollection]);

  useEffect(() => {
    //console.log(members);
  }, [members]);

  // useEffect(() => {
  //     if (selectedMember && selectedMember.value)
  //         setMessageCollectionPath(`/walls/${selectedMember.value}/messages/`)
  //     console.log(selectedMember)
  // }, [selectedMember])

  // useEffect(() => {
  //     console.log(claims)
  // }, [claims])

  const sendMessage = () => {
      if (!messageText || messageText.length === 0) return;
      const text = messageText
      console.log('Send: ', messageText)
      setMessageText('')
      // const docRef = firebase.firestore().doc(`/walls/${currentUser}`);
      // docRef.get().then((dataRef) => {
          
      // })
      // callFirebaseFunction('setMessage', {
      //     collectionPath: `/walls`,
      //     documentId: selectedMember.value,
      //     message: text,
      // }).then((results) => {
  }

  return (
    <Page>
      {/* <div>
        <select name="members" id="members">
          {members.map((member, idx) => {
            console.log("member: ", member.label)
            return (
              <option key={idx} value={idx}>
                {member.label}
              </option>
            );
          })}
        </select>
      </div> */}
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
      <div>
        <TextInput
          style={{ width: '80%', marginTop: "10px" }}
          value={messageText ?? ""}
          onChangeValue={(value) => setMessageText(value)}
          onKeyDown={(event) => {
            if (event.key !== 'Enter') return;
            sendMessage()
          }}
        />
      </div>
    </Page>
  );
};
