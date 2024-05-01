import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem, Button, Grid } from '@mui/material';
import Title from '../DashboardPage/title';

export default function RootClientUser() {
    const [clients, setClients] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedClient, setSelectedClient] = useState('');
    const [selectedUser, setSelectedUser] = useState('');

    useEffect(() => {
        // Fetch list of clients and users from the backend when component mounts
        const fetchClientsAndUsers = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const responseClients = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/all-clients`, {
                    headers: {
                        Authorization: token
                    }
                });
                const responseUsers = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/all-users`, {
                    headers: {
                        Authorization: token
                    }
                });
                setClients(responseClients.data);
                setUsers(responseUsers.data);
            } catch (error) {
                console.error('Error fetching clients and users:', error);
            }
        };

        fetchClientsAndUsers();
    }, []);

    const handleClientChange = (event) => {
        setSelectedClient(event.target.value);
    };

    const handleUserChange = (event) => {
        setSelectedUser(event.target.value);
    };

    const handleAssociateSubmit = async (event) => {
        event.preventDefault();
        try {
            // Associate the selected client with the selected user
            const token = sessionStorage.getItem('token');
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/associate-client-user`, {
                clientId: selectedClient,
                userId: selectedUser
            }, {
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
            <Title>Associate Client with User</Title>
            <form onSubmit={handleAssociateSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="client-label">Select Client</InputLabel>
                            <Select
                                labelId="client-label"
                                id="client-select"
                                value={selectedClient}
                                onChange={handleClientChange}
                            >
                                {clients.map((client) => (
                                    <MenuItem key={client.clientId} value={client.clientId}>{`${client.firstName} ${client.lastName}`}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="user-label">Select User</InputLabel>
                            <Select
                                labelId="user-label"
                                id="user-select"
                                value={selectedUser}
                                onChange={handleUserChange}
                            >
                                {users.map((user) => (
                                    <MenuItem key={user.userId} value={user.userId}>{`${user.firstName} ${user.lastName}`}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Associate Client with User
                </Button>
            </form>
        </React.Fragment>
    );
}