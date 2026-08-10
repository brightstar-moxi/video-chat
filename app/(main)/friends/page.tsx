// "use client";

// import { useState } from "react";
// import { useAuth } from "@clerk/nextjs";
// import { useMutation, useQuery } from "convex/react";
// import { api } from "@/convex/_generated/api";

// export default function FriendsPage() {
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

//   const sendFriendRequest = useMutation(
//     api.friends.sendFriendRequest
//   );

//   async function handleAddFriend(receiverId: string) {
//     if (!currentUser) return;

//     try {
//       await sendFriendRequest({
//         senderId: currentUser._id,
//         receiverId: receiverId as any,
//       });

//       alert("Friend request sent");
//     } catch (error) {
//       console.error(error);
//       alert("Unable to send friend request");
//     }
//   }

//   return (
//     <main className="min-h-screen p-8">
//       <div className="mx-auto max-w-2xl">
//         <h1 className="text-3xl font-bold">
//           Find Friends
//         </h1>

//         <p className="mt-2 text-gray-500">
//           Search for friends using their username.
//         </p>

//         <div className="mt-8 flex gap-3">
//           <input
//             value={username}
//             onChange={(event) =>
//               setUsername(event.target.value)
//             }
//             placeholder="Search username..."
//             className="flex-1 rounded-lg border px-4 py-3 outline-none"
//           />
//         </div>

//         <div className="mt-6 space-y-3">
//           {users?.map((user) => (
//             <div
//               key={user._id}
//               className="flex items-center justify-between rounded-xl border p-4"
//             >
//               <div>
//                 <p className="font-semibold">
//                   {user.name || user.username}
//                 </p>

//                 <p className="text-sm text-gray-500">
//                   @{user.username}
//                 </p>
//               </div>

//               <button
//                 onClick={() =>
//                   handleAddFriend(user._id)
//                 }
//                 disabled={user._id === currentUser?._id}
//                 className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-40"
//               >
//                 Add Friend
//               </button>
//             </div>
//           ))}

//           {username && users?.length === 0 && (
//             <p className="text-gray-500">
//               No user found.
//             </p>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }



"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";


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
    <div className="flex items-center justify-between rounded-xl border p-4">
      <div>
        <p className="font-semibold">
          {user.name || user.username}
        </p>

        <p className="text-sm text-gray-500">
          @{user.username}
        </p>
      </div>

      {user._id === currentUserId ? (
        <span className="text-sm text-gray-400">
          You
        </span>
      ) : relationship === "friends" ? (
        <span className="text-sm font-medium">
          Friends
        </span>
      ) : relationship === "sent" ? (
        <span className="text-sm text-gray-500">
          Request Sent
        </span>
      ) : relationship === "received" ? (
        <span className="text-sm text-gray-500">
          Request Received
        </span>
      ) : (
        <button
          onClick={() => onAdd(user._id)}
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          Add Friend
        </button>
      )}
    </div>
  );
}

export default function FriendsPage() {
    const startCall = useMutation(
  api.calls.startCall
);
  const { userId } = useAuth();

  const [username, setUsername] = useState("");

  const currentUser = useQuery(
    api.users.getCurrentUser,
    userId ? { clerkId: userId } : "skip"
  );

  const users = useQuery(
    api.friends.searchUsers,
    username.trim()
      ? { username: username.trim().toLowerCase() }
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

  async function handleAddFriend(
    receiverId: string
  ) {
    if (!currentUser) return;

    try {
      await sendFriendRequest({
        senderId: currentUser._id,
        receiverId: receiverId as any,
      });

      alert("Friend request sent");
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error
          ? error.message
          : "Unable to send friend request"
      );
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

  async function handleVideoCall(receiverId: any) {
  if (!currentUser) return;

  try {
    const callId = await startCall({
      callerId: currentUser._id,
      receiverId,
      type: "video",
    });

    console.log("Call started:", callId);

    window.location.href = `/call/${callId}`;
  } catch (error) {
    console.error("Failed to start call:", error);
  }
}

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-2xl space-y-10">

        {/* Search */}
        <section>
          <h1 className="text-3xl font-bold">
            Find Friends
          </h1>

          <p className="mt-2 text-gray-500">
            Search for friends using their username.
          </p>

          <input
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
            placeholder="Search username..."
            className="mt-6 w-full rounded-lg border px-4 py-3 outline-none"
          />

         <div className="mt-4 space-y-3">
  {users?.map((user) => (
    <UserResult
      key={user._id}
      user={user}
      currentUserId={currentUser?._id}
      onAdd={handleAddFriend}
    />
  ))}
</div>
        </section>

        {/* Requests */}
        <section>
          <h2 className="text-2xl font-bold">
            Friend Requests
          </h2>

          <div className="mt-4 space-y-3">
            {incomingRequests?.map((request) => (
              <div
                key={request._id}
                className="flex items-center justify-between rounded-xl border p-4"
              >
                <div>
                  <p className="font-semibold">
                    {request.sender?.name ||
                      request.sender?.username}
                  </p>

                  <p className="text-sm text-gray-500">
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
                    className="rounded-lg bg-black px-4 py-2 text-white"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      handleRequestResponse(
                        request._id,
                        "declined"
                      )
                    }
                    className="rounded-lg border px-4 py-2"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}

            {incomingRequests?.length === 0 && (
              <p className="text-gray-500">
                No pending requests.
              </p>
            )}
          </div>
        </section>

        {/* Friends */}
        <section>
          <h2 className="text-2xl font-bold">
            Friends
          </h2>

          <div className="mt-4 space-y-3">
            {friends?.map((friend) => (
              <div
  key={friend?._id}
  className="flex items-center justify-between rounded-xl border p-4"
>
  <div>
    <p className="font-semibold">
      {friend?.name || friend?.username}
    </p>

    <p className="text-sm text-gray-500">
      @{friend?.username}
    </p>
  </div>

  <button
    onClick={() =>
      handleVideoCall(friend!._id)
    }
    className="rounded-xl bg-black px-4 py-2 text-white"
  >
    Video Call
  </button>
</div>
            ))}

            {friends?.length === 0 && (
              <p className="text-gray-500">
                You don't have any friends yet.
              </p>
            )}
          </div>
        </section>

      </div>
    </main>
  );
}