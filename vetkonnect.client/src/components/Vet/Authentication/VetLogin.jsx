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
    Collapse
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

class VetLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            isLoading: false,
            username: '',
            password: '',
            formErrors: { username: '', password: '' },
            submissionError: '',
        };
    }

    togglePasswordVisibility = () => {
        this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
    };

    validateForm = () => {
        const { username, password } = this.state;
        let usernameError = '';
        let passwordError = '';

        if (!username || username.length < 3) {
            usernameError = 'Please enter a valid username.';
        }

        if (!password || password.length < 6) {
            passwordError = 'Password must be at least 6 characters long.';
        }

        this.setState({
            formErrors: { username: usernameError, password: passwordError },
            submissionError: '',
        });

        return !usernameError && !passwordError;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.validateForm()) return;

        this.setState({ isLoading: true });

        // Simulate an API call for demonstration purposes
        setTimeout(() => {
            this.setState({ isLoading: false });

            if (this.state.username !== 'testuser' || this.state.password !== 'password123') {
                this.setState({ submissionError: 'Invalid username or password. Please try again.' });
            } else {
                alert('Login successful');
            }
        }, 2000);
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value, submissionError: '' });
    };

    render() {
        const { showPassword, isLoading, formErrors, username, password, submissionError } = this.state;

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
                        Welcome Back!
                    </Typography>

                    <Collapse in={!!submissionError}>
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {submissionError}
                        </Alert>
                    </Collapse>

                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            label="Username"
                            name="username"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            value={username}
                            onChange={this.handleInputChange}
                            error={!!formErrors.username}
                            helperText={formErrors.username}
                            sx={{ mb: 2 }}
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
                            sx={{
                                mb: 2,
                                justifyContent: 'flex-start',
                                width: '100%', // Ensures alignment with the full width of the container
                                pl: '0px'      // Aligns with the left edge of the container
                            }}
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
                            <Link to="/vet/forgot" style={{ color: '#1877f2' }}>
                                Forgotten password?
                            </Link>
                        </Typography>
                    </Box>

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
                            to="/vet/signup"
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
                </Box>
            </Container>
        );
    }
}

export default VetLogin;
