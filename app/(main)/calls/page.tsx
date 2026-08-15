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
//     <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-lg font-semibold">
//       {name?.charAt(0).toUpperCase() || "?"}
//     </div>
//   );
// }

// export default function CallsPage() {
//   const { userId } = useAuth();
//   const router = useRouter();

//   const [startingCall, setStartingCall] = useState<string | null>(
//     null
//   );

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

//   const startCall = useMutation(api.calls.startCall);

//   const respondToCall = useMutation(
//     api.calls.respondToCall
//   );

//   const cleanFriends =
//     friends?.filter(
//       (friend): friend is NonNullable<typeof friend> =>
//         friend !== null
//     ) || [];

//   async function handleStartCall(
//     receiverId: string,
//     type: "audio" | "video"
//   ) {
//     if (!currentUser || startingCall) return;

//     try {
//       setStartingCall(receiverId);

//       const callId = await startCall({
//         callerId: currentUser._id,
//         receiverId: receiverId as any,
//         type,
//       });

//       router.push(`/call/${callId}`);
//     } catch (error) {
//       console.error("Failed to start call:", error);
//       setStartingCall(null);
//     }
//   }

//   async function handleAccept() {
//     if (!incomingCall) return;

//     try {
//       await respondToCall({
//         callId: incomingCall._id,
//         response: "accepted",
//       });

//       router.push(`/call/${incomingCall._id}`);
//     } catch (error) {
//       console.error("Failed to accept call:", error);
//     }
//   }

//   async function handleDecline() {
//     if (!incomingCall) return;

//     try {
//       await respondToCall({
//         callId: incomingCall._id,
//         response: "declined",
//       });
//     } catch (error) {
//       console.error("Failed to decline call:", error);
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
//             Start a private video or audio call with
//             your friends.
//           </p>
//         </div>
//       </section>

//       {/* Incoming call */}
//       {incomingCall && (
//         <section className="mt-6 overflow-hidden rounded-3xl border border-violet-400/20 bg-violet-500/[0.07] p-6">
//           <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <Avatar
//                   name="Incoming call"
//                 />

//                 <span className="absolute bottom-0 right-0 h-3 w-3 animate-pulse rounded-full border-2 border-[#11131a] bg-emerald-400" />
//               </div>

//               <div>
//                 <p className="font-semibold">
//                   Incoming call
//                 </p>

//                 <p className="mt-1 text-sm text-white/40">
//                   Someone is calling you
//                 </p>
//               </div>
//             </div>

//             <div className="flex gap-3 sm:ml-auto">
//               <button
//                 onClick={handleAccept}
//                 className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400 sm:flex-none"
//               >
//                 Accept
//               </button>

//               <button
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
//           <h2 className="text-lg font-semibold">
//             Start a call
//           </h2>

//           <p className="mt-1 text-sm text-white/30">
//             Choose a friend to call.
//           </p>
//         </div>

//         {cleanFriends.length === 0 ? (
//           <div className="mt-4 rounded-2xl border border-dashed border-white/[0.08] p-10 text-center">
//             <p className="text-sm font-medium">
//               No friends yet
//             </p>

//             <p className="mt-1 text-xs text-white/30">
//               Add some friends before starting a call.
//             </p>
//           </div>
//         ) : (
//           <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
//             {cleanFriends.map((friend) => (
//               <div
//                 key={friend._id}
//                 className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition hover:border-white/[0.12] hover:bg-white/[0.04]"
//               >
//                 <div className="flex items-start justify-between">
//                   <div className="relative">
//                     <Avatar
//                       name={
//                         friend.name ||
//                         friend.username
//                       }
//                       image={friend.image}
//                     />

//                     <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#11131a] bg-emerald-400" />
//                   </div>

//                   <span className="text-xs text-emerald-300/70">
//                     Online
//                   </span>
//                 </div>

//                 <div className="mt-5">
//                   <p className="truncate font-medium">
//                     {friend.name ||
//                       friend.username}
//                   </p>

//                   <p className="mt-1 truncate text-sm text-white/30">
//                     @{friend.username}
//                   </p>
//                 </div>

//                 <div className="mt-5 flex gap-2">
//                   <button
//                     onClick={() =>
//                       handleStartCall(
//                         friend._id,
//                         "video"
//                       )
//                     }
//                     disabled={
//                       startingCall === friend._id
//                     }
//                     className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-black transition hover:bg-white/90 disabled:opacity-40"
//                   >
//                     <VideoIcon />

//                     {startingCall === friend._id
//                       ? "Calling..."
//                       : "Video"}
//                   </button>

//                   <button
//                     onClick={() =>
//                       handleStartCall(
//                         friend._id,
//                         "audio"
//                       )
//                     }
//                     disabled={
//                       startingCall === friend._id
//                     }
//                     className="flex h-10 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/50 transition hover:bg-white/[0.07] hover:text-white disabled:opacity-40"
//                     title="Audio call"
//                   >
//                     <PhoneIcon />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }



"use client";

import { useQuery } from "convex/react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { api } from "@/convex/_generated/api";

export default function CallsPage() {
  const { userId } = useAuth();

  const currentUser = useQuery(
    api.users.getCurrentUser,
    userId ? { clerkId: userId } : "skip"
  );

  const recentCalls = useQuery(
    api.calls.getRecentCalls,
    currentUser
      ? { userId: currentUser._id }
      : "skip"
  );

  return (
    <main className="min-h-screen bg-[#09090b] px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div>
          <Link
            href="/dashboard"
            className="text-sm text-white/40 transition hover:text-white"
          >
            ← Dashboard
          </Link>

          <h1 className="mt-6 text-3xl font-bold">
            Calls
          </h1>

          <p className="mt-2 text-white/40">
            Your recent video and audio calls.
          </p>
        </div>

        {/* Calls */}
        <div className="mt-8 space-y-3">
          {recentCalls?.map((call) => {
            const person = call.otherUser;

            return (
              <div
                key={call._id}
                className="flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-4">
                  {person?.image ? (
                    <img
                      src={person.image}
                      alt={person.username}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/20 font-semibold text-violet-300">
                      {person?.username
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>
                  )}

                  <div>
                    <p className="font-medium">
                      {person?.name ||
                        person?.username ||
                        "Unknown user"}
                    </p>

                    <p className="mt-1 text-sm text-white/30">
                      {call.type === "video"
                        ? "Video call"
                        : "Audio call"}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p
                    className={`text-sm ${
                      call.status === "accepted"
                        ? "text-emerald-400"
                        : call.status === "declined"
                        ? "text-red-400"
                        : "text-white/40"
                    }`}
                  >
                    {call.status === "accepted"
                      ? "Completed"
                      : call.status === "declined"
                      ? "Declined"
                      : call.status}
                  </p>

                  <p className="mt-1 text-xs text-white/20">
                    {new Date(
                      call.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })}

          {recentCalls?.length === 0 && (
            <div className="rounded-2xl border border-dashed border-white/[0.08] p-12 text-center">
              <p className="text-white/40">
                No calls yet
              </p>

              <Link
                href="/dashboard"
                className="mt-4 inline-block text-sm text-violet-300 hover:text-violet-200"
              >
                Find a friend to call
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}