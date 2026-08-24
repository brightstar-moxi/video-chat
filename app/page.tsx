import Link from "next/link";

function ArrowUpRight() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg
      width="22"
      height="22"
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
      width="22"
      height="22"
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
      width="22"
      height="22"
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

function MicIcon() {
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
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <path d="M12 19v3" />
      <path d="M8 22h8" />
    </svg>
  );
}

function CameraIcon() {
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
      <rect x="3" y="6" width="13" height="12" rx="3" />
      <path d="m16 10 5-3v10l-5-3" />
    </svg>
  );
}

function MockAvatar({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gradient-to-br from-violet-400 via-fuchsia-400 to-blue-500 font-semibold text-white shadow-lg ${className}`}
    >
      {label}
    </div>
  );
}

function VideoCallPreview() {
  return (
    <div className="relative mx-auto mt-16 w-full max-w-6xl">
      {/* Glow behind product */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[130px]" />

      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0d0f15] p-2 shadow-2xl shadow-black/50">
        {/* Browser bar */}
        <div className="flex h-11 items-center justify-between border-b border-white/[0.06] px-4">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>

          <div className="hidden rounded-lg border border-white/5 bg-white/[0.03] px-12 py-1 text-[10px] text-white/30 sm:block">
            videochat.app/call
          </div>

          <div className="w-10" />
        </div>

        {/* Call interface */}
        <div className="grid min-h-[480px] grid-cols-1 gap-2 p-2 lg:grid-cols-[1fr_230px]">
          {/* Main video */}
          <div className="relative min-h-[390px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#27253a] via-[#151724] to-[#08090d]">
            {/* Person representation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-16 rounded-full bg-violet-500/10 blur-3xl" />

                <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-violet-500/40 via-indigo-500/30 to-fuchsia-500/30 shadow-2xl">
                  <span className="text-5xl font-semibold text-white">
                    M
                  </span>
                </div>
              </div>
            </div>

            {/* Top information */}
            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 text-xs text-white/80 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Moxiz
              <span className="text-white/40">•</span>
              02:34
            </div>

            {/* Bottom controls */}
            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/40 p-2 backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
                <MicIcon />
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
                <CameraIcon />
              </div>

              <div className="flex h-10 w-12 items-center justify-center rounded-full bg-red-500 text-white">
                <span className="text-xs font-bold">END</span>
              </div>
            </div>

            {/* Self preview */}
            <div className="absolute bottom-5 right-5 h-24 w-32 overflow-hidden rounded-xl border border-white/15 bg-[#11131a] shadow-xl">
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-500/20 to-violet-500/20">
                <span className="text-2xl font-semibold text-white/80">
                  B
                </span>
              </div>

              <div className="absolute bottom-2 left-2 rounded-md bg-black/50 px-1.5 py-0.5 text-[9px] text-white/70">
                You
              </div>
            </div>
          </div>

          {/* Side panel */}
          <div className="hidden rounded-2xl border border-white/[0.06] bg-[#11131a] p-4 lg:block">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">
                Participants
              </span>

              <span className="rounded-full bg-white/5 px-2 py-1 text-[10px] text-white/40">
                4
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {[
                ["M", "Moxiz", "Speaking"],
                ["B", "Brightstar", "You"],
                ["J", "James", "Online"],
                ["A", "Alex", "Online"],
              ].map(([avatar, name, status]) => (
                <div
                  key={name}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] p-2.5"
                >
                  <MockAvatar
                    label={avatar}
                    className="h-9 w-9 text-xs"
                  />

                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-white">
                      {name}
                    </p>

                    <p className="text-[10px] text-white/35">
                      {status}
                    </p>
                  </div>

                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-white/[0.06] pt-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                Connection
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-white/50">
                  Excellent
                </span>

                <span className="text-xs text-emerald-400">
                  24 ms
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating cards */}
      <div className="absolute -left-5 top-24 hidden rounded-2xl border border-white/10 bg-[#11131a]/90 p-3 shadow-xl backdrop-blur-xl xl:block">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
            <MessageIcon />
          </div>

          <div>
            <p className="text-xs font-medium text-white">
              New message
            </p>
            <p className="text-[10px] text-white/35">
              Sarah sent you a message
            </p>
          </div>
        </div>
      </div>

      <div className="absolute -right-5 bottom-24 hidden rounded-2xl border border-white/10 bg-[#11131a]/90 p-3 shadow-xl backdrop-blur-xl xl:block">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <MockAvatar label="J" className="h-8 w-8 border-2 border-[#11131a] text-[10px]" />
            <MockAvatar label="A" className="h-8 w-8 border-2 border-[#11131a] text-[10px]" />
            <MockAvatar label="M" className="h-8 w-8 border-2 border-[#11131a] text-[10px]" />
          </div>

          <div>
            <p className="text-xs font-medium text-white">
              Friends online
            </p>
            <p className="text-[10px] text-white/35">
              3 friends are available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: <VideoIcon />,
    title: "Crystal-clear calls",
    description:
      "Connect face-to-face with smooth real-time video and audio.",
  },
  {
    icon: <MessageIcon />,
    title: "Talk naturally",
    description:
      "Keep conversations together with messaging and video calls.",
  },
  {
    icon: <UsersIcon />,
    title: "Your people, one place",
    description:
      "Find friends, manage connections, and stay close to the people who matter.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#07080c] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-300px] h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[140px]" />
        <div className="absolute right-[-200px] top-[500px] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#07080c]/75 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="flex items-center gap-2.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-500/20">
              <VideoIcon />
            </div>

            <span className="text-lg font-semibold tracking-tight">
              Brightstar Chat
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-white/50 md:flex">
            <a
              href="#features"
              className="transition hover:text-white"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="transition hover:text-white"
            >
              How it works
            </a>

            <a
              href="#about"
              className="transition hover:text-white"
            >
              About
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/sign-in"
              className="hidden rounded-xl px-4 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white sm:block"
            >
              Sign in
            </Link>

            <Link
              href="/sign-up"
              className="group flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Get started
              <ArrowUpRight />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-5 pb-10 pt-24 sm:px-8 sm:pt-32">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white/60 backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Simple communication, made better
            <ArrowUpRight />
          </div>

          <h1 className="mx-auto mt-8 max-w-5xl text-5xl font-semibold tracking-[-0.04em] sm:text-7xl lg:text-[88px] lg:leading-[0.98]">
            Talk to your people.
            <span className="block bg-gradient-to-r from-violet-300 via-white to-blue-300 bg-clip-text text-transparent">
              Wherever they are.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-white/45 sm:text-lg">
            VideoChat brings your friends, conversations, and
            video calls together in one beautifully simple
            place.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/sign-up"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90 sm:w-auto"
            >
              Start connecting
              <ArrowUpRight />
            </Link>

            <a
              href="#how-it-works"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-white/80 transition hover:bg-white/[0.07] sm:w-auto"
            >
              <PlayIcon />
              See how it works
            </a>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/30">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Free to get started
            <span className="text-white/15">•</span>
            No complicated setup
          </div>
        </div>

        <VideoCallPreview />
      </section>

      {/* Feature section */}
      <section
        id="features"
        className="border-t border-white/[0.06] px-5 py-28 sm:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-violet-300">
              Everything you need
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Communication without
              <span className="text-white/40"> the clutter.</span>
            </h2>

            <p className="mt-5 text-base leading-7 text-white/40">
              Designed around the way people actually talk,
              connect, and spend time together.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-3xl border border-white/[0.07] bg-white/[0.025] p-7 transition duration-300 hover:-translate-y-1 hover:border-violet-400/20 hover:bg-white/[0.04]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/10 bg-violet-500/10 text-violet-300">
                  {feature.icon}
                </div>

                <h3 className="mt-7 text-lg font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/40">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="px-5 py-28 sm:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-blue-300">
              How it works
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              From friend request
              <span className="block text-white/40">
                to face-to-face.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-white/40">
              Getting connected shouldn't require complicated
              setup. Find your friends, connect with them, and
              start talking.
            </p>

            <Link
              href="/sign-up"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Create your account
              <ArrowUpRight />
            </Link>
          </div>

          <div className="space-y-3">
            {[
              {
                number: "01",
                title: "Create your account",
                text: "Sign up and create your profile in a few moments.",
              },
              {
                number: "02",
                title: "Find your friends",
                text: "Search by username and send a friend request.",
              },
              {
                number: "03",
                title: "Start talking",
                text: "Message your friends or jump straight into a video call.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="group flex gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition hover:bg-white/[0.04]"
              >
                <span className="font-mono text-xs text-violet-300/60">
                  {item.number}
                </span>

                <div>
                  <h3 className="font-medium text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-white/35">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="px-5 py-20 sm:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[32px] border border-white/[0.07] bg-gradient-to-br from-violet-500/[0.12] via-white/[0.025] to-blue-500/[0.08] p-8 sm:p-12 lg:p-16">
            <div className="absolute right-[-100px] top-[-150px] h-[400px] w-[400px] rounded-full bg-violet-500/15 blur-[100px]" />

            <div className="relative max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-violet-300">
                Built for connection
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                Less switching.
                <br />
                More talking.
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-7 text-white/45">
                Your friends shouldn't be scattered across
                different apps. VideoChat is designed to make
                connecting feel natural, simple, and personal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-32 text-center sm:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto h-px w-20 bg-gradient-to-r from-transparent via-violet-400 to-transparent" />

          <h2 className="mt-10 text-4xl font-semibold tracking-tight sm:text-6xl">
            Your people are
            <span className="block bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent">
              one call away.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/40">
            Create your account, find your friends, and start
            connecting.
          </p>

          <Link
            href="/sign-up"
            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Get started
            <ArrowUpRight />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500">
              <VideoIcon />
            </div>

            <span className="text-sm font-semibold">
              BrightstarChat
            </span>
          </Link>

          <p className="text-xs text-white/25">
            © 2026 VideoChat. Built for better conversations.
          </p>

          <div className="flex gap-5 text-xs text-white/35">
            <Link
              href="/sign-in"
              className="transition hover:text-white"
            >
              Sign in
            </Link>

            <Link
              href="/sign-up"
              className="transition hover:text-white"
            >
              Get started
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}