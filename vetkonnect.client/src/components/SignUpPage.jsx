// SignUpPage.js
import React, { Component } from 'react';
import SignUp from './SignUpPage/SignUp';
import { Box, Typography, Slide } from '@mui/material';

class SignUpPage extends Component {
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
                        Create an Account to Connect with Certified Veterinarians.
                    </Typography>
                    <main className="main">
                        <SignUp />
                    </main>
                </Box>
            </Slide>
        );
    }
}

export default SignUpPage;
