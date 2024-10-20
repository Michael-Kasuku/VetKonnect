// LoginPage.js
import React, { Component } from 'react';
import Login from './LoginPage/Login';
import { Box, Typography, Slide } from '@mui/material';

class LoginPage extends Component {
    render() {
        return (
            <Slide in={true} direction="up" timeout={500}>
                <Box
                    sx={{
                        minHeight: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: '#f0f2f5',
                        padding: 3,
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 'bold',
                            color: '#1877f2',
                            mb: 2,
                        }}
                    >
                        Vet Konnect
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 5,
                            color: '#606770',
                            textAlign: 'center',
                        }}
                    >
                        Connecting you with Certified Veterinarians.
                    </Typography>
                    <main className="main">
                        <Login />
                    </main>
                </Box>
            </Slide>
        );
    }
}

export default LoginPage;
