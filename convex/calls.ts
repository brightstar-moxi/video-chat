import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const startCall = mutation({
  args: {
    callerId: v.id("users"),
    receiverId: v.id("users"),
    type: v.union(
      v.literal("audio"),
      v.literal("video")
    ),
  },

  handler: async (ctx, args) => {
    if (args.callerId === args.receiverId) {
      throw new Error("You cannot call yourself");
    }

    const callId = await ctx.db.insert("calls", {
      callerId: args.callerId,
      receiverId: args.receiverId,
      type: args.type,
      status: "ringing",
      createdAt: Date.now(),
    });

    return callId;
  },
});

export const getIncomingCall = query({
  args: {
    userId: v.id("users"),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("calls")
      .withIndex("by_receiver", (q) =>
        q.eq("receiverId", args.userId)
      )
      .filter((q) =>
        q.eq(q.field("status"), "ringing")
      )
      .order("desc")
      .first();
  },
});

export const respondToCall = mutation({
  args: {
    callId: v.id("calls"),
    response: v.union(
      v.literal("accepted"),
      v.literal("declined")
    ),
  },

  handler: async (ctx, args) => {
    const call = await ctx.db.get(args.callId);

    if (!call) {
      throw new Error("Call not found");
    }

    if (call.status !== "ringing") {
      throw new Error("Call is no longer ringing");
    }

    await ctx.db.patch(call._id, {
      status: args.response,
    });
  },
});

export const endCall = mutation({
  args: {
    callId: v.id("calls"),
  },

  handler: async (ctx, args) => {
    const call = await ctx.db.get(args.callId);

    if (!call) {
      throw new Error("Call not found");
    }

    await ctx.db.patch(call._id, {
      status: "ended",
      endedAt: Date.now(),
    });
  },
});