const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Add ornament to a tree
router.post('/tree/:treeId/ornament', async (req, res) => {
  try {
    const { treeId } = req.params;
    const { name, email, ornament, message, userId, x, y } = req.body;

    // Validate required fields
    if (!name || !email || !ornament || !message || !userId || x === undefined || y === undefined) {
      return res.status(400).json({ 
        error: 'Name, email, ornament, message, userId, x, and y coordinates are required' 
      });
    }

    // Find the tree owner
    const treeOwner = await User.findOne({ treeId });

    if (!treeOwner) {
      return res.status(404).json({ 
        error: 'Tree not found' 
      });
    }

    // Add ornament to treeDecos array
    const newOrnament = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      ornament: ornament.trim(),
      message: message.trim(),
      userId: userId.trim(),
      x: Number(x),
      y: Number(y)
    };

    treeOwner.treeDecos.push(newOrnament);
    await treeOwner.save();

    res.status(201).json({
      message: 'Ornament added successfully',
      ornament: newOrnament,
      treeDecos: treeOwner.treeDecos
    });
  } catch (error) {
    console.error('Add ornament error:', error);
    res.status(500).json({ 
      error: 'Server error', 
      message: error.message 
    });
  }
});

// Get all ornaments for a tree
router.get('/tree/:treeId/ornaments', async (req, res) => {
  try {
    const { treeId } = req.params;

    const treeOwner = await User.findOne({ treeId });

    if (!treeOwner) {
      return res.status(404).json({ 
        error: 'Tree not found' 
      });
    }

    res.json({
      treeId: treeOwner.treeId,
      treeName: treeOwner.treeName,
      treeOwner: {
        name: treeOwner.name,
        email: treeOwner.email
      },
      ornaments: treeOwner.treeDecos
    });
  } catch (error) {
    console.error('Get ornaments error:', error);
    res.status(500).json({ 
      error: 'Server error', 
      message: error.message 
    });
  }
});

module.exports = router;

