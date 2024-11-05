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
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField as MuiTextField,
} from '@mui/material';
import { Pets } from '@mui/icons-material';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upcomingAppointments: [
                { id: 1, dateTime: '2024-10-20 10:00 AM', client: 'Michael Kasuku', venue: 'Veterinary Clinic A' },
                { id: 2, dateTime: '2024-10-21 11:00 AM', client: 'Daisy Lopez', venue: 'Veterinary Clinic B' },
                { id: 3, dateTime: '2024-10-22 09:30 AM', client: 'Josphine Otieno', venue: 'Veterinary Clinic C' },
            ],
            searchQuery: '',
            sortField: 'dateTime',
            sortDirection: 'asc',
            reminderDialogOpen: false,
            selectedAppointment: null,
            reminderTime: '',
            reminders: [],
        };
    }

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    handleSort = (field) => {
        const { sortField, sortDirection, upcomingAppointments } = this.state;
        const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';

        const sortedAppointments = [...upcomingAppointments].sort((a, b) => {
            const compareA = typeof a[field] === 'string' ? a[field].toLowerCase() : a[field];
            const compareB = typeof b[field] === 'string' ? b[field].toLowerCase() : b[field];
            return newDirection === 'asc' ? compareA.localeCompare(compareB) : compareB.localeCompare(compareA);
        });

        this.setState({
            upcomingAppointments: sortedAppointments,
            sortField: field,
            sortDirection: newDirection,
        });
    };

    openReminderDialog = (appointment) => {
        this.setState({ reminderDialogOpen: true, selectedAppointment: appointment });
    };

    closeReminderDialog = () => {
        this.setState({ reminderDialogOpen: false, selectedAppointment: null, reminderTime: '' });
    };

    handleReminderTimeChange = (event) => {
        this.setState({ reminderTime: event.target.value });
    };

    setReminder = () => {
        const { selectedAppointment, reminderTime } = this.state;
        const reminder = {
            appointmentId: selectedAppointment.id,
            client: selectedAppointment.client,
            dateTime: selectedAppointment.dateTime,
            reminderTime: reminderTime,
        };

        this.setState(prevState => ({
            reminders: [...prevState.reminders, reminder],
            reminderDialogOpen: false,
            selectedAppointment: null,
            reminderTime: '',
        }));

        alert(`Reminder set for ${reminder.client} on ${reminder.dateTime} at ${reminder.reminderTime}`);
    };

    cancelAppointment = (id) => {
        const { upcomingAppointments } = this.state;
        const updatedAppointments = upcomingAppointments.filter(appointment => appointment.id !== id);
        this.setState({ upcomingAppointments: updatedAppointments });
        alert(`Appointment with ID ${id} has been canceled.`);
    };

    viewAppointmentsHistory = () => {
        this.props.navigate('/vetdashboard/appointments'); // Navigate to the appointments history
    };

    render() {
        const { upcomingAppointments, searchQuery, reminderDialogOpen, selectedAppointment } = this.state;
        const filteredAppointments = upcomingAppointments.filter(appointment =>
            appointment.client.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <Container
                maxWidth="lg"
                sx={{ padding: 2, height: '100vh', overflowY: 'auto' }}
                role="main" // Accessibility: main content
            >
                <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                    {/* Search Bar */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Search by Client Name"
                            variant="outlined"
                            fullWidth
                            value={searchQuery}
                            onChange={this.handleSearchChange}
                            sx={{ marginBottom: 2 }}
                            aria-label="Search by Client Name" // Accessibility
                        />
                    </Grid>
                    {/* Button to View Appointments History */}
                    <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.viewAppointmentsHistory}
                            aria-label="View Appointments History" // Accessibility
                        >
                            View Appointments History
                        </Button>
                    </Grid>
                    {/* Upcoming Appointments Table */}
                    <Grid item xs={12}>
                        <Card variant="outlined" sx={{ marginBottom: 2 }}>
                            <CardContent>
                                <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                                    <Pets fontSize="large" sx={{ marginRight: 1 }} /> Upcoming Appointments
                                </Typography>
                                <TableContainer component={Paper} sx={{ maxHeight: '400px', overflow: 'auto' }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                {['dateTime', 'client', 'venue'].map((header) => (
                                                    <TableCell
                                                        key={header}
                                                        onClick={() => this.handleSort(header)}
                                                        style={{ cursor: 'pointer', fontWeight: 'bold' }}
                                                        aria-sort={this.state.sortField === header ? this.state.sortDirection : 'none'}
                                                    >
                                                        {header.charAt(0).toUpperCase() + header.slice(1).replace('Time', ' Time')}
                                                        {this.state.sortField === header && (
                                                            this.state.sortDirection === 'asc' ? ' 🔼' : ' 🔽'
                                                        )}
                                                    </TableCell>
                                                ))}
                                                <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {filteredAppointments.length > 0 ? (
                                                filteredAppointments.map((appointment) => (
                                                    <TableRow key={appointment.id}>
                                                        <TableCell>{appointment.dateTime}</TableCell>
                                                        <TableCell>{appointment.client}</TableCell>
                                                        <TableCell>{appointment.venue}</TableCell>
                                                        <TableCell>
                                                            <Button
                                                                variant="outlined"
                                                                onClick={() => this.openReminderDialog(appointment)}
                                                                sx={{ marginRight: 1 }}
                                                                aria-label={`Set Reminder for ${appointment.client}`} // Accessibility
                                                            >
                                                                Set Reminder
                                                            </Button>
                                                            <Button
                                                                variant="outlined"
                                                                color="error"
                                                                onClick={() => this.cancelAppointment(appointment.id)}
                                                                aria-label={`Cancel Appointment for ${appointment.client}`} // Accessibility
                                                            >
                                                                Cancel Appointment
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={4} align="center">No appointments found</TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Reminder Dialog */}
                <Dialog open={reminderDialogOpen} onClose={this.closeReminderDialog}>
                    <DialogTitle>Set Reminder</DialogTitle>
                    <DialogContent>
                        <MuiTextField
                            label="Reminder Time (e.g., 1 hour before)"
                            variant="outlined"
                            fullWidth
                            value={this.state.reminderTime}
                            onChange={this.handleReminderTimeChange}
                            aria-label="Reminder Time Input" // Accessibility
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeReminderDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.setReminder} color="primary">
                            Set Reminder
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        );
    }
}

// Use function component wrapper to allow hooks usage
const DashboardWithRouter = () => {
    const navigate = useNavigate();
    return <Dashboard navigate={navigate} />;
};

export default DashboardWithRouter;
