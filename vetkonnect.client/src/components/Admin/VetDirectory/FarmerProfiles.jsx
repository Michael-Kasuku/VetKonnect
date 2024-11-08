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
    Snackbar,
    Alert,
    Tooltip,
    CardContent
} from '@mui/material';
import { Favorite, FavoriteBorder, Schedule, Delete, Block, AddCircle, Visibility, Edit } from '@mui/icons-material';

// Mock data for farmer profiles
const farmerProfiles = [
    { id: 1, name: 'John Doe', farmType: 'Dairy Farm', profilePic: '/assets/img/team/josphine.jpg', suspended: false, experience: '5 years', contact: 'johndoe@gmail.com' },
    { id: 2, name: 'Jane Smith', farmType: 'Crop Farm', profilePic: '/assets/img/team/kasuku.jpg', suspended: false, experience: '8 years', contact: 'janesmith@gmail.com' },
    { id: 3, name: 'Samuel Kibet', farmType: 'Poultry Farm', profilePic: '/assets/img/team/lopez.jpg', suspended: false, experience: '3 years', contact: 'samuelkibet@gmail.com' },
];

const FarmerProfiles = () => {
    const [favoriteFarmers, setFavoriteFarmers] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);
    const [currentFarmer, setCurrentFarmer] = useState(null);
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [newFarmerDialogOpen, setNewFarmerDialogOpen] = useState(false);
    const [newFarmerDetails, setNewFarmerDetails] = useState({ name: '', farmType: '', profilePic: '' });
    const [profileDialogOpen, setProfileDialogOpen] = useState(false);
    const [editFarmerDialogOpen, setEditFarmerDialogOpen] = useState(false);  // New state for edit dialog

    const toggleFavorite = (farmerId) => {
        setFavoriteFarmers(prev =>
            prev.includes(farmerId) ? prev.filter(id => id !== farmerId) : [...prev, farmerId]
        );
        setSnackbarMessage('Farmer updated to favorites!');
        setSnackbarOpen(true);
    };

    const handleSearchChange = (event) => setSearchQuery(event.target.value);
    const handleSortChange = (event) => setSortOrder(event.target.value);

    const openAppointmentDialog = (farmer) => {
        setCurrentFarmer(farmer);
        setAppointmentDialogOpen(true);
    };

    const closeAppointmentDialog = () => {
        setAppointmentDialogOpen(false);
        setCurrentFarmer(null);
    };

    const openConfirmationDialog = (farmer, action) => {
        setCurrentFarmer(farmer);
        setConfirmAction(action);
        setConfirmationDialogOpen(true);
    };

    const closeConfirmationDialog = () => {
        setConfirmationDialogOpen(false);
        setCurrentFarmer(null);
        setConfirmAction(null);
    };

    const handleConfirmAction = () => {
        if (confirmAction === 'delete') {
            deleteFarmer(currentFarmer.id);
        } else if (confirmAction === 'suspend') {
            suspendFarmer(currentFarmer.id);
        }
        closeConfirmationDialog();
    };

    const deleteFarmer = (farmerId) => {
        console.log(`Farmer with ID ${farmerId} deleted.`);
        setSnackbarMessage('Farmer deleted successfully.');
        setSnackbarOpen(true);
    };

    const suspendFarmer = (farmerId) => {
        console.log(`Farmer with ID ${farmerId} suspended.`);
        setSnackbarMessage('Farmer suspended.');
        setSnackbarOpen(true);
    };

    const handleNewFarmerSubmit = () => {
        const newFarmer = { ...newFarmerDetails, id: farmerProfiles.length + 1, suspended: false };
        farmerProfiles.push(newFarmer);
        setSnackbarMessage('New farmer added successfully.');
        setSnackbarOpen(true);
        setNewFarmerDialogOpen(false);
        setNewFarmerDetails({ name: '', farmType: '', profilePic: '' });
    };

    const handleViewProfile = (farmer) => {
        setCurrentFarmer(farmer);
        setProfileDialogOpen(true);
    };

    const closeProfileDialog = () => setProfileDialogOpen(false);

    const handleEditFarmer = (farmer) => {
        setCurrentFarmer(farmer);
        setEditFarmerDialogOpen(true);  // Open edit dialog
    };

    const closeEditFarmerDialog = () => setEditFarmerDialogOpen(false);

    const handleEditFarmerSubmit = () => {
        const updatedFarmer = { ...currentFarmer };
        const index = farmerProfiles.findIndex(farmer => farmer.id === currentFarmer.id);
        if (index !== -1) {
            farmerProfiles[index] = updatedFarmer;
            setSnackbarMessage('Farmer details updated successfully.');
            setSnackbarOpen(true);
            setEditFarmerDialogOpen(false);
        }
    };

    const filterAndSortFarmers = (farmers) => {
        const filteredFarmers = farmers.filter(farmer =>
            farmer.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return filteredFarmers.sort((a, b) =>
            sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        );
    };

    const displayedFarmers = selectedTab === 0
        ? filterAndSortFarmers(farmerProfiles)
        : filterAndSortFarmers(farmerProfiles.filter(farmer => favoriteFarmers.includes(farmer.id)));

    return (
        <Container maxWidth="lg" sx={{ padding: 3, marginTop: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Box sx={{ display: 'flex', width: '45%' }}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        onChange={handleSearchChange}
                        sx={{ width: '100%' }}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        select
                        label="Sort"
                        value={sortOrder}
                        onChange={handleSortChange}
                        size="small"
                        sx={{ width: '150px', marginRight: 2 }}
                    >
                        <MenuItem value="asc">Ascending</MenuItem>
                        <MenuItem value="desc">Descending</MenuItem>
                    </TextField>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setNewFarmerDialogOpen(true)}
                        startIcon={<AddCircle />}
                    >
                        Add New Farmer
                    </Button>
                </Box>
            </Box>

            <Tabs value={selectedTab} onChange={(event, newValue) => setSelectedTab(newValue)} centered sx={{ marginBottom: 2 }}>
                <Tab label="All Farmers" />
                <Tab label={`Favorites (${favoriteFarmers.length})`} />
            </Tabs>

            <FarmerGrid
                farmers={displayedFarmers}
                toggleFavorite={toggleFavorite}
                openAppointmentDialog={openAppointmentDialog}
                openConfirmationDialog={openConfirmationDialog}
                favoriteFarmers={favoriteFarmers}
                handleViewProfile={handleViewProfile}
                handleEditFarmer={handleEditFarmer}  // Pass the edit handler to FarmerCard
            />

            <ConfirmationDialog
                open={confirmationDialogOpen}
                farmer={currentFarmer}
                action={confirmAction}
                onClose={closeConfirmationDialog}
                onConfirm={handleConfirmAction}
            />

            <NewFarmerDialog
                open={newFarmerDialogOpen}
                onClose={() => setNewFarmerDialogOpen(false)}
                onSubmit={handleNewFarmerSubmit}
                newFarmerDetails={newFarmerDetails}
                setNewFarmerDetails={setNewFarmerDetails}
            />

            <FarmerProfileDialog
                open={profileDialogOpen}
                farmer={currentFarmer}
                onClose={closeProfileDialog}
            />

            <EditFarmerDialog
                open={editFarmerDialogOpen}
                farmer={currentFarmer}
                onClose={closeEditFarmerDialog}
                onSubmit={handleEditFarmerSubmit}
            />

            <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

const FarmerGrid = ({
    farmers,
    toggleFavorite,
    openAppointmentDialog,
    openConfirmationDialog,
    favoriteFarmers,
    handleViewProfile,
    handleEditFarmer
}) => (
    <Grid container spacing={2}>
        {farmers.map((farmer) => (
            <Grid item xs={12} sm={6} md={4} key={farmer.id}>
                <Card sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 8
                    },
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0'
                }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <Avatar
                            alt={farmer.name}
                            src={farmer.profilePic}
                            sx={{ width: 90, height: 90, marginBottom: 2, border: '3px solid #1976d2' }}
                        />
                        <Typography variant="h6" sx={{ fontWeight: '600', marginBottom: 1 }}>
                            {farmer.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 0.5 }}>
                            {farmer.farmType}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                            {farmer.experience} years of experience
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, marginTop: 1 }}>
                            <Tooltip title="View Profile">
                                <IconButton onClick={() => handleViewProfile(farmer)} sx={{ color: '#1976d2', transition: 'color 0.3s' }}>
                                    <Visibility />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Schedule Appointment">
                                <IconButton onClick={() => openAppointmentDialog(farmer)} sx={{ color: '#1976d2', transition: 'color 0.3s' }}>
                                    <Schedule />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={favoriteFarmers.includes(farmer.id) ? "Remove from Favorites" : "Add to Favorites"}>
                                <IconButton onClick={() => toggleFavorite(farmer.id)} sx={{ color: '#d32f2f', transition: 'color 0.3s' }}>
                                    {favoriteFarmers.includes(farmer.id) ? <Favorite /> : <FavoriteBorder />}
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                                <IconButton onClick={() => handleEditFarmer(farmer)} sx={{ color: '#4caf50', transition: 'color 0.3s' }}>
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <IconButton onClick={() => openConfirmationDialog(farmer, 'delete')} sx={{ color: '#f44336', transition: 'color 0.3s' }}>
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={farmer.suspended ? "Activate" : "Suspend"}>
                                <IconButton onClick={() => openConfirmationDialog(farmer, 'suspend')} sx={{ color: farmer.suspended ? '#1976d2' : '#ff9800', transition: 'color 0.3s' }}>
                                    {farmer.suspended ? <Block /> : <Schedule />}
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        ))}
    </Grid>
);

