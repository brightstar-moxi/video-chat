



"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";

export default function CallPage() {
  const { userId } = useAuth();
  const params = useParams();
  const router = useRouter();

  const callId = params.id as string;

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
const [mediaReady, setMediaReady] = useState(false);
  const peerConnectionRef =
    useRef<RTCPeerConnection | null>(null);

  const localStreamRef =
    useRef<MediaStream | null>(null);

  const processedCandidatesRef =
    useRef(new Set<string>());

  const [cameraEnabled, setCameraEnabled] =
    useState(true);

  const [micEnabled, setMicEnabled] =
    useState(true);

  const currentUser = useQuery(
    api.users.getCurrentUser,
    userId ? { clerkId: userId } : "skip"
  );

  const call = useQuery(
    api.calls.getCall,
    callId ? { callId: callId as any } : "skip"
  );

  const candidates = useQuery(
    api.calls.getCandidates,
    currentUser && callId
      ? {
          callId: callId as any,
          userId: currentUser._id,
        }
      : "skip"
  );

  const setOffer = useMutation(api.calls.setOffer);
  const setAnswer = useMutation(api.calls.setAnswer);
  const addCandidate = useMutation(
    api.calls.addCandidate
  );
  const endCall = useMutation(api.calls.endCall);

  /*
   * Create local camera/microphone
   */
  useEffect(() => {
    let cancelled = false;

    async function startMedia() {
      try {
        const stream =
          await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });

        if (cancelled) {
          stream.getTracks().forEach((track) =>
            track.stop()
          );
          return;
        }

        localStreamRef.current = stream;

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        setMediaReady(true);
      } catch (error) {
        console.error(
          "Camera/microphone error:",
          error
        );
      }
    }

    startMedia();

    return () => {
      cancelled = true;
    };
  }, []);

  /*
   * Create WebRTC connection
   */
  useEffect(() => {
 if (!currentUser || !call || !mediaReady) {
  return;
}

if (peerConnectionRef.current) {
  return;
};

  const user = currentUser;
  const activeCall = call;
  

  let cancelled = false;

  async function setupWebRTC() {
    if (!localStreamRef.current) {
      return;
    }

    const peerConnection =
      new RTCPeerConnection({
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302",
          },
        ],
      });

    peerConnectionRef.current = peerConnection;

    localStreamRef.current
      .getTracks()
      .forEach((track) => {
        peerConnection.addTrack(
          track,
          localStreamRef.current!
        );
      });

    // peerConnection.ontrack = (event) => {
    //   console.log("Remote stream received");

    //   const [remoteStream] = event.streams;

    //   if (
    //     remoteVideoRef.current &&
    //     remoteStream
    //   ) {
    //     remoteVideoRef.current.srcObject =
    //       remoteStream;
    //   }
    // };
    peerConnection.onconnectionstatechange = () => {
  console.log(
    "WebRTC connection:",
    peerConnection.connectionState
  );
};

peerConnection.oniceconnectionstatechange = () => {
  console.log(
    "ICE connection:",
    peerConnection.iceConnectionState
  );
};

peerConnection.onicegatheringstatechange = () => {
  console.log(
    "ICE gathering:",
    peerConnection.iceGatheringState
  );
};

peerConnection.ontrack = (event) => {
  console.log("REMOTE TRACK RECEIVED:", event);

  const [remoteStream] = event.streams;

  if (remoteVideoRef.current && remoteStream) {
    console.log("SETTING REMOTE STREAM");

    remoteVideoRef.current.srcObject =
      remoteStream;
  }
};

    peerConnection.onicecandidate = async (
      event
    ) => {
      if (!event.candidate) return;

      try {
        await addCandidate({
          callId: activeCall._id,
          senderId: user._id,
          candidate: JSON.stringify(
            event.candidate
          ),
        });
      } catch (error) {
        console.error(
          "Failed to save ICE candidate:",
          error
        );
      }
    };

    // CALLER
    if (activeCall.callerId === user._id) {
      if (activeCall.offer) return;

      const offer =
        await peerConnection.createOffer();

      await peerConnection.setLocalDescription(
        offer
      );

      if (cancelled) return;

      await setOffer({
        callId: activeCall._id,
        offer: JSON.stringify(offer),
      });
    }

    // RECEIVER
   // RECEIVER
if (activeCall.receiverId === user._id) {
  console.log("RECEIVER: I am the receiver");

  if (!activeCall.offer) {
    console.log("RECEIVER: Waiting for offer");
    return;
  }

  console.log("RECEIVER: Offer received");

  const offer = JSON.parse(activeCall.offer);

  await peerConnection.setRemoteDescription(
    new RTCSessionDescription(offer)
  );

  console.log("RECEIVER: Remote description set");

  const answer = await peerConnection.createAnswer();

  await peerConnection.setLocalDescription(answer);

  console.log("RECEIVER: Answer created");

  if (cancelled) return;

  await setAnswer({
    callId: activeCall._id,
    answer: JSON.stringify(answer),
  });

  console.log("RECEIVER: Answer saved to Convex");
}
  }

  setupWebRTC();

  return () => {
    cancelled = true;
  };
}, [
  currentUser,
  call,
   mediaReady,
  addCandidate,
  setOffer,
  setAnswer,
]);

  /*
   * Caller receives answer
   */
  // useEffect(() => {
  //   const peerConnection =
  //     peerConnectionRef.current;

  //   if (
  //     !peerConnection ||
  //     !call ||
  //     !currentUser
  //   ) {
  //     return;
  //   }

  //   if (
  //     call.callerId !== currentUser._id
  //   ) {
  //     return;
  //   }

  //   if (!call.answer) return;

  //   if (
  //     peerConnection.currentRemoteDescription
  //   ) {
  //     return;
  //   }

  //   async function setRemoteAnswer() {
  //     try {
  //       const answer =
  //         JSON.parse(call!.answer!);

  //       await peerConnection!.setRemoteDescription(
  //         new RTCSessionDescription(answer)
  //       );
  //     } catch (error) {
  //       console.error(
  //         "Failed to set remote answer:",
  //         error
  //       );
  //     }
  //   }

  //   setRemoteAnswer();
  // }, [call, currentUser]);
