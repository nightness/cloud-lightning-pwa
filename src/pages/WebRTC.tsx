import React, { useEffect, useRef, useState, MouseEvent, useContext } from 'react';
import { Button, EditableText, Text, H1, H2, H3, H4, H5 } from '@blueprintjs/core'
import { WebRtcContext } from '../matrix/WebRtcContext';
import './WebRTC.css'

const servers = {
  iceServers: [
    {
      urls: [
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
      ],
    },
  ],
  iceCandidatePoolSize: 10,
}

export function WebRTC() {
  const [stage, setStage] = useState<1 | 2 | 3>(1)
  const [isLoading, setIsLoading] = useState(true)
  const { localStream, remoteStream, actions } = useContext(WebRtcContext)
  const webcamButton = useRef<HTMLButtonElement>(null)
  const webcamVideo = useRef<HTMLVideoElement>(null)
  const callButton = useRef<HTMLButtonElement>(null)
  const callInput = useRef<EditableText>(null)
  const answerButton = useRef<Button>(null)
  const remoteVideo = useRef<HTMLVideoElement>(null)
  const hangupButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!webcamVideo.current || localStream === undefined) return
    webcamVideo.current.srcObject = localStream
    webcamVideo.current.muted = true
    setStage(2)
  }, [localStream, webcamVideo])

  const webcamButtonClick = (event: React.MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    actions.init(localStream)
  }

  const callButtonClick = (event: React.MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    actions.offer().then((callId) => {
      if (!callId) {
        alert('Unable to create call')
        return
      }
      const state = callInput.current?.state
      if (state !== undefined && callInput.current)
        callInput.current.setState({
          ...state,
          value: callId
        })
    })
  }

  // // 3. Answer the call with the unique ID
  const answerButtonClick = (event: React.MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    const callId = callInput.current?.state.value
    if (!callId) {
      console.error(`WebRTC Error: No call ID entered`)
      return
    }
    actions.answer(callId).then((result) => {
      if (hangupButton.current)
        hangupButton.current.disabled = false
    })
  }


  // const resetState = () => {
  //   peerConnection.close()
  //   setPeerConnection(new RTCPeerConnection(servers))
  //   if (localStream) localStream.close()
  //   localStream = undefined
  //   if (remoteStream) remoteStream.close()
  //   remoteStream = null
  //   callInput.value = ''
  //   hangupButton?.disabled = true
  //   webcamButton?.disabled = false
  // }

  const hangupButtonClick = (event: React.MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    // const tracks = webcamVideo.srcObject.getTracks()
    // tracks.forEach((track) => {
    //   track.stop()
    // })

    // if (remoteStream)
    //   remoteStream.getTracks().forEach((track) => track.stop())

    // // This stops my stream to the senders, but doesn't not stop me from seeing them
    // const senders = peerConnection.getSenders()
    // senders.forEach((sender) => {
    //   peerConnection.removeTrack(sender)
    // })

    // // Close the entire connection
    // peerConnection.close()

    // // Clean-up the database
    // const result = await functions.httpsCallable('hangupCall')({
    //   id: callInput.value,
    // })

    // resetState()
  }

  let options
  switch (stage) {
    case 1: options =
      (<div>
        <H3>Enable Webcam</H3>
        <Button
          onClick={webcamButtonClick}
          elementRef={webcamButton}>
          Start webcam
        </Button>
      </div>)
      break;
    case 2: options =
      (
        <div style={{ justifyContent: 'center' }}>
          <H5>Requires a Google or Email authenticated account to use</H5>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <span style={{ flex: 1 }}>
              <H2>Create a new Call</H2>
              <Button
                onClick={callButtonClick}
                elementRef={callButton}
                disabled={!localStream}>
                Create Call (offer)
              </Button>
            </span>
            <span style={{ flex: 1, alignContent: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              <H2>Answer a Call</H2>
              <EditableText ref={callInput} />
              <Button
                onClick={answerButtonClick}
                ref={answerButton}
                disabled>
                Answer
              </Button>
            </span>
          </div>
        </div>
      )
      break;
    case 3: options =
      (
        <div>
          <H2>Hangup</H2>
          <Button
            onClick={hangupButtonClick}
            elementRef={hangupButton}
            disabled>
            Hangup
          </Button>
        </div>
      )
  }

  return (
    <div className="WebRTC">
      <div className="videos">
        <span>
          <H3>Local Stream</H3>
          <video ref={webcamVideo} id="webcamVideo" autoPlay playsInline></video>
        </span>
        {stage >= 2 ?
          <span>
            <H3>Remote Stream</H3>
            <video ref={remoteVideo} autoPlay playsInline />
          </span>
          : <></>
        }
      </div>
      {options}
    </div>
  );
}

export default WebRTC