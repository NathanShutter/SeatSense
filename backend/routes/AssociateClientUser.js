const express = require('express');
const router = express.Router();
const { User, Client } = require('../models'); // Import Sequelize models

// POST /associate-client-user
router.post('/', async (req, res) => {
    try {
        // Extract client ID and user ID from request body
        const { clientId, userId } = req.body;

        // Find the client and user in the database
        const client = await Client.findByPk(clientId);
        const user = await User.findByPk(userId);

        // Check if client and user exist
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Associate the client with the user
        await client.setUser(user);

        // Respond with success message
        res.status(200).json({ message: 'Client associated with user successfully' });
    } catch (error) {
        // Handle any errors
        console.error('Error associating client with user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
