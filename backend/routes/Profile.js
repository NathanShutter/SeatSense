const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');

// GET profile route - Fetch user profile
router.get('/:userId', async (req, res) => {
    try {
        // Retrieve userId from request parameters
        const userId = req.params.userId;

        // Use userId to fetch user profile data
        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Return user profile data
        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST profile route - Update user profile
router.post('/:userId', async (req, res) => {
    try {
        // Retrieve userId from session
        const userId = req.params.userId;

        // Extract updated profile data from request body
        const { firstName, lastName, email, phone, password } = req.body;

        // Find user by userId
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user profile data
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.phone = phone;

        // Update password only if it's provided
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        // Save the updated user data
        const updatedUser = await user.save();

        // Return updated user profile data
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user profile:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
