// "use client";

// import { useState } from "react";

// function SearchIcon() {
//   return (
//     <svg
//       width="18"
//       height="18"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.8"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="11" cy="11" r="7" />
//       <path d="m20 20-4-4" />
//     </svg>
//   );
// }

// function SendIcon() {
//   return (
//     <svg
//       width="18"
//       height="18"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.8"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M22 2 11 13" />
//       <path d="m22 2-7 20-4-9-9-4Z" />
//     </svg>
//   );
// }

// function MessageIcon() {
//   return (
//     <svg
//       width="34"
//       height="34"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.5"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.7 8.7 0 0 1-3.8-.9L4 20l1.5-3.6A7.3 7.3 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z" />
//     </svg>
//   );
// }

// type DemoMessage = {
//   id: number;
//   text: string;
//   sender: "me" | "them";
//   time: string;
// };

// const initialMessages: DemoMessage[] = [
//   {
//     id: 1,
//     text: "Hey, how are you doing?",
//     sender: "them",
//     time: "10:32 AM",
//   },
//   {
//     id: 2,
//     text: "I'm good. Working on the VideoChat app.",
//     sender: "me",
//     time: "10:33 AM",
//   },
//   {
//     id: 3,
//     text: "Nice! The calling feature looks interesting.",
//     sender: "them",
//     time: "10:34 AM",
//   },
// ];

// export default function MessagesPage() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] =
//     useState<DemoMessage[]>(initialMessages);

//   function handleSend() {
//     const text = message.trim();

//     if (!text) return;

//     setMessages((currentMessages) => [
//       ...currentMessages,
//       {
//         id: Date.now(),
//         text,
//         sender: "me",
//         time: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       },
//     ]);

//     setMessage("");
//   }

//   return (
//     <div className="mx-auto max-w-6xl">
//       {/* Header */}
//       <section className="mb-8">
//         <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
//           <MessageIcon />
//         </div>

//         <h1 className="mt-4 text-3xl font-semibold tracking-tight">
//           Messages
//         </h1>

//         <p className="mt-2 text-sm text-white/40">
//           Chat with your friends and stay connected.
//         </p>
//       </section>

//       {/* Chat layout */}
//       <div className="grid min-h-[650px] overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] lg:grid-cols-[320px_1fr]">
//         {/* Conversations */}
//         <aside className="border-b border-white/[0.07] lg:border-b-0 lg:border-r">
//           <div className="border-b border-white/[0.07] p-4">
//             <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5">
//               <SearchIcon />

//               <input
//                 placeholder="Search messages..."
//                 className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25"
//               />
//             </div>
//           </div>

//           <div className="p-3">
//             <button className="flex w-full items-center gap-3 rounded-2xl bg-violet-500/10 p-3 text-left transition hover:bg-violet-500/15">
//               <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 font-semibold">
//                 M

//                 <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#11131a] bg-emerald-400" />
//               </div>

//               <div className="min-w-0 flex-1">
//                 <div className="flex items-center justify-between gap-2">
//                   <p className="truncate text-sm font-medium">
//                     Demo Friend
//                   </p>

//                   <span className="text-[10px] text-white/25">
//                     Now
//                   </span>
//                 </div>

//                 <p className="mt-1 truncate text-xs text-white/35">
//                   Start chatting with your friends
//                 </p>
//               </div>
//             </button>
//           </div>
//         </aside>

//         {/* Chat */}
//         <section className="flex min-h-[650px] flex-col">
//           {/* Chat header */}
//           <div className="flex items-center gap-3 border-b border-white/[0.07] p-5">
//             <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 font-semibold">
//               M

//               <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#11131a] bg-emerald-400" />
//             </div>

//             <div>
//               <p className="text-sm font-semibold">
//                 Demo Friend
//               </p>

//               <p className="mt-1 text-xs text-emerald-300/70">
//                 Online
//               </p>
//             </div>
//           </div>

//           {/* Messages */}
//           <div className="flex-1 space-y-4 overflow-y-auto p-5">
//             {messages.map((item) => (
//               <div
//                 key={item.id}
//                 className={`flex ${
//                   item.sender === "me"
//                     ? "justify-end"
//                     : "justify-start"
//                 }`}
//               >
//                 <div className="max-w-[80%]">
//                   <div
//                     className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
//                       item.sender === "me"
//                         ? "rounded-br-md bg-violet-500 text-white"
//                         : "rounded-bl-md bg-white/[0.06] text-white/80"
//                     }`}
//                   >
//                     {item.text}
//                   </div>

