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
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error(
          "Unable to access camera/microphone:",
          error
        );
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
    const videoTrack =
      localVideoRef.current?.srcObject instanceof MediaStream
        ? localVideoRef.current.srcObject.getVideoTracks()[0]
        : null;

    if (!videoTrack) return;

    videoTrack.enabled = !videoTrack.enabled;
    setCameraEnabled(videoTrack.enabled);
  }

  function toggleMicrophone() {
    const audioTrack =
      localVideoRef.current?.srcObject instanceof MediaStream
        ? localVideoRef.current.srcObject.getAudioTracks()[0]
        : null;

    if (!audioTrack) return;

    audioTrack.enabled = !audioTrack.enabled;
    setMicEnabled(audioTrack.enabled);
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