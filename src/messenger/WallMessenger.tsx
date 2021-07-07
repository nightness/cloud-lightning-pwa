import React, { useState, useContext, useEffect, useRef } from "react";
import { Container, TextInput, Button, ThemeContext } from "../components";
import FirestoreCollectionView from "../database/FirestoreCollectionView";
import {
  DocumentData,
  QuerySnapshot,
  useCollection,
  callFirebaseFunction,
} from "../database/Firebase";
import { FirebaseContext } from "../database/FirebaseContext";
import Message from "./Message";
import { EditableText } from "@blueprintjs/core";

const messageCollectionPath = "/profiles";

export default () => {
  const { currentUser } = useContext(FirebaseContext);
  const { activeTheme, getThemedComponentStyle } = useContext(ThemeContext);
  const [snapshot, loadingCollection, errorCollection] = useCollection(
    messageCollectionPath, true
  );
  const [members, setMembers] = useState<any[]>([]);
  //const [selectedMember, setSelectedMember] = useState<PickerItem>()
  const [messageText, setMessageText] = useState<string>("");
  const textInput = useRef<EditableText>();

  useEffect(() => {
    //textInput.current?.focus()
  }, [textInput]);

  useEffect(() => {
    if (loadingCollection || errorCollection || !snapshot) return;
    var newState: any[] = [];
    const querySnapshot = snapshot as QuerySnapshot<DocumentData>;
    console.log('=> ', querySnapshot.docs)
    querySnapshot.docs.forEach((docRef) => {
      console.log('*', docRef)
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
    console.log(members);
  }, [members]);

  // useEffect(() => {
  //     if (selectedMember && selectedMember.value)
  //         setMessageCollectionPath(`/walls/${selectedMember.value}/messages/`)
  //     console.log(selectedMember)
  // }, [selectedMember])

  // useEffect(() => {
  //     console.log(claims)
  // }, [claims])

  // const sendMessage = () => {
  //     if (!selectedMember) return
  //     const text = messageText
  //     setMessageText('')
  //     console.log(`sendMessage: ${selectedMember.value}`)
  //     callFirebaseFunction('setMessage', {
  //         collectionPath: `/walls`,
  //         documentId: selectedMember.value,
  //         message: text,
  //     }).then((results) => {
  //         const data = results.data
  //         if (typeof data.type === 'string') {
  //             console.error(data.message)
  //             if (data.type === 'silent') return
  //             alert(data.message)
  //         } else {
  //             console.log(data)
  //         }
  //         textInput.current?.focus()
  //     }).catch((error) => {
  //         console.error(error)
  //     })
  // }

  // const onMessageKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
  //     if (e.nativeEvent.key != 'Enter') return
  //     // Adds a new message to the chatroom
  //     sendMessage()
  // }

  return (
    <Container>
      <div>
        <select name="members" id="members">
          {members.map((member, idx) => {
            return (
              <option key={idx} value={idx}>
                {member.name}
              </option>
            );
          })}
        </select>
        {/* <Picker
                    style={getThemedComponentStyle('Text')[activeTheme]}
                    data={members}
                    onValueChanged={setSelectedMember}
                /> */}
      </div>
      <FirestoreCollectionView<Message>
        collectionPath={messageCollectionPath}
        autoScrollToEnd={true}
        orderBy="postedAt"
        limitLength={25}
        // @ts-ignore
        renderItem={({ item }) => <Message item={item} />}
      />
      <div>
        <TextInput
          value={messageText}
          onChange={
            (event: React.ChangeEvent) => undefined
            //setMessageText(event.nativeEvent.returnValue)
          }
          //onConfirm={onMessageKeyPress}
        />
        <Button
          title="Send"
          disabled={messageText.length < 1}
          //onPress={sendMessage}
        />
      </div>
    </Container>
  );
};
