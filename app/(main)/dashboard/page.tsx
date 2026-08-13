"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function VideoIcon() {
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
      <rect x="3" y="6" width="13" height="12" rx="3" />
      <path d="m16 10 5-3v10l-5-3" />
    </svg>
  );
}

function MessageIcon() {
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
      <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.7 8.7 0 0 1-3.8-.9L4 20l1.5-3.6A7.3 7.3 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z" />
    </svg>
  );
}

function UsersIcon() {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function ArrowIcon() {
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
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function Avatar({
  name,
  image,
}: {
  name?: string;
  image?: string;
}) {
  if (image) {
    return (
      <img
        src={image}
        alt={name || "User"}
        className="h-11 w-11 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-semibold">
      {name?.charAt(0).toUpperCase() || "?"}
    </div>
  );
}

export default function DashboardPage() {
  const { userId } = useAuth();

  const currentUser = useQuery(
    api.users.getCurrentUser,
    userId ? { clerkId: userId } : "skip"
  );

  const friends = useQuery(
    api.friends.getFriends,
    currentUser
      ? { userId: currentUser._id }
      : "skip"
  );

  const incomingRequests = useQuery(
    api.friends.getIncomingRequests,
    currentUser
      ? { userId: currentUser._id }
      : "skip"
  );

  const displayName =
    currentUser?.name ||
    currentUser?.username ||
    "there";

  return (
    <div className="mx-auto max-w-7xl">
      {/* Welcome */}
      <section className="relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-gradient-to-br from-violet-500/[0.12] via-white/[0.025] to-blue-500/[0.08] p-7 sm:p-9">
        <div className="absolute right-[-100px] top-[-180px] h-[450px] w-[450px] rounded-full bg-violet-500/15 blur-[110px]" />

        <div className="relative">
          <p className="text-sm text-white/40">
            Welcome back
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Hey, {displayName}.
          </h1>

          <p className="mt-3 max-w-lg text-sm leading-6 text-white/40">
            Stay connected with your friends. Start a
            conversation or jump into a video call.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/friends"
              className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              <UsersIcon />
              Find friends
            </Link>

            <Link
              href="/calls"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white transition hover:bg-white/[0.08]"
            >
              <VideoIcon />
              View calls
            </Link>
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="mt-8">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">
            Quick actions
          </h2>

          <p className="mt-1 text-sm text-white/30">
            Get where you want to go faster.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/friends"
            className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition hover:-translate-y-0.5 hover:border-violet-400/20 hover:bg-white/[0.04]"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                <UsersIcon />
              </div>

              <ArrowIcon />
            </div>

            <h3 className="mt-5 font-medium">
              Find friends
            </h3>

            <p className="mt-1 text-sm text-white/35">
              Search for people and grow your network.
            </p>
          </Link>

          <Link
            href="/messages"
            className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition hover:-translate-y-0.5 hover:border-blue-400/20 hover:bg-white/[0.04]"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
                <MessageIcon />
              </div>

              <ArrowIcon />
            </div>

            <h3 className="mt-5 font-medium">
              Messages
            </h3>

            <p className="mt-1 text-sm text-white/35">
              Continue your conversations.
            </p>
          </Link>

          <Link
            href="/calls"
            className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition hover:-translate-y-0.5 hover:border-fuchsia-400/20 hover:bg-white/[0.04]"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-fuchsia-500/10 text-fuchsia-300">
                <VideoIcon />
              </div>

              <ArrowIcon />
            </div>

            <h3 className="mt-5 font-medium">
              Video calls
            </h3>

            <p className="mt-1 text-sm text-white/35">
              Start a face-to-face conversation.
            </p>
          </Link>
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

          <Link
            href="/friends"
            className="flex items-center gap-1 text-xs text-violet-300 transition hover:text-violet-200"
          >
            View all
            <ArrowIcon />
          </Link>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {friends
  ?.filter(
    (friend): friend is NonNullable<typeof friend> =>
      friend !== null
  )
  .slice(0, 6)
  .map((friend) => (
            <div
              key={friend._id}
              className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4"
            >
              <div className="relative">
                <Avatar
                  name={friend.name || friend.username}
                  image={friend.image}
                />

                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#11131a] bg-emerald-400" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {friend.name || friend.username}
                </p>

                <p className="truncate text-xs text-white/30">
                  @{friend.username}
                </p>
              </div>

              <Link
                href="/calls"
                className="ml-auto flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05] text-white/50 transition hover:bg-violet-500/15 hover:text-violet-300"
              >
                <VideoIcon />
              </Link>
            </div>
          ))}

          {friends?.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-white/[0.08] p-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] text-white/30">
                <UsersIcon />
              </div>

              <p className="mt-4 text-sm font-medium">
                No friends yet
              </p>

              <p className="mt-1 text-xs text-white/30">
                Find people and start connecting.
              </p>

              <Link
                href="/friends"
                className="mt-5 inline-flex rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-black"
              >
                Find friends
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Friend requests */}
      {incomingRequests &&
        incomingRequests.length > 0 && (
          <section className="mt-10">
            <div className="rounded-2xl border border-violet-400/10 bg-violet-500/[0.04] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-medium">
                    Friend requests
                  </h2>

                  <p className="mt-1 text-sm text-white/35">
                    You have{" "}
                    {incomingRequests.length} pending{" "}
                    {incomingRequests.length === 1
                      ? "request"
                      : "requests"}.
                  </p>
                </div>

                <Link
                  href="/friends"
                  className="rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-black"
                >
                  Review
                </Link>
              </div>
            </div>
          </section>
        )}
    </div>
  );
}