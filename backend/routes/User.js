const express = require('express');
const router = express.Router();
const { User } = require('../models')
router.get("/", (req, res) => {
    res.json("Hello user");
});

router.post("/", async (req, res) => {
    const user = req.body
    await User.create(user);
    res.json(user);
});

module.exports = router;