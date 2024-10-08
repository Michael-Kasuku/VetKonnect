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
                    bgcolor: '#fff',
                    p: 2
                }}
            >
                <Box
                    sx={{
                        bgcolor: '#fff',
                        p: 4,
                        borderRadius: 2,
                        boxShadow: 3,
                        textAlign: 'center'
                    }}
                >
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                        Forgot Password
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 3, color: '#666' }}>
                        Enter your registered email to reset your password.
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
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24} /> : 'Reset Password'}
                        </Button>
                    </form>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                            Remembered your password? <Link to="/login">Back to Login</Link>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        );
    }
}

export default ForgotPassword;
