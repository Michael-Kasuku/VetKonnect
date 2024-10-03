import React from 'react';

class ForgotPassword extends React.Component {
    render() {
        return (
            <section className="forgot-password-container mt-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card shadow-lg border-0">
                                <div className="card-body p-4">
                                    <h2 className="form-title text-center mb-4">Forgot Password</h2>
                                    <p className="text-center text-muted mb-4">
                                        Enter your registered email to reset your password.
                                    </p>
                                    <form method="post" id="password-reset-form">
                                        <div className="form-group mb-3">
                                            <label htmlFor="email" className="form-label">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email_address"
                                                className="form-control"
                                                placeholder="Enter your email address"
                                                required
                                                autoComplete="email"
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary w-100 mb-3">
                                            <i className="fas fa-key me-2"></i> Reset Password
                                        </button>
                                    </form>
                                    <div className="text-center">
                                        <p className="text-muted">
                                            Remembered your password? <a href="/login" className="text-primary text-decoration-none">Back to Login</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ForgotPassword;
