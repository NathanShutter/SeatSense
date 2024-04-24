import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './title.js';

export default function Orders() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const token = sessionStorage.getItem('token'); // Retrieve JWT Token for authentication
    const userId = sessionStorage.getItem('userId'); // Retrieve user ID from session storage
    if (token && userId) {
      axios.get(`${backendUrl}/User/${userId}`).then((response) => {
        setUserData(response.data);
      }).catch((error) => {
        console.error('Error fetching user data:', error);
      });
    }
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <Title>Welcome, {userData.firstName} {userData.lastName}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{userData.userId}</TableCell>
            <TableCell>{userData.firstName}</TableCell>
            <TableCell>{userData.lastName}</TableCell>
            <TableCell>{userData.email}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  );
}