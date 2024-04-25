const express = require('express');
const router = express.Router();

// POST route for receiving sensor data
router.post('/', (req, res) => {
    const sensorData = req.body; // Assuming the sensor data is sent in the request body
    console.log('Received sensor data:', sensorData);
    // Perform any processing or database storage here
    res.send('Sensor data received successfully');
});

module.exports = router;