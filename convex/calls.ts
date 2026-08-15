// import { mutation, query } from "./_generated/server";
// import { v } from "convex/values";

// export const startCall = mutation({
//   args: {
//     callerId: v.id("users"),
//     receiverId: v.id("users"),
//     type: v.union(
//       v.literal("audio"),
//       v.literal("video")
//     ),
//   },

//   handler: async (ctx, args) => {
//     if (args.callerId === args.receiverId) {
//       throw new Error("You cannot call yourself");
//     }

//     const callId = await ctx.db.insert("calls", {
//       callerId: args.callerId,
//       receiverId: args.receiverId,
//       type: args.type,
//       status: "ringing",
//       createdAt: Date.now(),
//     });

//     return callId;
//   },
// });

// export const getIncomingCall = query({
//   args: {
//     userId: v.id("users"),
//   },

//   handler: async (ctx, args) => {
//     return await ctx.db
//       .query("calls")
//       .withIndex("by_receiver", (q) =>
//         q.eq("receiverId", args.userId)
//       )
//       .filter((q) =>
//         q.eq(q.field("status"), "ringing")
//       )
//       .order("desc")
//       .first();
//   },
// });

// export const respondToCall = mutation({
//   args: {
//     callId: v.id("calls"),
//     response: v.union(
//       v.literal("accepted"),
//       v.literal("declined")
//     ),
//   },

//   handler: async (ctx, args) => {
//     const call = await ctx.db.get(args.callId);

//     if (!call) {
//       throw new Error("Call not found");
//     }

//     if (call.status !== "ringing") {
//       throw new Error("Call is no longer ringing");
//     }

//     await ctx.db.patch(call._id, {
//       status: args.response,
//     });
//   },
// });

// export const endCall = mutation({
//   args: {
//     callId: v.id("calls"),
//   },

//   handler: async (ctx, args) => {
//     const call = await ctx.db.get(args.callId);

//     if (!call) {
//       throw new Error("Call not found");
//     }

//     await ctx.db.patch(call._id, {
//       status: "ended",
//       endedAt: Date.now(),
//     });
//   },
// });




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

export const getCall = query({
  args: {
    callId: v.id("calls"),
  },

  handler: async (ctx, args) => {
    return await ctx.db.get(args.callId);
  },
});

export const getIncomingCall = query({
  args: {
    userId: v.id("users"),
  },

  handler: async (ctx, args) => {
    // return await ctx.db
    //   .query("calls")
    //   .withIndex("by_receiver", (q) =>
    //     q.eq("receiverId", args.userId)
    //   )
    //   .filter((q) =>
    //     q.eq(q.field("status"), "ringing")
    //   )
    //   .order("desc")
    //   .first();
    const call = await ctx.db
  .query("calls")
  .withIndex("by_receiver", (q) =>
    q.eq("receiverId", args.userId)
  )
  .filter((q) =>
    q.eq(q.field("status"), "ringing")
  )
  .order("desc")
  .first();

if (!call) {
  return null;
}

const caller = await ctx.db.get(call.callerId);

return {
  ...call,
  caller,
};
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

export const setOffer = mutation({
  args: {
    callId: v.id("calls"),
    offer: v.string(),
  },

  handler: async (ctx, args) => {
    const call = await ctx.db.get(args.callId);

    if (!call) {
      throw new Error("Call not found");
    }

    await ctx.db.patch(call._id, {
      offer: args.offer,
    });
  },
});

export const setAnswer = mutation({
  args: {
    callId: v.id("calls"),
    answer: v.string(),
  },

  handler: async (ctx, args) => {
    const call = await ctx.db.get(args.callId);

    if (!call) {
      throw new Error("Call not found");
    }

    await ctx.db.patch(call._id, {
      answer: args.answer,
    });
  },
});

export const addCandidate = mutation({
  args: {
    callId: v.id("calls"),
    senderId: v.id("users"),
    candidate: v.string(),
  },

  handler: async (ctx, args) => {
    await ctx.db.insert("callCandidates", {
      callId: args.callId,
      senderId: args.senderId,
      candidate: args.candidate,
    });
  },
});

export const getCandidates = query({
  args: {
    callId: v.id("calls"),
    userId: v.id("users"),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("callCandidates")
      .withIndex("by_call", (q) =>
        q.eq("callId", args.callId)
      )
      .filter((q) =>
        q.neq(q.field("senderId"), args.userId)
      )
      .collect();
  },
});

export const endCall = mutation({
  args: {
    callId: v.id("calls"),
  },

  handler: async (ctx, args) => {
    const call = await ctx.db.get(args.callId);

    if (!call) {
      return;
    }

    await ctx.db.patch(call._id, {
      status: "ended",
      endedAt: Date.now(),
    });
  },
});

export const getRecentCalls = query({
  args: {
    userId: v.id("users"),
  },

  handler: async (ctx, args) => {
    const calls = await ctx.db
      .query("calls")
      .filter((q) =>
        q.or(
          q.eq(q.field("callerId"), args.userId),
          q.eq(q.field("receiverId"), args.userId)
        )
      )
      .order("desc")
      .take(20);

    return await Promise.all(
      calls.map(async (call) => {
        const otherUserId =
          call.callerId === args.userId
            ? call.receiverId
            : call.callerId;

        const otherUser = await ctx.db.get(otherUserId);

        return {
          ...call,
          otherUser,
        };
      })
    );
  },
});