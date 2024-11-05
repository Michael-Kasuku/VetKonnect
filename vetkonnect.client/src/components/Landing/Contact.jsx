import React, { Component } from 'react';
import { Container, Typography, TextField, Button, Grid, Paper, Snackbar } from '@mui/material';
import { LocationOn, Phone, Email, AccessTime } from '@mui/icons-material';
import axios from 'axios';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            subject: '',
            message: '',
            snackbarOpen: false,
            snackbarMessage: '',
            snackbarSeverity: 'success',
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, subject, message } = this.state;

        if (!name || !email || !subject || !message) {
            this.setState({
                snackbarMessage: 'All fields are required.',
                snackbarSeverity: 'error',
                snackbarOpen: true,
            });
            return;
        }

        try {
            const apiUrl = `https://kasuku-001-site1.dtempurl.com/api/messages`;
            const response = await axios.post(apiUrl, {
                Name: name,
                SenderEmailAddress: email,
                Subject: subject,
                MessageContent: message,
            });

            if (response.status === 201) {
                this.setState({
                    snackbarMessage: 'Message sent successfully!',
                    snackbarSeverity: 'success',
                    snackbarOpen: true,
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                });
            }
        } catch (error) {
            this.setState({
                snackbarMessage: 'Error sending message. Please try again.',
                snackbarSeverity: 'error',
                snackbarOpen: true,
            });
        }
    };

    handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ snackbarOpen: false });
    };

    render() {
        return (
            <section id="contact" style={{ padding: '70px 0', backgroundColor: '#eef2f6' }}>
                <Container maxWidth="md" style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <Typography variant="h3" style={{ color: '#3f51b5', fontWeight: 'bold', marginBottom: '10px' }}>
                        Get in Touch
                    </Typography>
                    <Typography variant="body1" style={{ color: '#6c757d', marginBottom: '30px' }}>
                        We're here to help and answer any questions you might have. Please reach out to us, and we'll get back to you as soon as possible.
                    </Typography>
                </Container>

                <Container maxWidth="md">
                    <Grid container spacing={5}>
                        {/* Contact Info Section */}
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={2}>
                                {[
                                    {
                                        icon: <LocationOn style={{ color: '#3f51b5', fontSize: '30px' }} />,
                                        title: 'Our Location',
                                        description: 'Mega Plaza, Second Floor, Oginga Odinga Street, Kisumu City',
                                    },
                                    {
                                        icon: <Phone style={{ color: '#3f51b5', fontSize: '30px' }} />,
                                        title: 'Phone',
                                        description: '+254 742 644 460',
                                    },
                                    {
                                        icon: <Email style={{ color: '#3f51b5', fontSize: '30px' }} />,
                                        title: 'Email',
                                        description: 'vetkonnect@gmail.com',
                                    },
                                    {
                                        icon: <AccessTime style={{ color: '#3f51b5', fontSize: '30px' }} />,
                                        title: 'Working Hours',
                                        description: 'Monday - Friday: 9:00 AM - 5:00 PM',
                                    },
                                ].map((info, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '10px' }}>
                                            {info.icon}
                                            <Typography variant="h6" style={{ marginTop: '15px', fontWeight: 'bold', color: '#3f51b5' }}>
                                                {info.title}
                                            </Typography>
                                            <Typography variant="body2" style={{ color: '#6c757d' }}>
                                                {info.description}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>

                        {/* Contact Form Section */}
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} style={{ padding: '30px', backgroundColor: '#ffffff', borderRadius: '10px' }}>
                                <form onSubmit={this.handleSubmit}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label="Your Name"
                                                name="name"
                                                required
                                                value={this.state.name}
                                                onChange={this.handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label="Your Email"
                                                name="email"
                                                type="email"
                                                required
                                                value={this.state.email}
                                                onChange={this.handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label="Subject"
                                                name="subject"
                                                required
                                                value={this.state.subject}
                                                onChange={this.handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label="Message"
                                                name="message"
                                                multiline
                                                rows={5}
                                                required
                                                value={this.state.message}
                                                onChange={this.handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} style={{ textAlign: 'center' }}>
                                            <Button type="submit" variant="contained" style={{ backgroundColor: '#3f51b5', color: '#ffffff', padding: '10px 25px' }}>
                                                Send Message
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>

                {/* Snackbar for Feedback */}
                <Snackbar
                    open={this.state.snackbarOpen}
                    autoHideDuration={6000}
                    onClose={this.handleSnackbarClose}
                    message={this.state.snackbarMessage}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    ContentProps={{
                        style: {
                            backgroundColor: this.state.snackbarSeverity === 'success' ? '#4caf50' : '#f44336',
                            color: '#ffffff',
                            fontWeight: 'bold',
                            textAlign: 'center',
                        },
                    }}
                />
            </section>
        );
    }
}

export default Contact;
