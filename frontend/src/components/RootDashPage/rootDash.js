import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import RootNewClient from './rootNewClient';
import { Navigate } from 'react-router-dom';
import LogoutDialog from '../DashboardPage/LogoutDialog';
import RootClientUser from './rootClientUser';

const drawerWidth = 0;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const defaultTheme = createTheme();

export default function RootDashboard() {
    const [open, setOpen] = React.useState(true);
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleLogout = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };


    // Fetch the JWT token from local storage
    const token = sessionStorage.getItem('token');
    // Determine if the user is authenticated based on the presence of the token
    const isLoggedIn = !!token;

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px',
                        }}
                    >
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Admin Tools
                        </Typography>
                        <Button variant="text" color="inherit" onClick={handleLogout}>Logout</Button>
                    </Toolbar>
                </AppBar>

                <Divider />
                {isLoggedIn ? (
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Toolbar />
                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                        <RootNewClient />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                        <RootClientUser />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                ) : (
                    <Navigate to="/" replace />
                )}
                <LogoutDialog open={dialogOpen} handleClose={handleCloseDialog} />
            </Box>
        </ThemeProvider>
    );
}
