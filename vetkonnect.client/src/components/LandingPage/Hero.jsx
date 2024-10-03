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
                            <h2 data-aos="fade-up" data-aos-delay="100">Welcome to Vet Konnect...</h2>
                            <p data-aos="fade-up" data-aos-delay="200">
                                An integrated platform connecting Farmers and Pet Owners with certified veterinarians, essential animal care products, and a supportive community - for healthier animals and thriving livelihoods.
                            </p>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                component={Link} // Use Link for in-app navigation
                                to="/login" // Navigate to the login page
                                data-aos="fade-up"
                                data-aos-delay="300"
                                style={{ marginTop: '20px' }}
                            >
                                Get Started
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Hero;
