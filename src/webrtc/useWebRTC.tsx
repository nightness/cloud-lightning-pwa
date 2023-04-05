import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { getCurrentUser, deleteCollection } from "../database/Firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export enum CallStage {
  New,
  Initialized,
  Offered,
  Accepted,
  Ended,
}

interface Subscriptions {
  callDoc?: any;
  answerCandidates?: any;
  offerCandidates?: any;
}

const useWebRTC = (servers: RTCConfiguration) => {
  const callId = useRef<string>("");
  const peerConnection = useRef<RTCPeerConnection>(
    new RTCPeerConnection(servers)
  );
  const [stage, setStage] = useState<CallStage>(CallStage.New);

  const [localStream, setLocalStream] = useState<MediaStream>();
  const [remoteStream, setRemoteStream] = useState(new MediaStream());
  const subscriptions = useRef<Subscriptions>({});

  // Clean-up subscriptions and firebase docs
  useEffect(() => () => {
    //alert('webRTC clean-up')
  });

  useEffect(() => {
    console.log("DEBUG: stage changed:", stage);
  }, [stage]);

  const init = useCallback(async () => {
    let currentStream: MediaStream;
    let pc = peerConnection.current;
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
      callId.current = "";
      peerConnection.current = pc;
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
  }, [localStream, peerConnection, remoteStream, servers]);

  const offer = useCallback(async () => {
    const callsCollection = collection(getFirestore(), "calls");
    const docRef = await addDoc(callsCollection, {
      creator: getCurrentUser()?.uid,
      target: getCurrentUser()?.uid,
    });
    const offerCandidatesRef = collection(docRef, "offerCandidates");
    const answerCandidatesRef = collection(docRef, "answerCandidates");

    // Get candidates for caller, save to db
    peerConnection.current.onicecandidate = (event) => {
      event.candidate && addDoc(offerCandidatesRef, event.candidate.toJSON());
    };

    // Create offer
    const offerDescription = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    const creator = getCurrentUser()?.uid;
    console.log("DEBUG: ", { offer, creator, target: creator });
    await setDoc(docRef, { offer, creator, target: creator });

    // Listen for remote answer
    subscriptions.current.callDoc = onSnapshot(docRef, (doc) => {
      const data = doc.data();
      if (!peerConnection.current.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        peerConnection.current.setRemoteDescription(answerDescription);
      }
    });

    // When answered, add candidate to peer connection
    subscriptions.current.answerCandidates = onSnapshot(
      answerCandidatesRef,
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const candidate = new RTCIceCandidate(change.doc.data());
            peerConnection.current.addIceCandidate(candidate);
            setStage(CallStage.Accepted);
          }
        });
      }
    );

    callId.current = docRef.id;
    setStage(CallStage.Offered);
    return docRef.id;
  }, [peerConnection]);

  const answer = useCallback(
    async (cId: string) => {
      const callDoc = doc(getFirestore(), "calls", cId);
      const answerCandidates = collection(callDoc, "answerCandidates");
      const offerCandidates = collection(callDoc, "offerCandidates");

      try {
        subscriptions.current.offerCandidates = onSnapshot(
          offerCandidates,
          (snapshot) => {
            snapshot.docChanges().forEach((change) => {
              console.log(change);
              if (change.type === "added") {
                let data = change.doc.data();
                peerConnection.current.addIceCandidate(
                  new RTCIceCandidate(data)
                );
                callId.current = cId;
                setStage(CallStage.Accepted);
              }
            });
          }
        );
      } catch (error) {
        console.log(error);
      }

      peerConnection.current.onicecandidate = (event) => {
        event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
      };

      const docSnapshot = await getDoc(callDoc);
      const callData = docSnapshot.data() as any;

      console.log("callData", callData);

      const offerDescription = callData.offer;
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(offerDescription)
      );

      const answerDescription = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answerDescription);

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };

      console.log("answer", answer);
      await updateDoc(callDoc, { answer });
    },
    [peerConnection]
  );

  const hangup = useCallback(async () => {
    const tracks = remoteStream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });

    // This stops my stream to the senders, but doesn't not stop me from seeing them
    const senders = peerConnection.current.getSenders();
    senders.forEach((sender) => {
      peerConnection.current.removeTrack(sender);
    });

    // Close the entire connection
    peerConnection.current.close();

    // Unsubscribe to snapshot changes
    subscriptions.current?.answerCandidates();
    subscriptions.current?.offerCandidates();
    subscriptions.current?.callDoc();
    subscriptions.current = {};

    const callDoc = doc(collection(getFirestore(), "calls"), callId.current);

    init();

    const result1 = await deleteCollection(callDoc, "answerCandidates");
    const result2 = await deleteCollection(callDoc, "offerCandidates");
    const result3 = await deleteDoc(callDoc);

    return [result1, result2, result3];
  }, [init, peerConnection, remoteStream]);

  const actions = useMemo(
    () => ({
      init,
      offer,
      answer,
      hangup,
    }),
    [init, offer, answer, hangup]
  );

  return {
    actions,
    localStream,
    remoteStream,
    callStage: stage,
  };
};

export default useWebRTC;
