import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    Badge,
    Avatar,
    Divider,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Mail as MailIcon,
    Notifications as NotificationsIcon
} from '@mui/icons-material';
import { useMediaQuery } from '@mui/material';

const HorizontalNavBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuType, setMenuType] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:600px)');

    const handleMenuOpen = (event, type) => {
        setAnchorEl(event.currentTarget);
        setMenuType(type);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuType('');
    };

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const renderMobileMenu = () => (
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <List>
                <ListItem button onClick={(e) => handleMenuOpen(e, 'messages')}>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary="Messages" />
                </ListItem>
                <ListItem button onClick={(e) => handleMenuOpen(e, 'notifications')}>
                    <ListItemIcon><NotificationsIcon /></ListItemIcon>
                    <ListItemText primary="Notifications" />
                </ListItem>
                <ListItem button onClick={(e) => handleMenuOpen(e, 'profile')}>
                    <Avatar alt="Michael Kasuku" src="assets/img/team/kasuku.jpg" sx={{ mr: 2 }} />
                    <ListItemText primary="Profile" />
                </ListItem>
                <Divider />
                <ListItem button onClick={handleMenuClose}>
                    <ListItemText primary="Sign Out" />
                </ListItem>
            </List>
        </Drawer>
    );

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    {isMobile && (
                        <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        <img src="assets/img/vetkonnect.jpg" alt="Vet Konnect" style={{ height: 40 }} />
                    </Typography>
                    {!isMobile && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton color="inherit" onClick={(e) => handleMenuOpen(e, 'messages')}>
                                <Badge badgeContent={4} color="warning">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton color="inherit" onClick={(e) => handleMenuOpen(e, 'notifications')}>
                                <Badge badgeContent={3} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton edge="end" color="inherit" onClick={(e) => handleMenuOpen(e, 'profile')}>
                                <Avatar alt="Michael Kasuku" src="assets/img/team/kasuku.jpg" />
                            </IconButton>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>

            {renderMobileMenu()}

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && menuType === 'profile'}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem onClick={handleMenuClose}>Activity Log</MenuItem>
                <Divider />
                <MenuItem onClick={handleMenuClose}>Sign Out</MenuItem>
            </Menu>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && menuType === 'messages'}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Typography variant="h6" sx={{ px: 2, py: 1 }}>Messages</Typography>
                <Divider />
                <MenuItem>
                    <Avatar alt="Lopez" src="assets/img/team/lopez.jpg" />
                    <Box sx={{ ml: 2 }}>
                        <Typography variant="body2">Lopez sent you a message</Typography>
                        <Typography variant="caption" color="text.secondary">1 minute ago</Typography>
                    </Box>
                </MenuItem>
            </Menu>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && menuType === 'notifications'}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Typography variant="h6" sx={{ px: 2, py: 1 }}>Notifications</Typography>
                <Divider />
                <MenuItem>
                    <Avatar><NotificationsIcon /></Avatar>
                    <Box sx={{ ml: 2 }}>
                        <Typography variant="body2">Appointment Today</Typography>
                    </Box>
                </MenuItem>
            </Menu>
        </>
    );
};

export default HorizontalNavBar;
