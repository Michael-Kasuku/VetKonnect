import React, { Component } from 'react';
import { Container, Typography } from '@mui/material';

class About extends Component {
    render() {
        return (
            <section
                id="about"
                className="about section light-background py-5"
                style={{
                    backgroundImage: "url('assets/img/about.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <Container data-aos="fade-up" data-aos-delay="100">
                    <div className="row align-items-center gy-5">
                        <div className="col-xl-5 content">
                            <Typography variant="h3" className="text-primary mb-4">About Us</Typography>
                            <Typography
                                variant="body1"
                                className="lead mb-4"
                                style={{
                                    lineHeight: '1.8',
                                    textAlign: 'justify',
                                    color: '#fff'
                                }}
                            >
                                <strong>Vet Konnect</strong> is a platform designed to connect livestock farmers and pet owners with certified veterinarians, ensuring access to high-quality veterinary services throughout Kenya.
                                Our mobile app, web platform, and USSD code allow users to easily find and book veterinarians, access essential veterinary products via our agrovet hub, and participate in a community forum for expert advice.
                                We are also committed to reintroducing vital animal welfare programs aimed at enhancing farm productivity and improving animal health.
                                By enhancing access to veterinary care and reviving key welfare initiatives, we strive to create sustainable livelihoods and strengthen communities.
                            </Typography>
                        </div>

                        <div className="col-xl-7">
                            <div className="row gy-4 icon-boxes">
                                <div className="col-md-6" data-aos="fade-up" data-aos-delay="200">
                                    <div className="icon-box text-center p-4 border rounded shadow-sm">
                                        <Typography variant="h4" style={{ color: 'blue' }}>Mission</Typography>
                                        <Typography className="font-weight-bold">
                                            To enhance animal health, support sustainable agriculture, empower communities, and reduce inequalities in accessing care, particularly in rural areas.
                                        </Typography>
                                    </div>
                                </div> {/* End Icon Box */}

                                <div className="col-md-6" data-aos="fade-up" data-aos-delay="300">
                                    <div className="icon-box text-center p-4 border rounded shadow-sm">
                                        <Typography variant="h4" style={{ color: 'blue' }}>Vision</Typography>
                                        <Typography className="font-weight-bold">
                                            To reduce animal disease and mortality rates by providing reliable veterinary care and empowering farmers and pet owners with essential resources.
                                        </Typography>
                                    </div>
                                </div> {/* End Icon Box */}
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        );
    }
}

export default About;
