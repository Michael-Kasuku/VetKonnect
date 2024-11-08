import React, { Component } from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField as MuiTextField } from '@mui/material';
import { Group } from '@mui/icons-material';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalVets: 12,
            totalFarmers: 50,
            totalAppointments: 35,
            kvbDatabase: [
                { id: 1, name: 'Dr. John Doe', registrationNumber: 'KVB123', status: 'Active' },
                { id: 2, name: 'Dr. Jane Smith', registrationNumber: 'KVB456', status: 'Inactive' },
            ],
            searchQuery: '',
            sortField: '',
            sortDirection: 'asc',
            editDialogOpen: false,
            addDialogOpen: false,
            selectedVet: null,
            name: '',
            registrationNumber: '',
            status: '',
        };
    }

    openAddDialog = () => {
        this.setState({ addDialogOpen: true, name: '', registrationNumber: '', status: '' });
    };

    closeAddDialog = () => {
        this.setState({ addDialogOpen: false });
    };

    openEditDialog = (vet) => {
        this.setState({
            editDialogOpen: true,
            selectedVet: vet,
            name: vet.name,
            registrationNumber: vet.registrationNumber,
            status: vet.status,
        });
    };

    closeEditDialog = () => {
        this.setState({ editDialogOpen: false, selectedVet: null, name: '', registrationNumber: '', status: '' });
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    addVet = () => {
        const { kvbDatabase, name, registrationNumber, status } = this.state;
        const newVet = { id: kvbDatabase.length + 1, name, registrationNumber, status };
        this.setState({ kvbDatabase: [...kvbDatabase, newVet], addDialogOpen: false });
        alert(`New veterinarian added: ${name}`);
    };

    saveChanges = () => {
        const { selectedVet, name, registrationNumber, status, kvbDatabase } = this.state;
        const updatedDatabase = kvbDatabase.map((vet) =>
            vet.id === selectedVet.id ? { ...vet, name, registrationNumber, status } : vet
        );

        this.setState({ kvbDatabase: updatedDatabase, editDialogOpen: false });
        alert(`Changes saved for ${name}`);
    };

    deleteVet = (id) => {
        const updatedDatabase = this.state.kvbDatabase.filter((vet) => vet.id !== id);
        this.setState({ kvbDatabase: updatedDatabase });
        alert(`Veterinarian with ID ${id} deleted`);
    };

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    handleSort = (field) => {
        const { sortField, sortDirection } = this.state;
        const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
        this.setState({ sortField: field, sortDirection: newDirection });
    };

    getFilteredAndSortedVets = () => {
        const { kvbDatabase, searchQuery, sortField, sortDirection } = this.state;

        const filteredVets = kvbDatabase.filter(
            (vet) =>
                vet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                vet.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                vet.status.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (sortField) {
            filteredVets.sort((a, b) => {
                const valueA = a[sortField].toLowerCase();
                const valueB = b[sortField].toLowerCase();
                if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
                if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return filteredVets;
    };

    render() {
        const { totalVets, totalFarmers, totalAppointments, editDialogOpen, addDialogOpen, name, registrationNumber, status, searchQuery, sortField, sortDirection } = this.state;
        const vetsToDisplay = this.getFilteredAndSortedVets();

        return (
            <Container maxWidth="lg" sx={{ padding: 2 }} role="main">
                <Grid container spacing={3} sx={{ marginTop: '20px' }}>
                    <Grid item xs={12} sm={4}>
                        <Card
                            variant="outlined"
                            sx={{
                                padding: 3,
                                backgroundColor: '#4CAF50', // Light green
                                boxShadow: 3, // Subtle shadow for depth
                                borderRadius: 2, // Rounded corners
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.05)', // Hover effect
                                },
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>
                                    Total Veterinarians
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#fff' }}>
                                    {totalVets}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Card
                            variant="outlined"
                            sx={{
                                padding: 3,
                                backgroundColor: '#FFC107', // Amber
                                boxShadow: 3,
                                borderRadius: 2,
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>
                                    Total Farmers
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#fff' }}>
                                    {totalFarmers}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Card
                            variant="outlined"
                            sx={{
                                padding: 3,
                                backgroundColor: '#2196F3', // Blue
                                boxShadow: 3,
                                borderRadius: 2,
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>
                                    Total Appointments
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#fff' }}>
                                    {totalAppointments}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Card variant="outlined" sx={{ marginBottom: 2, padding: 2 }}>
                            <CardContent>
                                <Typography variant="h5" sx={{ marginBottom: 2, display: 'flex', alignItems: 'center' }}>
                                    <Group fontSize="large" sx={{ marginRight: 1 }} /> Kenya Veterinary Board (KVB) Database
                                </Typography>

                                {/* Box to align the search and button */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                                    <TextField
                                        label="Search"
                                        variant="outlined"
                                        value={searchQuery}
                                        onChange={this.handleSearchChange}
                                        sx={{ width: '100%' }}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.openAddDialog}
                                        sx={{ marginLeft: 2 }}
                                    >
                                        Add Veterinarian
                                    </Button>
                                </Box>

                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                {['name', 'registrationNumber', 'status'].map((field) => (
                                                    <TableCell
                                                        key={field}
                                                        onClick={() => this.handleSort(field)}
                                                        style={{ cursor: 'pointer', fontWeight: 'bold' }}
                                                    >
                                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                                        {sortField === field ? (sortDirection === 'asc' ? ' ↑' : ' ↓') : ''}
                                                    </TableCell>
                                                ))}
                                                <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {vetsToDisplay.map((vet) => (
                                                <TableRow key={vet.id}>
                                                    <TableCell>{vet.name}</TableCell>
                                                    <TableCell>{vet.registrationNumber}</TableCell>
                                                    <TableCell>{vet.status}</TableCell>
                                                    <TableCell>
                                                        <Button variant="outlined" onClick={() => this.openEditDialog(vet)}>
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="outlined"
                                                            color="error"
                                                            onClick={() => this.deleteVet(vet.id)}
                                                            sx={{ marginLeft: 1 }}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Edit Dialog */}
                <Dialog open={editDialogOpen} onClose={this.closeEditDialog}>
                    <DialogTitle>Edit Veterinarian</DialogTitle>
                    <DialogContent>
                        <MuiTextField label="Name" variant="outlined" fullWidth name="name" value={name} onChange={this.handleInputChange} sx={{ marginBottom: 2 }} />
                        <MuiTextField label="Registration Number" variant="outlined" fullWidth name="registrationNumber" value={registrationNumber} onChange={this.handleInputChange} sx={{ marginBottom: 2 }} />
                        <MuiTextField label="Status" variant="outlined" fullWidth name="status" value={status} onChange={this.handleInputChange} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeEditDialog} color="primary">Cancel</Button>
                        <Button onClick={this.saveChanges} color="primary">Save Changes</Button>
                    </DialogActions>
                </Dialog>

                {/* Add Dialog */}
                <Dialog open={addDialogOpen} onClose={this.closeAddDialog}>
                    <DialogTitle>Add Veterinarian</DialogTitle>
                    <DialogContent>
                        <MuiTextField label="Name" variant="outlined" fullWidth name="name" value={name} onChange={this.handleInputChange} sx={{ marginBottom: 2 }} />
                        <MuiTextField label="Registration Number" variant="outlined" fullWidth name="registrationNumber" value={registrationNumber} onChange={this.handleInputChange} sx={{ marginBottom: 2 }} />
                        <MuiTextField label="Status" variant="outlined" fullWidth name="status" value={status} onChange={this.handleInputChange} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeAddDialog} color="primary">Cancel</Button>
                        <Button onClick={this.addVet} color="primary">Add Veterinarian</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        );

    }
}

export default Dashboard;
