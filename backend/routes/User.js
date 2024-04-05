const express = require('express');
const router = express.Router();
const { User } = require('../models')

router.get("/:userId", async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});

router.post("/", async (req, res) => {
    const user = req.body
    await User.create(user);
    res.json(user);
});

module.exports = router;