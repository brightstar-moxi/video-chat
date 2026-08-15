// "use client";

// import { useMutation, useQuery } from "convex/react";
// import { useEffect } from "react";
// import { api } from "@/convex/_generated/api";
// import { useAuth } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";

// export default function IncomingCall() {
//   const { userId } = useAuth();
//   const router = useRouter();

//   const currentUser = useQuery(
//     api.users.getCurrentUser,
//     userId ? { clerkId: userId } : "skip"
//   );

//   const incomingCall = useQuery(
//     api.calls.getIncomingCall,
//     currentUser
//       ? { userId: currentUser._id }
//       : "skip"
//   );

//   const respondToCall = useMutation(
//     api.calls.respondToCall
//   );

//   async function acceptCall() {
//     if (!incomingCall) return;

//     await respondToCall({
//       callId: incomingCall._id,
//       response: "accepted",
//     });

//     router.push(`/call/${incomingCall._id}`);
//   }

//   async function declineCall() {
//     if (!incomingCall) return;

//     await respondToCall({
//       callId: incomingCall._id,
//       response: "declined",
//     });
//   }

//   if (!incomingCall) {
//     return null;
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
//       <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">

//         <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-2xl">
//           📹
//         </div>

//         <h2 className="text-2xl font-bold">
//           Incoming Video Call
//         </h2>

//         <p className="mt-2 text-gray-500">
//           Someone is calling you...
//         </p>

//         <div className="mt-6 flex gap-3">
//           <button
//             onClick={declineCall}
//             className="flex-1 rounded-xl border px-4 py-3 font-medium"
//           >
//             Decline
//           </button>

//           <button
//             onClick={acceptCall}
//             className="flex-1 rounded-xl bg-black px-4 py-3 font-medium text-white"
//           >
//             Accept
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




"use client";

import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";

export default function IncomingCallPopup() {
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

  if (!incomingCall) {
    return null;
  }

  async function handleAccept() {
    await respondToCall({
      callId: incomingCall._id,
      response: "accepted",
    });

    router.push(`/call/${incomingCall._id}`);
  }

  async function handleDecline() {
    await respondToCall({
      callId: incomingCall._id,
      response: "declined",
    });
  }

  return (
    <div className="fixed right-5 top-5 z-[9999] w-[360px] rounded-3xl border border-white/10 bg-[#15151b]/95 p-5 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center gap-4">
        {incomingCall.caller?.image ? (
          <img
            src={incomingCall.caller.image}
            alt={incomingCall.caller.username}
            className="h-14 w-14 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-500/20 text-lg font-semibold text-violet-300">
            {incomingCall.caller?.username
              ?.charAt(0)
              .toUpperCase()}
          </div>
        )}

        <div>
          <p className="text-xs text-white/40">
            Incoming{" "}
            {incomingCall.type === "video"
              ? "video"
              : "audio"}{" "}
            call
          </p>

          <p className="mt-1 font-semibold">
            {incomingCall.caller?.name ||
              incomingCall.caller?.username}
          </p>

          <p className="text-sm text-white/30">
            @{incomingCall.caller?.username}
          </p>
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <button
          onClick={handleDecline}
          className="flex-1 rounded-xl bg-white/5 px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-red-500/10 hover:text-red-300"
        >
          Decline
        </button>

        <button
          onClick={handleAccept}
          className="flex-1 rounded-xl bg-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
        >
          Accept
        </button>
      </div>
    </div>
  );
}