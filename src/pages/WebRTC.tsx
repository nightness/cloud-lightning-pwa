import React, {
  useEffect,
  useRef,
  useState,
  MouseEvent,
  useContext,
} from "react";
import {
  Button,
  EditableText,
  Text,
  H1,
  H2,
  H3,
  H4,
  H5,
} from "@blueprintjs/core";
import { CallStage, WebRtcContext } from "../matrix/WebRtcContext";
import "./WebRTC.css";

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

export function WebRTC() {
  const [isLoading, setIsLoading] = useState(true);
  const { localStream, remoteStream, actions, callStage } =
    useContext(WebRtcContext);
  const webcamButton = useRef<HTMLButtonElement>(null);
  const webcamVideo = useRef<HTMLVideoElement>(null);
  const callButton = useRef<HTMLButtonElement>(null);
  const callInput = useRef<EditableText>(null);
  const answerButton = useRef<Button>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);
  const hangupButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (webcamVideo.current) {
      webcamVideo.current.muted = true
    if (localStream !== undefined)
      webcamVideo.current.srcObject = localStream
    }
    if (remoteVideo.current && remoteStream !== undefined)
      remoteVideo.current.srcObject = remoteStream;
  }, [callStage, webcamVideo, localStream, remoteStream, remoteVideo])

  const callButtonClick = (
    event: React.MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => {
    actions.offer().then((callId) => {
      const state = callInput.current?.state;
      if (state !== undefined && callInput.current)
        callInput.current.setState({
          ...state,
          value: callId,
        })
    })
  }

  // // 3. Answer the call with the unique ID
  const answerButtonClick = (
    event: React.MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => {
    const callId = callInput.current?.state.value;
    if (!callId) {
      console.error(`WebRTC Error: No call ID entered`)
      return;
    }
    actions
      .answer(callId)
      .then((result) => {
        // UI doesn't need anything changed
      })
      .catch((error) => console.error(error))
  };

  const hangupButtonClick = (
    event: React.MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => {
    actions
      .hangup()
      .then((result) => {
        if (callInput.current) {
          const state = callInput.current.state
          callInput.current.setState({
            ...state,
            value: '',
          });
        }
        actions.reset();
      })
      .catch((error) => console.error(error));
  };

  let options;
  switch (callStage) {
    case 0:
      options = (
        <div>
          <H3>Enable Webcam</H3>
          <Button
            onClick={() => {
              actions.init(localStream)
                .catch((error: Error) => alert(error.message))
            }}
            elementRef={webcamButton}
          >
            Start webcam
          </Button>
        </div>
      );
      break;
    case 1:
    case 2:
      options = (
        <div style={{ justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <span style={{ flex: 1 }}>
              <H2>Create a new Call</H2>
              <Button
                onClick={callButtonClick}
                elementRef={callButton}
                disabled={!localStream}
              >
                Create Call (offer)
              </Button>
            </span>
            <span
              style={{
                flex: 1,
                alignContent: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <H2>Answer a Call</H2>
              <EditableText ref={callInput} />
              <Button onClick={answerButtonClick} ref={answerButton}>
                Answer
              </Button>
            </span>
          </div>
        </div>
      );
      break;
    case 3:
      options = (
        <div>
          <H2>Hangup</H2>
          <Button onClick={hangupButtonClick} elementRef={hangupButton}>
            Hangup
          </Button>
        </div>
      );
  }

  return (
    <div className="WebRTC">
      <div className="videos">
        <span>
          <H3>Local Stream</H3>
          <video
            ref={webcamVideo}
            id="webcamVideo"
            autoPlay
            playsInline
          ></video>
        </span>
        {callStage >= 1 ? (
          <span>
            <H3>Remote Stream</H3>
            <video ref={remoteVideo} autoPlay playsInline />
          </span>
        ) : (
          <></>
        )}
      </div>
      {options}
    </div>
  );
}

export default WebRTC;