useEffect(() => {
  if (!call || !currentUser) {
    return;
  }

  if (call.callerId !== currentUser._id) {
    return;
  }

  if (!call.answer) {
    return;
  }

  const connection = peerConnectionRef.current;

  if (!connection) {
    return;
  }

  if (connection.currentRemoteDescription) {
    return;
  }

  const answerString = call.answer;

  async function setRemoteAnswer(
    peer: RTCPeerConnection,
    answer: string
  ) {
    try {
      const parsedAnswer = JSON.parse(answer);

      await peer.setRemoteDescription(
        new RTCSessionDescription(parsedAnswer)
      );

      console.log("CALLER: Remote answer applied");
    } catch (error) {
      console.error(
        "Failed to set remote answer:",
        error
      );
    }
  }

  setRemoteAnswer(connection, answerString);
}, [call, currentUser]);
  /*
   * Receive ICE candidates
   */
useEffect(() => {
  async function addRemoteCandidates() {
    const connection = peerConnectionRef.current;

    if (!connection || !candidates) {
      return;
    }

    for (const item of candidates) {
      if (
        processedCandidatesRef.current.has(item._id)
      ) {
        continue;
      }

      try {
        const candidate = JSON.parse(item.candidate);

        await connection.addIceCandidate(
          new RTCIceCandidate(candidate)
        );

        processedCandidatesRef.current.add(item._id);
      } catch (error) {
        console.error(
          "Failed to add ICE candidate:",
          error
        );
      }
    }
  }

  addRemoteCandidates();
}, [candidates]);
  /*
   * Toggle camera
   */
  function toggleCamera() {
    const stream =
      localStreamRef.current;

    if (!stream) return;

    const track =
      stream.getVideoTracks()[0];

    if (!track) return;

    track.enabled = !track.enabled;

    setCameraEnabled(track.enabled);
  }

  /*
   * Toggle microphone
   */
  function toggleMicrophone() {
    const stream =
      localStreamRef.current;

    if (!stream) return;

    const track =
      stream.getAudioTracks()[0];

    if (!track) return;

    track.enabled = !track.enabled;

    setMicEnabled(track.enabled);
  }

  /*
   * End call
   */
  async function handleEndCall() {
    try {
      await endCall({
        callId: callId as any,
      });
    } catch (error) {
      console.error(error);
    }

    localStreamRef.current
      ?.getTracks()
      .forEach((track) => track.stop());

    peerConnectionRef.current?.close();

    router.push("/dashboard");
  }
useEffect(() => {
  if (!call) return;

  if (call.status === "declined") {
    localStreamRef.current
      ?.getTracks()
      .forEach((track) => track.stop());

    peerConnectionRef.current?.close();

    alert("Call declined");

    router.push("/dashboard");
    return;
  }

  if (call.status === "ended") {
    localStreamRef.current
      ?.getTracks()
      .forEach((track) => track.stop());

    peerConnectionRef.current?.close();

    alert("The call has ended");

    router.push("/dashboard");
  }
}, [call, router]);

  return (
    <main className="fixed inset-0 bg-black">
      {/* Remote video */}
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        className="h-full w-full object-cover"
      />

      {/* Waiting state */}
      {!call?.answer &&
        call?.callerId === currentUser?._id && (
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center">
              <div className="text-2xl font-semibold">
                Calling...
              </div>

              <p className="mt-2 text-gray-400">
                Waiting for the other person...
              </p>
            </div>
          </div>
        )}

      {/* Local preview */}
      <div className="absolute right-5 top-5 h-40 w-28 overflow-hidden rounded-2xl bg-gray-900 shadow-2xl sm:h-48 sm:w-64">
       <video
  ref={localVideoRef}
  autoPlay
  muted
  playsInline
  className="h-full w-full object-cover scale-x-[-1]"
/>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-black/50 p-3 backdrop-blur">
        <button
          onClick={toggleMicrophone}
          className="rounded-full text-black bg-white px-5 py-3 font-medium"
        >
          {micEnabled
            ? "Mute"
            : "Unmute"}
        </button>

        <button
          onClick={toggleCamera}
          className="rounded-full text-black bg-white px-5 py-3 font-medium"
        >
          {cameraEnabled
            ? "Camera Off"
            : "Camera On"}
        </button>

        <button
          onClick={handleEndCall}
          className="rounded-full bg-red-600 px-6 py-3 font-medium text-white"
        >
          End
        </button>
      </div>
    </main>
  );
}


