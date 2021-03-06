import React, { createContext, useState, useRef, useEffect } from "react";
import {
  getCurrentUser,
  getFirestore,
  deleteCollection,
} from "../database/Firebase";

export enum CallStage {
  New,
  Initialized,
  Offered,
  Accepted,
  Ended,
}

export interface WebRtcActions {
  init: () => Promise<any>;
  offer: () => Promise<string>;
  answer: (callId: string) => Promise<any>;
  hangup: () => Promise<any>;
}

type ContextType = {
  localStream?: MediaStream;
  remoteStream: MediaStream;
  callStage: CallStage;
  actions: WebRtcActions;
};

export const WebRtcContext = createContext<ContextType>({
  actions: {
    init: async () => undefined,
    offer: async () => "",
    answer: async (callId: string) => undefined,
    hangup: async () => undefined,
  },
  callStage: CallStage.New,
  remoteStream: new MediaStream(),
});

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

interface Subscriptions {
  callDoc?: any;
  answerCandidates?: any;
  offerCandidates?: any;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const WebRtcProvider = ({ children }: Props) => {
  const [callId, setCallId] = useState<string>("");
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection>(
    new RTCPeerConnection(servers)
  );
  const [stage, setStage] = useState<CallStage>(CallStage.New);
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [remoteStream, setRemoteStream] = useState(new MediaStream());
  const subscriptions = useRef<Subscriptions>({});

  // Clean-up subscriptions and firebase docs
  useEffect(() => () => {
    //alert('webRTC clean-up')
  })

  const init = async () => {
    let currentStream: MediaStream;
    let pc = peerConnection;
    let rStream = remoteStream;
    if (!localStream) {
      currentStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(currentStream);
    } else {
      pc = new RTCPeerConnection(servers);
      currentStream = localStream;
      rStream = new MediaStream();
      setCallId("");
      setPeerConnection(pc);
      setRemoteStream(rStream);
    }

    const tracks = currentStream.getTracks();

    // Push tracks from local stream to peer connection
    tracks?.forEach((track) => {
      pc.addTrack(track, currentStream);
    });

    // Pull tracks from remote stream, add to video stream
    pc.ontrack = (event) => {
      event.streams?.[0].getTracks().forEach((track) => {
        rStream.addTrack(track);
      });
    };
    setStage(CallStage.Initialized);
  };

  const offer = async () => {
    const callDoc = getFirestore().collection("calls").doc();
    const offerCandidates = callDoc.collection("offerCandidates");
    const answerCandidates = callDoc.collection("answerCandidates");

    // Get candidates for caller, save to db
    peerConnection.onicecandidate = (event) => {
      event.candidate && offerCandidates.add(event.candidate.toJSON());
    };

    // Create offer
    const offerDescription = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    const creator = getCurrentUser()?.uid;
    await callDoc.set({ offer, creator, target: creator });

    // Listen for remote answer
    subscriptions.current.callDoc = callDoc.onSnapshot((snapshot) => {
      const data = snapshot.data();
      if (!peerConnection.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        peerConnection.setRemoteDescription(answerDescription);
      }
    });

    // When answered, add candidate to peer connection
    subscriptions.current.answerCandidates = answerCandidates.onSnapshot(
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const candidate = new RTCIceCandidate(change.doc.data());
            peerConnection.addIceCandidate(candidate);
            setStage(CallStage.Accepted);
          }
        });
      }
    );
    setCallId(callDoc.id);
    setStage(CallStage.Offered);
    return callDoc.id;
  };

  const answer = async (callId: string) => {
    const callDoc = getFirestore().collection("calls").doc(callId);
    const answerCandidates = callDoc.collection("answerCandidates");
    const offerCandidates = callDoc.collection("offerCandidates");

    peerConnection.onicecandidate = (event) => {
      event.candidate && answerCandidates.add(event.candidate.toJSON());
    };

    const callData = (await callDoc.get()).data();

    const offerDescription = callData?.offer;
    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(offerDescription)
    );

    const answerDescription = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    //console.log('pre callData')
    await callDoc.update({ answer });

    try {
      subscriptions.current.offerCandidates = offerCandidates.onSnapshot(
        (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            console.log(change);
            if (change.type === "added") {
              let data = change.doc.data();
              peerConnection.addIceCandidate(new RTCIceCandidate(data));
              setCallId(callId);
              setStage(CallStage.Accepted);
            }
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const hangup = async () => {
    const tracks = remoteStream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });

    // This stops my stream to the senders, but doesn't not stop me from seeing them
    const senders = peerConnection.getSenders();
    senders.forEach((sender) => {
      peerConnection.removeTrack(sender);
    });

    // Close the entire connection
    peerConnection.close();

    // Unsubscribe to snapshot changes
    // subscriptions.current?.answerCandidates()
    // subscriptions.current?.offerCandidates()
    // subscriptions.current?.callDoc()
    // subscriptions.current = {}

    const callDoc = getFirestore().collection("calls").doc(callId);

    init();

    const result1 = await deleteCollection(callDoc, "answerCandidates", 20);
    const result2 = await deleteCollection(callDoc, "offerCandidates", 20);
    const result3 = await callDoc.delete();

    return [result1, result2, result3];
  };

  return (
    <WebRtcContext.Provider
      value={{
        actions: {
          init,
          offer,
          answer,
          hangup,
        },
        localStream,
        remoteStream,
        callStage: stage,
      }}
    >
      {children}
    </WebRtcContext.Provider>
  );
};
