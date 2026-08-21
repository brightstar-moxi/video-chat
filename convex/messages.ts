import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

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


export const getConversations = query({
  args: {},

  handler: async (ctx) => {
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
      .withIndex("by_sender", (q) =>
        q.eq("senderId", currentUser._id)
      )
      .collect();

    const receivedMessages = await ctx.db
      .query("messages")
      .withIndex("by_receiver", (q) =>
        q.eq("receiverId", currentUser._id)
      )
      .collect();

    // const otherUserIds = new Set<string>();

    const otherUserIds = new Set<Id<"users">>();

    for (const message of sentMessages) {
      otherUserIds.add(message.receiverId);
    }

    for (const message of receivedMessages) {
      otherUserIds.add(message.senderId);
    }

  const conversations = await Promise.all(
  Array.from(otherUserIds).map(async (userId) => {
    const user = await ctx.db.get(userId);

    if (!user) {
      return null;
    }

    const userMessages = [
      ...sentMessages.filter(
        (message) => message.receiverId === userId
      ),
      ...receivedMessages.filter(
        (message) => message.senderId === userId
      ),
    ];

    const lastMessage = userMessages.sort(
      (a, b) => b.createdAt - a.createdAt
    )[0];

    if (!lastMessage) {
      return null;
    }

    return {
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        image: user.image,
      },
      lastMessage,
    };
  })
);

return conversations
  .filter(
    (conversation): conversation is NonNullable<typeof conversation> =>
      conversation !== null
  )
  .sort(
    (a, b) =>
      b.lastMessage.createdAt -
      a.lastMessage.createdAt
  );
  },
});