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
import $ from 'jquery'; // Importing jQuery for UI interactions

class ResearchPapers extends Component {
    componentDidMount() {
        // Applying jQuery hover effects on cards
        this.initCardHoverEffects();
        // Adding click event listener for buttons
        this.initButtonClickEvents();
    }

    initCardHoverEffects() {
        $('.card').hover(
            function () {
                $(this).css('box-shadow', '0 8px 16px rgba(0,0,0,0.2)');
            },
            function () {
                $(this).css('box-shadow', '0 4px 8px rgba(0,0,0,0.1)');
            }
        );
    }

    initButtonClickEvents() {
        $('.view-button').click(function () {
            const title = $(this).closest('.card').find('h5').text();
            alert(`You clicked on: ${title}`);
        });
    }

    render() {
        return (
            <Container
                maxWidth="lg"
                className="main-panel"
                sx={{ padding: 2, maxHeight: '100vh', overflow: 'hidden' }} // Restrict height and remove vertical scrollbar
            >
                <div className="content-wrapper" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 64px)' }}> {/* Adjust according to your header height */}
                    <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        alignItems="stretch"
                        justifyContent="center"
                        sx={{ marginTop: '20px' }}
                    >
                        {/* Rendering Dashboard Cards */}
                        {this.renderCard(
                            "Upcoming Appointments",
                            "Manage your upcoming appointments efficiently.",
                            <Pets fontSize="large" />,
                            "View Appointments",
                            "assets/images/dashboard/circle.svg",
                            '#f44336',
                            'success'
                        )}

                        {this.renderCard(
                            "Available Products",
                            "Explore a range of veterinary products available.",
                            <Storefront fontSize="large" />,
                            "View Products",
                            "assets/images/dashboard/circle.svg",
                            '#2196F3',
                            'primary'
                        )}

                        {this.renderCard(
                            "Upcoming Webinars",
                            "Join webinars to enhance your veterinary knowledge.",
                            <LiveTv fontSize="large" />,
                            "View Webinars",
                            "assets/images/dashboard/circle.svg",
                            '#4CAF50',
                            'info'
                        )}
                    </Grid>
                </div>
            </Container>
        );
    }

    renderCard(title, description, icon, buttonText, image, bgColor, buttonColor) {
        return (
            <Grid item xs={12} sm={6} md={4} key={title}>
                <Card
                    className="card"
                    variant="outlined"
                    sx={{
                        backgroundColor: bgColor,
                        color: '#fff',
                        boxShadow: 3,
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                    }}
                >
                    <CardContent sx={{ flexGrow: 1, position: 'relative' }}>
                        <CardMedia
                            component="img"
                            alt={title}
                            image={image}
                            sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                opacity: 0.1,
                            }}
                        />
                        <Typography variant="h5" component="div">
                            {icon} {title}
                        </Typography>
                        <Typography variant="body2" sx={{ marginTop: 1 }}>
                            {description}
                        </Typography>
                    </CardContent>
                    <Divider sx={{ marginY: 2 }} />
                    <Button
                        className="view-button"
                        variant="contained"
                        color={buttonColor}
                        size="small"
                        sx={{ marginBottom: 1, alignSelf: 'center' }}
                    >
                        {buttonText}
                    </Button>
                </Card>
            </Grid>
        );
    }
}

export default ResearchPapers;
