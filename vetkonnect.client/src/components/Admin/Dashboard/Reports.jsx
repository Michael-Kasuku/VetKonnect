import React, { useState } from 'react';
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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { DatePicker } from '@mui/lab';
import { Download, Pets, Group, EventAvailable } from '@mui/icons-material';

const Reports = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [reportDialogOpen, setReportDialogOpen] = useState(false);
    const [reportType, setReportType] = useState('');

    // Sample data
    const veterinarians = [
        { id: 1, name: 'Dr. Michael Kasuku', phone: '123-456-7890', clinic: 'Vet Clinic A' },
        { id: 2, name: 'Dr. Daisy Lopez', phone: '987-654-3210', clinic: 'Vet Clinic B' },
    ];

    const farmers = [
        { id: 1, name: 'Joseph Otieno', location: 'Nairobi', phone: '112-233-4455' },
        { id: 2, name: 'Grace Njeri', location: 'Kisumu', phone: '223-344-5566' },
    ];

    const appointments = [
        { id: 1, date: '2024-10-20', vet: 'Dr. Michael Kasuku', farmer: 'Joseph Otieno', status: 'Completed' },
        { id: 2, date: '2024-10-21', vet: 'Dr. Daisy Lopez', farmer: 'Grace Njeri', status: 'Pending' },
    ];

    const handleGenerateReport = (type) => {
        setReportType(type);
        setReportDialogOpen(true);
    };

    const closeReportDialog = () => {
        setReportDialogOpen(false);
        setReportType('');
    };

    const exportReport = () => {
        alert(`Exporting ${reportType} report!`);
    };

    return (
        <Container maxWidth="lg" sx={{ padding: 2 }}>
            <Typography variant="h4" align="center" gutterBottom>Admin Reports</Typography>

            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                {/* Filter by Date Range */}
                <Grid item xs={12} sm={6}>
                    <DatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <DatePicker
                        label="End Date"
                        value={endDate}
                        onChange={(newValue) => setEndDate(newValue)}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                </Grid>

                {/* Report Summary Cards */}
                <Grid item xs={12} sm={4}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6">Total Veterinarians</Typography>
                            <Typography variant="h4" align="center">{veterinarians.length}</Typography>
                            <Button
                                startIcon={<Pets />}
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => handleGenerateReport('Veterinarians')}
                                sx={{ marginTop: 1 }}
                            >
                                View Details
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6">Total Farmers</Typography>
                            <Typography variant="h4" align="center">{farmers.length}</Typography>
                            <Button
                                startIcon={<Group />}
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => handleGenerateReport('Farmers')}
                                sx={{ marginTop: 1 }}
                            >
                                View Details
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6">Total Appointments</Typography>
                            <Typography variant="h4" align="center">{appointments.length}</Typography>
                            <Button
                                startIcon={<EventAvailable />}
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => handleGenerateReport('Appointments')}
                                sx={{ marginTop: 1 }}
                            >
                                View Details
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Export Button */}
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<Download />}
                        onClick={exportReport}
                    >
                        Export Report
                    </Button>
                </Grid>
            </Grid>

            {/* Report Dialog */}
            <Dialog open={reportDialogOpen} onClose={closeReportDialog} maxWidth="md" fullWidth>
                <DialogTitle>{reportType} Report</DialogTitle>
                <DialogContent dividers>
                    {reportType === 'Veterinarians' && (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>Clinic</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {veterinarians.map((vet) => (
                                        <TableRow key={vet.id}>
                                            <TableCell>{vet.id}</TableCell>
                                            <TableCell>{vet.name}</TableCell>
                                            <TableCell>{vet.phone}</TableCell>
                                            <TableCell>{vet.clinic}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                    {reportType === 'Farmers' && (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Location</TableCell>
                                        <TableCell>Phone</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {farmers.map((farmer) => (
                                        <TableRow key={farmer.id}>
                                            <TableCell>{farmer.id}</TableCell>
                                            <TableCell>{farmer.name}</TableCell>
                                            <TableCell>{farmer.location}</TableCell>
                                            <TableCell>{farmer.phone}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                    {reportType === 'Appointments' && (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Veterinarian</TableCell>
                                        <TableCell>Farmer</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {appointments.map((appointment) => (
                                        <TableRow key={appointment.id}>
                                            <TableCell>{appointment.id}</TableCell>
                                            <TableCell>{appointment.date}</TableCell>
                                            <TableCell>{appointment.vet}</TableCell>
                                            <TableCell>{appointment.farmer}</TableCell>
                                            <TableCell>{appointment.status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeReportDialog} color="primary">Close</Button>
                    <Button onClick={exportReport} color="primary">Export</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Reports;
