import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../DashboardPage/title';

export default function ClientInfo() {
    const [clientData, setClientData] = useState(null);

    useEffect(() => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        const token = sessionStorage.getItem('token'); // Retrieve JWT Token for authentication
        const userId = sessionStorage.getItem('userId'); // Retrieve user ID from session storage
        if (token && userId) {
            axios.get(`${backendUrl}/client?userId=${userId}`).then((response) => {
                setClientData(response.data);
            }).catch((error) => {
                console.error('Error fetching client data:', error);
            });
        }
    }, []);

    if (!clientData) {
        return <div>No Client Association</div>;
    }

    return (
        <React.Fragment>
            <Title>Client Information</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Client ID</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Phone Number</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{clientData.clientId}</TableCell>
                        <TableCell>{clientData.firstName}</TableCell>
                        <TableCell>{clientData.lastName}</TableCell>
                        <TableCell>{clientData.phoneNumber}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </React.Fragment>
    );
}