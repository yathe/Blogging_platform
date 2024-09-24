const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const validator = require('email-validator');
// Middleware to protect routes
const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(401).send("Invalid email or password");
      }

      const isMatch = bcrypt.compare(password, user.password);  // Await here
      if (!isMatch) {
          return res.status(401).json("Invalid email or password");  // Proper error message
      }

      // Generate JWT token if password matches
      const token = jwt.sign({ _id: user._id }, "kalhdjdjdjjj12233", { expiresIn: '24h' });
      
      return res.status(200).json({
          token,
          username: user.username,
          email: user.email,
          id: user._id,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
      });
  } catch (error) {
      console.error("Login error:", error);
      res.status(500).send('Login failed, please try again later');
  }
};


const register = async (req, res) => {
  console.log(req.body, 'req');
  const { email, password, username } = req.body;
  try {
      if (!username) return res.status(400).send('Username is required');
      if (!email) return res.status(400).send("Email is required");
      if (!validator.validate(email)) return res.status(400).send("Enter a valid email ID");
      if (!password || password.length < 6) return res.status(400).send("Password must be at least 6 characters long");

      const userExist = await User.findOne({ email });
      if (userExist) return res.status(400).send("Email is already in use");

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
          username,
          email,
          password: hashedPassword
      });

      await newUser.save();
      res.status(201).send(newUser);
  } catch (error) {
      console.error("Registration error:", error);
      res.status(500).send("Error creating user, please try again later");
  }
};

module.exports = { signin, register};
