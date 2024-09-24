const express = require('express');
const auth = require('../controllers/auth');
const router = express.Router();

// Routes for authentication
router.route('/register').post(auth.register);
router.route('/login').post(auth.signin);


module.exports = router;
