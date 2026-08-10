import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    username: v.string(),
  name: v.optional(v.string()),
    email: v.string(),
    image: v.optional(v.string()),
    bio: v.optional(v.string()),
    isOnline: v.boolean(),
    lastSeen: v.optional(v.number()),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_username", ["username"]),

  friendRequests: defineTable({
    senderId: v.id("users"),
    receiverId: v.id("users"),
    status: v.union(
      v.literal("pending"),
      v.literal("accepted"),
      v.literal("declined")
    ),
    createdAt: v.number(),
  })
    .index("by_receiver", ["receiverId"])
    .index("by_sender", ["senderId"]),

  friendships: defineTable({
    userId: v.id("users"),
    friendId: v.id("users"),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_friend", ["friendId"]),


    calls: defineTable({
  callerId: v.id("users"),
  receiverId: v.id("users"),

  status: v.union(
    v.literal("ringing"),
    v.literal("accepted"),
    v.literal("declined"),
    v.literal("ended")
  ),

  type: v.union(
    v.literal("audio"),
    v.literal("video")
  ),

  createdAt: v.number(),
  endedAt: v.optional(v.number()),
})
  .index("by_receiver", ["receiverId"])
  .index("by_caller", ["callerId"]),
});

