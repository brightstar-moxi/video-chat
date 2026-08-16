



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
          className="rounded-full bg-white px-5 py-3 font-medium"
        >
          {micEnabled
            ? "Mute"
            : "Unmute"}
        </button>

        <button
          onClick={toggleCamera}
          className="rounded-full bg-white px-5 py-3 font-medium"
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

// "use client";

// import { useState } from "react";
// import { useAuth } from "@clerk/nextjs";
// import { useMutation, useQuery } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import { useRouter } from "next/navigation";

// function VideoIcon() {
//   return (
//     <svg
//       width="19"
//       height="19"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.8"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <rect x="3" y="6" width="13" height="12" rx="3" />
//       <path d="m16 10 5-3v10l-5-3" />
//     </svg>
//   );
// }

// function PhoneIcon() {
//   return (
//     <svg
//       width="19"
//       height="19"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.8"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.07 5.18 2 2 0 0 1 5.05 3h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.63a2 2 0 0 1-.45 2.11L9 10.73a16 16 0 0 0 4.27 4.27l1.27-1.27a2 2 0 0 1 2.11-.45c.85.3 1.73.51 2.63.63A2 2 0 0 1 22 16.92z" />
//     </svg>
//   );
// }

// function Avatar({
//   name,
//   image,
// }: {
//   name?: string | null;
//   image?: string | null;
// }) {
//   if (image) {
//     return (
//       <img
//         src={image}
//         alt={name || "User"}
//         className="h-14 w-14 rounded-full object-cover"
//       />
//     );
//   }

//   return (
//     <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-lg font-semibold text-white">
//       {name?.charAt(0).toUpperCase() || "?"}
//     </div>
//   );
// }

// export default function CallsPage() {
//   const { userId } = useAuth();
//   const router = useRouter();

//   const [startingCall, setStartingCall] =
//     useState<string | null>(null);

//   const currentUser = useQuery(
//     api.users.getCurrentUser,
//     userId
//       ? {
//           clerkId: userId,
//         }
//       : "skip"
//   );

//   const friends = useQuery(
//     api.friends.getFriends,
//     currentUser
//       ? {
//           userId: currentUser._id,
//         }
//       : "skip"
//   );

//   const incomingCall = useQuery(
//     api.calls.getIncomingCall,
//     currentUser
//       ? {
//           userId: currentUser._id,
//         }
//       : "skip"
//   );

//   const startCall = useMutation(
//     api.calls.startCall
//   );

//   const respondToCall = useMutation(
//     api.calls.respondToCall
//   );

//   const cleanFriends =
//     friends?.filter(
//       (
//         friend
//       ): friend is NonNullable<typeof friend> =>
//         friend !== null
//     ) ?? [];

//   async function handleStartCall(
//     receiverId: string,
//     type: "audio" | "video"
//   ) {
//     if (!currentUser || startingCall) {
//       return;
//     }

//     try {
//       setStartingCall(receiverId);

//       const callId = await startCall({
//         callerId: currentUser._id,
//         receiverId: receiverId as any,
//         type,
//       });

//       console.log("Call started:", callId);

//       router.push(`/call/${callId}`);
//     } catch (error) {
//       console.error(
//         "Failed to start call:",
//         error
//       );

//       setStartingCall(null);
//     }
//   }

//   async function handleAccept() {
//     if (!incomingCall) {
//       return;
//     }

//     const callId = incomingCall._id;

//     try {
//       await respondToCall({
//         callId,
//         response: "accepted",
//       });

//       console.log("Call accepted:", callId);

//       router.push(`/call/${callId}`);
//     } catch (error) {
//       console.error(
//         "Failed to accept call:",
//         error
//       );
//     }
//   }

//   async function handleDecline() {
//     if (!incomingCall) {
//       return;
//     }

//     const callId = incomingCall._id;

//     try {
//       await respondToCall({
//         callId,
//         response: "declined",
//       });

//       console.log("Call declined:", callId);
//     } catch (error) {
//       console.error(
//         "Failed to decline call:",
//         error
//       );
//     }
//   }

