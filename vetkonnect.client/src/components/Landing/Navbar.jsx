import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobileMenuOpen: false, // State to manage the mobile menu's visibility
            hoveredLink: null, // State to track which navigation link is currently being hovered
        };
    }

    // Toggles the visibility of the mobile menu
    toggleMobileMenu = () => {
        this.setState((prevState) => ({ isMobileMenuOpen: !prevState.isMobileMenuOpen }));
    };

    // Closes the mobile menu
    closeMobileMenu = () => {
        this.setState({ isMobileMenuOpen: false });
    };

    // Updates the state when a link is hovered
    handleMouseEnter = (link) => {
        this.setState({ hoveredLink: link });
    };

    // Resets the hovered link state when the mouse leaves
    handleMouseLeave = () => {
        this.setState({ hoveredLink: null });
    };

    render() {
        const { isMobileMenuOpen, hoveredLink } = this.state;
        const linkNames = ['Home', 'About Us', 'Our Team', 'Services', 'FAQs', 'Contact Us'];

        return (
            <header className="header fixed-top shadow-sm bg-white">
                <div className="container-fluid d-flex align-items-center justify-content-between py-2">
                    <div className="d-flex align-items-center">
                        <Link to="/" className="logo d-flex align-items-center me-3">
                            <img
                                src="assets/img/vetkonnect.jpg"
                                alt="VetKonnect Logo"
                                className="img-fluid"
                                style={{ height: '40px' }}
                            />
                        </Link>
                        <div className="brand-name d-flex align-items-center">
                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', marginLeft: '10px', color: '#FFBF00' }}>
                                Vetkonnect
                            </span>
                        </div>
                    </div>

                    <nav className="navmenu d-none d-xl-flex align-items-center">
                        <ul className="d-flex list-unstyled mb-0">
                            {/* Array of navigation links */}
                            {['/', '#about', '#team', '#services', '#faq', '#contact'].map((link, index) => (
                                <li className="nav-item" key={index}>
                                    <Link
                                        to={link}
                                        className="nav-link px-3"
                                        onMouseEnter={() => this.handleMouseEnter(linkNames[index])}
                                        onMouseLeave={this.handleMouseLeave}
                                        style={{
                                            color: hoveredLink === linkNames[index] ? '#FFBF00' : '#000', // Change link color on hover
                                            fontSize: '1rem', // Adjust font size
                                            fontWeight: '500', // Adjust font weight
                                            transition: 'color 0.3s', // Smooth transition for color change
                                        }}
                                    >
                                        {linkNames[index]} {/* Display the link name */}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Button for toggling mobile navigation menu */}
                    <button
                        className="mobile-nav-toggle d-xl-none btn btn-light border-0"
                        onClick={this.toggleMobileMenu}
                        aria-label="Toggle mobile menu"
                    >
                        <i className="bi bi-list fs-3"></i>
                    </button>
                </div>

                {/* Render mobile navigation menu if it is open */}
                {isMobileMenuOpen && (
                    <nav className="mobile-nav position-fixed top-0 start-0 w-100 h-100 bg-white d-xl-none">
                        <div className="container-fluid d-flex flex-column p-4">
                            {/* Button to close mobile navigation menu */}
                            <button
                                className="mobile-nav-close btn btn-light border-0 align-self-end mb-3"
                                onClick={this.toggleMobileMenu}
                                aria-label="Close mobile menu"
                            >
                                <i className="bi bi-x-lg fs-3"></i>
                            </button>
                            <ul className="list-unstyled w-100">
                                {/* Mobile navigation links */}
                                {['/', '#about', '#team', '#services', '#faq', '#contact'].map((link, index) => (
                                    <li className="nav-item" key={index}>
                                        <Link
                                            to={link}
                                            className="nav-link py-2"
                                            onClick={this.closeMobileMenu} // Close mobile menu on link click
                                            onMouseEnter={() => this.handleMouseEnter(linkNames[index])}
                                            onMouseLeave={this.handleMouseLeave}
                                            style={{
                                                color: hoveredLink === linkNames[index] ? '#FFBF00' : '#000', // Change link color on hover
                                                fontSize: '1rem', // Adjust font size
                                                fontWeight: '500', // Adjust font weight
                                                transition: 'color 0.3s', // Smooth transition for color change
                                            }}
                                        >
                                            {linkNames[index]} {/* Display the link name */}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>
                )}
            </header>
        );
    }
}

export default Navbar;
