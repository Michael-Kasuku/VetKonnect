import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

// Styled components
const StyledLink = styled('a')(({ theme, hovered }) => ({
    color: hovered ? theme.palette.primary.main : theme.palette.text.primary,
    textDecoration: 'none',
    padding: theme.spacing(1, 2),
    transition: 'color 0.3s ease, transform 0.2s ease',
    '&:hover': {
        color: theme.palette.secondary.main,
        transform: 'scale(1.1)', // Slightly enlarge on hover
    },
}));

const LogoImage = styled('img')({
    maxHeight: '50px',
    marginRight: '8px',
});

const LogoText = styled(Typography)(({ theme }) => ({
    color: theme.palette.success.main,
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '1.5rem',
}));

// Navigation link component
const NavLink = ({ name, path, hovered, onMouseEnter, onMouseLeave }) => (
    <StyledLink
        href={path}
        hovered={hovered}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        <Button sx={{ color: 'inherit', display: { xs: 'none', md: 'block' } }}>
            {name}
        </Button>
    </StyledLink>
);

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hoveredLink: null,
            drawerOpen: false,
        };
    }

    handleMouseEnter = (link) => {
        this.setState({ hoveredLink: link });
    };

    handleMouseLeave = () => {
        this.setState({ hoveredLink: null });
    };

    toggleDrawer = (open) => () => {
        this.setState({ drawerOpen: open });
    };

    render() {
        const { hoveredLink, drawerOpen } = this.state;
        const links = [
            { name: 'Home', path: '/' },
            { name: 'Services', path: '#services' },
            { name: 'About Us', path: '#about' },
            { name: 'Our Team', path: '#team' },
            { name: 'FAQs', path: '#faq' },
            { name: 'Contact Us', path: '#contact' },
        ];

        return (
            <>
                <AppBar position="fixed" sx={{ backgroundColor: 'white', boxShadow: 2 }}>
                    <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        {/* Logo Section */}
                        <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
                            <LogoImage src="assets/img/vetkonnect.jpg" alt="VetKonnect Logo" />
                            <LogoText variant="h6">
                                Vet<span style={{ color: 'green' }}>konnect</span>
                            </LogoText>
                        </a>

                        {/* Drawer Toggle Button for mobile view */}
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={this.toggleDrawer(true)}
                            sx={{ display: { xs: 'block', md: 'none' } }} // Show on small screens
                        >
                            <MenuIcon />
                        </IconButton>

                        {/* Navigation Links for larger screens */}
                        <Grid container spacing={2} justifyContent="center" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {links.map(({ name, path }, index) => (
                                <Grid item key={index}>
                                    <NavLink
                                        name={name}
                                        path={path}
                                        hovered={hoveredLink === name}
                                        onMouseEnter={() => this.handleMouseEnter(name)}
                                        onMouseLeave={this.handleMouseLeave}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Toolbar>
                </AppBar>

                {/* Drawer for mobile navigation */}
                <Drawer anchor="right" open={drawerOpen} onClose={this.toggleDrawer(false)}>
                    <List>
                        {links.map(({ name, path }, index) => (
                            <ListItem button key={index} onClick={this.toggleDrawer(false)}>
                                <ListItemText>
                                    <StyledLink
                                        href={path}
                                        hovered={hoveredLink === name}
                                        onMouseEnter={() => this.handleMouseEnter(name)}
                                        onMouseLeave={this.handleMouseLeave}
                                    >
                                        {name}
                                    </StyledLink>
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </>
        );
    }
}

export default Navbar;
