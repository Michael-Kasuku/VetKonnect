import React, { Component } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Hero Component
 * Displays the hero section with a background image and call-to-action buttons.
 * 
 * @returns {JSX.Element} The Hero component.
 */
class Hero extends Component {
    // Styles for the hero section
    heroSectionStyle = {
        position: 'relative',
        backgroundImage: 'url(assets/img/hero-bg.jpg)', // Ensure this image path is correct
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#FFFFFF',
        padding: '60px 20px',
    };

    // Common button styles
    buttonStyles = {
        zIndex: 3, // Ensures the button is on top
        boxShadow: 4,
        textTransform: 'none',
        padding: '12px 30px',
        '&:focus': {
            outline: '2px solid #fff',
            outlineOffset: '2px',
        },
    };

    render() {
        return (
            <section id="hero" className="hero section" style={this.heroSectionStyle}>
                <Box
                    sx={{
                        position: 'relative',
                        zIndex: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        maxWidth: '1200px',
                        margin: '0 auto',
                        padding: { xs: 2, sm: 4 },
                    }}
                >
                    <Box sx={{ maxWidth: '400px' }}>
                        <Typography variant="h4" color="rgba(255, 255, 255, 0.8)" >
                            Your trusted partner in veterinary care
                        </Typography>
                    </Box>
                </Box>

                <Box
                    display="flex"
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                    marginTop={4}
                >
                    {/* Button for Veterinary Network */}
                    
                        <Button
                            variant="contained"
                            size="large"
                            component={Link}
                            to="/vetlogin"
                            sx={{
                                ...this.buttonStyles,
                                backgroundColor: '#1976d2',
                                '&:hover': {
                                    backgroundColor: '#115293',
                                },
                            }}
                            aria-label="Join Veterinary Network"
                        >
                            Join Our Veterinary Network
                        </Button>
                    

                    <Typography variant="h6" color="rgba(255, 255, 255, 0.8)" sx={{ margin: '0 8px' }}>
                        or
                    </Typography>

                    {/* Button for Farmer Network */}
                    
                        <Button
                            variant="contained"
                            size="large"
                            component={Link}
                            to="/farmerlogin"
                            sx={{
                                ...this.buttonStyles,
                                backgroundColor: '#4caf50',
                                '&:hover': {
                                    backgroundColor: '#388e3c',
                                },
                            }}
                            aria-label="Join Farmer Network"
                        >
                            Join Our Farmer Network
                        </Button>
                    
                </Box>
            </section>
        );
    }
}

export default Hero;
