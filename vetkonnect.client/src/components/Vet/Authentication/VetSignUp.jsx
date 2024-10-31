import React, { Component } from 'react';
import axios from 'axios'; // Import Axios
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

class VetSignUp extends Component {
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
        successMessage: '',
        errorMessage: '',
    };

    handleRoleChange = (event) => {
        const role = event.target.value;
        this.setState({ currentRole: role });
        this.showRoleSpecificFields(role);
    };

    showRoleSpecificFields = (role) => {
        const isVet = role === 'Vet';
        $("#kvbNumber, #nationalIdNo").fadeToggle(isVet);
        if (!isVet) {
            this.setState((prevState) => ({
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

        if (activeStep === 3) {
            this.submitSignUp(); // Call the function to submit data when at the last step
        } else {
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
        }
    };

    submitSignUp = async (e) => {
        this.setState({ isLoading: true, successMessage: '', errorMessage: '' }); // Reset messages and show loader

        const { formData } = this.state;

        // Simple validation to ensure required fields are filled
        if (
            !formData.firstName ||
            !formData.lastName ||
            !formData.email ||
            !formData.password ||
            !formData.gender ||
            !formData.phoneNumber ||
            (formData.currentRole === 'Vet' && (!formData.kvbNumber || !formData.nationalIdNo))
        ) {
            this.setState({
                errorMessage: 'Please fill all required fields.',
                isLoading: false
            });
            return;
        }

        try {
            const apiUrl = `https://localhost:7164/api/signup`; // Define your API endpoint

            const response = await axios.post(apiUrl, {
                FirstName: formData.firstName,
                LastName: formData.lastName,
                EmailAddress: formData.email,
                Password: formData.password,
                Gender: formData.gender,
                YearOfBirth: formData.dateOfBirth
                    ? formData.dateOfBirth.getFullYear()
                    : null,
                PhoneNumbers: [{ Phone: formData.phoneNumber }],
                CurrentRole: formData.currentRole,
                KvbNumber: formData.currentRole === 'Vet' ? formData.kvbNumber : null,
                NationalIdNo: formData.currentRole === 'Vet' ? formData.nationalIdNo : null,
            });

            if (response.status === 201) {
                // Display success message and clear form data
                this.setState({
                    successMessage: 'Signup successful! Welcome onboard.',
                    isLoading: false,
                    errorMessage: '',
                    formData: {
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        gender: '',
                        dateOfBirth: null,
                        phoneNumber: '',
                        currentRole: '',
                        kvbNumber: '',
                        nationalIdNo: ''
                    },
                });
            }
        } catch (error) {
            const errorMsg =
                error.response && error.response.data
                    ? error.response.data.message || 'An unexpected error occurred. Please try again.'
                    : 'An unexpected error occurred. Please try again.';

            // Display error message
            this.setState({
                errorMessage: errorMsg,
                isLoading: false,
            });
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
                    value={formData.gender}
                    onChange={this.handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                    variant="outlined"
                    error={!!formErrors.gender}
                    helperText={formErrors.gender}
                >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </TextField>
                <DatePicker
                    selected={formData.dateOfBirth}
                    onChange={this.handleDateChange}
                    dateFormat="yyyy/MM/dd"
                    placeholderText="Date of Birth"
                    className={`datepicker ${formErrors.dateOfBirth ? 'error' : ''}`}
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    dropdownMode="select"
                    required
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
            <div>
                <Typography variant="h6">Review Your Information</Typography>
                <Typography>First Name: {formData.firstName}</Typography>
                <Typography>Last Name: {formData.lastName}</Typography>
                <Typography>Phone Number: {formData.phoneNumber}</Typography>
                <Typography>Role: {this.state.currentRole}</Typography>
                <Typography>Gender: {formData.gender}</Typography>
                <Typography>Date of Birth: {formData.dateOfBirth ? formData.dateOfBirth.toLocaleDateString() : ''}</Typography>
                {this.state.currentRole === 'Vet' && (
                    <>
                        <Typography>KVB Number: {formData.kvbNumber}</Typography>
                        <Typography>National ID No: {formData.nationalIdNo}</Typography>
                    </>
                )}
                <Typography>Email: {formData.email}</Typography>
            </div>
        );
    }
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
    },
    card: {
        padding: '20px',
        width: '400px',
        textAlign: 'center',
    },
    title: {
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
        marginRight: '10px',
    },
    nextButton: {
        marginLeft: '10px',
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export default VetSignUp;
