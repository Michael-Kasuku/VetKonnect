import React, { Component } from 'react';
import {
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Button,
    Divider,
} from '@mui/material';
import {
    AccessTime,
    Storefront,
    LiveTv,
    Pets,
} from '@mui/icons-material';
import $ from 'jquery'; // Import jQuery

class Dashboard extends Component {
    componentDidMount() {
        // jQuery hover effect on cards
        $('.card').hover(
            function () {
                $(this).css('box-shadow', '0 8px 16px rgba(0,0,0,0.2)');
            },
            function () {
                $(this).css('box-shadow', '0 4px 8px rgba(0,0,0,0.1)');
            }
        );

        // jQuery click event for buttons
        $('.view-button').click(function () {
            const title = $(this).closest('.card').find('h5').text();
            alert(`You clicked on: ${title}`);
        });
    }

    render() {
        return (
            <Container maxWidth="lg" className="main-panel">
                <div className="content-wrapper">
                    {/* Dashboard Title */}
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', marginTop: 2 }}>
                        <AccessTime fontSize="large" color="primary" /> Dashboard
                    </Typography>

                    <Grid container spacing={3} style={{ marginTop: '20px' }}>
                        {/* Cards Section - Grouping Related Information */}
                        <Grid container spacing={3}>
                            {/* Upcoming Appointments Card */}
                            <Grid item md={4} xs={12}>
                                <Card className="card" variant="outlined" sx={{ backgroundColor: '#f44336', color: '#fff', boxShadow: 3, borderRadius: 2 }}>
                                    <CardContent>
                                        <CardMedia
                                            component="img"
                                            alt="Appointments"
                                            image="assets/images/dashboard/circle.svg"
                                            sx={{ position: 'absolute', top: 0, right: 0, opacity: 0.1 }}
                                        />
                                        <Typography variant="h5" component="div">
                                            <Pets fontSize="large" /> Upcoming Appointments
                                        </Typography>
                                        <Typography variant="body2" component="div" sx={{ marginTop: 1 }}>
                                            Manage your upcoming appointments efficiently.
                                        </Typography>
                                        <Divider sx={{ marginY: 2 }} />
                                        <Button className="view-button" variant="contained" color="success" size="small" sx={{ marginTop: 1 }}>
                                            View Appointments
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Available Products Card */}
                            <Grid item md={4} xs={12}>
                                <Card className="card" variant="outlined" sx={{ backgroundColor: '#2196F3', color: '#fff', boxShadow: 3, borderRadius: 2 }}>
                                    <CardContent>
                                        <CardMedia
                                            component="img"
                                            alt="Products"
                                            image="assets/images/dashboard/circle.svg"
                                            sx={{ position: 'absolute', top: 0, right: 0, opacity: 0.1 }}
                                        />
                                        <Typography variant="h5" component="div">
                                            <Storefront fontSize="large" /> Available Products
                                        </Typography>
                                        <Typography variant="body2" component="div" sx={{ marginTop: 1 }}>
                                            Explore a range of veterinary products available.
                                        </Typography>
                                        <Divider sx={{ marginY: 2 }} />
                                        <Button className="view-button" variant="contained" color="primary" size="small" sx={{ marginTop: 1 }}>
                                            View Products
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Upcoming Webinars Card */}
                            <Grid item md={4} xs={12}>
                                <Card className="card" variant="outlined" sx={{ backgroundColor: '#4CAF50', color: '#fff', boxShadow: 3, borderRadius: 2 }}>
                                    <CardContent>
                                        <CardMedia
                                            component="img"
                                            alt="Webinars"
                                            image="assets/images/dashboard/circle.svg"
                                            sx={{ position: 'absolute', top: 0, right: 0, opacity: 0.1 }}
                                        />
                                        <Typography variant="h5" component="div">
                                            <LiveTv fontSize="large" /> Upcoming Webinars
                                        </Typography>
                                        <Typography variant="body2" component="div" sx={{ marginTop: 1 }}>
                                            Join webinars to enhance your veterinary knowledge.
                                        </Typography>
                                        <Divider sx={{ marginY: 2 }} />
                                        <Button className="view-button" variant="contained" color="info" size="small" sx={{ marginTop: 1 }}>
                                            View Webinars
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        );
    }
}

export default Dashboard;
