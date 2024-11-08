import React, { Component } from 'react';
import {
    Container,
    Grid,
    Typography,
    Card,
    Avatar,
    Button,
    Divider,
    IconButton,
    Tabs,
    Tab,
    Box,
    TextField,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    Rating,
} from '@mui/material';
import { Favorite, FavoriteBorder, Schedule } from '@mui/icons-material';

const vetProfiles = [
    { id: 1, name: 'Dr. Josphine Otieno', jobTitle: 'Veterinary Surgeon', profilePic: '/assets/img/team/josphine.jpg' },
    { id: 2, name: 'Dr. Michael Kasuku', jobTitle: 'Animal Nutritionist', profilePic: '/assets/img/team/kasuku.jpg' },
    { id: 3, name: 'Dr. Daisy Lopez', jobTitle: 'Wildlife Specialist', profilePic: '/assets/img/team/lopez.jpg' },
];

class VetProfiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favoriteVets: [],
            selectedTab: 0,
            searchQuery: '',
            sortOrder: 'asc',
            appointmentDialogOpen: false,
            currentVet: null,
            appointmentDetails: { date: '', time: '', notes: '' },
            reviews: {},
            newRating: 0,
            newReview: '',
        };
    }

    toggleFavorite = (vetId) => {
        this.setState((prevState) => {
            const { favoriteVets } = prevState;
            return {
                favoriteVets: favoriteVets.includes(vetId)
                    ? favoriteVets.filter((id) => id !== vetId)
                    : [...favoriteVets, vetId],
            };
        });
    };

    handleSearchChange = (event) => this.setState({ searchQuery: event.target.value });

    handleSortChange = (event) => this.setState({ sortOrder: event.target.value });

    openAppointmentDialog = (vet) => {
        this.setState({ currentVet: vet, appointmentDialogOpen: true });
    };

    closeAppointmentDialog = () => {
        this.setState({
            appointmentDialogOpen: false,
            currentVet: null,
            appointmentDetails: { date: '', time: '', notes: '' },
        });
    };

    handleAppointmentChange = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            appointmentDetails: { ...prevState.appointmentDetails, [name]: value },
        }));
    };

    bookAppointment = () => {
        const { appointmentDetails, currentVet } = this.state;
        if (!appointmentDetails.date || !appointmentDetails.time) return;
        console.log('Appointment booked:', { vet: currentVet.name, ...appointmentDetails });
        this.closeAppointmentDialog();
    };

    handleReviewSubmit = () => {
        const { currentVet, reviews, newRating, newReview } = this.state;
        if (!currentVet) return;
        const vetId = currentVet.id;
        const updatedReviews = {
            ...reviews,
            [vetId]: [...(reviews[vetId] || []), { rating: newRating, review: newReview }],
        };
        this.setState({
            reviews: updatedReviews,
            newRating: 0,
            newReview: '',
        });
    };

    filterAndSortVets = (vets) => {
        const { searchQuery, sortOrder } = this.state;
        const filteredVets = vets.filter((vet) =>
            vet.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return filteredVets.sort((a, b) =>
            sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        );
    };

    render() {
        const {
            favoriteVets,
            selectedTab,
            appointmentDialogOpen,
            currentVet,
            appointmentDetails,
            newRating,
            newReview,
            reviews,
        } = this.state;

        const displayedVets = this.filterAndSortVets(vetProfiles);

        return (
            <Container maxWidth="lg" sx={{ padding: 2, marginTop: '20px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        onChange={this.handleSearchChange}
                    />
                    <TextField
                        select
                        label="Sort"
                        value={this.state.sortOrder}
                        onChange={this.handleSortChange}
                        size="small"
                    >
                        <MenuItem value="asc">Ascending</MenuItem>
                        <MenuItem value="desc">Descending</MenuItem>
                    </TextField>
                </Box>

                <Tabs
                    value={selectedTab}
                    onChange={(event, newValue) => this.setState({ selectedTab: newValue })}
                    centered
                    sx={{ marginBottom: 2 }}
                >
                    <Tab label="All Vets" />
                    <Tab label={`Favorites (${favoriteVets.length})`} />
                </Tabs>

                {selectedTab === 0 && (
                    <VetGrid
                        vets={displayedVets}
                        toggleFavorite={this.toggleFavorite}
                        openAppointmentDialog={this.openAppointmentDialog}
                        favoriteVets={favoriteVets}
                        setCurrentVet={(vet) => this.setState({ currentVet: vet })}
                        reviews={reviews}
                        setReviews={(reviews) => this.setState({ reviews })}
                        setNewRating={(rating) => this.setState({ newRating: rating })}
                        setNewReview={(review) => this.setState({ newReview: review })}
                    />
                )}

                {selectedTab === 1 && (
                    <VetGrid
                        vets={displayedVets.filter((vet) => favoriteVets.includes(vet.id))}
                        toggleFavorite={this.toggleFavorite}
                        openAppointmentDialog={this.openAppointmentDialog}
                        favoriteVets={favoriteVets}
                        setCurrentVet={(vet) => this.setState({ currentVet: vet })}
                        reviews={reviews}
                        setReviews={(reviews) => this.setState({ reviews })}
                        setNewRating={(rating) => this.setState({ newRating: rating })}
                        setNewReview={(review) => this.setState({ newReview: review })}
                    />
                )}

                <AppointmentDialog
                    open={appointmentDialogOpen}
                    vet={currentVet}
                    appointmentDetails={appointmentDetails}
                    onClose={this.closeAppointmentDialog}
                    onInputChange={this.handleAppointmentChange}
                    onBook={this.bookAppointment}
                />

                <ReviewDialog
                    open={Boolean(currentVet)}
                    vet={currentVet}
                    reviews={reviews}
                    newRating={newRating}
                    newReview={newReview}
                    setNewRating={(rating) => this.setState({ newRating: rating })}
                    setNewReview={(review) => this.setState({ newReview: review })}
                    onSubmit={this.handleReviewSubmit}
                    onClose={() => this.setState({ currentVet: null })}
                />
            </Container>
        );
    }
}

const VetGrid = ({ vets, toggleFavorite, openAppointmentDialog, favoriteVets, setCurrentVet, reviews, setReviews, setNewRating, setNewReview }) => (
    <Grid container spacing={3}>
        {vets.map((vet) => (
            <Grid item xs={12} sm={6} md={4} key={vet.id}>
                <VetCard
                    vet={vet}
                    isFavorite={favoriteVets.includes(vet.id)}
                    toggleFavorite={toggleFavorite}
                    openAppointmentDialog={openAppointmentDialog}
                    setCurrentVet={setCurrentVet}
                />
            </Grid>
        ))}
    </Grid>
);

const VetCard = ({ vet, isFavorite, toggleFavorite, openAppointmentDialog, setCurrentVet }) => (
    <Card
        sx={{
            boxShadow: 3,
            borderRadius: 2,
            padding: 2,
            textAlign: 'center',
            '&:hover': { boxShadow: '0 8px 16px rgba(0,0,0,0.2)' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <Avatar src={vet.profilePic} sx={{ width: 56, height: 56, marginBottom: 2 }} />
        <Typography variant="h6" gutterBottom>{vet.name}</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>{vet.jobTitle}</Typography>
        <Divider sx={{ width: '100%', marginBottom: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
            <IconButton color={isFavorite ? 'secondary' : 'default'} onClick={() => toggleFavorite(vet.id)}>
                {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            <IconButton onClick={() => { setCurrentVet(vet); openAppointmentDialog(vet); }}>
                <Schedule />
            </IconButton>
        </Box>
    </Card>
);

const AppointmentDialog = ({ open, vet, appointmentDetails, onClose, onInputChange, onBook }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Book Appointment with {vet?.name}</DialogTitle>
        <DialogContent>
            <TextField
                label="Date"
                type="date"
                value={appointmentDetails.date}
                name="date"
                onChange={onInputChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                label="Time"
                type="time"
                value={appointmentDetails.time}
                name="time"
                onChange={onInputChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                label="Notes"
                value={appointmentDetails.notes}
                name="notes"
                onChange={onInputChange}
                fullWidth
                margin="normal"
                multiline
                rows={4}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="primary">Cancel</Button>
            <Button onClick={onBook} color="primary">Book Appointment</Button>
        </DialogActions>
    </Dialog>
);

const ReviewDialog = ({ open, vet, reviews, newRating, newReview, setNewRating, setNewReview, onSubmit, onClose }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Review {vet?.name}</DialogTitle>
        <DialogContent>
            <Rating
                name="rating"
                value={newRating}
                onChange={(_, value) => setNewRating(value)}
                sx={{ marginBottom: 2 }}
            />
            <TextField
                label="Review"
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={4}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="primary">Cancel</Button>
            <Button onClick={onSubmit} color="primary">Submit</Button>
        </DialogActions>
    </Dialog>
);

export default VetProfiles;
