// "use client";

// import { useEffect, useRef, useState } from "react";

// export default function CallPage() {
//   const localVideoRef = useRef<HTMLVideoElement>(null);

//   const [cameraEnabled, setCameraEnabled] = useState(true);
//   const [micEnabled, setMicEnabled] = useState(true);

//   useEffect(() => {
//     let stream: MediaStream | null = null;

//     async function startCamera() {
//       try {
//         stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true,
//         });

//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = stream;
//         }
//       } catch (error) {
//         console.error(
//           "Unable to access camera/microphone:",
//           error
//         );
//       }
//     }

// useEffect(() => {
//   async function startCamera() {
//     try {
//       const devices = await navigator.mediaDevices.enumerateDevices();

//       console.log("Available devices:", devices);

//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });

//       console.log("Camera started:", stream);

//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = stream;
//       }
//     } catch (error) {
//       console.error("MEDIA ERROR:", error);
//     }
//   }

//   startCamera();
// }, []);

//     startCamera();

//     return () => {
//       stream?.getTracks().forEach((track) => {
//         track.stop();
//       });
//     };
//   }, []);

//   function toggleCamera() {
//     const videoTrack =
//       localVideoRef.current?.srcObject instanceof MediaStream
//         ? localVideoRef.current.srcObject.getVideoTracks()[0]
//         : null;

//     if (!videoTrack) return;

//     videoTrack.enabled = !videoTrack.enabled;
//     setCameraEnabled(videoTrack.enabled);
//   }

//   function toggleMicrophone() {
//     const audioTrack =
//       localVideoRef.current?.srcObject instanceof MediaStream
//         ? localVideoRef.current.srcObject.getAudioTracks()[0]
//         : null;

//     if (!audioTrack) return;

//     audioTrack.enabled = !audioTrack.enabled;
//     setMicEnabled(audioTrack.enabled);
//   }

//   function endCall() {
//     const stream =
//       localVideoRef.current?.srcObject as MediaStream | null;

//     stream?.getTracks().forEach((track) => {
//       track.stop();
//     });

//     window.history.back();
//   }

//   return (
//     <main className="fixed inset-0 bg-black">
//       {/* Remote video */}
//       <div className="flex h-full items-center justify-center">
//         <p className="text-gray-400">
//           Waiting for the other person...
//         </p>
//       </div>

//       {/* Local video */}
//       <div className="absolute right-5 top-5 h-40 w-28 overflow-hidden rounded-xl bg-gray-900 shadow-lg sm:h-48 sm:w-64">
//         <video
//           ref={localVideoRef}
//           autoPlay
//           muted
//           playsInline
//           className="h-full w-full object-cover"
//         />
//       </div>

//       {/* Controls */}
//       <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
//         <button
//           onClick={toggleMicrophone}
//           className="rounded-full bg-white px-5 py-3"
//         >
//           {micEnabled ? "Mute" : "Unmute"}
//         </button>

//         <button
//           onClick={toggleCamera}
//           className="rounded-full bg-white px-5 py-3"
//         >
//           {cameraEnabled ? "Camera Off" : "Camera On"}
//         </button>

//         <button
//           onClick={endCall}
//           className="rounded-full bg-red-600 px-5 py-3 text-white"
//         >
//           End
//         </button>
//       </div>
//     </main>
//   );
// }




"use client";

import { useEffect, useRef, useState } from "react";

export default function CallPage() {
  const localVideoRef = useRef<HTMLVideoElement>(null);

  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);

  useEffect(() => {
    let stream: MediaStream | null = null;

    async function startCamera() {
      try {
        console.log("Requesting camera and microphone...");
if (!navigator.mediaDevices) {
  console.error(
    "Camera API unavailable. The page must use HTTPS or localhost."
  );
  return;
}


        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
// stream = await navigator.mediaDevices.getUserMedia({
//   video: {
//     width: { ideal: 1280 },
//     height: { ideal: 720 },
//     facingMode: "user",
//   },
//   audio: false,
// });
        console.log("Camera started successfully");

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Camera error:", error);
      }
    }

    startCamera();

    return () => {
      stream?.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, []);

  function toggleCamera() {
    const stream =
      localVideoRef.current?.srcObject as MediaStream | null;

    const track = stream?.getVideoTracks()[0];

    if (!track) return;

    track.enabled = !track.enabled;
    setCameraEnabled(track.enabled);
  }

  function toggleMicrophone() {
    const stream =
      localVideoRef.current?.srcObject as MediaStream | null;

    const track = stream?.getAudioTracks()[0];

    if (!track) return;

    track.enabled = !track.enabled;
    setMicEnabled(track.enabled);
  }

  function endCall() {
    const stream =
      localVideoRef.current?.srcObject as MediaStream | null;

    stream?.getTracks().forEach((track) => {
      track.stop();
    });

    window.history.back();
  }

  return (
    <main className="fixed inset-0 bg-black">
      {/* Remote video */}
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-400">
          Waiting for the other person...
        </p>
      </div>

      {/* Local video */}
      <div className="absolute right-5 top-5 h-40 w-28 overflow-hidden rounded-xl bg-gray-900 shadow-lg sm:h-48 sm:w-64">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="h-full w-full object-cover"
        />
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
        <button
          onClick={toggleMicrophone}
          className="rounded-full bg-white px-5 py-3"
        >
          {micEnabled ? "Mute" : "Unmute"}
        </button>

        <button
          onClick={toggleCamera}
          className="rounded-full bg-white px-5 py-3"
        >
          {cameraEnabled ? "Camera Off" : "Camera On"}
        </button>

        <button
          onClick={endCall}
          className="rounded-full bg-red-600 px-5 py-3 text-white"
        >
          End
        </button>
      </div>
    </main>
  );
}