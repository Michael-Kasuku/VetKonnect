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
            cart: [],
        };
    }

    componentDidMount() {
        this.loadMockOrders();
    }

    loadMockOrders = () => {
        const mockOrders = [
            {
                id: 1,
                datetime: '2024-10-20T14:30:00',
                clientName: 'Daisy Lopez',
                amount: 5000,
                products: [
                    { id: 1, name: 'Dog Vaccination Package', price: 2000 },
                    { id: 2, name: 'Cat Deworming Treatment', price: 3000 },
                ],
            },
            {
                id: 2,
                datetime: '2024-10-21T10:15:00',
                clientName: 'Josphine Otieno',
                amount: 3000,
                products: [
                    { id: 3, name: 'Flea and Tick Prevention for Dogs', price: 3000 },
                ],
            },
            {
                id: 3,
                datetime: '2024-10-22T08:45:00',
                clientName: 'Donatus Njoroge',
                amount: 4500,
                products: [
                    { id: 4, name: 'Pet Health Checkup', price: 1500 },
                    { id: 5, name: 'Dog Grooming Service', price: 3000 },
                ],
            },
            {
                id: 4,
                datetime: '2024-10-18T12:00:00',
                clientName: 'Tom Ojienda',
                amount: 7000,
                products: [
                    { id: 6, name: 'Emergency Vet Care', price: 7000 },
                ],
            },
            // Additional dummy data
            {
                id: 5,
                datetime: '2024-10-25T09:00:00',
                clientName: 'Mary Wanjiru',
                amount: 6000,
                products: [
                    { id: 7, name: 'Cat Vaccination Package', price: 3000 },
                    { id: 8, name: 'Dog Dental Cleaning', price: 3000 },
                ],
            },
            {
                id: 6,
                datetime: '2024-10-26T15:30:00',
                clientName: 'James Kamau',
                amount: 2500,
                products: [
                    { id: 9, name: 'Pet Nutritional Consultation', price: 2500 },
                ],
            },
            {
                id: 7,
                datetime: '2024-10-27T11:45:00',
                clientName: 'Anita Njeri',
                amount: 8000,
                products: [
                    { id: 10, name: 'Emergency Surgery', price: 8000 },
                ],
            },
            {
                id: 8,
                datetime: '2024-10-28T14:15:00',
                clientName: 'Samuel Mwangi',
                amount: 1500,
                products: [
                    { id: 11, name: 'Dog Training Session', price: 1500 },
                ],
            },
            // New records added
            {
                id: 9,
                datetime: '2024-10-29T09:30:00',
                clientName: 'Kevin Njuguna',
                amount: 4000,
                products: [
                    { id: 12, name: 'Cat Grooming Service', price: 2000 },
                    { id: 13, name: 'Dog Health Checkup', price: 2000 },
                ],
            },
            {
                id: 10,
                datetime: '2024-10-30T16:00:00',
                clientName: 'Flora Abuga',
                amount: 7500,
                products: [
                    { id: 14, name: 'Dog Spaying Service', price: 7500 },
                ],
            },
            {
                id: 11,
                datetime: '2024-10-31T12:30:00',
                clientName: 'Peter Maina',
                amount: 5200,
                products: [
                    { id: 15, name: 'Cat Neutering Service', price: 5200 },
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

    handlePlaceOrder = (clientName) => {
        const { cart, orders } = this.state;
        const totalAmount = cart.reduce((total, product) => total + product.price, 0);
        const newOrder = {
            id: orders.length + 1,
            datetime: new Date().toISOString(),
            clientName: clientName,
            amount: totalAmount,
            products: cart,
        };

        this.setState({
            orders: [...orders, newOrder],
            cart: [],
            snackbarMessage: 'Order placed successfully!',
            snackbarOpen: true,
        });
    };

    render() {
        const { orders, openDialog, selectedOrder, snackbarOpen, snackbarMessage, page, rowsPerPage } = this.state;
        const filteredOrders = this.getFilteredOrders();
        const sortedOrders = this.getSortedOrders(filteredOrders);

        return (
            <Container>
                <Typography variant="h4" gutterBottom>
                    Veterinary Order Management
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
