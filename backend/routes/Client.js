const express = require('express');
const router = express.Router();
const { Client } = require('../models'); 

// GET client information based on user ID
router.get('/', async (req, res) => {
    try {
        const userId = req.query.userId;
        // Fetch the client associated with the provided userId
        const client = await Client.findOne({ where: { UserUserId: userId } });
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        return res.json(client);
    } catch (error) {
        console.error('Error fetching client data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;