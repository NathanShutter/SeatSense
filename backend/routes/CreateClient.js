const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

// POST /create-client
router.post('/', async (req, res) => {
    try {
        // Extract client data from request body
        const { firstName, lastName, phoneNumber, seatedDuration, seatedThreshold } = req.body;

        // Create a new client instance
        const newClient = new Client({
            firstName,
            lastName,
            phoneNumber,
            seatedDuration,
            seatedThreshold
        });

        // Save the new client to the database
        await newClient.save();

        // Respond with success message
        res.status(201).json({ message: 'Client created successfully' });
    } catch (error) {
        // Handle any errors
        console.error('Error creating client:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
