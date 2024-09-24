const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/Post');

// Fetch all posts
const FetchAllPosts = async (req, res) => {
  const posts = await Post.find();  // Get all posts from the database
  res.status(200).json(posts);  // Respond with JSON array of posts
};
// Fetch posts by a specific user (assuming `author` field refers to the user ID)
const FetchUserPosts = async (req, res) => {
    const { userId } = req.query; // assuming you're passing user ID as a query param
    try {
        const posts = await Post.find({ author: userId }); // Adjust based on your schema
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching user posts" });
    }
};


// Fetch a single post by ID
const FetchSinglePosts = async (req, res) => {
  const { id } = req.params;

  // Check if the ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Post ID" });
  }

  try {
    const post = await Post.findById(id);  // Find post by ID
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the post" });
  }
};


const FetchNewPosts = async (req, res) => {
  console.log(req.body); // Log incoming data to verify

  const { title, content, author } = req.body;

  const newPost = new Post({
    title,
    content,
    author,
  });

  await newPost.save();
  res.status(201).json(newPost);
};

module.exports = { FetchAllPosts, FetchNewPosts, FetchSinglePosts, FetchUserPosts };
