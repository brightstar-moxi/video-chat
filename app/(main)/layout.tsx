import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import IncomingCallPopup from "./components/IncomingCall";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

function VideoIcon() {
  return (
    <svg
      width="21"
      height="21"
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

function HomeIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 10 9-7 9 7" />
      <path d="M5 9v11h14V9" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg
      width="19"
      height="19"
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
      width="19"
      height="19"
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

function PhoneIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.7 1.7-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1 1.55V20h-2.4v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.88.34l-.06.06-1.7-1.7.06-.06A1.7 1.7 0 0 0 8.6 15a1.7 1.7 0 0 0-1.55-1H7v-2.4h.05a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.88L8.2 8.66l1.7-1.7.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1-1.55V5h2.4v.81a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.88-.34l.06-.06 1.7 1.7-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.55 1H21v2.4h-.81a1.7 1.7 0 0 0-1.55 1Z" />
    </svg>
  );
}

const navigation = [
  {
    label: "Home",
    href: "/dashboard",
    icon: <HomeIcon />,
  },
  {
    label: "Messages",
    href: "/messages",
    icon: <MessageIcon />,
  },
  {
    label: "Friends",
    href: "/friends",
    icon: <UsersIcon />,
  },
  {
    label: "Calls",
    href: "/calls",
    icon: <PhoneIcon />,
  },
];

// export default function MainLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) 


//    {
//   const { userId } = await auth();

//   if (!userId) {
//     redirect("/sign-in");
//   }
// {
//   return (
//     <div className="min-h-screen bg-[#07080c] text-white">
//       {/* Desktop Sidebar */}
//       <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 border-r border-white/[0.06] bg-[#090a0f] lg:flex lg:flex-col">
        // {/* Logo */}
        // <div className="flex h-20 items-center px-6">
        //   <Link
        //     href="/dashboard"
        //     className="flex items-center gap-3"
        //   >
        //     <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-500/20">
        //       <VideoIcon />
        //     </div>

        //     <span className="text-lg font-semibold tracking-tight">
        //       VideoChat
        //     </span>
        //   </Link>
        // </div>

        // {/* Navigation */}
        // <nav className="flex-1 px-3 py-6">
        //   <p className="mb-3 px-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/25">
        //     Workspace
        //   </p>

        //   <div className="space-y-1">
        //     {navigation.map((item) => (
        //       <Link
        //         key={item.href}
        //         href={item.href}
        //         className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/45 transition hover:bg-white/[0.05] hover:text-white"
        //       >
        //         {item.icon}
        //         {item.label}
        //       </Link>
        //     ))}
        //   </div>

        //   <p className="mb-3 mt-10 px-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/25">
        //     Account
        //   </p>

        //   <Link
        //     href="/settings"
        //     className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/45 transition hover:bg-white/[0.05] hover:text-white"
        //   >
        //     <SettingsIcon />
        //     Settings
        //   </Link>
        // </nav>

        // {/* Profile */}
        // <div className="border-t border-white/[0.06] p-4">
        //   <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3">
        //     <UserButton
        //       appearance={{
        //         elements: {
        //           avatarBox: "h-9 w-9",
        //         },
        //       }}
        //     />

        //     <div className="min-w-0">
        //       <p className="truncate text-sm font-medium">
        //         Account
        //       </p>

        //       <p className="text-xs text-white/30">
        //         Manage profile
        //       </p>
        //     </div>
        //   </div>
        // </div>
//       </aside>

