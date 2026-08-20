import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const sendMessage = mutation({
  args: {
    receiverId: v.id("users"),
    content: v.string(),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const sender = await ctx.db
      .query("users")
     .withIndex("by_clerk_id", (q) =>
  q.eq("clerkId", identity.subject)
)
      .unique();

    if (!sender) {
      throw new Error("User profile not found");
    }

    if (sender._id === args.receiverId) {
      throw new Error("You cannot message yourself");
    }

    const content = args.content.trim();

    if (!content) {
      throw new Error("Message cannot be empty");
    }

    if (content.length > 5000) {
      throw new Error("Message is too long");
    }

    const messageId = await ctx.db.insert("messages", {
      senderId: sender._id,
      receiverId: args.receiverId,
      content,
      type: "text",
      status: "sent",
      createdAt: Date.now(),
    });

    return messageId;
  },
});


export const getMessages = query({
  args: {
    otherUserId: v.id("users"),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const currentUser = await ctx.db
      .query("users")
     .withIndex("by_clerk_id", (q) =>
  q.eq("clerkId", identity.subject)
)
      .unique();

    if (!currentUser) {
      throw new Error("User profile not found");
    }

    const sentMessages = await ctx.db
      .query("messages")
      .withIndex("by_sender_receiver", (q) =>
        q
          .eq("senderId", currentUser._id)
          .eq("receiverId", args.otherUserId)
      )
      .collect();

    const receivedMessages = await ctx.db
      .query("messages")
      .withIndex("by_sender_receiver", (q) =>
        q
          .eq("senderId", args.otherUserId)
          .eq("receiverId", currentUser._id)
      )
      .collect();

    return [...sentMessages, ...receivedMessages].sort(
      (a, b) => a.createdAt - b.createdAt
    );
  },
});


export const markMessagesAsRead = mutation({
  args: {
    senderId: v.id("users"),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) =>
  q.eq("clerkId", identity.subject)
)
      .unique();

    if (!currentUser) {
      throw new Error("User profile not found");
    }

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_sender_receiver", (q) =>
        q
          .eq("senderId", args.senderId)
          .eq("receiverId", currentUser._id)
      )
      .collect();

    await Promise.all(
      messages
        .filter((message) => message.status !== "read")
        .map((message) =>
          ctx.db.patch(message._id, {
            status: "read",
          })
        )
    );
  },
});