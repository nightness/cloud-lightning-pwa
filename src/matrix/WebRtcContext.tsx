import React, { createContext, useState, useRef } from 'react';

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
}

type ContextType = {
    localStream?: MediaStream
    remoteStream?: MediaStream
    actions?: WebRtcActions
}

export const WebRtcContext = createContext<ContextType>({

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

    return (
        <WebRtcContext.Provider value={{
            // call,
            // callAccepted,
            actions: {
                init
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
