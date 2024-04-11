import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useNavigate } from 'react-router-dom';

const MainListItems = () => {
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <ListItemButton onClick={() => navigate('/dashboard')}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>

            <ListItemButton onClick={() => navigate('/notification')}>
                <ListItemIcon>
                    <NotificationsActiveIcon />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
            </ListItemButton>

            <ListItemButton onClick={() => navigate('/client')}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Client" />
            </ListItemButton>

            <ListItemButton onClick={() => navigate('/profile')}>
                <ListItemIcon>
                    <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </ListItemButton>
        </React.Fragment>
    );
};

export default MainListItems;
