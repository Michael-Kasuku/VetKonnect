import React, { Component } from 'react';
import VetSignUp from './VetSignUp';
import { Box, Typography, Slide } from '@mui/material';

class VetSignUpPage extends Component {
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
                        padding: 4, // Increased padding for better spacing
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 'bold',
                            color: '#1877f2',
                            mb: 1, // Reduced margin for a closer look to subtitle
                        }}
                    >
                        Vet Konnect
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 4, // Reduced margin for tighter spacing
                            color: '#606770',
                            textAlign: 'center',
                            maxWidth: '600px', // Added max width for better layout
                        }}
                    >
                        Create an Account to Connect with Certified Veterinarians.
                    </Typography>
                    <main className="main" style={{ width: '100%', maxWidth: '600px' }}> {/* Center the form */}
                        <SignUp />
                    </main>
                </Box>
            </Slide>
        );
    }
}

export default VetSignUpPage;
