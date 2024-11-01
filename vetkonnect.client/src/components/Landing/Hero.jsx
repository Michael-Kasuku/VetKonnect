import React, { Component } from 'react';
import { Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

class Hero extends Component {
    render() {
        return (
            <section id="hero" className="hero section dark-background">
                <img src="assets/img/hero-bg.jpg" alt="hero" data-aos="fade-in" />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10">
                            <h2 data-aos="fade-up" data-aos-delay="100">Welcome to Vetkonnect...</h2>
                            <p data-aos="fade-up" data-aos-delay="200">
                                An integrated platform connecting Farmers and Pet Owners with certified veterinarians, essential animal care products, and a supportive community - for healthier animals and thriving livelihoods.
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '20px' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    component={Link} // Use Link for in-app navigation
                                    to="/vet/login" // Navigate to the login page
                                    data-aos="fade-up"
                                    data-aos-delay="300"
                                >
                                    Get Started as a Vet
                                </Button>
                                <Typography variant="h6" style={{ color: 'white' }}>
                                    or
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="success" // Use 'success' for a green button
                                    size="large"
                                    component={Link} // Use Link for in-app navigation
                                    to="/farmer/login" // Navigate to the farmer login page
                                    data-aos="fade-up"
                                    data-aos-delay="400"
                                >
                                    Get Started as a Farmer
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Hero;
