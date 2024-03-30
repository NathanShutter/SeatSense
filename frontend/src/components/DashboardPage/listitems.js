import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Button from '@mui/material/Button';
//import ButtonBase from '@mui/material/ButtonBase';

export const mainListItems = (
    <React.Fragment>
        
        <ListItemButton>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
            <Button
                onClick={() => {
                    <Button href="/http://localhost:3000/dashboard" variant="contained">
                    Link
                  </Button>
                }}
            >
            </Button>
        </ListItemButton>

        <ListItemButton>
            <ListItemIcon>
                <NotificationsActiveIcon />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
            <Button
                onClick={() => {
                    <Button href="/http://localhost:3000/" variant="contained">
                    Link
                  </Button>
                }}
            >
            </Button>
        </ListItemButton>

        <ListItemButton>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Client" />
            <Button
                onClick={() => {
                    <Button href="/http://localhost:3000/" variant="contained">
                    Link
                  </Button>
                }}
            >
            </Button>
        </ListItemButton>

        <ListItemButton>
            <ListItemIcon>
                <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
            <Button
                onClick={() => {
                    <Button href="/http://localhost:3000/" variant="contained">
                    Link
                  </Button>
                }}
            >
            </Button>
        </ListItemButton>
    </React.Fragment>
);