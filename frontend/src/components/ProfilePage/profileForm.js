import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Grid } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import Title from '../DashboardPage/title';

export default function ProfileForm() {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: ''
    });

    useEffect(() => {
        // Load user data from backend when component mounts
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');
        if (token && userId) {
            axios.get(`${backendUrl}/profile/${userId}`, {
                headers: {
                    Authorization: token
                }
            }).then((response) => {
                setUserData(response.data);
            }).catch((error) => {
                console.error('Error fetching user data:', error);
            });
        }
    }, []);

    const handleChange = e => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = sessionStorage.getItem('token');
            const userId = sessionStorage.getItem('userId');
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/profile/${userId}`, userData, {
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
            <Title>Profile</Title>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                            value={userData.firstName}
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
                            value={userData.lastName}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <MuiTelInput
                            required
                            fullWidth
                            id="phone"
                            name='phone'
                            label="Phone Number"
                            value={userData.phone}
                            onChange={(value) => setUserData({ ...userData, phone: value })}
                            defaultCountry="US"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={userData.email}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={userData.password}
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
                    Save Changes
                </Button>
            </form>
        </React.Fragment>
    );
}
