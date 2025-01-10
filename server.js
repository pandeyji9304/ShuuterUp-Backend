const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const canvasRoutes = require('./routes/canvasRoutes');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

// Initialize Express app
const app = express();

// Enable CORS for requests from http://localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes (signup, login)
app.use('/api', canvasRoutes);     // Canvas data routes (get, post)

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
