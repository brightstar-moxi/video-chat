import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const searchUsers = query({
  args: {
    username: v.string(),
  },

  handler: async (ctx, args) => {
    const username = args.username.trim().toLowerCase();

    if (!username) return [];

    return await ctx.db
      .query("users")
      .withIndex("by_username", (q) =>
        q.eq("username", username)
      )
      .collect();
  },
});

export const sendFriendRequest = mutation({
  args: {
    senderId: v.id("users"),
    receiverId: v.id("users"),
  },

  handler: async (ctx, args) => {
    if (args.senderId === args.receiverId) {
      throw new Error("You cannot add yourself");
    }

    const existingRequest = await ctx.db
      .query("friendRequests")
      .withIndex("by_sender", (q) =>
        q.eq("senderId", args.senderId)
      )
      .filter((q) =>
        q.eq(q.field("receiverId"), args.receiverId)
      )
      .first();

    if (existingRequest) {
      throw new Error("Friend request already exists");
    }

    return await ctx.db.insert("friendRequests", {
      senderId: args.senderId,
      receiverId: args.receiverId,
      status: "pending",
      createdAt: Date.now(),
    });
  },
});

export const getIncomingRequests = query({
  args: {
    userId: v.id("users"),
  },

  handler: async (ctx, args) => {
    const requests = await ctx.db
      .query("friendRequests")
      .withIndex("by_receiver", (q) =>
        q.eq("receiverId", args.userId)
      )
      .filter((q) =>
        q.eq(q.field("status"), "pending")
      )
      .collect();

    return await Promise.all(
      requests.map(async (request) => {
        const sender = await ctx.db.get(request.senderId);

        return {
          ...request,
          sender,
        };
      })
    );
  },
});

export const respondToFriendRequest = mutation({
  args: {
    requestId: v.id("friendRequests"),
    response: v.union(
      v.literal("accepted"),
      v.literal("declined")
    ),
  },

  handler: async (ctx, args) => {
    const request = await ctx.db.get(args.requestId);

    if (!request) {
      throw new Error("Friend request not found");
    }

    if (request.status !== "pending") {
      throw new Error("This request has already been handled");
    }

    if (args.response === "declined") {
      await ctx.db.patch(request._id, {
        status: "declined",
      });

      return;
    }

    await ctx.db.patch(request._id, {
      status: "accepted",
    });

    await ctx.db.insert("friendships", {
      userId: request.senderId,
      friendId: request.receiverId,
      createdAt: Date.now(),
    });

    await ctx.db.insert("friendships", {
      userId: request.receiverId,
      friendId: request.senderId,
      createdAt: Date.now(),
    });
  },
});

export const getFriends = query({
  args: {
    userId: v.id("users"),
  },

  handler: async (ctx, args) => {
    const friendships = await ctx.db
      .query("friendships")
      .withIndex("by_user", (q) =>
        q.eq("userId", args.userId)
      )
      .collect();

    return await Promise.all(
      friendships.map(async (friendship) => {
        return await ctx.db.get(friendship.friendId);
      })
    );
  },
});
export const getRelationship = query({
  args: {
    userId: v.id("users"),
    otherUserId: v.id("users"),
  },

  handler: async (ctx, args) => {
    // Check friendship
    const friendship = await ctx.db
      .query("friendships")
      .withIndex("by_user", (q) =>
        q.eq("userId", args.userId)
      )
      .filter((q) =>
        q.eq(q.field("friendId"), args.otherUserId)
      )
      .first();

    if (friendship) {
      return "friends";
    }

    // Check requests sent by current user
    const sentRequest = await ctx.db
      .query("friendRequests")
      .withIndex("by_sender", (q) =>
        q.eq("senderId", args.userId)
      )
      .filter((q) =>
        q.eq(q.field("receiverId"), args.otherUserId)
      )
      .filter((q) =>
        q.eq(q.field("status"), "pending")
      )
      .first();

    if (sentRequest) {
      return "sent";
    }

    // Check requests received by current user
    const receivedRequest = await ctx.db
      .query("friendRequests")
      .withIndex("by_receiver", (q) =>
        q.eq("receiverId", args.userId)
      )
      .filter((q) =>
        q.eq(q.field("senderId"), args.otherUserId)
      )
      .filter((q) =>
        q.eq(q.field("status"), "pending")
      )
      .first();

    if (receivedRequest) {
      return "received";
    }

    return "none";
  },
});