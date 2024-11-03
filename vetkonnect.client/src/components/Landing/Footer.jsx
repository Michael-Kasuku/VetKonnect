import React, { useState } from 'react';
import { Container, Typography, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
    const [hoveredLink, setHoveredLink] = useState(null);

    const socialLinks = [
        { href: 'https://www.twitter.com', icon: 'fab fa-twitter' },
        { href: 'https://www.facebook.com', icon: 'fab fa-facebook' },
        { href: 'https://www.instagram.com', icon: 'fab fa-instagram' },
        { href: 'https://www.linkedin.com/in/vet-konnect-4b0741326/', icon: 'fab fa-linkedin' }
    ];

    const usefulLinks = [
        { href: '#hero', label: 'Home' },
        { href: '#about', label: 'About Us' },
        { href: '#services', label: 'Services' },
        { to: '/terms', label: 'Terms of Service' },
        { to: '/privacy', label: 'Privacy Policy' }
    ];

    const serviceLinks = [
        { href: '#', label: 'Vet Directory' },
        { href: '#', label: 'Agrovet Hub' },
        { href: '#', label: 'Educational Content' },
        { href: '#', label: 'Community Forum' }
    ];

    const renderLinks = (links) => (
        links.map((link, index) => (
            <li key={index}>
                {link.to ? (
                    <Link
                        to={link.to}
                        style={{
                            color: hoveredLink === index ? '#FFD700' : '#ffffff',
                            textDecoration: 'none',
                            transition: 'color 0.3s',
                            fontSize: '16px',
                        }}
                        onMouseEnter={() => setHoveredLink(index)}
                        onMouseLeave={() => setHoveredLink(null)}
                    >
                        {link.label}
                    </Link>
                ) : (
                    <a
                        href={link.href}
                        style={{
                            color: hoveredLink === index ? '#FFD700' : '#ffffff',
                            textDecoration: 'none',
                            transition: 'color 0.3s',
                            fontSize: '16px',
                        }}
                        onMouseEnter={() => setHoveredLink(index)}
                        onMouseLeave={() => setHoveredLink(null)}
                    >
                        {link.label}
                    </a>
                )}
            </li>
        ))
    );

    const footerStyle = {
        background: 'linear-gradient(135deg, #3b3b3b 0%, #1c1c1c 100%)',
        color: '#fff',
        padding: '40px 0',
        textAlign: 'left',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    };

    const socialLinkStyle = {
        color: '#ffffff',
        fontSize: '24px',
        marginRight: '15px',
        transition: 'transform 0.3s',
    };

    return (
        <footer id="footer" style={footerStyle}>
            <Container>
                <Grid container spacing={4}>
                    <Grid item lg={5} md={12}>
                        <Typography variant="h4" gutterBottom style={{ color: '#FFD700', fontWeight: 'bold' }}>
                            Connect with Us
                        </Typography>
                        <Typography variant="body1">
                            Follow us on social media:
                        </Typography>
                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            {socialLinks.map((link, index) => (
                                <a key={index} href={link.href} style={socialLinkStyle} aria-label={link.icon}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    <i className={link.icon}></i>
                                </a>
                            ))}
                        </div>
                    </Grid>

                    <Grid item lg={2} sm={6}>
                        <Typography variant="h4" gutterBottom style={{ color: '#FFD700', fontWeight: 'bold' }}>
                            Useful Links
                        </Typography>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {renderLinks(usefulLinks)}
                        </ul>
                    </Grid>

                    <Grid item lg={2} sm={6}>
                        <Typography variant="h4" gutterBottom style={{ color: '#FFD700', fontWeight: 'bold' }}>
                            Our Services
                        </Typography>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {renderLinks(serviceLinks)}
                        </ul>
                    </Grid>

                    <Grid item lg={3} md={12}>
                        <Typography variant="h4" gutterBottom style={{ color: '#FFD700', fontWeight: 'bold' }}>
                            Contact Us
                        </Typography>
                        <Typography variant="body1">Mega Plaza, Second Floor</Typography>
                        <Typography variant="body1">Oginga Odinga Street, Kisumu City</Typography>
                        <Typography variant="body1" className="mt-4">
                            <strong>Phone:</strong> 0742644460
                        </Typography>
                        <Typography variant="body1">
                            <strong>Email:</strong> vetkonnect@gmail.com
                        </Typography>
                    </Grid>
                </Grid>
            </Container>

            <Container style={{ textAlign: 'center', marginTop: '20px', color: '#eaeaea' }}>
                <Typography variant="body2" className="copyright">
                    &copy; 2024 <strong className="sitename">Vetkonnect</strong> - All Rights Reserved!
                </Typography>
            </Container>
        </footer>
    );
};

export default Footer;