//       {/* Main area */}
//       <div className="lg:pl-64">
        // {/* Topbar */}
        // <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-white/[0.06] bg-[#07080c]/80 px-5 backdrop-blur-xl sm:px-8">
        //   {/* Mobile logo */}
        //   <Link
        //     href="/dashboard"
        //     className="flex items-center gap-2 lg:hidden"
        //   >
        //     <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500">
        //       <VideoIcon />
        //     </div>

        //     <span className="font-semibold">
        //       VideoChat
        //     </span>
        //   </Link>

        //   {/* Search */}
        //   <div className="hidden max-w-md flex-1 lg:block">
        //     <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-2.5">
        //       <svg
        //         width="17"
        //         height="17"
        //         viewBox="0 0 24 24"
        //         fill="none"
        //         stroke="currentColor"
        //         strokeWidth="2"
        //         strokeLinecap="round"
        //         strokeLinejoin="round"
        //         className="text-white/25"
        //       >
        //         <circle cx="11" cy="11" r="7" />
        //         <path d="m20 20-4-4" />
        //       </svg>

        //       <input
        //         placeholder="Search people..."
        //         className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25"
        //       />

        //       <span className="hidden rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] text-white/25 xl:block">
        //         /
        //       </span>
        //     </div>
        //   </div>

        //   <div className="flex items-center gap-3">
        //     {/* Notification */}
        //     <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025] text-white/50 transition hover:bg-white/[0.06] hover:text-white">
        //       <svg
        //         width="18"
        //         height="18"
        //         viewBox="0 0 24 24"
        //         fill="none"
        //         stroke="currentColor"
        //         strokeWidth="1.8"
        //         strokeLinecap="round"
        //         strokeLinejoin="round"
        //       >
        //         <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        //         <path d="M10 21h4" />
        //       </svg>

        //       <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-violet-400" />
        //     </button>

        //     <div className="lg:hidden">
        //       <UserButton />
        //     </div>
        //   </div>
        // </header>

        // {/* Page */}
//         <main className="min-h-[calc(100vh-5rem)] px-5 py-8 pb-24 sm:px-8 lg:px-10">
//           {children}
//            <IncomingCallPopup />
//         </main>
//       </div>

      // {/* Mobile navigation */}
      // <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/[0.06] bg-[#090a0f]/95 px-2 py-2 backdrop-blur-xl lg:hidden">
      //   <div className="mx-auto flex max-w-md items-center justify-around">
      //     {navigation.map((item) => (
      //       <Link
      //         key={item.href}
      //         href={item.href}
      //         className="flex flex-col items-center gap-1 rounded-xl px-4 py-2 text-white/35 transition hover:bg-white/[0.05] hover:text-white"
      //       >
      //         {item.icon}
      //         <span className="text-[10px]">
      //           {item.label}
      //         </span>
      //       </Link>
      //     ))}
      //   </div>
      // </nav>
//     </div>
//   );
// }



export default async function MainLayout({
   children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-[#07080c] text-white">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 border-r border-white/[0.06] bg-[#090a0f] lg:flex lg:flex-col">
        {/* Your existing sidebar code */}
         {/* Logo */}
        <div className="flex h-20 items-center px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-500/20">
              <VideoIcon />
            </div>

            <span className="text-lg font-semibold tracking-tight">
              Brightstar Chat
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6">
          <p className="mb-3 px-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/25">
            Workspace
          </p>

          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/45 transition hover:bg-white/[0.05] hover:text-white"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          <p className="mb-3 mt-10 px-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/25">
            Account
          </p>

          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/45 transition hover:bg-white/[0.05] hover:text-white"
          >
            <SettingsIcon />
            Settings
          </Link>
        </nav>

        {/* Profile */}
        <div className="border-t border-white/[0.06] p-4">
          <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9",
                },
              }}
            />

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                Account
              </p>

              <p className="text-xs text-white/30">
                Manage profile
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="lg:pl-64">
        {/* Your existing header code */}
  {/* Topbar */}
        <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-white/[0.06] bg-[#07080c]/80 px-5 backdrop-blur-xl sm:px-8">
          {/* Mobile logo */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2 lg:hidden"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500">
              <VideoIcon />
            </div>

            <span className="font-semibold">
              VideoChat
            </span>
          </Link>

          {/* Search */}
          <div className="hidden max-w-md flex-1 lg:block">
            <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-2.5">
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white/25"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>

              <input
                placeholder="Search people..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25"
              />

              <span className="hidden rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] text-white/25 xl:block">
                /
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification */}
            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025] text-white/50 transition hover:bg-white/[0.06] hover:text-white">
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
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                <path d="M10 21h4" />
              </svg>

              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-violet-400" />
            </button>

            <div className="lg:hidden">
              <UserButton />
            </div>
          </div>
        </header>

        {/* Page */}
        <main className="min-h-[calc(100vh-5rem)] px-5 py-8 pb-24 sm:px-8 lg:px-10">
          {children}
          <IncomingCallPopup />
        </main>
      </div>

      {/* Your existing mobile navigation */}
      {/* Mobile navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/[0.06] bg-[#090a0f]/95 px-2 py-2 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-md items-center justify-around">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 rounded-xl px-4 py-2 text-white/35 transition hover:bg-white/[0.05] hover:text-white"
            >
              {item.icon}
              <span className="text-[10px]">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}