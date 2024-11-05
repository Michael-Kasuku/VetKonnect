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
import { Favorite, FavoriteBorder, Schedule, Delete, Block } from '@mui/icons-material';

const vetProfiles = [
    { id: 1, name: 'Dr. Josphine Otieno', jobTitle: 'Veterinary Surgeon', profilePic: '/assets/img/team/josphine.jpg', suspended: false },
    { id: 2, name: 'Dr. Michael Kasuku', jobTitle: 'Animal Nutritionist', profilePic: '/assets/img/team/kasuku.jpg', suspended: false },
    { id: 3, name: 'Dr. Daisy Lopez', jobTitle: 'Wildlife Specialist', profilePic: '/assets/img/team/lopez.jpg', suspended: false },
];

const VetProfiles = () => {
    const [favoriteVets, setFavoriteVets] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);
    const [currentVet, setCurrentVet] = useState(null);
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null); // Stores the action type ('delete' or 'suspend')

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
    };

    // Opens the confirmation dialog for delete or suspend actions
    const openConfirmationDialog = (vet, action) => {
        setCurrentVet(vet);
        setConfirmAction(action);
        setConfirmationDialogOpen(true);
    };

    const closeConfirmationDialog = () => {
        setConfirmationDialogOpen(false);
        setCurrentVet(null);
        setConfirmAction(null);
    };

    const handleConfirmAction = () => {
        if (confirmAction === 'delete') {
            deleteVet(currentVet.id);
        } else if (confirmAction === 'suspend') {
            suspendVet(currentVet.id);
        }
        closeConfirmationDialog();
    };

    const deleteVet = (vetId) => {
        console.log(`Vet with ID ${vetId} deleted.`);
        // Add logic to remove the vet from the list or update database
    };

    const suspendVet = (vetId) => {
        console.log(`Vet with ID ${vetId} suspended.`);
        // Add logic to update the vet's suspended status in the list or database
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

            <VetGrid
                vets={displayedVets}
                toggleFavorite={toggleFavorite}
                openAppointmentDialog={openAppointmentDialog}
                openConfirmationDialog={openConfirmationDialog} // Admin actions
                favoriteVets={favoriteVets}
            />

            <ConfirmationDialog
                open={confirmationDialogOpen}
                vet={currentVet}
                action={confirmAction}
                onClose={closeConfirmationDialog}
                onConfirm={handleConfirmAction}
            />
        </Container>
    );
};

const VetGrid = ({ vets, toggleFavorite, openAppointmentDialog, openConfirmationDialog, favoriteVets }) => (
    <Grid container spacing={3}>
        {vets.map((vet) => (
            <Grid item xs={12} sm={6} md={4} key={vet.id}>
                <VetCard
                    vet={vet}
                    isFavorite={favoriteVets.includes(vet.id)}
                    toggleFavorite={toggleFavorite}
                    openAppointmentDialog={openAppointmentDialog}
                    openConfirmationDialog={openConfirmationDialog} // Pass Admin actions
                />
            </Grid>
        ))}
    </Grid>
);

const VetCard = ({ vet, isFavorite, toggleFavorite, openAppointmentDialog, openConfirmationDialog }) => (
    <Card
        sx={{
            boxShadow: 3,
            borderRadius: 2,
            padding: 2,
            textAlign: 'center',
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
            <IconButton onClick={() => openAppointmentDialog(vet)}>
                <Schedule />
            </IconButton>
            {/* Admin controls for delete and suspend */}
            <IconButton color="error" onClick={() => openConfirmationDialog(vet, 'delete')}>
                <Delete />
            </IconButton>
            <IconButton color="warning" onClick={() => openConfirmationDialog(vet, 'suspend')}>
                <Block />
            </IconButton>
        </Box>
    </Card>
);

const ConfirmationDialog = ({ open, vet, action, onClose, onConfirm }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>
            {action === 'delete' ? `Delete Vet` : `Suspend Vet`}
        </DialogTitle>
        <DialogContent>
            <Typography>
                {`Are you sure you want to ${action} ${vet?.name}? This action cannot be undone.`}
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onConfirm} color="primary">
                Confirm
            </Button>
        </DialogActions>
    </Dialog>
);

export default VetProfiles;
