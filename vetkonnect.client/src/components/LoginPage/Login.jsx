import React from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Checkbox,
    FormControlLabel,
    CircularProgress,
    InputAdornment,
    IconButton,
    Alert
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import $ from 'jquery';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            isLoading: false,
            email: '',
            password: '',
            formErrors: {
                email: '',
                password: ''
            },
            submissionError: ''
        };
    }

    togglePasswordVisibility = () => {
        this.setState(prevState => ({ showPassword: !prevState.showPassword }));
    };

    validateForm = () => {
        const { email, password } = this.state;
        let emailError = '';
        let passwordError = '';

        // Basic email validation
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            emailError = 'Please enter a valid email address.';
        }

        // Basic password validation
        if (!password || password.length < 6) {
            passwordError = 'Password must be at least 6 characters long.';
        }

        this.setState({
            formErrors: { email: emailError, password: passwordError },
            submissionError: ''  // Clear previous submission error
        });

        return !emailError && !passwordError;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.validateForm()) return;

        this.setState({ isLoading: true });

        // Simulating a login request
        setTimeout(() => {
            this.setState({ isLoading: false });
            // Simulated failure for demonstration purposes
            if (this.state.email !== 'test@example.com' || this.state.password !== 'password123') {
                this.setState({ submissionError: 'Invalid email or password. Please try again.' });
                $('.error-message').fadeIn(); // jQuery for showing the error message
            } else {
                alert('Login successful');
                // Redirect or perform any other action after successful login
            }
        }, 2000);
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => {
            // Hide error message when the user starts typing
            if (value) {
                $('.error-message').fadeOut(); // jQuery for hiding the error message
            }
        });
    };

    render() {
        const { showPassword, isLoading, formErrors, email, password, submissionError } = this.state;

        return (
            <Container
                component="section"
                maxWidth="xs"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    bgcolor: '#fff',  // Changed to a grey background
                    p: 2
                }}
            >
                <Box
                    sx={{
                        bgcolor: '#fff',
                        p: 4,
                        borderRadius: 2,
                        boxShadow: 3,
                        textAlign: 'center',
                        position: 'relative',
                        opacity: isLoading ? 0.5 : 1, // Reduce opacity when loading
                    }}
                >
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                        Welcome Back!
                    </Typography>

                    {submissionError && (
                        <Alert severity="error" sx={{ mb: 2 }} className="error-message">
                            {submissionError}
                        </Alert>
                    )}

                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            label="Email Address"
                            name="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            value={email}
                            onChange={this.handleInputChange}
                            error={!!formErrors.email}
                            helperText={formErrors.email}
                            sx={{ mb: 2 }}
                            onFocus={() => $('.error-message').fadeOut()} // Hide error on focus
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            value={password}
                            onChange={this.handleInputChange}
                            error={!!formErrors.password}
                            helperText={formErrors.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={this.togglePasswordVisibility}>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 2 }}
                            onFocus={() => $('.error-message').fadeOut()} // Hide error on focus
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={showPassword}
                                    onChange={this.togglePasswordVisibility}
                                    color="primary"
                                />
                            }
                            label="Show Password"
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
                            {isLoading ? <CircularProgress size={24} /> : 'Login'}
                        </Button>
                    </form>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body2">
                            Don't have an account? <Link to="/signup">Register</Link>
                        </Typography>
                        <Typography variant="body2">
                            <Link to="/forgot">Forgot your password?</Link>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        );
    }
}

export default Login;
