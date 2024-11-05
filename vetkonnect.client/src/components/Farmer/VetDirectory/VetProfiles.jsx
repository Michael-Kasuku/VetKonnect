import React, { useState } from 'react';
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

const VetProfiles = () => {
    const [favoriteVets, setFavoriteVets] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);
    const [currentVet, setCurrentVet] = useState(null);
    const [appointmentDetails, setAppointmentDetails] = useState({ date: '', time: '', notes: '' });
    const [reviews, setReviews] = useState({});
    const [newRating, setNewRating] = useState(0);
    const [newReview, setNewReview] = useState('');

    const toggleFavorite = (vetId) => {
        setFavoriteVets((prev) =>
            prev.includes(vetId) ? prev.filter((id) => id !== vetId) : [...prev, vetId]
        );
    };

    const handleSearchChange = (event) => setSearchQuery(event.target.value);
    const handleSortChange = (event) => setSortOrder(event.target.value);

    const openAppointmentDialog = (vet) => {
        setCurrentVet(vet);
        setAppointmentDialogOpen(true);
    };

    const closeAppointmentDialog = () => {
        setAppointmentDialogOpen(false);
        setCurrentVet(null);
        setAppointmentDetails({ date: '', time: '', notes: '' });
    };

    const handleAppointmentChange = (event) => {
        const { name, value } = event.target;
        setAppointmentDetails((prev) => ({ ...prev, [name]: value }));
    };

    const bookAppointment = () => {
        if (!appointmentDetails.date || !appointmentDetails.time) return;
        console.log('Appointment booked:', { vet: currentVet.name, ...appointmentDetails });
        closeAppointmentDialog();
    };

    const handleReviewSubmit = () => {
        if (!currentVet) return;
        const vetId = currentVet.id;
        const updatedReviews = {
            ...reviews,
            [vetId]: [...(reviews[vetId] || []), { rating: newRating, review: newReview }],
        };
        setReviews(updatedReviews);
        setNewRating(0);
        setNewReview('');
    };

    const filterAndSortVets = (vets) => {
        const filteredVets = vets.filter((vet) => vet.name.toLowerCase().includes(searchQuery.toLowerCase()));
        return filteredVets.sort((a, b) =>
            sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        );
    };

    const displayedVets = filterAndSortVets(vetProfiles);

    return (
        <Container maxWidth="lg" sx={{ padding: 2, marginTop: '20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    onChange={handleSearchChange}
                />
                <TextField
                    select
                    label="Sort"
                    value={sortOrder}
                    onChange={handleSortChange}
                    size="small"
                >
                    <MenuItem value="asc">Ascending</MenuItem>
                    <MenuItem value="desc">Descending</MenuItem>
                </TextField>
            </Box>

            <Tabs
                value={selectedTab}
                onChange={(event, newValue) => setSelectedTab(newValue)}
                centered
                sx={{ marginBottom: 2 }}
            >
                <Tab label="All Vets" />
                <Tab label={`Favorites (${favoriteVets.length})`} />
            </Tabs>

            {selectedTab === 0 && (
                <VetGrid
                    vets={displayedVets}
                    toggleFavorite={toggleFavorite}
                    openAppointmentDialog={openAppointmentDialog}
                    favoriteVets={favoriteVets}
                    setCurrentVet={setCurrentVet}
                    reviews={reviews}
                    setReviews={setReviews}
                    setNewRating={setNewRating}
                    setNewReview={setNewReview}
                />
            )}

            {selectedTab === 1 && (
                <VetGrid
                    vets={displayedVets.filter((vet) => favoriteVets.includes(vet.id))}
                    toggleFavorite={toggleFavorite}
                    openAppointmentDialog={openAppointmentDialog}
                    favoriteVets={favoriteVets}
                    setCurrentVet={setCurrentVet}
                    reviews={reviews}
                    setReviews={setReviews}
                    setNewRating={setNewRating}
                    setNewReview={setNewReview}
                />
            )}

            <AppointmentDialog
                open={appointmentDialogOpen}
                vet={currentVet}
                appointmentDetails={appointmentDetails}
                onClose={closeAppointmentDialog}
                onInputChange={handleAppointmentChange}
                onBook={bookAppointment}
            />

            <ReviewDialog
                open={Boolean(currentVet)}
                vet={currentVet}
                reviews={reviews}
                newRating={newRating}
                newReview={newReview}
                setNewRating={setNewRating}
                setNewReview={setNewReview}
                onSubmit={handleReviewSubmit}
                onClose={() => setCurrentVet(null)}
            />
        </Container>
    );
};

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
        <DialogTitle>{vet ? `Book Appointment with ${vet.name}` : 'Appointment'}</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                label="Date"
                type="date"
                fullWidth
                variant="standard"
                name="date"
                value={appointmentDetails.date}
                onChange={onInputChange}
            />
            <TextField
                margin="dense"
                label="Time"
                type="time"
                fullWidth
                variant="standard"
                name="time"
                value={appointmentDetails.time}
                onChange={onInputChange}
            />
            <TextField
                margin="dense"
                label="Notes"
                fullWidth
                variant="standard"
                name="notes"
                value={appointmentDetails.notes}
                onChange={onInputChange}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onBook}>Book</Button>
        </DialogActions>
    </Dialog>
);

const ReviewDialog = ({ open, vet, reviews, newRating, newReview, setNewRating, setNewReview, onSubmit, onClose }) => {
    if (!vet) return null;
    const vetReviews = reviews[vet.id] || [];
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{`Reviews for ${vet.name}`}</DialogTitle>
            <DialogContent>
                <List>
                    {vetReviews.map((review, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Rating value={review.rating} readOnly />
                                        <Typography variant="body2" sx={{ marginLeft: 1 }}>
                                            {review.review}
                                        </Typography>
                                    </Box>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
                <Box sx={{ marginTop: 2 }}>
                    <Rating
                        value={newRating}
                        onChange={(event, newValue) => setNewRating(newValue)}
                    />
                    <TextField
                        margin="dense"
                        label="New Review"
                        fullWidth
                        variant="standard"
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                    />
                    <Button onClick={onSubmit} sx={{ marginTop: 1 }}>
                        Submit Review
                    </Button>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default VetProfiles;
