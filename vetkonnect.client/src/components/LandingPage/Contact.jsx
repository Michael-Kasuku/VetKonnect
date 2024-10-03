// Contact.js
import React, { Component } from 'react';
import { Container, Typography } from '@mui/material';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            subject: '',
            message: '',
            successMessage: '',
            errorMessage: '',
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, subject, message } = this.state;

        // Simple validation
        if (!name || !email || !subject || !message) {
            this.setState({ errorMessage: 'All fields are required.' });
            return;
        }

        try {
            const response = await axios.post('/api/messages', {
                name,
                senderEmailAddress: email,
                subject,
                messageContent: message,
            });

            if (response.status === 201) {
                this.setState({
                    successMessage: 'Message sent successfully!',
                    errorMessage: '',
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                });
            }
        } catch (error) {
            this.setState({ errorMessage: 'Error sending message. Please try again.' });
        }
    };

    render() {
        return (
            <section id="contact" className="contact section">
                <Container className="section-title" data-aos="fade-up">
                    <Typography variant="h2" className="text-primary">Get in Touch</Typography>
                    <Typography variant="body1">
                        We're here to answer any questions or provide additional information you may need. Reach out to us and let us know how we can assist you.
                    </Typography>
                </Container>

                <Container data-aos="fade-up" data-aos-delay="100">
                    <div className="row gy-4">
                        <div className="col-lg-6">
                            <div className="row gy-4">
                                <div className="col-md-6">
                                    <div className="info-item" data-aos="fade" data-aos-delay="200">
                                        <i className="fa fa-map-marker-alt"></i>
                                        <Typography variant="h4" className="mt-2">Our Location</Typography>
                                        <Typography variant="body2">
                                            Mega Plaza, Second Floor <br />
                                            Oginga Odinga Street, Kisumu City
                                        </Typography>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="info-item" data-aos="fade" data-aos-delay="300">
                                        <i className="fa fa-phone"></i>
                                        <Typography variant="h4" className="mt-2">Phone</Typography>
                                        <Typography variant="body2">+254 712 345 678</Typography>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="info-item" data-aos="fade" data-aos-delay="400">
                                        <i className="fa fa-envelope"></i>
                                        <Typography variant="h4" className="mt-2">Email</Typography>
                                        <Typography variant="body2">vetkonnect@gmail.com</Typography>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="info-item" data-aos="fade" data-aos-delay="500">
                                        <i className="fa fa-clock"></i>
                                        <Typography variant="h4" className="mt-2">Working Hours</Typography>
                                        <Typography variant="body2">
                                            Monday - Friday: 9:00 AM - 5:00 PM
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <form onSubmit={this.handleSubmit} className="php-email-form" data-aos="fade-up" data-aos-delay="200">
                                <div className="row gy-4">
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Your Name"
                                            required
                                            value={this.state.name}
                                            onChange={this.handleChange}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            placeholder="Your Email"
                                            required
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="subject"
                                            placeholder="Subject"
                                            required
                                            value={this.state.subject}
                                            onChange={this.handleChange}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <textarea
                                            className="form-control"
                                            name="message"
                                            rows="6"
                                            placeholder="Message"
                                            required
                                            value={this.state.message}
                                            onChange={this.handleChange}
                                        ></textarea>
                                    </div>

                                    <div className="col-12 text-center">
                                        <button type="submit" className="btn btn-primary">Send Message</button>
                                    </div>
                                </div>

                                {/* Success or error message display */}
                                {this.state.successMessage && <p className="text-success">{this.state.successMessage}</p>}
                                {this.state.errorMessage && <p className="text-danger">{this.state.errorMessage}</p>}
                            </form>
                        </div>
                    </div>
                </Container>
            </section>
        );
    }
}

export default Contact;
