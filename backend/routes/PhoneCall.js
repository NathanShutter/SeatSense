const express = require('express');
const fetch = require('cross-fetch');
const router = express.Router();
const { Client } = require('../models');

// Constants for Sinch API credentials
const APPLICATION_KEY = "21b8d563-561e-4ed6-aa43-a4d9d3e1b901"; // Your Sinch application key
const APPLICATION_SECRET = "DjpTdvfqe0aguxHqEwqLQA=="; // Your Sinch application secret
const SINCH_NUMBER = "+12085810903"; // Your Sinch phone number
const LOCALE = "en-US"; // Locale for the call

// Construct basic authentication header
const basicAuthentication = APPLICATION_KEY + ":" + APPLICATION_SECRET;

// POST route to make a phone call
router.post('/', async (req, res) => {
    try {
        const clientId = req.body.clientId; // Assuming clientId is provided in the request body

        // Fetch the client information based on the clientId
        const client = await Client.findByPk(clientId); // Assuming clientId is the primary key of the Client model
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }

        // Use the client's phone number for the call
        const clientPhoneNumber = client.phoneNumber; // Assuming client's phone number is stored in the database

        // Body for the Sinch TTS call
        const ttsBody = {
            method: 'ttsCallout',
            ttsCallout: {
                cli: SINCH_NUMBER,
                destination: {
                    type: 'number',
                    endpoint: clientPhoneNumber // Use the client's phone number for the call
                },
                locale: LOCALE,
                text: 'This is a call from the backend server of Seat Sense. You need to get up off of your chair, for health reasons!',
            }
        };

        // Make the POST request to Sinch API
        const response = await fetch("https://calling.api.sinch.com/calling/v1/callouts", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + Buffer.from(basicAuthentication).toString('base64')
            },
            body: JSON.stringify(ttsBody)
        });

        // Parse response JSON
        const jsonResponse = await response.json();

        // Send response to client
        res.status(200).json(jsonResponse);
    } catch (error) {
        console.error('Error making phone call:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;