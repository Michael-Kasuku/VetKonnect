import React from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    CircularProgress,
    Alert
} from '@mui/material';

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isLoading: false,
            formError: '',
            submissionError: '',
            submissionSuccess: ''
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ isLoading: true, formError: '', submissionError: '', submissionSuccess: '' });

        // Simulate an API call to reset password
        setTimeout(() => {
            this.setState({ isLoading: false });
            if (this.state.email !== 'test@example.com') {
                this.setState({ submissionError: 'Email address not found. Please try again.' });
            } else {
                this.setState({ submissionSuccess: 'A password reset link has been sent to your email.' });
            }
        }, 2000);
    };

    handleInputChange = (e) => {
        this.setState({ email: e.target.value });
    };

    render() {
        const { email, isLoading, submissionError, submissionSuccess } = this.state;

        return (
            <Container
                component="section"
                maxWidth="xs"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    bgcolor: '#f0f2f5', // Light Facebook-style background
                    p: 2,
                }}
            >
                <Box
                    sx={{
                        bgcolor: '#fff',
                        p: 4,
                        borderRadius: 3,
                        boxShadow: 2,
                        textAlign: 'center',
                        width: '100%',
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{ mb: 2, fontWeight: 'bold', color: '#1877f2' }} // Facebook blue color
                    >
                        Forgot Password
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ mb: 3, color: '#4b4f56' }} // Light gray text
                    >
                        Enter your email address and we'll send you a link to reset your password.
                    </Typography>

                    {submissionError && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {submissionError}
                        </Alert>
                    )}
                    {submissionSuccess && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            {submissionSuccess}
                        </Alert>
                    )}

                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            label="Email Address"
                            name="email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            value={email}
                            onChange={this.handleInputChange}
                            autoComplete="email"
                            sx={{ mb: 2 }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 2,
                                bgcolor: '#1877f2', // Facebook blue
                                color: '#fff',
                                borderRadius: '20px',
                                textTransform: 'none',
                                '&:hover': {
                                    bgcolor: '#166fe5',
                                },
                            }}
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Reset Password'}
                        </Button>
                    </form>

                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" sx={{ color: '#4b4f56' }}>
                            Remember your password?{' '}
                            <Link to="/login" style={{ color: '#1877f2', textDecoration: 'none' }}>
                                Back to Login
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        );
    }
}

export default ForgotPassword;
