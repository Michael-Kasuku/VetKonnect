import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    IconButton,
    Modal,
    Box,
} from '@mui/material';
import { Pets } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';

class AppointmentHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointmentHistory: [
                { id: 1, dateTime: '2024-09-20 10:00 AM', client: 'Michael Kasuku', venue: 'Vet Clinic A', status: 'Completed' },
                { id: 2, dateTime: '2024-09-21 11:00 AM', client: 'Daisy Lopez', venue: 'Vet Clinic B', status: 'Completed' },
                { id: 3, dateTime: '2024-09-22 09:30 AM', client: 'Josephine Otieno', venue: 'Vet Clinic C', status: 'Missed' },
            ],
            searchQuery: '',
            sortDirection: 'asc',
            selectedAppointment: null,
            modalOpen: false,
        };
    }

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    handleSort = (key) => {
        const { sortDirection, appointmentHistory } = this.state;
        const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        const sortedAppointments = [...appointmentHistory].sort((a, b) => {
            if (newSortDirection === 'asc') {
                return a[key] > b[key] ? 1 : -1;
            } else {
                return a[key] < b[key] ? 1 : -1;
            }
        });
        this.setState({ appointmentHistory: sortedAppointments, sortDirection: newSortDirection });
    };

    handleOpenModal = (appointment) => {
        this.setState({ selectedAppointment: appointment, modalOpen: true });
    };

    handleCloseModal = () => {
        this.setState({ modalOpen: false, selectedAppointment: null });
    };

    handleDeleteAppointment = (id) => {
        this.setState(prevState => ({
            appointmentHistory: prevState.appointmentHistory.filter(appointment => appointment.id !== id)
        }));
    };

    render() {
        const { appointmentHistory, searchQuery, modalOpen, selectedAppointment } = this.state;

        // Filter appointment history based on search query
        const filteredAppointments = appointmentHistory.filter(appointment =>
            Object.values(appointment).some(value =>
                value.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
        );

        return (
            <Container maxWidth="lg" sx={{ padding: 2, height: '100vh', overflowY: 'auto' }} role="main">
                <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                    <Grid item xs={12}>
                        <Card variant="outlined" sx={{ marginBottom: 2 }}>
                            <CardContent>
                                <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                                    <Pets fontSize="large" sx={{ marginRight: 1 }} /> Vetkonnect Appointment History
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Search by client or venue..."
                                    value={searchQuery}
                                    onChange={this.handleSearchChange}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton>
                                                <SearchIcon />
                                            </IconButton>
                                        ),
                                    }}
                                    sx={{ marginBottom: 2, width: '100%' }}
                                />
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                {['Date & Time', 'Client', 'Venue', 'Status', 'Actions'].map((header, index) => (
                                                    <TableCell key={index} style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => this.handleSort(header.toLowerCase())}>
                                                        {header}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {filteredAppointments.length > 0 ? (
                                                filteredAppointments.map((appointment) => (
                                                    <TableRow key={appointment.id}>
                                                        <TableCell>{appointment.dateTime}</TableCell>
                                                        <TableCell>{appointment.client}</TableCell>
                                                        <TableCell>{appointment.venue}</TableCell>
                                                        <TableCell>{appointment.status}</TableCell>
                                                        <TableCell>
                                                            <Button onClick={() => this.handleOpenModal(appointment)}>View</Button>
                                                            <Button color="error" onClick={() => this.handleDeleteAppointment(appointment.id)}>Delete</Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={5} align="center">No appointments found</TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Modal open={modalOpen} onClose={this.handleCloseModal}>
                    <Box sx={{ bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2, maxWidth: 400, margin: 'auto', marginTop: '20%' }}>
                        {selectedAppointment && (
                            <>
                                <Typography variant="h6">Appointment Details</Typography>
                                <Typography><strong>Date & Time:</strong> {selectedAppointment.dateTime}</Typography>
                                <Typography><strong>Client:</strong> {selectedAppointment.client}</Typography>
                                <Typography><strong>Venue:</strong> {selectedAppointment.venue}</Typography>
                                <Typography><strong>Status:</strong> {selectedAppointment.status}</Typography>
                                <Button onClick={this.handleCloseModal} variant="outlined" sx={{ marginTop: 2 }}>Close</Button>
                            </>
                        )}
                    </Box>
                </Modal>
            </Container>
        );
    }
}

// Wrap with function component to use hooks
const AppointmentHistoryWithRouter = () => {
    const navigate = useNavigate();
    return <AppointmentHistory navigate={navigate} />;
};

export default AppointmentHistoryWithRouter;
