import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import {
    TextField,
    Button,
    MenuItem,
    InputAdornment,
    IconButton,
    Typography,
    Stepper,
    Step,
    StepLabel,
    Card,
    CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';

class SignUp extends Component {
    state = {
        activeStep: 0,
        showPassword: false,
        showConfirmPassword: false,
        currentRole: 'Farmer',
        formData: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            gender: '',
            dateOfBirth: null,
            email: '',
            password: '',
            confirmPassword: '',
            kvbNumber: '',
            nationalIdNo: '',
        },
        formErrors: {},
        isLoading: false,
    };

    handleRoleChange = (event) => {
        this.setState({ currentRole: event.target.value });
        this.showRoleSpecificFields(event.target.value);
    };

    showRoleSpecificFields = (role) => {
        if (role === 'Vet') {
            $("#kvbNumber, #nationalIdNo").fadeIn();
        } else {
            $("#kvbNumber, #nationalIdNo").fadeOut();
            this.setState(prevState => ({
                formData: {
                    ...prevState.formData,
                    kvbNumber: '',
                    nationalIdNo: '',
                }
            }));
        }
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                [name]: value,
            },
        }));

        $(event.target).addClass('input-focus');
        $(event.target).siblings('.error-message').fadeOut();
    };

    handleDateChange = (date) => {
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                dateOfBirth: date,
            },
        }));
    };

    togglePasswordVisibility = () => {
        this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
    };

    toggleConfirmPasswordVisibility = () => {
        this.setState((prevState) => ({ showConfirmPassword: !prevState.showConfirmPassword }));
    };

    handleNext = () => {
        const { activeStep } = this.state;
        const errors = this.validateFields(activeStep);

        if (Object.keys(errors).length === 0) {
            this.setState((prevState) => ({
                activeStep: prevState.activeStep + 1,
                formErrors: {},
            }));
        } else {
            this.setState({ formErrors: errors });
            for (const key in errors) {
                $(`#${key}`).siblings('.error-message').fadeIn();
            }
        }
    };

    handleBack = () => {
        this.setState((prevState) => ({ activeStep: prevState.activeStep - 1 }));
    };

    validateFields = (step) => {
        const { formData, currentRole } = this.state;
        const errors = {};

        if (step === 0) {
            if (!formData.firstName) errors.firstName = 'First Name is required';
            if (!formData.lastName) errors.lastName = 'Last Name is required';
            if (!formData.phoneNumber) {
                errors.phoneNumber = 'Phone Number is required';
            } else {
                const phoneRegex = /^(07\d{8}|01\d{8}|\+2547\d{8}|\+2541\d{8})$/;
                if (!phoneRegex.test(formData.phoneNumber)) {
                    errors.phoneNumber = 'Phone Number must be valid';
                }
            }
        }

        if (step === 1) {
            if (!formData.gender) errors.gender = 'Gender is required';
            if (!formData.dateOfBirth) errors.dateOfBirth = 'Date of Birth is required';
            if (currentRole === 'Vet') {
                if (!formData.kvbNumber) errors.kvbNumber = 'KVB Number is required';
                if (!formData.nationalIdNo) errors.nationalIdNo = 'National ID No is required';
            }
        }

        if (step === 2) {
            if (!formData.email) errors.email = 'Email is required';
            if (!formData.password) errors.password = 'Password is required';
            if (formData.password.length < 8) errors.password = 'Password must be at least 8 characters';
            if (!formData.confirmPassword) errors.confirmPassword = 'Confirm Password is required';
            if (formData.password !== formData.confirmPassword) {
                errors.confirmPassword = 'Passwords do not match';
            }
        }

        return errors;
    };

    render() {
        const { activeStep, showPassword, showConfirmPassword, currentRole, formData, formErrors, isLoading } = this.state;
        const steps = ['Personal Information', 'Contact Information', 'Account Setup', 'Review Information'];

        return (
            <section style={styles.container}>
                <Card style={{ ...styles.card, opacity: isLoading ? 0.5 : 1 }}>
                    {isLoading && (
                        <div style={styles.loadingOverlay}>
                            <CircularProgress />
                        </div>
                    )}
                    <Typography variant="h4" style={styles.title}>
                        Create a New Account
                    </Typography>

                    <Stepper activeStep={activeStep} alternativeLabel style={styles.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <form id="registration-form">
                        {activeStep === 0 && this.renderStepOne()}
                        {activeStep === 1 && this.renderStepTwo()}
                        {activeStep === 2 && this.renderStepThree()}
                        {activeStep === 3 && this.renderReviewInformation()}

                        <div style={styles.buttonContainer}>
                            {activeStep > 0 && (
                                <Button onClick={this.handleBack} variant="outlined" style={styles.backButton}>
                                    Back
                                </Button>
                            )}
                            <Button
                                onClick={this.handleNext}
                                variant="contained"
                                style={styles.nextButton}
                                disabled={isLoading}
                            >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </section>
        );
    }

    renderStepOne() {
        const { formData, formErrors, currentRole } = this.state;

        return (
            <>
                <TextField
                    label="First Name"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={this.handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                    variant="outlined"
                    error={!!formErrors.firstName}
                    helperText={formErrors.firstName}
                />
                <TextField
                    label="Last Name"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={this.handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                    variant="outlined"
                    error={!!formErrors.lastName}
                    helperText={formErrors.lastName}
                />
                <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={this.handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                    variant="outlined"
                    error={!!formErrors.phoneNumber}
                    helperText={formErrors.phoneNumber}
                />
                <TextField
                    label="Choose Your Role"
                    name="currentRole"
                    select
                    fullWidth
                    margin="normal"
                    value={currentRole}
                    onChange={this.handleRoleChange}
                    required
                    variant="outlined"
                >
                    <MenuItem value="Farmer">Farmer</MenuItem>
                    <MenuItem value="Vet">Vet</MenuItem>
                </TextField>
            </>
        );
    }

    renderStepTwo() {
        const { formData, formErrors, currentRole } = this.state;

        return (
            <>
                <TextField
                    label="Gender"
                    name="gender"
                    id="gender"
                    select
                    fullWidth
                    margin="normal"
                    value={formData.gender}
                    onChange={this.handleInputChange}
                    required
                    variant="outlined"
                    error={!!formErrors.gender}
                    helperText={formErrors.gender}
                >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                </TextField>

                <DatePicker
                    selected={formData.dateOfBirth}
                    onChange={this.handleDateChange}
                    maxDate={addDays(new Date(), 0)}
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Date of Birth"
                    customInput={
                        <TextField
                            id="dateOfBirth"
                            fullWidth
                            margin="normal"
                            required
                            variant="outlined"
                            error={!!formErrors.dateOfBirth}
                            helperText={formErrors.dateOfBirth}
                        />
                    }
                />

                {currentRole === 'Vet' && (
                    <>
                        <TextField
                            label="KVB Number"
                            name="kvbNumber"
                            id="kvbNumber"
                            value={formData.kvbNumber}
                            onChange={this.handleInputChange}
                            fullWidth
                            margin="normal"
                            required
                            variant="outlined"
                            error={!!formErrors.kvbNumber}
                            helperText={formErrors.kvbNumber}
                        />
                        <TextField
                            label="National ID No"
                            name="nationalIdNo"
                            id="nationalIdNo"
                            value={formData.nationalIdNo}
                            onChange={this.handleInputChange}
                            fullWidth
                            margin="normal"
                            required
                            variant="outlined"
                            error={!!formErrors.nationalIdNo}
                            helperText={formErrors.nationalIdNo}
                        />
                    </>
                )}
            </>
        );
    }

    renderStepThree() {
        const { formData, formErrors, showPassword, showConfirmPassword } = this.state;

        return (
            <>
                <TextField
                    label="Email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={this.handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                    variant="outlined"
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                />
                <TextField
                    label="Password"
                    name="password"
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={this.handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                    variant="outlined"
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
                />
                <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={this.handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                    variant="outlined"
                    error={!!formErrors.confirmPassword}
                    helperText={formErrors.confirmPassword}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={this.toggleConfirmPasswordVisibility}>
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </>
        );
    }

    renderReviewInformation() {
        const { formData } = this.state;

        return (
            <>
                <Typography variant="h6">Review Your Information</Typography>
                <div>
                    <Typography><strong>First Name:</strong> {formData.firstName}</Typography>
                    <Typography><strong>Last Name:</strong> {formData.lastName}</Typography>
                    <Typography><strong>Phone Number:</strong> {formData.phoneNumber}</Typography>
                    <Typography><strong>Gender:</strong> {formData.gender}</Typography>
                    <Typography><strong>Date of Birth:</strong> {formData.dateOfBirth?.toLocaleDateString()}</Typography>
                    <Typography><strong>Email:</strong> {formData.email}</Typography>
                    {formData.kvbNumber && <Typography><strong>KVB Number:</strong> {formData.kvbNumber}</Typography>}
                    {formData.nationalIdNo && <Typography><strong>National ID No:</strong> {formData.nationalIdNo}</Typography>}
                </div>
            </>
        );
    }
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
    },
    card: {
        padding: '20px',
        maxWidth: '400px',
        width: '100%',
        position: 'relative',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    stepper: {
        marginBottom: '20px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    backButton: {
        flexGrow: 1,
        marginRight: '10px',
    },
    nextButton: {
        flexGrow: 1,
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export default SignUp;
