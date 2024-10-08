import React, { Component } from 'react';
import $ from 'jquery';
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
} from '@mui/material';
import { Menu as MenuIcon, Mail as MailIcon, Notifications as NotificationsIcon } from '@mui/icons-material';

class HorizontalNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            menuType: '', // Identifies which menu (profile, messages, notifications) is currently open
        };
    }

    // Opens the specified menu
    handleMenuOpen = (event, menuType) => {
        this.setState({ anchorEl: event.currentTarget, menuType }, () => {
            // Use jQuery to animate menu opening
            $(`#${menuType}-menu`).slideDown(200);
        });
    };

    // Closes the open menu
    handleMenuClose = () => {
        const { menuType } = this.state;
        // Use jQuery to animate menu closing
        $(`#${menuType}-menu`).slideUp(200, () => {
            this.setState({ anchorEl: null, menuType: '' });
        });
    };

    render() {
        const { anchorEl, menuType } = this.state;
        const isMenuOpen = Boolean(anchorEl);

        return (
            <AppBar position="fixed">
                <Toolbar>
                    {/* Menu Button */}
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>

                    {/* Logo */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <img src="assets/img/vetkonnect.jpg" alt="Vet Konnect" style={{ height: 40 }} />
                    </Typography>

                    {/* Messages Button */}
                    <IconButton
                        color="inherit"
                        aria-label="show messages"
                        onClick={(e) => this.handleMenuOpen(e, 'messages')}
                    >
                        <Badge badgeContent={4} color="warning">
                            <MailIcon />
                        </Badge>
                    </IconButton>

                    {/* Notifications Button */}
                    <IconButton
                        color="inherit"
                        aria-label="show notifications"
                        onClick={(e) => this.handleMenuOpen(e, 'notifications')}
                    >
                        <Badge badgeContent={3} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>

                    {/* User Account Button */}
                    <IconButton
                        edge="end"
                        aria-label="account of current user"
                        onClick={(e) => this.handleMenuOpen(e, 'profile')}
                        color="inherit"
                    >
                        <Avatar alt="Michael Kasuku" src="assets/img/team/kasuku.jpg" />
                    </IconButton>
                </Toolbar>

                {/* Dropdown Menus for Profile, Messages, and Notifications */}
                {/* Profile Menu */}
                <Menu
                    id="profile-menu"
                    anchorEl={anchorEl}
                    open={isMenuOpen && menuType === 'profile'}
                    onClose={this.handleMenuClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <MenuItem onClick={this.handleMenuClose}>Activity Log</MenuItem>
                    <Divider />
                    <MenuItem onClick={this.handleMenuClose}>Sign Out</MenuItem>
                </Menu>

                {/* Messages Menu */}
                <Menu
                    id="messages-menu"
                    anchorEl={anchorEl}
                    open={isMenuOpen && menuType === 'messages'}
                    onClose={this.handleMenuClose}
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
                    <Divider />
                    <MenuItem>
                        <Avatar alt="Josphine" src="assets/img/team/josphine.jpg" />
                        <Box sx={{ ml: 2 }}>
                            <Typography variant="body2">Josphine sent you a message</Typography>
                            <Typography variant="caption" color="text.secondary">15 minutes ago</Typography>
                        </Box>
                    </MenuItem>
                </Menu>

                {/* Notifications Menu */}
                <Menu
                    id="notifications-menu"
                    anchorEl={anchorEl}
                    open={isMenuOpen && menuType === 'notifications'}
                    onClose={this.handleMenuClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Typography variant="h6" sx={{ px: 2, py: 1 }}>Notifications</Typography>
                    <Divider />
                    <MenuItem>
                        <Avatar><NotificationsIcon /></Avatar>
                        <Box sx={{ ml: 2 }}>
                            <Typography variant="body2">Appointment Today</Typography>
                            <Typography variant="caption" color="text.secondary">You have an appointment with Dr. Rupra today</Typography>
                        </Box>
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <Avatar><NotificationsIcon /></Avatar>
                        <Box sx={{ ml: 2 }}>
                            <Typography variant="body2">New sign-in detected</Typography>
                            <Typography variant="caption" color="text.secondary">From another device</Typography>
                        </Box>
                    </MenuItem>
                </Menu>
            </AppBar>
        );
    }
}

export default HorizontalNavBar;
