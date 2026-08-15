


// "use client";

// import { useState } from "react";
// import { useAuth } from "@clerk/nextjs";
// import { useMutation, useQuery } from "convex/react";
// import { api } from "@/convex/_generated/api";


// function UserResult({
//   user,
//   currentUserId,
//   onAdd,
// }: {
//   user: any;
//   currentUserId?: any;
//   onAdd: (id: any) => void;
// }) {
//   const relationship = useQuery(
//     api.friends.getRelationship,
//     currentUserId && user._id !== currentUserId
//       ? {
//           userId: currentUserId,
//           otherUserId: user._id,
//         }
//       : "skip"
//   );

//   return (
//     <div className="flex items-center justify-between rounded-xl border p-4">
//       <div>
//         <p className="font-semibold">
//           {user.name || user.username}
//         </p>

//         <p className="text-sm text-gray-500">
//           @{user.username}
//         </p>
//       </div>

//       {user._id === currentUserId ? (
//         <span className="text-sm text-gray-400">
//           You
//         </span>
//       ) : relationship === "friends" ? (
//         <span className="text-sm font-medium">
//           Friends
//         </span>
//       ) : relationship === "sent" ? (
//         <span className="text-sm text-gray-500">
//           Request Sent
//         </span>
//       ) : relationship === "received" ? (
//         <span className="text-sm text-gray-500">
//           Request Received
//         </span>
//       ) : (
//         <button
//           onClick={() => onAdd(user._id)}
//           className="rounded-lg bg-black px-4 py-2 text-white"
//         >
//           Add Friend
//         </button>
//       )}
//     </div>
//   );
// }

// export default function FriendsPage() {
//     const startCall = useMutation(
//   api.calls.startCall
// );
//   const { userId } = useAuth();

//   const [username, setUsername] = useState("");

//   const currentUser = useQuery(
//     api.users.getCurrentUser,
//     userId ? { clerkId: userId } : "skip"
//   );

//   const users = useQuery(
//     api.friends.searchUsers,
//     username.trim()
//       ? { username: username.trim().toLowerCase() }
//       : "skip"
//   );

//   const incomingRequests = useQuery(
//     api.friends.getIncomingRequests,
//     currentUser
//       ? { userId: currentUser._id }
//       : "skip"
//   );

//   const friends = useQuery(
//     api.friends.getFriends,
//     currentUser
//       ? { userId: currentUser._id }
//       : "skip"
//   );

//   const sendFriendRequest = useMutation(
//     api.friends.sendFriendRequest
//   );

//   const respondToFriendRequest = useMutation(
//     api.friends.respondToFriendRequest
//   );

//   async function handleAddFriend(
//     receiverId: string
//   ) {
//     if (!currentUser) return;

//     try {
//       await sendFriendRequest({
//         senderId: currentUser._id,
//         receiverId: receiverId as any,
//       });

//       alert("Friend request sent");
//     } catch (error) {
//       console.error(error);
//       alert(
//         error instanceof Error
//           ? error.message
//           : "Unable to send friend request"
//       );
//     }
//   }

