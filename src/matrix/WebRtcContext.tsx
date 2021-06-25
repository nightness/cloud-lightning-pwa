import React, { createContext, useState, useRef } from 'react';
import { getCurrentUser, getFirestore } from '../database/Firebase'

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

interface WebRtcActions {
    init: (src?: MediaStream) => any
    offer: () => Promise<string>
    answer: (callId: string) => Promise<any>
}

type ContextType = {
    localStream?: MediaStream
    remoteStream?: MediaStream
    actions: WebRtcActions
}

export const WebRtcContext = createContext<ContextType>({
    actions: {
        init: (src?: MediaStream) => undefined,
        offer: async () => '',
        answer: async (callId: string) => undefined
    }
})


interface Props {
    children: JSX.Element | JSX.Element[]
}

export const WebRtcProvider = ({ children }: Props) => {
    const peerConnection = useRef(new RTCPeerConnection(servers))
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [localStream, setLocalStream] = useState<MediaStream>();
    const [remoteStream, setRemoteStream] = useState(new MediaStream());
    const [name, setName] = useState('');
    const [call, setCall] = useState({});
    const [me, setMe] = useState('');
    const connectionRef = useRef<HTMLVideoElement>(null);

    const init = (stream?: MediaStream) => {
        if (stream) {
            setLocalStream(stream)
            return
        }
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setLocalStream(currentStream);

                // Mute localStream
                const tracks = currentStream.getTracks()

                // Push tracks from local stream to peer connection
                tracks?.forEach((track) => {
                    peerConnection.current.addTrack(track, currentStream)
                })

                // Pull tracks from remote stream, add to video stream
                peerConnection.current.ontrack = (event) => {
                    event.streams?.[0].getTracks().forEach((track) => {
                        remoteStream.addTrack(track)
                    })
                }
            }).catch((error) => {
                throw error
            })
    }

    const offer = async () => {
        const callDoc = getFirestore().collection('calls').doc();
        const offerCandidates = callDoc.collection('offerCandidates');
        const answerCandidates = callDoc.collection('answerCandidates');

        // Get candidates for caller, save to db
        peerConnection.current.onicecandidate = (event) => {
            event.candidate && offerCandidates.add(event.candidate.toJSON());
        };

        // Create offer
        const offerDescription = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offerDescription);

        const offer = {
            sdp: offerDescription.sdp,
            type: offerDescription.type,
        };

        await callDoc.set({ offer, creator: getCurrentUser()?.uid });

        // Listen for remote answer
        callDoc.onSnapshot((snapshot) => {
            const data = snapshot.data()
            if (!peerConnection.current.currentRemoteDescription && data?.answer) {
                const answerDescription = new RTCSessionDescription(data.answer)
                peerConnection.current.setRemoteDescription(answerDescription)
            }
        })

        // When answered, add candidate to peer connection
        answerCandidates.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const candidate = new RTCIceCandidate(change.doc.data())
                    peerConnection.current.addIceCandidate(candidate)
                }
            })
        })

        return callDoc.id
    }

    const answer = async (callId: string) => {
        const callDoc = getFirestore().collection('calls').doc(callId);
        const answerCandidates = callDoc.collection('answerCandidates');
        const offerCandidates = callDoc.collection('offerCandidates');

        peerConnection.current.onicecandidate = (event) => {
            event.candidate && answerCandidates.add(event.candidate.toJSON());
        };

        const callData = (await callDoc.get()).data();

        const offerDescription = callData?.offer;
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offerDescription));

        const answerDescription = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answerDescription);

        const answer = {
            type: answerDescription.type,
            sdp: answerDescription.sdp,
        };

        await callDoc.update({ answer });

        offerCandidates.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                console.log(change);
                if (change.type === 'added') {
                    let data = change.doc.data();
                    peerConnection.current.addIceCandidate(new RTCIceCandidate(data));
                }
            })
        })
    }

    return (
        <WebRtcContext.Provider value={{
            // call,
            // callAccepted,
            actions: {
                init,
                offer,
                answer
            },
            localStream,
            remoteStream
            // localStream,
            // name,
            // setName,
            // callEnded,
            // me,
            // callUser,
            // leaveCall,
            // answerCall,
        }}
        >
            {children}
        </WebRtcContext.Provider>
    );
};
