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
                            <Typography variant="h3" className="text-primary mb-4">
                                About Us
                            </Typography>
                            <Typography
                                variant="body1"
                                className="lead mb-4"
                                style={{
                                    lineHeight: '1.8',
                                    textAlign: 'justify',
                                    color: '#fff'
                                }}
                            >
                                <strong>Vetkonnect</strong> is an innovative platform dedicated to connecting livestock farmers and pet owners with certified veterinarians across Kenya. Through our mobile application, web platform, and USSD code, users can easily locate and book veterinary services tailored to their needs.
                                <br /><br />
                                In addition to providing veterinary services, we offer essential veterinary products via our agrovet hub and facilitate community engagement through a dedicated forum for expert advice. Our commitment extends beyond access; we are actively reintroducing vital animal welfare programs that enhance farm productivity and improve animal health.
                            </Typography>
                        </div>

                        <div className="col-xl-7">
                            <div className="row gy-4 icon-boxes">
                                <div className="col-md-6" data-aos="fade-up" data-aos-delay="200">
                                    <div className="icon-box text-center p-4 border rounded shadow-sm">
                                        <Typography variant="h4" style={{ color: 'blue' }}>
                                            Mission
                                        </Typography>
                                        <Typography className="font-weight-bold">
                                            Our mission is to enhance animal health, support sustainable agriculture, empower communities, and reduce inequalities in access to veterinary care, particularly in rural areas.
                                        </Typography>
                                    </div>
                                </div>

                                <div className="col-md-6" data-aos="fade-up" data-aos-delay="300">
                                    <div className="icon-box text-center p-4 border rounded shadow-sm">
                                        <Typography variant="h4" style={{ color: 'blue' }}>
                                            Vision
                                        </Typography>
                                        <Typography className="font-weight-bold">
                                            Our vision is to significantly reduce animal disease and mortality rates by providing reliable veterinary care while empowering farmers and pet owners with the essential resources they need.
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        );
    }
}

export default About;
