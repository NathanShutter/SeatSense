const express = require('express');
const router = express.Router();
const { Client } = require('../models');

// POST /create-client
router.post('/', async (req, res) => {
    try {
        // Extract client data from request body
        let { firstName, lastName, phoneNumber, seatedDuration, seatedThreshold } = req.body;

        // Remove all spaces from the phone number
        phoneNumber = phoneNumber.replace(/\s/g, '');

        // Create a new client instance
        const newClient = await Client.create({
            firstName,
            lastName,
            phoneNumber,
            seatedDuration,
            seatedThreshold
        });

        // Respond with success message
        res.status(201).json({ message: 'Client created successfully' });
    } catch (error) {
        // Handle any errors
        console.error('Error creating client:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;