//   async function handleRequestResponse(
//     requestId: string,
//     response: "accepted" | "declined"
//   ) {
//     try {
//       await respondToFriendRequest({
//         requestId: requestId as any,
//         response,
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   async function handleVideoCall(receiverId: any) {
//   if (!currentUser) return;

//   try {
//     const callId = await startCall({
//       callerId: currentUser._id,
//       receiverId,
//       type: "video",
//     });

//     console.log("Call started:", callId);

//     window.location.href = `/call/${callId}`;
//   } catch (error) {
//     console.error("Failed to start call:", error);
//   }
// }

//   return (
//     <main className="min-h-screen p-8">
//       <div className="mx-auto max-w-2xl space-y-10">

//         {/* Search */}
//         <section>
//           <h1 className="text-3xl font-bold">
//             Find Friends
//           </h1>

//           <p className="mt-2 text-gray-500">
//             Search for friends using their username.
//           </p>

//           <input
//             value={username}
//             onChange={(event) =>
//               setUsername(event.target.value)
//             }
//             placeholder="Search username..."
//             className="mt-6 w-full rounded-lg border px-4 py-3 outline-none"
//           />

//          <div className="mt-4 space-y-3">
//   {users?.map((user) => (
//     <UserResult
//       key={user._id}
//       user={user}
//       currentUserId={currentUser?._id}
//       onAdd={handleAddFriend}
//     />
//   ))}
// </div>
//         </section>

//         {/* Requests */}
//         <section>
//           <h2 className="text-2xl font-bold">
//             Friend Requests
//           </h2>

//           <div className="mt-4 space-y-3">
//             {incomingRequests?.map((request) => (
//               <div
//                 key={request._id}
//                 className="flex items-center justify-between rounded-xl border p-4"
//               >
//                 <div>
//                   <p className="font-semibold">
//                     {request.sender?.name ||
//                       request.sender?.username}
//                   </p>

//                   <p className="text-sm text-gray-500">
//                     @{request.sender?.username}
//                   </p>
//                 </div>

//                 <div className="flex gap-2">
//                   <button
//                     onClick={() =>
//                       handleRequestResponse(
//                         request._id,
//                         "accepted"
//                       )
//                     }
//                     className="rounded-lg bg-black px-4 py-2 text-white"
//                   >
//                     Accept
//                   </button>

//                   <button
//                     onClick={() =>
//                       handleRequestResponse(
//                         request._id,
//                         "declined"
//                       )
//                     }
//                     className="rounded-lg border px-4 py-2"
//                   >
//                     Decline
//                   </button>
//                 </div>
//               </div>
//             ))}

//             {incomingRequests?.length === 0 && (
//               <p className="text-gray-500">
//                 No pending requests.
//               </p>
//             )}
//           </div>
//         </section>

//         {/* Friends */}
//         <section>
//           <h2 className="text-2xl font-bold">
//             Friends
//           </h2>

//           <div className="mt-4 space-y-3">
//             {friends?.map((friend) => (
//               <div
//   key={friend?._id}
//   className="flex items-center justify-between rounded-xl border p-4"
// >
//   <div>
//     <p className="font-semibold">
//       {friend?.name || friend?.username}
//     </p>

//     <p className="text-sm text-gray-500">
//       @{friend?.username}
//     </p>
//   </div>

//   <button
//     onClick={() =>
//       handleVideoCall(friend!._id)
//     }
//     className="rounded-xl bg-black px-4 py-2 text-white"
//   >
//     Video Call
//   </button>
// </div>
//             ))}

//             {friends?.length === 0 && (
//               <p className="text-gray-500">
//                 You don't have any friends yet.
//               </p>
//             )}
//           </div>
//         </section>

//       </div>
//     </main>
//   );
// }


"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function UserPlusIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <path d="M19 8v6" />
      <path d="M22 11h-6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="6" width="13" height="12" rx="3" />
      <path d="m16 10 5-3v10l-5-3" />
    </svg>
  );
}

