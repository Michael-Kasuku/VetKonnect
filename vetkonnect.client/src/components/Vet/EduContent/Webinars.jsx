import React, { Component } from 'react';
import {
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
    Button,
    Divider,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Snackbar,
    Alert,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faShare, faVideo } from '@fortawesome/free-solid-svg-icons';

class Webinars extends Component {
    state = {
        webinars: [],
        newWebinarOpen: false,
        newWebinarTitle: '',
        newWebinarDate: '',
        newWebinarLink: '',
        snackbarOpen: false,
        snackbarMessage: '',
        searchQuery: '', // New state for search input
        sortBy: 'date', // New state for sorting
    };

    componentDidMount() {
        this.fetchWebinars(); // Fetch existing webinars
    }

    fetchWebinars() {
        // Simulate fetching webinars from an API
        const webinars = [
            {
                id: 1,
                title: 'Understanding Canine Behavior',
                date: '2024-10-20',
                link: 'https://example.com/vet-webinar1',
            },
            {
                id: 2,
                title: 'Essential Vaccinations for Pets',
                date: '2024-10-25',
                link: 'https://example.com/vet-webinar2',
            },
            {
                id: 3,
                title: 'Nutrition Tips for Felines',
                date: '2024-11-02',
                link: 'https://example.com/vet-webinar3',
            },
        ];
        this.setState({ webinars });
    }

    handleOpenNewWebinar = () => {
        this.setState({ newWebinarOpen: true });
    };

    handleCloseNewWebinar = () => {
        this.setState({ newWebinarOpen: false });
    };

    handleCreateWebinar = () => {
        const { newWebinarTitle, newWebinarDate, newWebinarLink, webinars } = this.state;

        // Check if title, date, and link are provided
        if (!newWebinarTitle || !newWebinarDate || !newWebinarLink) {
            this.setState({
                snackbarOpen: true,
                snackbarMessage: 'All fields are required.',
            });
            return;
        }

        const newWebinar = {
            id: webinars.length + 1,
            title: newWebinarTitle,
            date: newWebinarDate,
            link: newWebinarLink,
        };

        this.setState({
            webinars: [...webinars, newWebinar],
            newWebinarTitle: '',
            newWebinarDate: '',
            newWebinarLink: '',
            newWebinarOpen: false,
            snackbarOpen: true,
            snackbarMessage: 'Webinar created successfully!',
        });
    };

    handleShareLink = (link) => {
        navigator.clipboard.writeText(link);
        this.setState({
            snackbarOpen: true,
            snackbarMessage: 'Link copied to clipboard!',
        });
    };

    handleCloseSnackbar = () => {
        this.setState({ snackbarOpen: false });
    };

    handleSearchChange = (e) => {
        this.setState({ searchQuery: e.target.value });
    };

    handleSortChange = (e) => {
        this.setState({ sortBy: e.target.value });
    };

    getFilteredAndSortedWebinars = () => {
        const { webinars, searchQuery, sortBy } = this.state;

        // Filter webinars based on search query
        const filteredWebinars = webinars.filter((webinar) =>
            webinar.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // Sort webinars based on the selected sort criteria
        return filteredWebinars.sort((a, b) => {
            if (sortBy === 'date') {
                return new Date(a.date) - new Date(b.date);
            } else {
                return a.title.localeCompare(b.title);
            }
        });
    };

    render() {
        const { newWebinarOpen, searchQuery, sortBy } = this.state;
        const sortedWebinars = this.getFilteredAndSortedWebinars();

        return (
            <Container maxWidth="lg" style={{ padding: '32px' }}>
                {/* Create New Webinar Button */}
                <Grid container justifyContent="flex-end">
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<FontAwesomeIcon icon={faPlus} />}
                        onClick={this.handleOpenNewWebinar}
                        style={{
                            marginBottom: '16px',
                            borderRadius: '20px',
                            padding: '10px 20px',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0056b3'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#3f51b5'; }}
                    >
                        Create New Webinar
                    </Button>
                </Grid>

                {/* Search Bar and Sort Options */}
                <Grid container spacing={2} alignItems="center" style={{ marginBottom: '16px' }}>
                    <Grid item xs>
                        <TextField
                            label="Search Webinars"
                            variant="outlined"
                            fullWidth
                            value={searchQuery}
                            onChange={this.handleSearchChange}
                        />
                    </Grid>
                    <Grid item>
                        <FormControl variant="outlined" style={{ minWidth: 120 }}>
                            <InputLabel>Sort By</InputLabel>
                            <Select
                                value={sortBy}
                                onChange={this.handleSortChange}
                                label="Sort By"
                            >
                                <MenuItem value="date">Date</MenuItem>
                                <MenuItem value="title">Title</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                {/* Upcoming Webinars */}
                <Typography variant="h4" component="h2" gutterBottom align="center" style={{ fontWeight: 'bold', marginBottom: '20px' }}>
                    Upcoming Veterinary Webinars
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    {sortedWebinars.map((webinar) => (
                        <Grid item xs={12} sm={6} md={4} key={webinar.id}>
                            <Card variant="outlined" style={{ borderRadius: '10px', height: '100%', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
                                <CardContent>
                                    <Typography variant="h5" component="div" gutterBottom>
                                        {webinar.title}
                                    </Typography>
                                    <Typography variant="body2" style={{ marginBottom: '8px', fontStyle: 'italic' }}>
                                        Date: {new Date(webinar.date).toLocaleDateString()}
                                    </Typography>
                                    <Divider style={{ margin: '16px 0' }} />
                                    <Grid container justifyContent="space-between">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<FontAwesomeIcon icon={faVideo} />}
                                            href={webinar.link}
                                            target="_blank"
                                            style={{ marginRight: '8px' }}
                                        >
                                            Join Webinar
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            startIcon={<FontAwesomeIcon icon={faShare} />}
                                            onClick={() => this.handleShareLink(webinar.link)}
                                        >
                                            Share Link
                                        </Button>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Create New Webinar Dialog */}
                <Dialog open={newWebinarOpen} onClose={this.handleCloseNewWebinar}>
                    <DialogTitle>Create New Veterinary Webinar</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Webinar Title"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={this.state.newWebinarTitle}
                            onChange={(e) => this.setState({ newWebinarTitle: e.target.value })}
                            style={{ marginBottom: '16px' }}
                        />
                        <TextField
                            margin="dense"
                            label="Webinar Date"
                            type="date"
                            fullWidth
                            variant="outlined"
                            value={this.state.newWebinarDate}
                            onChange={(e) => this.setState({ newWebinarDate: e.target.value })}
                            style={{ marginBottom: '16px' }}
                        />
                        <TextField
                            margin="dense"
                            label="Webinar Link"
                            type="url"
                            fullWidth
                            variant="outlined"
                            value={this.state.newWebinarLink}
                            onChange={(e) => this.setState({ newWebinarLink: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseNewWebinar} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleCreateWebinar} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Snackbar for notifications */}
                <Snackbar open={this.state.snackbarOpen} autoHideDuration={6000} onClose={this.handleCloseSnackbar}>
                    <Alert onClose={this.handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                        {this.state.snackbarMessage}
                    </Alert>
                </Snackbar>
            </Container>
        );
    }
}

export default Webinars;
