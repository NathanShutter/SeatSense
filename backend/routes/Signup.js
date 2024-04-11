const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');

// Route to handle user signup
router.post('/', async (req, res) => {
    try {
        // Extract user data from request body
        const { firstName, lastName, email, phone, password } = req.body;

        // Check if user with the same email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists with this email' });
        }

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword,
            role: 'healthcare_professional',
        });


        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error during signup:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;