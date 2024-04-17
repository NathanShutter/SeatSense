const express = require('express');
const router = express.Router();
const { User } = require('../models');

const isAdmin = (req, res, next) => {
  if (req.user.role === 'root') {
    next(); // Proceed to the next middleware or route handler
  } else {
    res.status(403).json({ error: 'Unauthorized' });
  }
};

// Route to render the admin dashboard page
router.get('/', isAdmin, async (req, res) => {
  try {
    // Fetch some data to display on the admin dashboard if needed
    const users = await User.findAll(); // Example: Fetch all users
    res.render('admin-dashboard', { users });
  } catch (error) {
    console.error('Error fetching data for admin dashboard:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;