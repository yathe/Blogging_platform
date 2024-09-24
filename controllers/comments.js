const express = require('express');
const Comment = require('../models/Comment');


// Fetch comments for a post
const Fetchcomments=async (req, res) => {
  const comments = await Comment.find({ postId: req.params.postId });  // Get comments for a specific post
  res.status(200).json(comments);
};

// Add a new comment
const Addcomments=async(req, res) => {
  const { postId, content, author } = req.body;

  const newComment = new Comment({
    postId,
    content,
    author
  });

  await newComment.save();  // Save the comment to the database
  res.status(201).json(newComment);
};

module.exports = {Fetchcomments,Addcomments};
