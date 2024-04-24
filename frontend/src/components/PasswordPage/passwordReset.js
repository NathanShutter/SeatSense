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
import MailLockRoundedIcon from '@mui/icons-material/MailLockRounded';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function PasswordReset() {
    const [alert, setAlert] = useState({ type: '', message: '' });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const response = await axios.post(`${backendUrl}/forgot-password/`, {
                email: event.target.email.value,
            });
            // Check if the response contains a success message
            if (response.data.message) {
                const userEmail = event.target.email.value;
                setAlert({ type: 'success', message: `Password reset link sent to (${userEmail})` });
            }
        } catch (error) {
            console.error('Password reset request failed:', error.message);
            // Handle error response from the server
            if (error.response && error.response.data && error.response.data.error) {
                setAlert({ type: 'error', message: error.response.data.error });
            } else {
                setAlert({ type: 'error', message: 'Failed to send password reset link. Please try again.' });
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
                        <MailLockRoundedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Reset Password
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Send Email
                        </Button>
                        {alert.type === 'success' && (
                            <Alert severity="success" sx={{ mt: 2 }}>{alert.message}</Alert>
                        )}
                        {alert.type === 'error' && (
                            <Alert severity="error" sx={{ mt: 2 }} >{alert.message}</Alert>
                        )}
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    Sign In
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