//                   <p
//                     className={`mt-1 text-[10px] text-white/25 ${
//                       item.sender === "me"
//                         ? "text-right"
//                         : "text-left"
//                     }`}
//                   >
//                     {item.time}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Message input */}
//           <div className="border-t border-white/[0.07] p-4">
//             <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-2 pl-4">
//               <input
//                 value={message}
//                 onChange={(event) =>
//                   setMessage(event.target.value)
//                 }
//                 onKeyDown={(event) => {
//                   if (event.key === "Enter") {
//                     handleSend();
//                   }
//                 }}
//                 placeholder="Type a message..."
//                 className="min-w-0 flex-1 bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/25"
//               />

//               <button
//                 onClick={handleSend}
//                 className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500 text-white transition hover:bg-violet-400"
//                 aria-label="Send message"
//               >
//                 <SendIcon />
//               </button>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { Id } from "@/convex/_generated/dataModel";

function SearchIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8 8 0 0 1-8.5 8 9 9 0 0 1-3.8-.9L3 21l2.1-5A7.8 7.8 0 0 1 4 11.5a8 8 0 0 1 8.5-8A8 8 0 0 1 21 11.5Z" />
    </svg>
  );
}

function Avatar({
  name,
  image,
  className = "h-12 w-12",
}: {
  name?: string | null;
  image?: string | null;
  className?: string;
}) {
  if (image) {
    return (
      <img
        src={image}
        alt={name || "User"}
        className={`${className} rounded-full object-cover`}
      />
    );
  }

  return (
    <div
      className={`flex ${className} items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 font-semibold text-white`}
    >
      {name?.charAt(0).toUpperCase() || "?"}
    </div>
  );
}

function formatTime(timestamp: number) {
  return new Intl.DateTimeFormat([], {
    hour: "numeric",
    minute: "2-digit",
  }).format(timestamp);
}

