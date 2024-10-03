import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobileMenuOpen: false,
        };
    }

    toggleMobileMenu = () => {
        this.setState((prevState) => ({ isMobileMenuOpen: !prevState.isMobileMenuOpen }));
    };

    closeMobileMenu = () => {
        this.setState({ isMobileMenuOpen: false });
    };

    render() {
        const { isMobileMenuOpen } = this.state;

        return (
            <header id="header" className="header d-flex align-items-center fixed-top shadow-sm bg-white">
                <div className="container-fluid d-flex align-items-center justify-content-between">
                    {/* Use Link for routing to the landing page */}
                    <Link to="/" className="logo d-flex align-items-center me-auto me-xl-0">
                        <img
                            src="assets/img/vetkonnect.jpg"
                            alt="Vet Konnect"
                            className="img-fluid me-2"
                            style={{ height: '50px' }}
                        />
                        <h1 className="sitename h4 mb-0 text-primary fw-bold" style={{ textDecoration: 'none' }}>
                            Vet Konnect
                        </h1>
                    </Link>

                    <nav id="navmenu" className="navmenu d-none d-xl-block">
                        <ul className="d-flex list-unstyled mb-0">
                            <li><a href="#hero" className="nav-link px-3">Home</a></li>
                            <li className="dropdown position-relative">
                                <a
                                    href="#"
                                    className="nav-link px-3 dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <span>About Us</span>
                                </a>
                                <ul className="dropdown-menu shadow-sm">
                                    <li><a href="#about" className="dropdown-item">About</a></li>
                                    <li><a href="#team" className="dropdown-item">Team</a></li>
                                </ul>
                            </li>
                            <li><a href="#services" className="nav-link px-3">Services</a></li>
                            <li className="dropdown position-relative">
                                <a
                                    href="#"
                                    className="nav-link px-3 dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <span>Help</span>
                                </a>
                                <ul className="dropdown-menu shadow-sm">
                                    <li><a href="#faq" className="dropdown-item">FAQs</a></li>
                                    <li><a href="#contact" className="dropdown-item">Contact</a></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>

                    {/* Use Link for routing to the login page */}
                    <Link to="/login" className="btn btn-primary btn-sm ms-3 fw-semibold">Get Started</Link>

                    <button
                        className="mobile-nav-toggle d-xl-none btn btn-light border-0"
                        onClick={this.toggleMobileMenu}
                    >
                        <i className="bi bi-list fs-3"></i>
                    </button>
                </div>

                {isMobileMenuOpen && (
                    <nav className="mobile-nav position-fixed top-0 start-0 w-100 h-100 bg-white d-xl-none">
                        <div className="container-fluid d-flex flex-column align-items-start p-4">
                            <button
                                className="mobile-nav-close btn btn-light border-0 align-self-end mb-3"
                                onClick={this.toggleMobileMenu}
                            >
                                <i className="bi bi-x-lg fs-3"></i>
                            </button>
                            <ul className="list-unstyled w-100">
                                <li><Link to="/" className="nav-link py-2" onClick={this.closeMobileMenu}>Home</Link></li>
                                <li><a href="#about" className="nav-link py-2" onClick={this.closeMobileMenu}>About Us</a></li>
                                <li><a href="#services" className="nav-link py-2" onClick={this.closeMobileMenu}>Services</a></li>
                                <li><a href="#faq" className="nav-link py-2" onClick={this.closeMobileMenu}>FAQs</a></li>
                                <li><a href="#contact" className="nav-link py-2" onClick={this.closeMobileMenu}>Contact</a></li>
                            </ul>
                        </div>
                    </nav>
                )}
            </header>
        );
    }
}

export default Navbar;
