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
    // // Create a new call
    // functions.httpsCallable('createCall')({
    //   target: auth.currentUser.uid,
    // }).then(({ data: call }) => {

    // })

    // if (call === undefined || call.id === undefined) {
    //   alert('Unable to create call')
    //   return
    // }

    // // Reference Firestore collections for signaling
    // const callDoc = firestore.collection('calls').doc(call.id)
    // const offerCandidates = callDoc.collection('offerCandidates')
    // const answerCandidates = callDoc.collection('answerCandidates')

    // // Get candidates for caller, save to db
    // peerConnection.onicecandidate = ({ candidate }) => {
    //   candidate && offerCandidates.add(candidate.toJSON())
    // }

    // // Create offer
    // const offerDescription = await peerConnection.createOffer()
    // await peerConnection.setLocalDescription(offerDescription)

    // // TODO: Add the target of the call to the offer
    // const offer = {
    //   sdp: offerDescription.sdp,
    //   type: offerDescription.type,
    // }

    // const { data: resultData } = await functions.httpsCallable(
    //   'setCallOffer'
    // )({ id: call.id, offer })
    // if (resultData.error) {
    //   console.error(resultData.error)
    //   return
    // }

    // // Update textbox
    // callInput.value = call.id

    // // Listen for remote answer
    // callDoc.onSnapshot((snapshot) => {
    //   const data = snapshot.data()
    //   if (!peerConnection.currentRemoteDescription && data?.answer) {
    //     const answerDescription = new RTCSessionDescription(data.answer)
    //     peerConnection.setRemoteDescription(answerDescription)
    //   }
    // })

    // // When answered, add candidate to peer connection
    // answerCandidates.onSnapshot((snapshot) => {
    //   snapshot.docChanges().forEach((change) => {
    //     if (change.type === 'added') {
    //       const candidate = new RTCIceCandidate(change.doc.data())
    //       peerConnection.addIceCandidate(candidate)
    //       hangupButton.disabled = false
    //     }
    //   })
    // })
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

  // // 3. Answer the call with the unique ID
  const answerButtonClick = (event: React.MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    // const callId = callInput.value
    // const callDoc = firestore.collection('calls').doc(callId)
    // const answerCandidates = callDoc.collection('answerCandidates')
    // const offerCandidates = callDoc.collection('offerCandidates')

    // peerConnection.onicecandidate = (event) => {
    //   event.candidate && answerCandidates.add(event.candidate.toJSON())
    // }

    // const { offer } = (await callDoc.get()).data()
    // console.log(offer)
    // await peerConnection.setRemoteDescription(new RTCSessionDescription(offer))

    // const answerDescription = await peerConnection.createAnswer()
    // await peerConnection.setLocalDescription(answerDescription)

    // const answer = {
    //   type: answerDescription.type,
    //   sdp: answerDescription.sdp,
    // }

    // const { data: resultData } = await functions.httpsCallable('answerCall')({
    //   id: callId,
    //   answer,
    // })
    // if (resultData.error) {
    //   console.error(resultData.error)
    //   return
    // }

    // hangupButton.disabled = false

    // offerCandidates.onSnapshot((snapshot) => {
    //   snapshot.docChanges().forEach((change) => {
    //     if (change.type === 'added') {
    //       let data = change.doc.data()
    //       peerConnection.addIceCandidate(new RTCIceCandidate(data))
    //     }
    //   })
    // })

  }

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