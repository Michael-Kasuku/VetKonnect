import React, { Component } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Collapse,
    ListItemIcon,
    Typography,
} from '@mui/material';
import {
    Menu as MenuIcon,
    ExpandLess,
    ExpandMore,
    Home,
    Folder,
    Group,
    ListAlt,
    Forum,
    Article,
    School,
    ShoppingCart,
    Event,
    Assignment,
    MedicalServices,
    Chat,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import $ from 'jquery'; // jQuery for animations

class VerticalNavBar extends Component {
    state = {
        openSections: {
            vetDirectory: false,
            agrovetHub: false,
            educationalResources: false,
            communityForum: false,
        },
        mobileOpen: false,
    };

    toggleCollapse = (section) => {
        this.setState((prevState) => ({
            openSections: {
                ...prevState.openSections,
                [section]: !prevState.openSections[section],
            },
        }), () => {
            const sectionElement = $(`.${section}`);
            this.state.openSections[section] ? sectionElement.slideDown() : sectionElement.slideUp();
        });
    };

    handleDrawerToggle = () => {
        this.setState((prevState) => ({ mobileOpen: !prevState.mobileOpen }));
    };

    renderNavContent = () => {
        const { openSections } = this.state;

        const navItems = [
            {
                text: "Dashboard",
                icon: <Home fontSize="large" style={{ color: '#1976d2' }} />, // Updated color and size
                link: "/",
                subItems: null,
            },
            {
                text: "Vet Directory",
                icon: <Folder fontSize="large" style={{ color: '#1976d2' }} />,
                link: null,
                subItems: [
                    { text: "Appointments", icon: <Event fontSize="large" style={{ color: '#1976d2' }} />, link: "appointments" },
                    { text: "Vet Profiles", icon: <Assignment fontSize="large" style={{ color: '#1976d2' }} />, link: "vet-profiles" },
                ],
            },
            {
                text: "Agrovet Hub",
                icon: <ShoppingCart fontSize="large" style={{ color: '#1976d2' }} />,
                link: null,
                subItems: [
                    { text: "Products", icon: <ListAlt fontSize="large" style={{ color: '#1976d2' }} />, link: "products" },
                    { text: "Order Management", icon: <ListAlt fontSize="large" style={{ color: '#1976d2' }} />, link: "order-management" }, // New subitem added
                ],
            },
            {
                text: "Educational Resources",
                icon: <School fontSize="large" style={{ color: '#1976d2' }} />,
                link: null,
                subItems: [
                    { text: "Blogs", icon: <Article fontSize="large" style={{ color: '#1976d2' }} />, link: "blogs" },
                    { text: "Webinars", icon: <Event fontSize="large" style={{ color: '#1976d2' }} />, link: "webinars" },
                ],
            },
            {
                text: "Community Forum",
                icon: <Forum fontSize="large" style={{ color: '#1976d2' }} />,
                link: null,
                subItems: [
                    { text: "Discussions", icon: <Chat fontSize="large" style={{ color: '#1976d2' }} />, link: "discussions" },
                ],
            },
        ];

        return (
            <List component="nav" disablePadding style={{ padding: '0', overflowY: 'auto' }}>
                <div style={{ height: '60px' }} /> {/* Space above the profile section */}
                {navItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <ListItem
                            button
                            onClick={() => item.subItems && this.toggleCollapse(item.text.replace(/\s+/g, '').toLowerCase())}
                            style={{ '&:hover': { backgroundColor: '#f5f5f5' } }} // Hover effect
                        >
                            <ListItemIcon style={{ minWidth: '40px' }}>{item.icon}</ListItemIcon> {/* Consistent icon width */}
                            <ListItemText primary={item.text} />
                            {item.subItems && (openSections[item.text.replace(/\s+/g, '').toLowerCase()] ? <ExpandLess /> : <ExpandMore />)}
                        </ListItem>
                        {item.subItems && (
                            <Collapse className={item.text.replace(/\s+/g, '').toLowerCase()} in={openSections[item.text.replace(/\s+/g, '').toLowerCase()]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {item.subItems.map((subItem, subIndex) => (
                                        <ListItem button key={subIndex} component={Link} to={subItem.link} style={{ paddingLeft: '40px' }}>
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
        );
    };

    render() {
        const { mobileOpen } = this.state;

        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
                {/* AppBar */}
                <AppBar position="fixed" style={{ zIndex: 1201 }}>
                    <Toolbar>
                        <IconButton color="inherit" edge="start" onClick={this.handleDrawerToggle} style={{ marginRight: '16px', display: { xs: 'none', sm: 'block' } }}>
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                {/* Drawer */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={this.handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    style={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280, overflowY: 'auto' } }}
                >
                    {this.renderNavContent()}
                </Drawer>

                <Drawer
                    variant="permanent"
                    style={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { width: 280, boxSizing: 'border-box', overflowY: 'auto' } }}
                    open
                >
                    {this.renderNavContent()}
                </Drawer>
            </div>
        );
    }
}

export default VerticalNavBar;
