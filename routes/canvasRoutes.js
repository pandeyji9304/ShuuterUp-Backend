const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Middleware to authenticate the user via JWT
const authenticateUser = (req, res, next) => {
    const authHeader = req.header('Authorization'); // Retrieve Authorization header
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
  
    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach decoded user info to req.user
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
  

// Get User Canvas Data
router.get('/canvas', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user || !user.canvas) {
      return res.status(404).json({
        success: false,
        message: 'Canvas data not found',
      });
    }

    res.status(200).json({
      success: true,
      design: user.canvas,
    });
  } catch (error) {
    console.error('Error fetching canvas data:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});





router.post('/save-design', async (req, res) => {
    console.log(req.body);

    try {
        const { userEmail, companyName, design } = req.body;

        // Validate request
        if (!userEmail || !companyName || !design) {
            return res.status(400).json({ 
                success: false, 
                message: 'Missing required fields' 
            });
        }

        // Generate a unique hosted page URL
        const hostedPageUrl = `https://yourdomain.com/${crypto.randomUUID()}`;

        // Check if the user exists
        let user = await User.findOne({ email: userEmail });

        if (!user) {
            // Create a new user if not exists
            user = new User({
                email: userEmail,
                company_name: companyName,
                canvas: design,
                hosted_page_url: hostedPageUrl,
            });
        } else {
            // Update the existing user's canvas and hosted page URL
            user.canvas = design;
            user.hosted_page_url = hostedPageUrl;
        }

        // Save the user
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Design saved successfully',
            hosted_page_url: user.hosted_page_url,
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
});
  

module.exports = router;
