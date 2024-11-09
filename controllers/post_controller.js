"use strict";
import mongoose from "mongoose";
import Post from "../models/post.js";

export const create_post = async (req, res) => {
  const { description } = req.body;
  const post_image = req.cloudinaryImageUrl;
  if (!description || !post_image) {
    return res.status(400).json({ message: "Description and image are required" });
  }
  const newPost = new Post({
    description,
    post_image,
  });
  const savedPost = await newPost.save();
  return res.status(201).json({
    message: "Post created successfully",
    data: savedPost,
  });
};

export const get_posts = async (req, res) => {
  const posts = await Post.find();
  if (posts.length === 0) {
    return res.status(200).json({ message: "No posts available", data: [] });
  }
  return res
    .status(200)
    .json({ message: "Post retrived successfully", data: posts || [] });
};

export const post_comment = async (req, res) => {
  const { id } = req.params;
  const { replay } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  if (!replay) {
    return res
      .status(400)
      .json({ message: "replay is required to add a comment" });
  }

  const post = await Post.findById(id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  const newComment = {
    replay,
    created_at: new Date(),
  };

  post.comments.push(newComment);

  const updatedPost = await post.save();

  return res.status(200).json({
    message: "Comment added successfully",
    data: updatedPost,
  });
};

export const post_like = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  post.liked += 1;

  const updatedPost = await post.save();

  return res.status(200).json({
    message: "Like added successfully",
    data: updatedPost,
  });
};
