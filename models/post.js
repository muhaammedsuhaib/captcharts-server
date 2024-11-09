"use strict";
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    post_image: {
      type: String,
      required: true,
    },
    liked: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        replay: {
          type: String,
          required: true,
        },
        created_at: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