export default function MessagesPage() {
  const [selectedUserId, setSelectedUserId] =
    useState<string | null>(null);

  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const conversations = useQuery(
    api.messages.getConversations
  );

  const messages = useQuery(
    api.messages.getMessages,
    selectedUserId
      ? {
        otherUserId: selectedUserId as any,
      }
      : "skip"
  );

  const sendMessage = useMutation(
    api.messages.sendMessage
  );

  const markMessagesAsRead = useMutation(
    api.messages.markMessagesAsRead
  );


  const { userId } = useAuth();

  const currentUser = useQuery(
    api.users.getCurrentUser,
    userId
      ? { clerkId: userId }
      : "skip"
  );
  const selectedConversation = conversations?.find(
    (conversation) =>
      conversation.user._id === selectedUserId
  );

  const filteredConversations =
    conversations?.filter((conversation) => {
      const name =
        conversation.user.name ||
        conversation.user.username ||
        "";

      return name
        .toLowerCase()
        .includes(search.toLowerCase());
    }) || [];

    const friends = useQuery(
  api.friends.getFriends,
  currentUser
    ? { userId: currentUser._id }
    : "skip"
);



const filteredFriends =
  friends
    ?.filter(
      (
        friend
      ): friend is NonNullable<typeof friend> =>
        friend !== null
    )
    .filter((friend) => {
      const name =
        friend.name ||
        friend.username ||
        "";

      return (
        name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        friend.username
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }) || [];

  //   const [selectedUser, setSelectedUser] =
  // useState<{
  //   _id: Id<"users">;
  //   name?: string;
  //   username: string;
  //   image?: string;
  // } | null>(null);

  useEffect(() => {
    if (!selectedUserId) return;

    markMessagesAsRead({
      senderId: selectedUserId as any,
    });
  }, [
    selectedUserId,
    markMessagesAsRead,
    messages,
  ]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  async function handleSendMessage() {
    if (!selectedUserId) return;

    const content = message.trim();

    if (!content) return;

    try {
      setMessage("");

      await sendMessage({
        receiverId: selectedUserId as any,
        content,
      });
    } catch (error) {
      console.error(
        "Failed to send message:",
        error
      );

      setMessage(content);
    }
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  }

  return (
    <div className="mx-auto h-[calc(100vh-9rem)] max-w-7xl overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0b0c12] shadow-2xl">
      <div className="grid h-full md:grid-cols-[340px_1fr]">

        {/* Conversations sidebar */}
        <aside className="flex min-h-0 flex-col border-r border-white/[0.07]">
          <div className="border-b border-white/[0.07] p-5">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold">
                  Messages
                </h1>

                <p className="mt-1 text-sm text-white/35">
                  Your conversations
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                <MessageIcon />
              </div>
            </div>

            {/* Search */}
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2.5">
              <SearchIcon />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search conversations..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25"
              />
            </div>
          </div>
          {/* Friend search results */}
{search.trim() !== "" && filteredFriends.length > 0 && (
  <div className="mb-3">
    <p className="mb-2 px-3 text-xs font-medium text-white/40">
      Friends
    </p>

    {filteredFriends.map((friend) => (
      <button
        key={friend._id}
        onClick={() => {
  setSelectedUserId(friend._id);
  setSearch("");
}}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-white/[0.06]"
      >
        <Avatar
          name={
            friend.name ||
            friend.username
          }
          image={friend.image}
        />

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">
            {friend.name ||
              friend.username}
          </p>

          <p className="truncate text-xs text-white/40">
            @{friend.username}
          </p>
        </div>
      </button>
    ))}
  </div>
)}

          {/* Conversation list */}
          <div className="min-h-0 flex-1 overflow-y-auto p-2">
            {conversations === undefined ? (
              <div className="p-5 text-sm text-white/30">
                Loading conversations...
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-sm font-medium text-white/60">
                  No conversations yet
                </p>

                <p className="mt-2 text-xs leading-5 text-white/30">
                  Start messaging one of your friends.
                </p>
              </div>
            ) : (
              filteredConversations.map(
                (conversation) => {
                  const user = conversation.user;
                  const isSelected =
                    selectedUserId === user._id;

                  return (
                    <button
                      key={user._id}
                      onClick={() =>
                        setSelectedUserId(user._id)
                      }
                      className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${isSelected
                          ? "bg-violet-500/10"
                          : "hover:bg-white/[0.04]"
                        }`}
                    >
                      <div className="relative">
                        <Avatar
                          name={
                            user.name ||
                            user.username
                          }
                          image={user.image}
                        />

                        {/* {user.isOnline && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0b0c12] bg-emerald-400" />
                        )} */}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-medium">
                            {user.name ||
                              user.username}
                          </p>

                          <span className="text-[10px] text-white/25">
                            {formatTime(
                              conversation.lastMessage
                                .createdAt
                            )}
                          </span>
                        </div>

                        <p className="mt-1 truncate text-xs text-white/35">
                          {
                            conversation.lastMessage
                              .content
                          }
                        </p>
                      </div>
                    </button>
                  );
                }
              )
            )}
          </div>
        </aside>

        {/* Chat area */}
        <section className="flex min-h-0 flex-col">
          {!selectedConversation ? (
            <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-500/10 text-violet-300">
                <MessageIcon />
              </div>

              <h2 className="mt-6 text-xl font-semibold">
                Select a conversation
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-6 text-white/35">
                Choose someone from your conversations
                to start chatting.
              </p>
            </div>
          ) : (
            <>
              {/* Chat header */}
              <header className="flex items-center gap-3 border-b border-white/[0.07] px-5 py-4">
                <div className="relative">
                  <Avatar
                    name={
                      selectedConversation.user.name ||
                      selectedConversation.user.username
                    }
                    image={
                      selectedConversation.user.image
                    }
                  />

                  {/* {selectedConversation.user.isOnline && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0b0c12] bg-emerald-400" />
                  )} */}

                  <div className="relative">
  <Avatar
    name={
      selectedConversation.user.name ||
      selectedConversation.user.username
    }
    image={selectedConversation.user.image}
  />
</div>
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {selectedConversation.user.name ||
                      selectedConversation.user.username}
                  </p>

                <span className="text-xs text-white/35">
  @{selectedConversation.user.username}
</span>
                </div>
              </header>

              {/* Messages */}
              <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-5">
                {messages === undefined ? (
                  <p className="text-center text-sm text-white/30">
                    Loading messages...
                  </p>
                ) : (
                  messages.map((item) => {
                    const isMine =
                      item.senderId === currentUser?._id;

                    return (
                      <div
                        key={item._id}
                        className={`flex ${isMine
                            ? "justify-end"
                            : "justify-start"
                          }`}
                      >
                        <div
                          className={`max-w-[78%] rounded-2xl px-4 py-2.5 sm:max-w-[65%] ${isMine
                              ? "rounded-br-md bg-violet-500 text-white"
                              : "rounded-bl-md bg-white/[0.07] text-white/90"
                            }`}
                        >
                          <p className="break-words text-sm leading-6">
                            {item.content}
                          </p>

                          <div
                            className={`mt-1 flex items-center gap-1 text-[10px] ${isMine
                                ? "justify-end text-white/60"
                                : "text-white/30"
                              }`}
                          >
                            {formatTime(
                              item.createdAt
                            )}

                            {isMine && (
                              <span>
                                {item.status === "read"
                                  ? "✓✓"
                                  : "✓"}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}

                <div ref={bottomRef} />
              </div>

              {/* Message input */}
              <div className="border-t border-white/[0.07] p-4">
                <div className="flex items-end gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-2">
                  <input
                    value={message}
                    onChange={(event) =>
                      setMessage(event.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    placeholder="Write a message..."
                    className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-white/25"
                  />

                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500 text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Send message"
                  >
                    <SendIcon />
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}