"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SetupProfilePage() {
  const { user } = useUser();
  const { isLoaded, userId } = useAuth();

  const createUser = useMutation(api.users.createUser);
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleContinue() {
    if (!isLoaded || !user || !userId) return;

    const username = user.username;

    if (!username) {
      console.error("User does not have a username");
      return;
    }

    try {
      setLoading(true);

      await createUser({
        clerkId: userId,
        username: username.toLowerCase(),
        name: user.fullName ?? undefined,
        email: user.primaryEmailAddress?.emailAddress ?? "",
        image: user.imageUrl,
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("CREATE USER ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome to Video Chat
          </h1>

          <p className="mt-2 text-gray-500">
            Your account is ready. Let's set up your profile.
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-sm text-gray-500">
            Username
          </p>

          <p className="font-medium">
            @{user?.username}
          </p>
        </div>

        <button
          onClick={handleContinue}
          disabled={loading}
          className="w-full rounded-lg bg-black px-4 py-3 text-white disabled:opacity-50"
        >
          {loading ? "Setting up..." : "Continue"}
        </button>
      </div>
    </main>
  );
}