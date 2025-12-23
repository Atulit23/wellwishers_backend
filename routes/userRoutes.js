const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Signup/Login endpoint (since login is just email & name)
router.post('/signup', async (req, res) => {
  try {
    const { name, email, treeName } = req.body;

    if (!name || !email) {
      return res.status(400).json({ 
        error: 'Name, email, and treeName are required' 
      });
    }

    // Check if user already exists
    let user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      // User exists, return user data (login)
      return res.status(200).json({
        message: 'Login successful',
        user: {
          name: user.name,
          email: user.email,
          treeId: user.treeId,
          treeName: user.treeName,
          treeDecos: user.treeDecos
        }
      });
    }

    // Create new user
    user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      treeName: treeName ? treeName.trim() : ''
    });

    await user.save();

    res.status(201).json({
      message: 'User created successfully',
      user: {
        name: user.name,
        email: user.email,
        treeId: user.treeId,
        treeName: user.treeName,
        treeDecos: user.treeDecos
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      error: 'Server error', 
      message: error.message 
    });
  }
});

// Get user by treeId (for sharing links)
router.get('/tree/:treeId', async (req, res) => {
  try {
    const { treeId } = req.params;

    const user = await User.findOne({ treeId });

    if (!user) {
      return res.status(404).json({ 
        error: 'Tree not found' 
      });
    }

    res.json({
      treeOwner: {
        name: user.name,
        email: user.email
      },
      treeId: user.treeId,
      treeName: user.treeName,
      treeDecos: user.treeDecos
    });
  } catch (error) {
    console.error('Get tree error:', error);
    res.status(500).json({ 
      error: 'Server error', 
      message: error.message 
    });
  }
});

// Get user details by treeId
router.get('/user/tree/:treeId', async (req, res) => {
  try {
    const { treeId } = req.params;

    const user = await User.findOne({ treeId });

    if (!user) {
      return res.status(404).json({ 
        error: 'User not found' 
      });
    }

    res.json({
      name: user.name,
      email: user.email,
      treeId: user.treeId,
      treeName: user.treeName,
      treeDecos: user.treeDecos,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  } catch (error) {
    console.error('Get user details error:', error);
    res.status(500).json({ 
      error: 'Server error', 
      message: error.message 
    });
  }
});

module.exports = router;
