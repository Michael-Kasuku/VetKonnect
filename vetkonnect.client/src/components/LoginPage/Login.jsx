import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            isLoading: false,
        };
    }

    togglePasswordVisibility = () => {
        this.setState(prevState => ({ showPassword: !prevState.showPassword }));
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ isLoading: true });

        setTimeout(() => {
            this.setState({ isLoading: false });
            alert('Login successful');
        }, 2000);
    };

    render() {
        const styles = {
            body: {
                backgroundColor: '#f0f2f5',
                margin: 0,
                fontFamily: 'Arial, sans-serif',
            },
            loginContainer: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                padding: '20px',
                backgroundColor: '#dcdcdc',
                transition: 'background-color 0.3s ease',
            },
            loginForm: {
                backgroundColor: '#fff',
                padding: '40px',
                borderRadius: '12px',
                boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                maxWidth: '400px',
                width: '100%',
                transition: 'all 0.3s ease',
                position: 'relative',
            },
            formTitle: {
                fontSize: '28px',
                fontWeight: '600',
                textAlign: 'center',
                marginBottom: '30px',
                color: '#343a40',
            },
            loginBtnPrimary: {
                backgroundColor: '#007bff',
                color: '#fff',
                fontWeight: '600',
                padding: '12px 15px',
                borderRadius: '5px',
                border: 'none',
                width: '100%',
                cursor: 'pointer',
                fontSize: '16px',
                letterSpacing: '1px',
                transition: 'background-color 0.3s ease',
                position: 'relative',
            },
            loginBtnHover: {
                backgroundColor: '#0056b3',
            },
            textLink: {
                color: '#007bff',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
            },
            textLinkHover: {
                color: '#0056b3',
            },
            formGroupInput: {
                height: '45px',
                fontSize: '1rem',
                padding: '10px 10px 10px 40px', // Add left padding for icon space
                borderRadius: '5px',
                border: '1px solid #ced4da',
                transition: 'border-color 0.3s ease',
                width: '100%', // Use 100% width
            },
            inputGroup: {
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '15px', // Add some margin for spacing
            },
            eyeIcon: {
                cursor: 'pointer',
                position: 'absolute',
                right: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#007bff',
                transition: 'color 0.3s ease',
            },
            loader: {
                position: 'absolute',
                width: '24px',
                height: '24px',
                border: '3px solid #fff',
                borderTop: '3px solid #007bff',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
            },
            forgotPassword: {
                textAlign: 'center',
                margin: '20px 0',
            },
            inputIcon: {
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#007bff',
                pointerEvents: 'none',
            },
        };

        return (
            <section style={styles.loginContainer}>
                <div style={styles.loginForm}>
                    <h2 style={styles.formTitle}>Welcome Back!</h2>
                    <form method="post" id="login-form" onSubmit={this.handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="email_address" className="form-label">Email Address</label>
                            <div style={styles.inputGroup}>
                                <i className="fas fa-envelope" style={styles.inputIcon}></i>
                                <input
                                    type="email"
                                    id="email_address"
                                    name="email_address"
                                    className="form-control"
                                    placeholder="Enter your email address"
                                    required
                                    autoComplete="true"
                                    style={styles.formGroupInput}
                                />
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div style={styles.inputGroup}>
                                <i className="fas fa-lock" style={styles.inputIcon}></i>
                                <input
                                    id="password"
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    name="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    required
                                    autoComplete="true"
                                    style={styles.formGroupInput}
                                />
                                <i
                                    className={`fas ${this.state.showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                    style={styles.eyeIcon}
                                    onClick={this.togglePasswordVisibility}
                                ></i>
                            </div>
                        </div>
                        <div className="form-group form-check mb-4">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="show-password-checkbox"
                                checked={this.state.showPassword}
                                onChange={this.togglePasswordVisibility}
                            />
                            <label className="form-check-label" htmlFor="show-password-checkbox">
                                Show Password
                            </label>
                        </div>
                        <button type="submit" style={styles.loginBtnPrimary}>
                            {this.state.isLoading ? (
                                <div style={styles.loader}></div>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </form>
                    <div style={styles.forgotPassword}>
                        <p>Don't have an account? <Link to="/signup" style={styles.textLink}>Register</Link></p>
                        <p><Link to="/forgot" style={styles.textLink}>Forgot your password?</Link></p>
                    </div>
                </div>
            </section>
        );
    }
}

export default Login;
