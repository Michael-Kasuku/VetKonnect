import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Collapse,
    Menu,
    MenuItem,
    Avatar,
    Badge,
    Drawer,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Home,
    People, // Updated from Folder to People for Vet Directory
    EventNote, // Updated from CalendarToday to EventNote for Appointments History
    Store, // Updated from ShoppingCart to Store for Agrovet Hub
    LocalMall, // Updated for Products under Agrovet Hub
    Receipt, // Updated for Order Management under Agrovet Hub
    LibraryBooks, // Updated from School to LibraryBooks for Educational Resources
    LiveTv, // Updated for Webinars under Educational Resources
    Group, // Updated from Forum to Group for Community Forum
    Comment, // Updated from Chat to Comment for Discussions
    Article,
    Event,
    Assignment,
    ExpandLess,
    ExpandMore,
    Notifications,
    Message,
    LocalHospital,
} from '@mui/icons-material';

import { Link, useLocation } from 'react-router-dom';

const HorizontalNavBar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the viewport is small
    const location = useLocation();
    const [openSections, setOpenSections] = useState({
        vetDirectory: false,
        agrovetHub: false,
        educationalResources: false,
        communityForum: false,
    });
    const [anchorEl, setAnchorEl] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false); // State for drawer

    const toggleCollapse = (section) => {
        setOpenSections((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    const handleProfileMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setDrawerOpen(false); // Close drawer when menu item is clicked
    };

    const navItems = [
        {
            text: "Dashboard",
            icon: <Home fontSize="large" style={{ color: '#1976d2' }} />,
            link: "/admindashboard/home",
            subItems: null,
        },
        {
            text: "Vet Directory",
            icon: <LocalHospital fontSize="large" style={{ color: '#1976d2' }} />, // Changed to LocalHospital for a vet-related context
            link: null,
            subItems: [
                { text: "Vet Profiles", icon: <People fontSize="large" style={{ color: '#1976d2' }} />, link: "/admindashboard/vet-profiles" }, // Individual vet profile
                { text: "Farmer Profiles", icon: <People fontSize="large" style={{ color: '#1976d2' }} />, link: "/admindashboard/farmer-profiles" },
                { text: "Appointments History", icon: <EventNote fontSize="large" style={{ color: '#1976d2' }} />, link: "/admindashboard/appointments" }, // Updated icon for appointments
            ],
        },
        {
            text: "Agrovet Hub",
            icon: <Store fontSize="large" style={{ color: '#1976d2' }} />, // Changed to Store for a marketplace feel
            link: null,
            subItems: [
                { text: "Products", icon: <LocalMall fontSize="large" style={{ color: '#1976d2' }} />, link: "/admindashboard/products" }, // LocalMall for products
                { text: "Order Management", icon: <Receipt fontSize="large" style={{ color: '#1976d2' }} />, link: "/admindashboard/order-management" }, // Receipt for order management
            ],
        },
        {
            text: "Educational Resources",
            icon: <LibraryBooks fontSize="large" style={{ color: '#1976d2' }} />, // LibraryBooks for educational materials
            link: null,
            subItems: [
                { text: "Blogs", icon: <Article fontSize="large" style={{ color: '#1976d2' }} />, link: "/admindashboard/blogs" },
                { text: "Webinars", icon: <LiveTv fontSize="large" style={{ color: '#1976d2' }} />, link: "/admindashboard/webinars" }, // LiveTv for webinars
            ],
        },
        {
            text: "Community Forum",
            icon: <Group fontSize="large" style={{ color: '#1976d2' }} />, // Group to represent community
            link: null,
            subItems: [
                { text: "Discussions", icon: <Comment fontSize="large" style={{ color: '#1976d2' }} />, link: "/admindashboard/discussions" }, // Comment for discussions
            ],
        },
    ];

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <AppBar position="fixed" style={{ backgroundColor: '#ffffff', zIndex: 1201 }}>
            <Toolbar>
                {isMobile ? (
                    <>
                        <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} style={{ color: '#1976d2' }}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
                            <List style={{ width: '250px' }}>
                                {navItems.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <ListItem
                                            button
                                            component={item.link ? Link : 'div'}
                                            to={item.link || '#'}
                                            onClick={() => item.subItems && toggleCollapse(item.text.replace(/\s+/g, '').toLowerCase())}
                                            style={{
                                                color: location.pathname === item.link ? '#d32f2f' : '#1976d2',
                                            }}
                                        >
                                            <ListItemIcon>{item.icon}</ListItemIcon>
                                            <ListItemText primary={item.text} />
                                            {item.subItems && (
                                                <IconButton size="small">
                                                    {openSections[item.text.replace(/\s+/g, '').toLowerCase()] ? <ExpandLess /> : <ExpandMore />}
                                                </IconButton>
                                            )}
                                        </ListItem>
                                        {item.subItems && (
                                            <Collapse in={openSections[item.text.replace(/\s+/g, '').toLowerCase()]} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    {item.subItems.map((subItem, subIndex) => (
                                                        <ListItem
                                                            button
                                                            key={subIndex}
                                                            component={Link}
                                                            to={subItem.link}
                                                            style={{
                                                                paddingLeft: '40px',
                                                                color: location.pathname === subItem.link ? '#d32f2f' : '#1976d2'
                                                            }}
                                                        >
                                                            <ListItemIcon>{subItem.icon}</ListItemIcon>
                                                            <ListItemText primary={subItem.text} />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </Collapse>
                                        )}
                                    </React.Fragment>
                                ))}
                            </List>
                        </Drawer>
                    </>
                ) : (
                    <List style={{ display: 'flex', padding: 0, flexGrow: 1 }}>
                        {navItems.map((item, index) => (
                            <React.Fragment key={index}>
                                <ListItem
                                    button
                                    component={item.link ? Link : 'div'}
                                    to={item.link || '#'}
                                    onClick={() => item.subItems && toggleCollapse(item.text.replace(/\s+/g, '').toLowerCase())}
                                    style={{
                                        padding: '0 16px',
                                        color: location.pathname === item.link ? '#d32f2f' : '#1976d2',
                                        transition: 'background-color 0.3s',
                                    }}
                                >
                                    <ListItemIcon style={{ minWidth: '40px' }}>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                    {item.subItems && (
                                        <IconButton size="small" style={{ color: '#1976d2' }}>
                                            {openSections[item.text.replace(/\s+/g, '').toLowerCase()] ? <ExpandLess /> : <ExpandMore />}
                                        </IconButton>
                                    )}
                                </ListItem>
                                {item.subItems && (
                                    <Collapse in={openSections[item.text.replace(/\s+/g, '').toLowerCase()]} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {item.subItems.map((subItem, subIndex) => (
                                                <ListItem
                                                    button
                                                    key={subIndex}
                                                    component={Link}
                                                    to={subItem.link}
                                                    style={{
                                                        paddingLeft: '40px',
                                                        color: location.pathname === subItem.link ? '#d32f2f' : '#1976d2'
                                                    }}
                                                >
                                                    <ListItemIcon style={{ minWidth: '40px' }}>{subItem.icon}</ListItemIcon>
                                                    <ListItemText primary={subItem.text} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Collapse>
                                )}
                            </React.Fragment>
                        ))}
                    </List>
                )}

                <IconButton style={{ marginLeft: 'auto' }}>
                    <Badge badgeContent={4} color="secondary">
                        <Notifications style={{ color: '#1976d2' }} />
                    </Badge>
                </IconButton>

                <IconButton style={{ marginLeft: '8px' }}>
                    <Badge badgeContent={2} color="secondary">
                        <Message style={{ color: '#1976d2' }} />
                    </Badge>
                </IconButton>

                <IconButton onClick={handleProfileMenuClick} style={{ marginLeft: '8px' }}>
                    <Avatar src="/assets/img/team/kasuku.jpg" alt="Profile Picture" />
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default HorizontalNavBar;
