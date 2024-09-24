const express = require('express');
const multer = require('multer');
const posts = require("../controllers/posts");
const auth = require('../controllers/auth');
const router = express.Router();

// Set up multer for image uploads (or any file uploads)
const upload = multer(); // You can configure storage and file limits here

// Fetch all posts
router.route('/').get(posts.FetchAllPosts);

// Fetch a single post
router.route('/:id').get(posts.FetchSinglePosts);

// Create a new post with image upload
router.route('/').post(upload.none(), posts.FetchNewPosts); // Using multer to handle form data

// Fetch posts created by the authenticated user (protected)
router.route('/user').get(posts.FetchUserPosts);

module.exports = router;