function Avatar({
  name,
  image,
}: {
  name?: string | null;
  image?: string | null;
}) {


  if (image) {
    return (
      <img
        src={image}
        alt={name || "User"}
        className="h-12 w-12 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-semibold">
      {name?.charAt(0).toUpperCase() || "?"}
    </div>
  );
}

function UserResult({
  user,
  currentUserId,
  onAdd,
}: {
  user: any;
  currentUserId?: any;
  onAdd: (id: any) => void;
}) {
  const relationship = useQuery(
    api.friends.getRelationship,
    currentUserId && user._id !== currentUserId
      ? {
          userId: currentUserId,
          otherUserId: user._id,
        }
      : "skip"
  );

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition hover:border-white/[0.12] hover:bg-white/[0.04]">
      <Avatar
        name={user.name || user.username}
        image={user.image}
      />

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">
          {user.name || user.username}
        </p>

        <p className="mt-1 truncate text-sm text-white/35">
          @{user.username}
        </p>
      </div>

      {user._id === currentUserId ? (
        <span className="rounded-lg bg-white/[0.05] px-3 py-2 text-xs text-white/40">
          You
        </span>
      ) : relationship === "friends" ? (
        <span className="rounded-lg bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-300">
          Friends
        </span>
      ) : relationship === "sent" ? (
        <span className="rounded-lg bg-white/[0.05] px-3 py-2 text-xs text-white/40">
          Request sent
        </span>
      ) : relationship === "received" ? (
        <span className="rounded-lg bg-violet-500/10 px-3 py-2 text-xs text-violet-300">
          Request received
        </span>
      ) : (
        <button
          onClick={() => onAdd(user._id)}
          className="flex shrink-0 items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-black transition hover:bg-white/90"
        >
          <UserPlusIcon />
          <span className="hidden sm:inline">
            Add Friend
          </span>
        </button>
      )}
    </div>
  );
}

