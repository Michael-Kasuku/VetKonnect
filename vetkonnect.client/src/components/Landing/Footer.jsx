import React from 'react';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
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

    const renderLinks = (links, isService = false) => {
        return links.map((link, index) => (
            <li key={index}>
                {link.to ? (
                    <Link to={link.to}>{link.label}</Link>
                ) : (
                    <a href={link.href}>{link.label}</a>
                )}
            </li>
        ));
    };

    return (
        <footer id="footer" className="footer position-relative light-background">
            <Container className="footer-top">
                <div className="row gy-4">

                    {/* About Section with Social Links */}
                    <div className="col-lg-5 col-md-12 footer-about">
                        <Typography variant="h4" component="h4" gutterBottom>
                            Connect with Us
                        </Typography>
                        <Typography variant="body1">
                            Stay connected via social media:
                        </Typography>
                        <div className="social-links d-flex mt-4">
                            {socialLinks.map((link, index) => (
                                <a key={index} href={link.href} className="social-icon" aria-label={link.icon}>
                                    <i className={link.icon}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Useful Links Section */}
                    <div className="col-lg-2 col-6 footer-links">
                        <Typography variant="h4" component="h4" gutterBottom>
                            Useful Links
                        </Typography>
                        <ul>
                            {renderLinks(usefulLinks)}
                        </ul>
                    </div>

                    {/* Services Section */}
                    <div className="col-lg-2 col-6 footer-links">
                        <Typography variant="h4" component="h4" gutterBottom>
                            Our Services
                        </Typography>
                        <ul>
                            {renderLinks(serviceLinks, true)}
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                        <Typography variant="h4" component="h4" gutterBottom>
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
                    </div>
                </div>
            </Container>

            {/* Footer Bottom Section */}
            <Container className="text-center mt-4">
                <Typography variant="body2">
                    &copy; 2024 <strong className="sitename">Vetkonnect</strong> - All Rights Reserved!
                </Typography>
            </Container>
        </footer>
    );
};

export default Footer;
