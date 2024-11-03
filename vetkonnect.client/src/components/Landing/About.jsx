import React, { Component } from 'react';
import { Container, Typography, Grid } from '@mui/material';

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
                        <div className="col-xl-5 content mb-5"> {/* Increased margin-bottom */}
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
                                <strong>Vetkonnect</strong> is your trusted partner in veterinary care. We are revolutionizing the way livestock farmers and pet owners in Kenya connect with certified veterinarians. Our platform, available via a user-friendly mobile app, web interface, and accessible USSD code, ensures that high-quality veterinary services are just a click or a call away.
                                <br /><br />
                                But we don't stop there! Vetkonnect goes beyond just connecting you with veterinary services. We proudly offer a comprehensive agrovet hub for essential veterinary products and foster a vibrant community forum where you can seek expert advice and share experiences. Together, we are not just enhancing animal health; we are committed to elevating farm productivity and implementing crucial animal welfare initiatives that positively impact your livelihood.
                            </Typography>
                        </div>

                        <div className="col-xl-7 pt-5"> {/* Increased padding-top */}
                            <Grid container spacing={3}> {/* Adjusted spacing for the grid */}
                                <Grid item md={6} data-aos="fade-up" data-aos-delay="200">
                                    <div className="icon-box text-center p-4 border rounded shadow-sm" style={{ padding: '2rem', margin: '1rem' }}>
                                        <Typography variant="h4" style={{ color: 'blue' }}>
                                            Our Mission
                                        </Typography>
                                        <Typography className="font-weight-bold" style={{ marginTop: '1rem' }}>
                                            To bridge the gap between farmers and certified veterinarians.
                                        </Typography>
                                    </div>
                                </Grid>

                                <Grid item md={6} data-aos="fade-up" data-aos-delay="300">
                                    <div className="icon-box text-center p-4 border rounded shadow-sm" style={{ padding: '2rem', margin: '1rem' }}>
                                        <Typography variant="h4" style={{ color: 'blue' }}>
                                            Our Vision
                                        </Typography>
                                        <Typography className="font-weight-bold" style={{ marginTop: '1rem' }}>
                                            To create a thriving community for farmers and veterinarians.
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </Container>
            </section>
        );
    }
}

export default About;
