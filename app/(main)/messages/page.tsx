"use client";

import { useState } from "react";

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

function SendIcon() {
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
      <path d="M22 2 11 13" />
      <path d="m22 2-7 20-4-9-9-4Z" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.7 8.7 0 0 1-3.8-.9L4 20l1.5-3.6A7.3 7.3 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z" />
    </svg>
  );
}

type DemoMessage = {
  id: number;
  text: string;
  sender: "me" | "them";
  time: string;
};

const initialMessages: DemoMessage[] = [
  {
    id: 1,
    text: "Hey, how are you doing?",
    sender: "them",
    time: "10:32 AM",
  },
  {
    id: 2,
    text: "I'm good. Working on the VideoChat app.",
    sender: "me",
    time: "10:33 AM",
  },
  {
    id: 3,
    text: "Nice! The calling feature looks interesting.",
    sender: "them",
    time: "10:34 AM",
  },
];

export default function MessagesPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] =
    useState<DemoMessage[]>(initialMessages);

  function handleSend() {
    const text = message.trim();

    if (!text) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: Date.now(),
        text,
        sender: "me",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setMessage("");
  }

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <section className="mb-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
          <MessageIcon />
        </div>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          Messages
        </h1>

        <p className="mt-2 text-sm text-white/40">
          Chat with your friends and stay connected.
        </p>
      </section>

      {/* Chat layout */}
      <div className="grid min-h-[650px] overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] lg:grid-cols-[320px_1fr]">
        {/* Conversations */}
        <aside className="border-b border-white/[0.07] lg:border-b-0 lg:border-r">
          <div className="border-b border-white/[0.07] p-4">
            <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5">
              <SearchIcon />

              <input
                placeholder="Search messages..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25"
              />
            </div>
          </div>

          <div className="p-3">
            <button className="flex w-full items-center gap-3 rounded-2xl bg-violet-500/10 p-3 text-left transition hover:bg-violet-500/15">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 font-semibold">
                M

                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#11131a] bg-emerald-400" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium">
                    Demo Friend
                  </p>

                  <span className="text-[10px] text-white/25">
                    Now
                  </span>
                </div>

                <p className="mt-1 truncate text-xs text-white/35">
                  Start chatting with your friends
                </p>
              </div>
            </button>
          </div>
        </aside>

        {/* Chat */}
        <section className="flex min-h-[650px] flex-col">
          {/* Chat header */}
          <div className="flex items-center gap-3 border-b border-white/[0.07] p-5">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 font-semibold">
              M

              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#11131a] bg-emerald-400" />
            </div>

            <div>
              <p className="text-sm font-semibold">
                Demo Friend
              </p>

              <p className="mt-1 text-xs text-emerald-300/70">
                Online
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {messages.map((item) => (
              <div
                key={item.id}
                className={`flex ${
                  item.sender === "me"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div className="max-w-[80%]">
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                      item.sender === "me"
                        ? "rounded-br-md bg-violet-500 text-white"
                        : "rounded-bl-md bg-white/[0.06] text-white/80"
                    }`}
                  >
                    {item.text}
                  </div>

                  <p
                    className={`mt-1 text-[10px] text-white/25 ${
                      item.sender === "me"
                        ? "text-right"
                        : "text-left"
                    }`}
                  >
                    {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message input */}
          <div className="border-t border-white/[0.07] p-4">
            <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-2 pl-4">
              <input
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSend();
                  }
                }}
                placeholder="Type a message..."
                className="min-w-0 flex-1 bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/25"
              />

              <button
                onClick={handleSend}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500 text-white transition hover:bg-violet-400"
                aria-label="Send message"
              >
                <SendIcon />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}