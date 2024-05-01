import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import Title from '../DashboardPage/title';

export default function RootNewClient() {
    const [clientData, setClientData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        seatedDuration: '',
        seatedThreshold: ''
    });

    const handleChange = e => {
        setClientData({ ...clientData, [e.target.name]: e.target.value });
    };

    const handleCreateSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = sessionStorage.getItem('token');
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/create-client`, clientData, {
                headers: {
                    Authorization: token
                }
            });
            if (response.data.message) {
                // Handle success
            }
        } catch (error) {
            // Handle error
        }
    };

    return (
        <React.Fragment>
            <Title>Create New Client</Title>
            <form onSubmit={handleCreateSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                            value={clientData.firstName}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            value={clientData.lastName}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <MuiTelInput
                            required
                            fullWidth
                            id="phoneNumber"
                            name='phoneNumber'
                            label="Phone Number"
                            value={clientData.phoneNumber}
                            onChange={(value) => setClientData({ ...clientData, phoneNumber: value })}
                            defaultCountry="US"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            id="seatedDuration"
                            label="Seated Duration"
                            name="seatedDuration"
                            type="time"
                            value={clientData.seatedDuration}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            id="seatedThreshold"
                            label="Seated Threshold"
                            name="seatedThreshold"
                            type="time"
                            value={clientData.seatedThreshold}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Create Client
                </Button>
            </form>
        </React.Fragment>
    );
}