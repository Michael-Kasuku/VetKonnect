import React, { Component } from 'react';
import VetLogin from './VetLogin';
import { Box, Typography, Slide } from '@mui/material';

class VetLoginPage extends Component {
    render() {
        return (
            <Slide in={true} direction="up" timeout={500}>
                <Box
                    sx={{
                        minHeight: '100vh',
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' }, // Responsive layout
                        bgcolor: '#f0f2f5',
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-start', // Left-align text
                            padding: 3,
                            backgroundImage: 'url("/assets/img/hero-bg.jpg")', // Background image path
                            backgroundSize: 'cover', // Cover the entire Box
                            backgroundPosition: 'center', // Center the background image
                        }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 'bold',
                                color: 'white', // Text color
                                mb: 2,
                            }}
                        >
                            Vetkonnect
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 5,
                                color: 'white', // Text color
                            }}
                        >
                            Connecting You with Certified Veterinarians...
                        </Typography>
                    </Box>
                    <main className="main">
                        <VetLogin />
                    </main>
                </Box>
            </Slide>
        );
    }
}

export default VetLoginPage;