export default function FriendsPage() {
  const { userId } = useAuth();

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const currentUser = useQuery(
    api.users.getCurrentUser,
    userId ? { clerkId: userId } : "skip"
  );

  const users = useQuery(
    api.friends.searchUsers,
    username.trim()
      ? {
          username: username.trim().toLowerCase(),
        }
      : "skip"
  );

  const incomingRequests = useQuery(
    api.friends.getIncomingRequests,
    currentUser
      ? { userId: currentUser._id }
      : "skip"
  );

  const friends = useQuery(
    api.friends.getFriends,
    currentUser
      ? { userId: currentUser._id }
      : "skip"
  );

  const sendFriendRequest = useMutation(
    api.friends.sendFriendRequest
  );

  const respondToFriendRequest = useMutation(
    api.friends.respondToFriendRequest
  );

  const startCall = useMutation(api.calls.startCall);
const router = useRouter();

async function handleVideoCall(receiverId: any) {
  if (!currentUser) return;

  try {
    const callId = await startCall({
      callerId: currentUser._id,
      receiverId,
      type: "video",
    });

    router.push(`/call/${callId}`);
  } catch (error) {
    console.error("Failed to start call:", error);
  }
}

  async function handleAddFriend(receiverId: string) {
    if (!currentUser || loading) return;

    try {
      setLoading(true);

      await sendFriendRequest({
        senderId: currentUser._id,
        receiverId: receiverId as any,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleRequestResponse(
    requestId: string,
    response: "accepted" | "declined"
  ) {
    try {
      await respondToFriendRequest({
        requestId: requestId as any,
        response,
      });
    } catch (error) {
      console.error(error);
    }
  }

  const cleanFriends =
    friends?.filter(
      (friend): friend is NonNullable<typeof friend> =>
        friend !== null
    ) || [];

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <section className="relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-gradient-to-br from-violet-500/[0.10] via-white/[0.025] to-blue-500/[0.07] p-7 sm:p-9">
        <div className="absolute -right-20 -top-40 h-[400px] w-[400px] rounded-full bg-violet-500/15 blur-[110px]" />

        <div className="relative">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
            <UserPlusIcon />
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
            Find friends
          </h1>

          <p className="mt-3 max-w-lg text-sm leading-6 text-white/40">
            Search for people using their username and
            start building your network.
          </p>

          {/* Search */}
          <div className="relative mt-7 max-w-2xl">
            <SearchIcon />

            <input
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              placeholder="Search username..."
              className="w-full rounded-2xl border border-white/10 bg-black/20 py-4 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-violet-400/30 focus:bg-black/30"
            />
          </div>
        </div>
      </section>

      {/* Search Results */}
      {username.trim() && (
        <section className="mt-10">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">
              Search results
            </h2>

            <p className="mt-1 text-sm text-white/30">
              People matching @{username.trim()}
            </p>
          </div>

          <div className="space-y-3">
            {users === undefined ? (
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 text-sm text-white/30">
                Searching...
              </div>
            ) : users.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/[0.08] p-10 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] text-white/30">
                  <SearchIcon />
                </div>

                <p className="mt-4 font-medium">
                  No user found
                </p>

                <p className="mt-1 text-sm text-white/30">
                  Try searching for another username.
                </p>
              </div>
            ) : (
              users.map((user) => (
                <UserResult
                  key={user._id}
                  user={user}
                  currentUserId={currentUser?._id}
                  onAdd={handleAddFriend}
                />
              ))
            )}
          </div>
        </section>
      )}

      {/* Friend Requests */}
      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Friend requests
            </h2>

            <p className="mt-1 text-sm text-white/30">
              People who want to connect with you.
            </p>
          </div>

          {incomingRequests &&
            incomingRequests.length > 0 && (
              <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                {incomingRequests.length}
              </span>
            )}
        </div>

        <div className="space-y-3">
          {incomingRequests === undefined ? (
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 text-sm text-white/30">
              Loading requests...
            </div>
          ) : incomingRequests.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/[0.08] p-8 text-center">
              <p className="text-sm font-medium">
                No pending requests
              </p>

              <p className="mt-1 text-xs text-white/30">
                New friend requests will appear here.
              </p>
            </div>
          ) : (
            incomingRequests.map((request) => (
              <div
                key={request._id}
                className="flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 sm:flex-row sm:items-center"
              >
                <Avatar
                  name={
                    request.sender?.name ||
                    request.sender?.username
                  }
                  image={request.sender?.image}
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">
                    {request.sender?.name ||
                      request.sender?.username}
                  </p>

                  <p className="mt-1 truncate text-sm text-white/35">
                    @{request.sender?.username}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handleRequestResponse(
                        request._id,
                        "accepted"
                      )
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-black transition hover:bg-white/90 sm:flex-none"
                  >
                    <CheckIcon />
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      handleRequestResponse(
                        request._id,
                        "declined"
                      )
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-xs text-white/60 transition hover:bg-white/[0.07] sm:flex-none"
                  >
                    <XIcon />
                    Decline
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Friends */}
      <section className="mt-10">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Your friends
            </h2>

            <p className="mt-1 text-sm text-white/30">
              People you're connected with.
            </p>
          </div>

          <span className="text-xs text-white/25">
            {cleanFriends.length}{" "}
            {cleanFriends.length === 1
              ? "friend"
              : "friends"}
          </span>
        </div>

        {cleanFriends.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-white/[0.08] p-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] text-white/30">
              <UserPlusIcon />
            </div>

            <p className="mt-4 text-sm font-medium">
              You don't have any friends yet
            </p>

            <p className="mt-1 text-xs text-white/30">
              Search for someone above to get started.
            </p>
          </div>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cleanFriends.map((friend) => {
 

  return (
    <div
      key={friend._id}
      className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition hover:border-white/[0.12] hover:bg-white/[0.04]"
    >
      <div className="flex items-start justify-between">
        <div className="relative">
          <Avatar
            name={friend.name || friend.username}
            image={friend.image}
          />

          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#11131a] bg-emerald-400" />
        </div>

        <button
  onClick={() => handleVideoCall(friend._id)}
  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05] text-white/40 transition hover:bg-violet-500/15 hover:text-violet-300"
  title="Video call"
>
  <VideoIcon />
</button>
      </div>

      <div className="mt-5">
        <p className="truncate font-medium">
          {friend.name || friend.username}
        </p>

        <p className="mt-1 truncate text-sm text-white/30">
          @{friend.username}
        </p>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-emerald-300/70">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Connected
      </div>
    </div>
  );
})}
          </div>
        )}
      </section>
    </div>
  );
}