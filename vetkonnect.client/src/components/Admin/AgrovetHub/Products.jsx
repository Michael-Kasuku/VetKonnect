// AdminProducts.js
import React, { Component } from 'react';
import {
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Button,
    Divider,
    TextField,
    MenuItem,
    InputLabel,
    Select,
    FormControl,
    Box,
    IconButton,
    Snackbar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const products = [
    {
        id: 1,
        name: "DAP Fertilizer",
        price: 2500,
        image: "/assets/img/fertilizer.jfif",
        description: "High-quality organic fertilizer for your crops.",
        category: "Fertilizers",
    },
    {
        id: 2,
        name: "Veterinary Supplements",
        price: 800,
        image: "/assets/img/supplement.jfif",
        description: "Essential supplements for livestock health.",
        category: "Supplements",
    },
    {
        id: 3,
        name: "Insect Repellent",
        price: 500,
        image: "/assets/img/repellant.jfif",
        description: "Effective insect repellent for crops.",
        category: "Pesticides",
    },
];

const AnimatedCard = styled(Card)(({ theme }) => ({
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
    },
}));

const BackgroundContainer = styled(Container)(({ theme }) => ({
    background: 'linear-gradient(to bottom right, #ffffff, #f0f4f8)',
    borderRadius: '8px',
    padding: theme.spacing(2),
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
}));

const FullCardMedia = styled(CardMedia)(({ theme }) => ({
    height: '250px',
    objectFit: 'cover',
}));

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            categoryFilter: '',
            sortOrder: 'asc',
            snackbarOpen: false,
            snackbarMessage: '',
            isDialogOpen: false,
            currentProduct: null,
            mode: 'add',
        };
    }

    handleOpenDialog = (product = null, mode = 'add') => {
        this.setState({
            isDialogOpen: true,
            currentProduct: product,
            mode,
        });
    };

    handleCloseDialog = () => {
        this.setState({
            isDialogOpen: false,
            currentProduct: null,
            mode: 'add',
        });
    };

    handleSaveProduct = () => {
        // Logic to save the product (add or edit)
        this.setState({
            snackbarOpen: true,
            snackbarMessage: 'Product saved successfully!',
            isDialogOpen: false,
            currentProduct: null,
            mode: 'add',
        });
    };

    handleDeleteProduct = (productId) => {
        // Logic to delete the product
        this.setState({
            snackbarOpen: true,
            snackbarMessage: 'Product deleted successfully!',
        });
    };

    handleSearchChange = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    handleCategoryChange = (event) => {
        this.setState({ categoryFilter: event.target.value });
    };

    handleSortChange = (event) => {
        this.setState({ sortOrder: event.target.value });
    };

    filterAndSortProducts() {
        const { searchTerm, categoryFilter, sortOrder } = this.state;

        let filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (categoryFilter ? product.category === categoryFilter : true)
        );

        return filteredProducts.sort((a, b) =>
            sortOrder === 'asc' ? a.price - b.price : b.price - a.price
        );
    }

    render() {
        const { searchTerm, categoryFilter, sortOrder, snackbarOpen, snackbarMessage, isDialogOpen, currentProduct, mode } = this.state;
        const filteredProducts = this.filterAndSortProducts();

        return (
            <BackgroundContainer maxWidth="lg" sx={{ padding: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <TextField
                        label="Search Products"
                        variant="outlined"
                        value={searchTerm}
                        onChange={this.handleSearchChange}
                        placeholder="Search for fertilizers, supplements, etc."
                        sx={{ width: '300px' }}
                    />
                    <Box display="flex" gap={2}>
                        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={categoryFilter}
                                onChange={this.handleCategoryChange}
                                label="Category"
                            >
                                <MenuItem value="">
                                    <em>All</em>
                                </MenuItem>
                                <MenuItem value="Fertilizers">Fertilizers</MenuItem>
                                <MenuItem value="Supplements">Supplements</MenuItem>
                                <MenuItem value="Pesticides">Pesticides</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                            <InputLabel>Sort by Price</InputLabel>
                            <Select
                                value={sortOrder}
                                onChange={this.handleSortChange}
                                label="Sort by Price"
                            >
                                <MenuItem value="asc">Low to High</MenuItem>
                                <MenuItem value="desc">High to Low</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => this.handleOpenDialog()}
                    >
                        Add Product
                    </Button>
                </Box>

                <Grid container spacing={{ xs: 2, md: 3 }} alignItems="stretch" justifyContent="center">
                    {filteredProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <AnimatedCard>
                                <FullCardMedia
                                    component="img"
                                    alt={product.name}
                                    image={product.image}
                                    title={product.name}
                                />
                                <CardContent>
                                    <Typography variant="h5">{product.name}</Typography>
                                    <Typography variant="h6">Ksh. {product.price}</Typography>
                                    <Typography variant="body2">{product.description}</Typography>
                                    <Box display="flex" justifyContent="space-between" mt={2}>
                                        <IconButton color="primary" onClick={() => this.handleOpenDialog(product, 'edit')}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="secondary" onClick={() => this.handleDeleteProduct(product.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </AnimatedCard>
                        </Grid>
                    ))}
                </Grid>

                <Dialog open={isDialogOpen} onClose={this.handleCloseDialog}>
                    <DialogTitle>{mode === 'add' ? 'Add New Product' : 'Edit Product'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Product Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={currentProduct?.name || ''}
                        />
                        <TextField
                            label="Price"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="number"
                            value={currentProduct?.price || ''}
                        />
                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={currentProduct?.description || ''}
                        />
                        <TextField
                            label="Image URL"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={currentProduct?.image || ''}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialog} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSaveProduct} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    message={snackbarMessage}
                />
            </BackgroundContainer>
        );
    }
}

export default Products;
