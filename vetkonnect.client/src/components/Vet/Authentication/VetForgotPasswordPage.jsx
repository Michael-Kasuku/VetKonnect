import React, { Component } from 'react';
import VetForgotPassword from './VetForgotPassword';
import { Box, Container } from '@mui/material';

class VetForgotPasswordPage extends Component {
    render() {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#f0f2f5', // Facebook light gray background
                }}
            >
                <Container
                    component="main"
                    maxWidth="xs"
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <VetForgotPassword />
                </Container>
            </Box>
        );
    }
}

export default VetForgotPasswordPage;
