import React, { Component } from 'react';
import $ from 'jquery'; // Ensure you have jQuery for handling the JavaScript parts

class SignUp extends Component {
    componentDidMount() {
        $(document).ready(function () {
            // Toggle password visibility
            $('#show-password-toggle').click(function () {
                const passwordField = $('#password');
                const eyeIcon = $('#eye-icon');

                if (passwordField.attr('type') === 'password') {
                    passwordField.attr('type', 'text');
                    eyeIcon.removeClass('fa-eye').addClass('fa-eye-slash');
                } else {
                    passwordField.attr('type', 'password');
                    eyeIcon.removeClass('fa-eye-slash').addClass('fa-eye');
                }
            });

            $('#show-confirm-password-toggle').click(function () {
                const confirmPasswordField = $('#confirm_password');
                const confirmEyeIcon = $('#confirm-eye-icon');

                if (confirmPasswordField.attr('type') === 'password') {
                    confirmPasswordField.attr('type', 'text');
                    confirmEyeIcon.removeClass('fa-eye').addClass('fa-eye-slash');
                } else {
                    confirmPasswordField.attr('type', 'password');
                    confirmEyeIcon.removeClass('fa-eye-slash').addClass('fa-eye');
                }
            });

            // Show/Hide License No field based on role
            $('#current_role').change(function () {
                if ($(this).val() === 'Vet') {
                    $('#license-field').show();
                } else {
                    $('#license-field').hide();
                }
            }).trigger('change');

            // Next button functionality
            $('#nextBtn').click(function () {
                $('#step1').hide(); // Hide Step 1
                $('#step2').show(); // Show Step 2
                $(this).hide(); // Hide the Next button
            });

            // Back button functionality
            $('#backBtn').click(function () {
                $('#step2').hide(); // Hide Step 2
                $('#step1').show(); // Show Step 1
                $('#nextBtn').show(); // Show the Next button again
            });
        });
    }

    render() {
        return (
            <section className="register-container d-flex justify-content-center align-items-center vh-100">
                <div className="card shadow-lg p-4 register-form">
                    <div className="card-body">
                        <h2 className="form-title">Create a New Account</h2>
                        <form method="post" id="registration-form">
                            {/* Step 1: User Info */}
                            <div className="form-step" id="step1">
                                <div className="form-group mb-3">
                                    <label htmlFor="first_name" className="form-label">
                                        <i className="fas fa-user"></i> First Name
                                    </label>
                                    <input id="first_name" type="text" name="first_name" className="form-control" placeholder="Enter your first name" required />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="last_name" className="form-label">
                                        <i className="fas fa-user"></i> Last Name
                                    </label>
                                    <input id="last_name" type="text" name="last_name" className="form-control" placeholder="Enter your last name" required />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="current_role" className="form-label">
                                        <i className="fas fa-briefcase"></i> Choose Your Role
                                    </label>
                                    <select id="current_role" name="current_role" className="form-select" required>
                                        <option value="Farmer" selected>Farmer</option>
                                        <option value="Vet">Vet</option>
                                    </select>
                                </div>
                                <div className="form-group mb-3" id="license-field" style={{ display: 'none' }}>
                                    <label htmlFor="vet_license_no" className="form-label">
                                        <i className="fas fa-id-badge"></i> Vet License No
                                    </label>
                                    <input id="vet_license_no" type="text" name="vet_license_no" className="form-control" placeholder="Enter your vet license number" />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="phone_number" className="form-label">
                                        <i className="fas fa-phone"></i> Phone Number
                                    </label>
                                    <input id="phone_number" type="text" name="phone_number" className="form-control" placeholder="Enter your phone number" required />
                                </div>
                            </div>
                            <button type="button" className="btn btn-primary btn-block w-100" id="nextBtn">
                                <i className="fas fa-arrow-right"></i> Next
                            </button>

                            {/* Step 2: Account Details */}
                            <div className="form-step" id="step2" style={{ display: 'none' }}>
                                <div className="form-group mb-3">
                                    <label htmlFor="email_address" className="form-label">
                                        <i className="fas fa-envelope"></i> Email Address
                                    </label>
                                    <input id="email_address" type="email" name="email_address" className="form-control" placeholder="Enter your email address" required />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password" className="form-label">
                                        <i className="fas fa-lock"></i> Password
                                    </label>
                                    <div className="input-group">
                                        <input id="password" type="password" name="password" className="form-control" placeholder="Enter your password" required />
                                        <span className="input-group-text" id="show-password-toggle">
                                            <i className="fas fa-eye" id="eye-icon"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="confirm_password" className="form-label">
                                        <i className="fas fa-lock"></i> Confirm Password
                                    </label>
                                    <div className="input-group">
                                        <input id="confirm_password" type="password" name="confirm_password" className="form-control" placeholder="Re-enter your password" required />
                                        <span className="input-group-text" id="show-confirm-password-toggle">
                                            <i className="fas fa-eye" id="confirm-eye-icon"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button type="button" className="btn btn-secondary" id="backBtn">
                                        <i className="fas fa-arrow-left"></i> Back
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        <i className="fas fa-user-plus"></i> Register
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="mt-3 text-center">
                            <p>
                                Already have an account? <a href="/login" className="text-decoration-none">Log In</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default SignUp;
