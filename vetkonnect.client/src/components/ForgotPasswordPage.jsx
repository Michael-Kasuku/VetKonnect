import React, { Component } from 'react';
import ForgotPassword from './ForgotPasswordPage/ForgotPassword';
import { Box, Container } from '@mui/material';

class ForgotPasswordPage extends Component {
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
                    <ForgotPassword />
                </Container>
            </Box>
        );
    }
}

export default ForgotPasswordPage;
