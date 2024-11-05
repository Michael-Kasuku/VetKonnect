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

class OrderManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            openDialog: false,
            selectedOrder: null,
            snackbarOpen: false,
            snackbarMessage: '',
            searchQuery: '',
            page: 0,
            rowsPerPage: 5,
            order: 'asc',
            orderBy: 'datetime',
        };
    }

    componentDidMount() {
        this.loadMockOrders();
    }

    loadMockOrders = () => {
        const mockOrders = [
            {
                id: 1,
                datetime: new Date().toISOString(),
                clientName: "Michael Kasuku",
                amount: 2500,
                products: [
                    { id: 101, name: "Vaccination Service", price: 1500 },
                    { id: 102, name: "Consultation", price: 1000 },
                ],
            },
            {
                id: 2,
                datetime: new Date().toISOString(),
                clientName: "Josphine Otieno",
                amount: 3400,
                products: [
                    { id: 103, name: "Deworming", price: 900 },
                    { id: 104, name: "Feed Supplement", price: 2500 },
                ],
            },
            {
                id: 3,
                datetime: new Date().toISOString(),
                clientName: "Daisy Lopez",
                amount: 1800,
                products: [
                    { id: 105, name: "Health Checkup", price: 1800 },
                ],
            },
        ];
        this.setState({ orders: mockOrders });
    };

    handleDialogOpen = (order) => {
        this.setState({
            openDialog: true,
            selectedOrder: order,
        });
    };

    handleDialogClose = () => {
        this.setState({ openDialog: false, selectedOrder: null });
    };

    handleOrderCancel = () => {
        const { orders, selectedOrder } = this.state;
        const updatedOrders = orders.filter(order => order.id !== selectedOrder.id);
        this.setState({
            orders: updatedOrders,
            snackbarMessage: 'Order canceled successfully!',
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

    getFilteredOrders = () => {
        const { orders, searchQuery } = this.state;
        const queryLower = searchQuery.toLowerCase();
        return orders.filter(order =>
            order.clientName.toLowerCase().includes(queryLower)
        );
    };

    getSortedOrders = (filteredOrders) => {
        const { order, orderBy } = this.state;
        return filteredOrders.sort((a, b) => {
            if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
            if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
            return 0;
        });
    };

    render() {
        const { orders, openDialog, selectedOrder, snackbarOpen, snackbarMessage, page, rowsPerPage } = this.state;
        const filteredOrders = this.getFilteredOrders();
        const sortedOrders = this.getSortedOrders(filteredOrders);

        return (
            <Container>
                <Typography variant="h4" gutterBottom>
                    Admin - Veterinary Order Management
                </Typography>
                <TextField
                    label="Search by Client Name"
                    variant="outlined"
                    onChange={this.handleSearchChange}
                    fullWidth
                    margin="normal"
                />
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <TableSortLabel
                                        active={this.state.orderBy === 'datetime'}
                                        direction={this.state.orderBy === 'datetime' ? this.state.order : 'asc'}
                                        onClick={() => this.handleRequestSort('datetime')}
                                    >
                                        Date & Time
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>Client Name</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Products/Services</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>{new Date(order.datetime).toLocaleString()}</TableCell>
                                    <TableCell>{order.clientName}</TableCell>
                                    <TableCell>Ksh {order.amount}</TableCell>
                                    <TableCell>
                                        {order.products.map(product => (
                                            <Typography key={product.id}>{product.name} (Ksh {product.price})</Typography>
                                        ))}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}
                                            onClick={() => this.handleDialogOpen(order)}
                                        >
                                            Cancel
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={sortedOrders.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={this.handleChangePage}
                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                />
                <Dialog open={openDialog} onClose={this.handleDialogClose}>
                    <DialogTitle>Cancel Order</DialogTitle>
                    <DialogContent>
                        <Typography>Are you sure you want to cancel this order for {selectedOrder?.clientName}?</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogClose} color="primary">No</Button>
                        <Button onClick={this.handleOrderCancel} color="secondary">Yes, Cancel</Button>
                    </DialogActions>
                </Dialog>
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={this.handleSnackbarClose}>
                    <Alert onClose={this.handleSnackbarClose} severity="success">
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Container>
        );
    }
}

export default OrderManagement;
