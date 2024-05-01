const express = require('express');
const router = express.Router();
const { User } = require('../models');

// Route handler to get all users
router.get('/', async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
