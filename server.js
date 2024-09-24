const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes')
const cors = require('cors');

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
})); // Enable Cross-Origin Resource Sharing (for API requests from other domains)
app.use(express.json());  // Middleware to parse JSON request bodies
// MongoDB connection setup
mongoose.connect('mongodb+srv://ramram:ram1234@cluster0.yyo1h.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => console.log(err));

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});
// Routes for authentication and posts
app.use('/api/auth', authRoutes);  // Handles user authentication routes (register, login)
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
// Handles posts and comments-related routes

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
