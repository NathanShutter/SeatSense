app.post('/', (req, res) => {
    const sensorData = req.body; // Assuming the sensor data is sent in the request body
    console.log('Received sensor data:', sensorData);
    // Perform any processing or database storage here
    res.send('Sensor data received successfully');
  });