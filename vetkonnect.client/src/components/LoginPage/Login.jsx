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
    Alert,
    Fade,
    Collapse
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
            formErrors: { email: '', password: '' },
            submissionError: '',
        };
    }

    togglePasswordVisibility = () => {
        this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
    };

    validateForm = () => {
        const { email, password } = this.state;
        let emailError = '';
        let passwordError = '';

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            emailError = 'Please enter a valid email address.';
        }

        if (!password || password.length < 6) {
            passwordError = 'Password must be at least 6 characters long.';
        }

        this.setState({
            formErrors: { email: emailError, password: passwordError },
            submissionError: '',
        });

        return !emailError && !passwordError;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.validateForm()) return;

        this.setState({ isLoading: true });

        setTimeout(() => {
            this.setState({ isLoading: false });

            if (this.state.email !== 'test@example.com' || this.state.password !== 'password123') {
                this.setState({ submissionError: 'Invalid email or password. Please try again.' });
                $('.error-message').fadeIn();
            } else {
                alert('Login successful');
            }
        }, 2000);
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => {
            if (value) $('.error-message').fadeOut();
        });
    };

    render() {
        const { showPassword, isLoading, formErrors, email, password, submissionError } = this.state;

        return (
            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    bgcolor: '#f0f2f5',
                    transition: 'background-color 0.3s ease',
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
                        opacity: isLoading ? 0.5 : 1,
                        width: '100%',
                        maxWidth: 400,
                        transition: 'opacity 0.3s ease-in-out',
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{ mb: 3, fontWeight: 'bold', color: '#1877f2', fontSize: '2rem' }}
                    >
                        Log in to Vet Konnect
                    </Typography>

                    <Collapse in={!!submissionError}>
                        <Alert severity="error" sx={{ mb: 2 }} className="error-message">
                            {submissionError}
                        </Alert>
                    </Collapse>

                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            label="Email or Phone"
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
                            onFocus={() => $('.error-message').fadeOut()}
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
                            onFocus={() => $('.error-message').fadeOut()}
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
                            fullWidth
                            sx={{
                                mt: 2,
                                bgcolor: '#1877f2',
                                '&:hover': { bgcolor: '#145dbf' },
                                '&:active': { transform: 'scale(0.98)' },
                                transition: 'transform 0.1s ease-in-out',
                            }}
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Log In'}
                        </Button>
                    </form>

                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body2">
                            <Link to="/forgot" style={{ color: '#1877f2' }}>
                                Forgotten password?
                            </Link>
                        </Typography>
                    </Box>

                    <Fade in timeout={500}>
                        <Box
                            sx={{
                                mt: 4,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                gap: 1,
                            }}
                        >
                            <Typography variant="body1">or</Typography>
                            <Button
                                component={Link}
                                to="/signup"
                                variant="outlined"
                                sx={{
                                    borderColor: '#42b72a',
                                    color: '#42b72a',
                                    '&:hover': {
                                        borderColor: '#36a420',
                                        bgcolor: '#e6f2e6',
                                    },
                                }}
                            >
                                Create New Account
                            </Button>
                        </Box>
                    </Fade>
                </Box>
            </Container>
        );
    }
}

export default Login;