const ConfirmationDialog = ({ open, farmer, action, onClose, onConfirm }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirm {action === 'delete' ? 'Delete' : 'Suspend'}</DialogTitle>
        <DialogContent>
            <Typography variant="body1">
                Are you sure you want to {action} this farmer: {farmer?.name}?
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onConfirm} color="primary">{action === 'delete' ? 'Delete' : 'Suspend'}</Button>
        </DialogActions>
    </Dialog>
);

const NewFarmerDialog = ({ open, onClose, onSubmit, newFarmerDetails, setNewFarmerDetails }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add New Farmer</DialogTitle>
        <DialogContent>
            <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={newFarmerDetails.name}
                onChange={(e) => setNewFarmerDetails({ ...newFarmerDetails, name: e.target.value })}
                sx={{ marginBottom: 2 }}
            />
            <TextField
                label="Farm Type"
                variant="outlined"
                fullWidth
                value={newFarmerDetails.farmType}
                onChange={(e) => setNewFarmerDetails({ ...newFarmerDetails, farmType: e.target.value })}
                sx={{ marginBottom: 2 }}
            />
            <TextField
                label="Profile Picture URL"
                variant="outlined"
                fullWidth
                value={newFarmerDetails.profilePic}
                onChange={(e) => setNewFarmerDetails({ ...newFarmerDetails, profilePic: e.target.value })}
                sx={{ marginBottom: 2 }}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onSubmit} color="primary">Add Farmer</Button>
        </DialogActions>
    </Dialog>
);

