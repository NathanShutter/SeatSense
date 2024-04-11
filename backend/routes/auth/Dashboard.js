const express = require('express');
const router = express.Router();
const auth = require('./auth');

// Protected route: Dashboard
router.get('/', auth, (req, res) => {
    // Access user information from req.user
    const userId = req.user.userId;
    
    // Return dashboard data
    res.json({ message: `Dashboard for user ${userId}` });
});

module.exports = router;