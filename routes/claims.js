const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

// Claim points for a user
router.post('/', async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate random points between 1 and 10
    const pointsClaimed = Math.floor(Math.random() * 10) + 1;
    
    // Update user's total points
    user.totalPoints += pointsClaimed;
    await user.save();

    // Create claim history record
    const claimHistory = new ClaimHistory({
      userId: user._id,
      userName: user.name,
      pointsClaimed,
      totalPointsAfterClaim: user.totalPoints
    });
    await claimHistory.save();

    // Update rankings for all users
    await User.updateRankings();

    res.json({
      userId: user._id,
      userName: user.name,
      pointsClaimed,
      totalPoints: user.totalPoints,
      message: `Successfully claimed ${pointsClaimed} points!`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get claim history
router.get('/history', async (req, res) => {
  try {
    const history = await ClaimHistory.find()
      .populate('userId', 'name')
      .sort({ claimDate: -1 })
      .limit(50); // Limit to last 50 claims
    
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get claim history for specific user
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await ClaimHistory.find({ userId })
      .sort({ claimDate: -1 });
    
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