//   return (
//     <div className="mx-auto max-w-6xl">
//       {/* Header */}
//       <section className="relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-gradient-to-br from-violet-500/[0.10] via-white/[0.025] to-blue-500/[0.07] p-7 sm:p-9">
//         <div className="absolute -right-20 -top-40 h-[400px] w-[400px] rounded-full bg-violet-500/15 blur-[110px]" />

//         <div className="relative">
//           <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
//             <VideoIcon />
//           </div>

//           <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
//             Calls
//           </h1>

//           <p className="mt-3 max-w-lg text-sm leading-6 text-white/40">
//             Start a private video or audio call
//             with your friends.
//           </p>
//         </div>
//       </section>

//       {/* Incoming Call */}
//       {incomingCall && (
//         <section className="mt-6 overflow-hidden rounded-3xl border border-violet-400/20 bg-violet-500/[0.07] p-6">
//           <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <Avatar name="Incoming call" />

//                 <span className="absolute bottom-0 right-0 h-3 w-3 animate-pulse rounded-full border-2 border-[#11131a] bg-emerald-400" />
//               </div>

//               <div>
//                 <p className="font-semibold text-white">
//                   Incoming call
//                 </p>

//                 <p className="mt-1 text-sm text-white/40">
//                   Someone is calling you
//                 </p>
//               </div>
//             </div>

//             <div className="flex gap-3 sm:ml-auto">
//               <button
//                 type="button"
//                 onClick={handleAccept}
//                 className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400 sm:flex-none"
//               >
//                 Accept
//               </button>

//               <button
//                 type="button"
//                 onClick={handleDecline}
//                 className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500/10 px-5 py-3 text-sm font-medium text-red-300 transition hover:bg-red-500/20 sm:flex-none"
//               >
//                 Decline
//               </button>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Friends */}
//       <section className="mt-10">
//         <div>
//           <h2 className="text-lg font-semibold text-white">
//             Start a call
//           </h2>

//           <p className="mt-1 text-sm text-white/30">
//             Choose a friend to call.
//           </p>
//         </div>

//         {cleanFriends.length === 0 ? (
//           <div className="mt-4 rounded-2xl border border-dashed border-white/[0.08] p-10 text-center">
//             <p className="text-sm font-medium text-white">
//               No friends yet
//             </p>

//             <p className="mt-1 text-xs text-white/30">
//               Add some friends before starting a
//               call.
//             </p>
//           </div>
//         ) : (
//           <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
//             {cleanFriends.map((friend) => {
//               const isCalling =
//                 startingCall === friend._id;

//               return (
//                 <div
//                   key={friend._id}
//                   className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition hover:border-white/[0.12] hover:bg-white/[0.04]"
//                 >
//                   <div className="flex items-start justify-between">
//                     <div className="relative">
//                       <Avatar
//                         name={
//                           friend.name ||
//                           friend.username
//                         }
//                         image={friend.image}
//                       />

//                       <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#11131a] bg-emerald-400" />
//                     </div>

//                     <span className="text-xs text-emerald-300/70">
//                       Online
//                     </span>
//                   </div>

//                   <div className="mt-5">
//                     <p className="truncate font-medium text-white">
//                       {friend.name ||
//                         friend.username}
//                     </p>

//                     <p className="mt-1 truncate text-sm text-white/30">
//                       @{friend.username}
//                     </p>
//                   </div>

//                   <div className="mt-5 flex gap-2">
//                     {/* Video */}
//                     <button
//                       type="button"
//                       onClick={() =>
//                         handleStartCall(
//                           friend._id,
//                           "video"
//                         )
//                       }
//                       disabled={isCalling}
//                       className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
//                     >
//                       <VideoIcon />

//                       {isCalling
//                         ? "Calling..."
//                         : "Video"}
//                     </button>

//                     {/* Audio */}
//                     <button
//                       type="button"
//                       onClick={() =>
//                         handleStartCall(
//                           friend._id,
//                           "audio"
//                         )
//                       }
//                       disabled={isCalling}
//                       className="flex h-10 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/50 transition hover:bg-white/[0.07] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
//                       title="Audio call"
//                     >
//                       <PhoneIcon />
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }