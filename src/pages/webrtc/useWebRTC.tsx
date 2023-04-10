import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { deleteCollection, getCurrentUser } from "../../database/Firebase";
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
  const subscriptions = useRef<Subscriptions>({});

  const [stage, setStage] = useState<CallStage>(CallStage.New);
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [remoteStream, setRemoteStream] = useState(new MediaStream());

  useEffect(() => () => {
    console.log("DEBUG: useWebRTC: unmounting");
  });

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

    // Create offer
    const offerDescription = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    const creator = getCurrentUser()?.uid;
    await setDoc(docRef, { offer, creator, target: creator });

    callId.current = docRef.id;
    setStage(CallStage.Offered);
    return docRef.id;
  }, [peerConnection]);

  const answer = useCallback(
    async (cId: string) => {
      const callDoc = doc(getFirestore(), "calls", cId);
      const answerCandidates = collection(callDoc, "answerCandidates");
      const offerCandidates = collection(callDoc, "offerCandidates");

      subscriptions.current.offerCandidates = onSnapshot(
        offerCandidates,
        (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              let data = change.doc.data();
              peerConnection.current.addIceCandidate(new RTCIceCandidate(data));

              // TODO: Is this needed?
              callId.current = cId;

              setStage(CallStage.Accepted);
            }
          });
        }
      );

      peerConnection.current.onicecandidate = (event) => {
        event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
      };

      const docSnapshot = await getDoc(callDoc);
      const callData = docSnapshot.data() as any;

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

      await updateDoc(callDoc, { answer });
    },
    [peerConnection]
  );

  const hangup = useCallback(async () => {
    try {
      if (remoteStream.active) {
        const tracks = remoteStream.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
      }
    } catch (e) {
      console.log("ERROR1: ", e);
    }

    try {
      if (localStream?.active) {
        // This stops my stream to the senders, but doesn't not stop me from seeing them
        const senders = peerConnection.current.getSenders();
        senders.forEach((sender) => {
          peerConnection.current.removeTrack(sender);
        });
      }
    } catch (e) {
      console.log("ERROR2: ", e);
    }

    try {
      if (peerConnection.current.signalingState !== "closed") {
        // Close the entire connection
        peerConnection.current.close();
      }
    } catch (e) {
      console.log("ERROR3: ", e);
    }

    try {
      // Unsubscribe to snapshot changes
      subscriptions.current?.answerCandidates?.();
      subscriptions.current?.offerCandidates?.();
      subscriptions.current?.callDoc?.();
      subscriptions.current = {};
    } catch (e) {
      console.log("ERROR4: ", e);
    }

    try {
      const callDoc = doc(collection(getFirestore(), "calls"), callId.current);

      await deleteCollection(callDoc, "answerCandidates");
      await deleteCollection(callDoc, "offerCandidates");
      await deleteDoc(callDoc);
    } catch (e) {
      console.log("ERROR5: ", e);
    }

    init();
  }, [init, peerConnection, localStream, remoteStream]);

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
