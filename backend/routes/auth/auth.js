const jwt = require('jsonwebtoken');
const { secretKey } = require('../../config/secrets');

const auth = (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization;

    // Check if token is present
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, secretKey);
        // Debug
        console.log('Decoded token:', decoded);
        // Set user information on request object
        req.user = decoded;

        // Call next middleware
        next();
    } catch (error) {
        // Debug
        console.error('Error verifying token:', error);
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = auth;