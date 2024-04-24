const express = require('express');
const router = express.Router();
const { sendPasswordResetEmail } = require('../config/emailConfig');
const { User, ResetRequest } = require('../models');
const { v4: uuidv4 } = require('uuid');

// Route to handle password reset requests
router.post('/:email', async (req, res) => {
    try {
        const email = req.params.email; // Extract email from route parameter

        // Check if the email exists in the User table
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'Email not found' });
        }

        // Generate password reset token
        const token = generateUniqueToken();

        // Store the reset token in the ResetRequest table
        await ResetRequest.create({
            token,
            UserUserId: user.userId // Assuming User has a userId property
        });

        // Generate password reset link
        const resetLink = generateResetLink(email, token);

        // Send password reset email
        await sendPasswordResetEmail(email, resetLink);

        res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
        console.error('Error sending password reset email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET requests to the password reset page
router.get('/', (req, res) => {
    const { token, email } = req.query;
    // Check if token and email are valid
    // If valid, render the password reset page
    res.render('reset-password', { token, email });
});


// Function to generate password reset link
function generateResetLink(email) {
    // Get the backend URL from environment variables
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    // Generate unique token or code for password reset link
    const token = generateUniqueToken();

    // Construct password reset link using the backend URL
    const resetLink = `${backendUrl}/reset-password?token=${token}&email=${email}`;

    return resetLink;
}


function generateUniqueToken() {
    return uuidv4();
}

module.exports = router;