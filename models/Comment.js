const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  postId: mongoose.Schema.Types.ObjectId,  // Reference to the post
  content: String,
  author: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', CommentSchema);
