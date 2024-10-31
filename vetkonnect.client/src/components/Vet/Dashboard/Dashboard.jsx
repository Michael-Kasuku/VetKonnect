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
            sortField: 'dateTime', // Default sort field
            sortDirection: 'asc', // Default sort direction
            reminderDialogOpen: false,
            selectedAppointment: null,
            reminderTime: '',
            reminders: [], // State to hold reminders
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
            if (compareA < compareB) return newDirection === 'asc' ? -1 : 1;
            if (compareA > compareB) return newDirection === 'asc' ? 1 : -1;
            return 0;
        });

        this.setState({
            upcomingAppointments: sortedAppointments,
            sortField: field,
            sortDirection: newDirection
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

        // Add the reminder to the reminders state
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

        // Logic for sending notification or alert could be implemented here
        console.log(`Reminder set for ${reminder.client} on ${reminder.dateTime} at ${reminder.reminderTime}`);
    };

    render() {
        const { upcomingAppointments, searchQuery, reminderDialogOpen, selectedAppointment } = this.state;
        const filteredAppointments = upcomingAppointments.filter(appointment =>
            appointment.client.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <Container
                maxWidth="lg"
                sx={{ padding: 2, height: '100vh', overflowY: 'auto' }} // Enable vertical scrolling
            >
                <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                    {/* Search Bar */}
                    <Grid item xs={12}>
                        <TextField
                            label="Search by Client Name"
                            variant="outlined"
                            fullWidth
                            value={searchQuery}
                            onChange={this.handleSearchChange}
                            sx={{ marginBottom: 2 }}
                        />
                    </Grid>
                    {/* Upcoming Appointments Table */}
                    <Grid item xs={12}>
                        <Card variant="outlined" sx={{ marginBottom: 2 }}>
                            <CardContent>
                                <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Pets fontSize="large" sx={{ marginRight: 1 }} /> Upcoming Appointments
                                </Typography>
                                <TableContainer component={Paper}>
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
                                                            >
                                                                Set Reminder
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
