import React, { Component } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    Collapse,
    Avatar,
    Divider,
    ListItemIcon,
    Typography
} from '@mui/material';
import {
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
    Report,
    Chat
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import $ from 'jquery'; // Import jQuery

class VerticalNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openVetDirectory: false,
            openAgrovetHub: false,
            openEducationalResources: false,
            openCommunityForum: false,
        };
    }

    toggleCollapse = (section) => {
        this.setState((prevState) => ({
            [section]: !prevState[section],
        }), () => {
            // jQuery for collapse effect
            const sectionElement = $(`.${section}`);
            if (this.state[section]) {
                sectionElement.slideDown(); // Show the section
            } else {
                sectionElement.slideUp(); // Hide the section
            }
        });
    };

    render() {
        const { openVetDirectory, openAgrovetHub, openEducationalResources, openCommunityForum } = this.state;

        return (
            <nav className="sidebar" style={{ width: '280px', backgroundColor: '#f7f7f7' }}>
                <List component="nav" disablePadding>
                    {/* Profile Section */}
                    <ListItem className="nav-profile" style={{ padding: '20px 15px' }}>
                        <Avatar alt="Michael Kasuku" src="assets/img/team/kasuku.jpg" sx={{ width: 56, height: 56 }} />
                        <div style={{ marginLeft: '15px' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Michael Kasuku
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Project Manager
                            </Typography>
                        </div>
                    </ListItem>
                    <Divider />

                    {/* Dashboard */}
                    <ListItem button component={Link} to="/vet">
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>

                    {/* Vet Directory */}
                    <ListItem button onClick={() => this.toggleCollapse('openVetDirectory')}>
                        <ListItemIcon>
                            <Folder />
                        </ListItemIcon>
                        <ListItemText primary="Vet Directory" />
                        {openVetDirectory ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse className="openVetDirectory" in={openVetDirectory} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button component={Link} to="/appointments">
                                <ListItemIcon>
                                    <Event />
                                </ListItemIcon>
                                <ListItemText primary="Appointments" />
                            </ListItem>
                            <ListItem button component={Link} to="/vet-profiles">
                                <ListItemIcon>
                                    <Assignment />
                                </ListItemIcon>
                                <ListItemText primary="Vet Profiles" />
                            </ListItem>
                            <ListItem button component={Link} to="/available-services">
                                <ListItemIcon>
                                    <MedicalServices />
                                </ListItemIcon>
                                <ListItemText primary="Available Services" />
                            </ListItem>
                            <ListItem button component={Link} to="/reports">
                                <ListItemIcon>
                                    <Report />
                                </ListItemIcon>
                                <ListItemText primary="Reports" />
                            </ListItem>
                        </List>
                    </Collapse>

                    {/* Agrovet Hub */}
                    <ListItem button onClick={() => this.toggleCollapse('openAgrovetHub')}>
                        <ListItemIcon>
                            <ShoppingCart />
                        </ListItemIcon>
                        <ListItemText primary="Agrovet Hub" />
                        {openAgrovetHub ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse className="openAgrovetHub" in={openAgrovetHub} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button component={Link} to="/products">
                                <ListItemIcon>
                                    <ListAlt />
                                </ListItemIcon>
                                <ListItemText primary="Products" />
                            </ListItem>
                            <ListItem button component={Link} to="/suppliers">
                                <ListItemIcon>
                                    <Group />
                                </ListItemIcon>
                                <ListItemText primary="Suppliers" />
                            </ListItem>
                            <ListItem button component={Link} to="/order-management">
                                <ListItemIcon>
                                    <Assignment />
                                </ListItemIcon>
                                <ListItemText primary="Order Management" />
                            </ListItem>
                        </List>
                    </Collapse>

                    {/* Educational Resources */}
                    <ListItem button onClick={() => this.toggleCollapse('openEducationalResources')}>
                        <ListItemIcon>
                            <School />
                        </ListItemIcon>
                        <ListItemText primary="Educational Resources" />
                        {openEducationalResources ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse className="openEducationalResources" in={openEducationalResources} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button component={Link} to="/blogs">
                                <ListItemIcon>
                                    <Article />
                                </ListItemIcon>
                                <ListItemText primary="Blogs" />
                            </ListItem>
                            <ListItem button component={Link} to="/webinars">
                                <ListItemIcon>
                                    <Event />
                                </ListItemIcon>
                                <ListItemText primary="Webinars" />
                            </ListItem>
                            <ListItem button component={Link} to="/research-papers">
                                <ListItemIcon>
                                    <ListAlt />
                                </ListItemIcon>
                                <ListItemText primary="Research Papers" />
                            </ListItem>
                        </List>
                    </Collapse>

                    {/* Community Forum */}
                    <ListItem button onClick={() => this.toggleCollapse('openCommunityForum')}>
                        <ListItemIcon>
                            <Forum />
                        </ListItemIcon>
                        <ListItemText primary="Community Forum" />
                        {openCommunityForum ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse className="openCommunityForum" in={openCommunityForum} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button component={Link} to="/discussions">
                                <ListItemIcon>
                                    <Chat />
                                </ListItemIcon>
                                <ListItemText primary="Discussions" />
                            </ListItem>
                            <ListItem button component={Link} to="/communities">
                                <ListItemIcon>
                                    <Group />
                                </ListItemIcon>
                                <ListItemText primary="Communities" />
                            </ListItem>
                            <ListItem button component={Link} to="/forum-topics">
                                <ListItemIcon>
                                    <Assignment />
                                </ListItemIcon>
                                <ListItemText primary="Forum Topics" />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </nav>
        );
    }
}

export default VerticalNavBar;
