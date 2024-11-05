import React from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    CircularProgress,
    InputAdornment,
    IconButton,
    Alert,
    Collapse
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

class VetSignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            isLoading: false,
            username: '',
            password: '',
            confirmPassword: '',
            emailAddress: '',
            phoneNumber: '',
            kvbNumber: '',
            nationalId: '',  // New state for National ID
            formErrors: { username: '', password: '', confirmPassword: '', emailAddress: '', phoneNumber: '', kvbNumber: '', nationalId: '' },
            submissionError: '',
        };
    }

    togglePasswordVisibility = () => {
        this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
    };

    validateForm = () => {
        const { username, password, confirmPassword, emailAddress, phoneNumber, kvbNumber, nationalId } = this.state;
        let usernameError = '';
        let passwordError = '';
        let confirmPasswordError = '';
        let emailError = '';
        let phoneError = '';
        let kvbError = '';
        let nationalIdError = ''; // Error for National ID

        if (!username || username.length < 3) {
            usernameError = 'Please enter a valid username.';
        }

        if (!password || password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[!@#$%^&*]/.test(password)) {
            passwordError = 'Password must be at least 6 characters long and include upper case, lower case, and a special character.';
        }

        if (password !== confirmPassword) {
            confirmPasswordError = 'Passwords do not match.';
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailAddress || !emailPattern.test(emailAddress)) {
            emailError = 'Please enter a valid email address.';
        }

        const phonePattern = /^(01\d{8}|07\d{8}|\+2547\d{8}|\+2541\d{8})$/;
        if (!phoneNumber || !phonePattern.test(phoneNumber)) {
            phoneError = 'Please enter a valid phone number (formats: 01XXXXXXXX, 07XXXXXXXX, +2547XXXXXXXX, +2541XXXXXXXX).';
        }

        if (!kvbNumber) {
            kvbError = 'KVB Number is required.';
        }

        if (!nationalId || nationalId.length < 7) {
            nationalIdError = 'Please enter a valid National ID number.';
        }

        this.setState({
            formErrors: { username: usernameError, password: passwordError, confirmPassword: confirmPasswordError, emailAddress: emailError, phoneNumber: phoneError, kvbNumber: kvbError, nationalId: nationalIdError },
            submissionError: '',
        });

        return !usernameError && !passwordError && !confirmPasswordError && !emailError && !phoneError && !kvbError && !nationalIdError;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.validateForm()) return;

        this.setState({ isLoading: true, submissionError: '' });

        const { username, password, emailAddress, phoneNumber, kvbNumber, nationalId } = this.state;

        axios.post('https://kasuku-001-site1.dtempurl.com/api/Vet/VetSignup', {
            username,
            password,
            emailAddress,
            phoneNumber,
            kvbNumber,
            nationalId,  // Include National ID in the request payload
        })
            .then(response => {
                this.setState({ isLoading: false });
                alert('Registration successful');
                this.props.history.push('/vetlogin');
            })
            .catch(error => {
                this.setState({ isLoading: false });
                if (error.response && error.response.data) {
                    const errorMessages = error.response.data.errors || {};
                    const formErrors = { username: '', password: '', emailAddress: '', phoneNumber: '', kvbNumber: '', nationalId: '' };

                    Object.entries(errorMessages).forEach(([field, messages]) => {
                        formErrors[field] = messages.join(' ');
                    });

                    this.setState({ formErrors, submissionError: 'Please fix the errors above.' });
                } else {
                    this.setState({ submissionError: 'Registration failed. Please try again.' });
                }

                console.error('There was an error registering the vet!', error);
            });
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value, submissionError: '' }, () => {
            this.validateForm();
        });
    };

    render() {
        const { showPassword, isLoading, formErrors, username, password, confirmPassword, emailAddress, phoneNumber, kvbNumber, nationalId, submissionError } = this.state;

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
                        Sign Up
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
                        <TextField
                            label="Confirm Password"
                            name="confirmPassword"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            value={confirmPassword}
                            onChange={this.handleInputChange}
                            error={!!formErrors.confirmPassword}
                            helperText={formErrors.confirmPassword}
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
                        <TextField
                            label="Email Address"
                            name="emailAddress"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            value={emailAddress}
                            onChange={this.handleInputChange}
                            error={!!formErrors.emailAddress}
                            helperText={formErrors.emailAddress}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Phone Number"
                            name="phoneNumber"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            value={phoneNumber}
                            onChange={this.handleInputChange}
                            error={!!formErrors.phoneNumber}
                            helperText={formErrors.phoneNumber}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="KVB Number"
                            name="kvbNumber"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            value={kvbNumber}
                            onChange={this.handleInputChange}
                            error={!!formErrors.kvbNumber}
                            helperText={formErrors.kvbNumber}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="National ID Number"  // New National ID field
                            name="nationalId"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            value={nationalId}
                            onChange={this.handleInputChange}
                            error={!!formErrors.nationalId}
                            helperText={formErrors.nationalId}
                            sx={{ mb: 2 }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 2,
                                bgcolor: '#1877f2',
                                '&:hover': { bgcolor: '#1565c0' },
                            }}
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
                        </Button>
                    </form>

                    <Typography variant="body2" sx={{ mt: 2, color: '#333' }}>
                        Already have an account? <Link to="/vetlogin">Log in</Link>
                    </Typography>
                </Box>
            </Container>
        );
    }
}

export default VetSignUp;
