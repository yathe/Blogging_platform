const express = require('express');
const comments=require("../controllers/comments");
const router=express.Router();
// Route for adding a new comment
router.route('/').post(comments.Addcomments);

// Route for fetching comments for a post
router.route('/:postId').get(comments.Fetchcomments);
module.exports = router;