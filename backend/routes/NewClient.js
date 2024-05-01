const express = require('express');
const router = express.Router();
const { Client } = require('../models');

// POST route to create a new client
router.post('/', async (req, res) => {
    try {
        // Extract client data from the request body
        const { firstName, lastName, phoneNumber, seatedDuration, seatedThreshold } = req.body;

        // Create the client in the database
        const newClient = await Client.create({
            firstName,
            lastName,
            phoneNumber,
            seatedDuration,
            seatedThreshold
        });

        // Send a success response with the newly created client data
        res.status(201).json(newClient);
    } catch (error) {
        console.error('Error creating client:', error);
        // Send an error response if something went wrong
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;