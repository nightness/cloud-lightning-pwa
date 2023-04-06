import React, { useEffect, useRef, useState } from "react";
import { Alert } from "@blueprintjs/core";
import useWebRTC from "./useWebRTC";
import "./WebRTC.css";
import { Button, Container, Page, TextInput } from "../components";

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

export function WebRTC() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [callId, setCallId] = useState("");
  const { localStream, remoteStream, actions, callStage } = useWebRTC(servers);
  const webcamVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (webcamVideo.current && localStream !== undefined) {
      webcamVideo.current.srcObject = localStream;
    }
    if (remoteVideo.current && remoteStream !== undefined) {
      remoteVideo.current.srcObject = remoteStream;
    }
    console.log(
      "DEBUG: localStream changed:",
      localStream?.id,
      remoteStream?.id
    );
  }, [callStage, webcamVideo, localStream, remoteStream, remoteVideo]);

  const callButtonClick = (
    event: React.MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => {
    actions.offer().then((callId) => setCallId(callId));
  };

  // // 3. Answer the call with the unique ID
  const answerButtonClick = (
    event: React.MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => {
    if (!callId) {
      setAlertMessage(`WebRTC Error: No call ID entered`);
      setIsAlertOpen(true);
      return;
    }
    actions
      .answer(callId)
      .then((result) => {
        // UI doesn't need anything changed
      })
      .catch(console.error);
  };

  const hangupButtonClick = (
    event: React.MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => {
    actions
      .hangup()
      .then(() => setCallId(""))
      .catch(console.error);
  };

  let options;
  switch (callStage) {
    case 0:
      options = (
        <div>
          <h3>Enable Webcam</h3>
          <Button
            text="Start webcam"
            onClick={() => {
              actions.init().catch((error: Error) => {
                setAlertMessage(error.message);
                setIsAlertOpen(true);
              });
            }}
          />
        </div>
      );
      break;
    case 1:
    case 2:
      options = (
        <div style={{ justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <span style={{ flex: 1 }}>
              <h2>Create a new Call</h2>
              <Button
                text="Create Call (offer)"
                onClick={callButtonClick}
                disabled={!localStream}
              />
            </span>
            <span
              style={{
                flex: 1,
                alignContent: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <h2>Answer a Call</h2>
              <TextInput
                className="call-id-input"
                value={callId}
                onChangeValue={(value) => setCallId(value)}
              />
              <Button text="Answer" onClick={answerButtonClick} />
            </span>
          </div>
        </div>
      );
      break;
    case 3:
      options = (
        <div>
          <h2>Hangup</h2>
          <Button text="Hangup" onClick={hangupButtonClick} />
        </div>
      );
  }

  return (
    <>
      <Alert
        canEscapeKeyCancel
        canOutsideClickCancel
        intent="primary"
        icon="error"
        confirmButtonText="Okay"
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
      >
        <p>{alertMessage}</p>
      </Alert>

      <Page>
        <Container>
          <div className="videos">
            <span>
              <h1>Local Stream</h1>
              <video
                ref={webcamVideo}
                id="webcamVideo"
                autoPlay
                playsInline
                muted
              ></video>
            </span>
            {callStage >= 1 ? (
              <span>
                <h1>Remote Stream</h1>
                <video ref={remoteVideo} autoPlay playsInline />
              </span>
            ) : (
              <></>
            )}
          </div>
          {options}
        </Container>
      </Page>
    </>
  );
}

export default WebRTC;