const FarmerProfileDialog = ({ open, farmer, onClose }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>{farmer?.name}'s Profile</DialogTitle>
        <DialogContent>
            <Typography variant="body1">Farm Type: {farmer?.farmType}</Typography>
            <Typography variant="body1">Experience: {farmer?.experience}</Typography>
            <Typography variant="body1">Contact: {farmer?.contact}</Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Close</Button>
        </DialogActions>
    </Dialog>
);

const EditFarmerDialog = ({ open, farmer, onClose, onSubmit }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit Farmer Details</DialogTitle>
        <DialogContent>
            <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={farmer?.name}
                onChange={(e) => setCurrentFarmer({ ...farmer, name: e.target.value })}
                sx={{ marginBottom: 2 }}
            />
            <TextField
                label="Farm Type"
                variant="outlined"
                fullWidth
                value={farmer?.farmType}
                onChange={(e) => setCurrentFarmer({ ...farmer, farmType: e.target.value })}
                sx={{ marginBottom: 2 }}
            />
            <TextField
                label="Profile Picture URL"
                variant="outlined"
                fullWidth
                value={farmer?.profilePic}
                onChange={(e) => setCurrentFarmer({ ...farmer, profilePic: e.target.value })}
                sx={{ marginBottom: 2 }}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onSubmit} color="primary">Save Changes</Button>
        </DialogActions>
    </Dialog>
);

export default FarmerProfiles;
