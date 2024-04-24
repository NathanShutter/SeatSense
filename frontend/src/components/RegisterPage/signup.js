import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MuiTelInput } from 'mui-tel-input'

const defaultTheme = createTheme();

export default function SignUp() {
  const [alert, setAlert] = useState({ type: '', message: '' });

  const [phone, setPhone] = React.useState('')

  const handleChange = (newPhone) => {
    setPhone(newPhone)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;

      const response = await axios.post(`${backendUrl}/signup`, {
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        phone: event.target.phone.value,
        email: event.target.email.value,
        password: event.target.password.value,
      });
      // Check if the response contains a success message
      if (response.data.message) {
        const userEmail = event.target.email.value;
        setAlert({ type: 'success', message: `Account (${userEmail}) was created successfully` });
      }
    } catch (error) {
      console.error('Sign up failed:', error.message);
      // Handle error response from the server
      if (error.response && error.response.data) {
        setAlert({ type: 'error', message: error.response.data.error });
      } else {
        setAlert({ type: 'error', message: 'Failed to sign up. Please try again.' });
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <MuiTelInput
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name='phone'
                  value={phone}
                  onChange={handleChange}
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {alert.type === 'success' && (
              <Alert severity="success" sx={{ mt: 2 }}>{alert.message}</Alert>
            )}
            {alert.type === 'error' && (
              <Alert severity="error" sx={{ mt: 2 }}>{alert.message}</Alert>
            )}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
