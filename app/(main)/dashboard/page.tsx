import { UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
  return (
    <main className="min-h-screen p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Video Chat
        </h1>

        <UserButton />
      </header>

      <section className="mt-12">
        <h2 className="text-4xl font-bold">
          Welcome to Video Chat
        </h2>

        <p className="mt-3 text-gray-500">
          Connect with your friends.
        </p>
      </section>
    </main>
  );
}