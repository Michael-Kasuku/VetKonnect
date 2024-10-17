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
                icon: <Home />,
                link: "/vet",
                subItems: null,
            },
            {
                text: "Vet Directory",
                icon: <Folder />,
                link: null,
                subItems: [
                    { text: "Appointments", icon: <Event />, link: "/appointments" },
                    { text: "Vet Profiles", icon: <Assignment />, link: "/vet-profiles" },
                    { text: "Available Services", icon: <MedicalServices />, link: "/available-services" },
                ],
            },
            {
                text: "Agrovet Hub",
                icon: <ShoppingCart />,
                link: null,
                subItems: [
                    { text: "Products", icon: <ListAlt />, link: "/products" },
                    { text: "Suppliers", icon: <Group />, link: "/suppliers" },
                ],
            },
            {
                text: "Educational Resources",
                icon: <School />,
                link: null,
                subItems: [
                    { text: "Blogs", icon: <Article />, link: "/blogs" },
                ],
            },
            {
                text: "Community Forum",
                icon: <Forum />,
                link: null,
                subItems: [
                    { text: "Discussions", icon: <Chat />, link: "/discussions" },
                ],
            },
        ];

        return (
            <List component="nav" disablePadding style={{ padding: '0', overflowY: 'auto' }}>
                <div style={{ height: '60px' }} /> {/* Space above the profile section */}
                {navItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <ListItem button onClick={() => item.subItems && this.toggleCollapse(item.text.replace(/\s+/g, '').toLowerCase())}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                            {item.subItems && (openSections[item.text.replace(/\s+/g, '').toLowerCase()] ? <ExpandLess /> : <ExpandMore />)}
                        </ListItem>
                        {item.subItems && (
                            <Collapse className={item.text.replace(/\s+/g, '').toLowerCase()} in={openSections[item.text.replace(/\s+/g, '').toLowerCase()]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {item.subItems.map((subItem, subIndex) => (
                                        <ListItem button key={subIndex} component={Link} to={subItem.link} style={{ paddingLeft: '40px' }}>
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
                        <Typography variant="h6" noWrap>
                            Vet Konnect
                        </Typography>
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
