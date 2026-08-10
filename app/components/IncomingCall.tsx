"use client";

import { useMutation, useQuery } from "convex/react";
import { useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function IncomingCall() {
  const { userId } = useAuth();
  const router = useRouter();

  const currentUser = useQuery(
    api.users.getCurrentUser,
    userId ? { clerkId: userId } : "skip"
  );

  const incomingCall = useQuery(
    api.calls.getIncomingCall,
    currentUser
      ? { userId: currentUser._id }
      : "skip"
  );

  const respondToCall = useMutation(
    api.calls.respondToCall
  );

  async function acceptCall() {
    if (!incomingCall) return;

    await respondToCall({
      callId: incomingCall._id,
      response: "accepted",
    });

    router.push(`/call/${incomingCall._id}`);
  }

  async function declineCall() {
    if (!incomingCall) return;

    await respondToCall({
      callId: incomingCall._id,
      response: "declined",
    });
  }

  if (!incomingCall) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">

        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-2xl">
          📹
        </div>

        <h2 className="text-2xl font-bold">
          Incoming Video Call
        </h2>

        <p className="mt-2 text-gray-500">
          Someone is calling you...
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={declineCall}
            className="flex-1 rounded-xl border px-4 py-3 font-medium"
          >
            Decline
          </button>

          <button
            onClick={acceptCall}
            className="flex-1 rounded-xl bg-black px-4 py-3 font-medium text-white"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}