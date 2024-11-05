import React from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    CircularProgress,
    Alert,
    Collapse,
    IconButton,
    InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

class AdminLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            username: '',
            password: '',
            showPassword: false,
            formErrors: { username: '', password: '' },
            submissionError: '',
        };
    }

    validateForm = () => {
        const { username, password } = this.state;
        let usernameError = '';
        let passwordError = '';

        if (!username) {
            usernameError = 'Username is required.';
        }

        if (!password) {
            passwordError = 'Password is required.';
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

        this.setState({ isLoading: true, submissionError: '' });
        const { username, password } = this.state;

        axios.post('https://kasuku-001-site1.dtempurl.com/api/Admin/AdminLogin', { username, password })
            .then(response => {
                this.setState({ isLoading: false });
                alert('Login successful');
                this.props.history.push('/admindashboard'); // Redirect to dashboard
            })
            .catch(error => {
                this.setState({ isLoading: false });

                if (error.response && error.response.data) {
                    this.setState({ submissionError: 'Invalid username or password.' });
                } else {
                    this.setState({ submissionError: 'Login failed. Please try again.' });
                }

                console.error('There was an error logging in!', error);
            });
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value, submissionError: '' }, this.validateForm);
    };

    togglePasswordVisibility = () => {
        this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
    };

    render() {
        const { isLoading, formErrors, username, password, showPassword, submissionError } = this.state;

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
                        Login
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
                            type={showPassword ? 'text' : 'password'} // Toggle between text and password
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            value={password}
                            onChange={this.handleInputChange}
                            error={!!formErrors.password}
                            helperText={formErrors.password}
                            sx={{ mb: 2 }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={this.togglePasswordVisibility}>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isLoading}
                            sx={{ mt: 2 }}
                        >
                            {isLoading ? <CircularProgress size={24} /> : 'Login'}
                        </Button>
                    </form>
                    <Typography variant="body2" sx={{ mt: 3 }}>
                        Don't have an account? <Link to="/adminsignup">Sign Up</Link>
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        <Link to="/adminforgot">Forgot Password?</Link>
                    </Typography>
                </Box>
            </Container>
        );
    }
}

export default AdminLogin;
