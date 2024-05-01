const express = require('express');
const router = express.Router();
const { Client } = require('../models');

// Route handler to get all clients
router.get('/', async (req, res) => {
    try {
        // Fetch all clients from the database
        const clients = await Client.findAll();
        res.json(clients);
    } catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;