import React, { Component } from 'react';
import {
    Container,
    Grid,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TablePagination,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    Alert,
} from '@mui/material';

class Appointments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            openDialog: false,
            dialogType: '', // 'schedule' or 'cancel'
            selectedAppointment: null,
            newAppointment: {
                date: '',
                time: '',
                clientName: '',
                venue: '',
            },
            snackbarOpen: false,
            snackbarMessage: '',
            searchQuery: '',
            page: 0,
            rowsPerPage: 5,
            order: 'asc',
            orderBy: 'date',
        };
    }

    componentDidMount() {
        this.loadMockAppointments();
    }

    loadMockAppointments = () => {
        const mockAppointments = [
            { id: 1, date: '2024-10-20', time: '10:00 AM', clientName: 'Daisy Lopez', venue: 'Kakamega' },
            { id: 2, date: '2024-10-21', time: '11:00 AM', clientName: 'Josphine Otieno', venue: 'Nairobi' },
            { id: 3, date: '2024-10-22', time: '09:00 AM', clientName: 'Donatus Njoroge', venue: 'Kiambu' },
            { id: 4, date: '2024-10-18', time: '03:00 PM', clientName: 'Tom Ojienda', venue: 'Kisumu' },
        ];
        this.setState({ appointments: mockAppointments });
    };

    handleDialogOpen = (type, appointment = null) => {
        this.setState({
            openDialog: true,
            dialogType: type,
            selectedAppointment: appointment,
            newAppointment: type === 'schedule' ? { date: '', time: '', clientName: '', venue: '' } : this.state.newAppointment,
        });
    };

    handleDialogClose = () => {
        this.setState({ openDialog: false, selectedAppointment: null });
    };

    handleInputChange = ({ target: { name, value } }) => {
        this.setState({ newAppointment: { ...this.state.newAppointment, [name]: value } });
    };

    handleAppointmentAction = () => {
        const { newAppointment, appointments, dialogType, selectedAppointment } = this.state;
        let updatedAppointments = [...appointments];

        if (dialogType === 'schedule') {
            const newId = appointments.length ? Math.max(appointments.map(a => a.id)) + 1 : 1;
            updatedAppointments.push({ id: newId, ...newAppointment });
            this.setState({ snackbarMessage: 'Appointment scheduled successfully!' });
        } else {
            updatedAppointments = appointments.filter(appointment => appointment.id !== selectedAppointment.id);
            this.setState({ snackbarMessage: 'Appointment canceled successfully!' });
        }

        this.setState({
            appointments: updatedAppointments,
            snackbarOpen: true,
            openDialog: false,
        });
    };

    handleSnackbarClose = () => {
        this.setState({ snackbarOpen: false });
    };

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    handleRequestSort = (property) => {
        const { order, orderBy } = this.state;
        const newOrder = orderBy === property && order === 'asc' ? 'desc' : 'asc';
        this.setState({ order: newOrder, orderBy: property });
    };

    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage });
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });
    };

    getFilteredAppointments = () => {
        const { appointments, searchQuery } = this.state;
        const queryLower = searchQuery.toLowerCase();
        return appointments.filter(appointment =>
            appointment.clientName.toLowerCase().includes(queryLower) ||
            appointment.venue.toLowerCase().includes(queryLower)
        );
    };

    getSortedAppointments = (filteredAppointments) => {
        const { order, orderBy } = this.state;
        return filteredAppointments.sort((a, b) => {
            return order === 'asc'
                ? a[orderBy] < b[orderBy] ? -1 : 1
                : a[orderBy] > b[orderBy] ? -1 : 1;
        });
    };

    render() {
        const { openDialog, dialogType, newAppointment, snackbarOpen, snackbarMessage, searchQuery, page, rowsPerPage, order, orderBy } = this.state;

        const filteredAppointments = this.getFilteredAppointments();
        const sortedAppointments = this.getSortedAppointments(filteredAppointments);
        const displayedAppointments = sortedAppointments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

        return (
            <Container maxWidth="lg" sx={{ padding: 2, maxHeight: '100vh', overflow: 'hidden' }}>
                <Grid container spacing={2} alignItems="stretch" justifyContent="center" sx={{ marginTop: '20px' }}>
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>Appointment History</Typography>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs>
                                <TextField
                                    label="Search by Client or Venue"
                                    variant="outlined"
                                    value={searchQuery}
                                    onChange={this.handleSearchChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => this.handleDialogOpen('schedule')}
                                >
                                    Schedule New Appointment
                                </Button>
                            </Grid>
                        </Grid>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {['date', 'time', 'clientName', 'venue'].map((field) => (
                                            <TableCell key={field}>
                                                <TableSortLabel
                                                    active={orderBy === field}
                                                    direction={orderBy === field ? order : 'asc'}
                                                    onClick={() => this.handleRequestSort(field)}
                                                >
                                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                                </TableSortLabel>
                                            </TableCell>
                                        ))}
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {displayedAppointments.length > 0 ? (
                                        displayedAppointments.map(appointment => (
                                            <TableRow key={appointment.id}>
                                                <TableCell>{appointment.date}</TableCell>
                                                <TableCell>{appointment.time}</TableCell>
                                                <TableCell>{appointment.clientName}</TableCell>
                                                <TableCell>{appointment.venue}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        size="small"
                                                        onClick={() => this.handleDialogOpen('cancel', appointment)}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} align="center">No appointments found.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={sortedAppointments.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={this.handleChangePage}
                            onRowsPerPageChange={this.handleChangeRowsPerPage}
                        />
                    </Grid>
                </Grid>

                {/* Appointment Dialog */}
                <Dialog open={openDialog} onClose={this.handleDialogClose} fullWidth maxWidth="sm">
                    <DialogTitle>{dialogType === 'schedule' ? 'Schedule Appointment' : 'Cancel Appointment'}</DialogTitle>
                    <DialogContent>
                        {dialogType === 'schedule' ? (
                            <>
                                <TextField
                                    label="Date"
                                    type="date"
                                    name="date"
                                    value={newAppointment.date}
                                    onChange={this.handleInputChange}
                                    fullWidth
                                    sx={{ marginBottom: 2 }}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    label="Time"
                                    type="time"
                                    name="time"
                                    value={newAppointment.time}
                                    onChange={this.handleInputChange}
                                    fullWidth
                                    sx={{ marginBottom: 2 }}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    label="Client Name"
                                    name="clientName"
                                    value={newAppointment.clientName}
                                    onChange={this.handleInputChange}
                                    fullWidth
                                    sx={{ marginBottom: 2 }}
                                />
                                <TextField
                                    label="Venue"
                                    name="venue"
                                    value={newAppointment.venue}
                                    onChange={this.handleInputChange}
                                    fullWidth
                                    sx={{ marginBottom: 2 }}
                                />
                            </>
                        ) : (
                            <Typography>Are you sure you want to cancel this appointment?</Typography>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogClose} color="primary">Cancel</Button>
                        <Button onClick={this.handleAppointmentAction} color="primary">
                            {dialogType === 'schedule' ? 'Schedule' : 'Confirm'}
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Snackbar for notifications */}
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={this.handleSnackbarClose}>
                    <Alert onClose={this.handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Container>
        );
    }
}

export default Appointments;
