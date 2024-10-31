// Products.js
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
    Drawer,
    List,
    ListItem,
    ListItemText,
    Box,
    IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import $ from 'jquery';

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
            cart: [],
            searchTerm: '',
            categoryFilter: '',
            sortOrder: 'asc',
            isCartOpen: false,
        };
    }

    componentDidMount() {
        this.initCardHoverEffects();
    }

    initCardHoverEffects() {
        $('.card').hover(
            function () {
                $(this).css('box-shadow', '0 8px 16px rgba(0,0,0,0.2)');
            },
            function () {
                $(this).css('box-shadow', '0 4px 8px rgba(0,0,0,0.1)');
            }
        );
    }

    handleAddToCart = (product) => {
        this.setState((prevState) => ({
            cart: [...prevState.cart, product],
        }));
        alert(`${product.name} has been added to your cart!`);
    }

    handleRemoveFromCart = (index) => {
        this.setState((prevState) => {
            const newCart = prevState.cart.filter((_, i) => i !== index);
            return { cart: newCart };
        });
    }

    calculateTotalPrice = () => {
        return this.state.cart.reduce((total, product) => total + product.price, 0);
    }

    handleSearchChange = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    handleCategoryChange = (event) => {
        this.setState({ categoryFilter: event.target.value });
    };

    handleSortChange = (event) => {
        this.setState({ sortOrder: event.target.value });
    };

    toggleCart = () => {
        this.setState(prevState => ({ isCartOpen: !prevState.isCartOpen }));
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
        const { searchTerm, categoryFilter, sortOrder, cart, isCartOpen } = this.state;
        const filteredProducts = this.filterAndSortProducts();
        const totalPrice = this.calculateTotalPrice();

        return (
            <BackgroundContainer
                maxWidth="lg"
                className="main-panel"
                sx={{ padding: 2, maxHeight: '100vh', overflow: 'hidden' }}
            >
                <div className="content-wrapper" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
                    {/* Search and Filter Options */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <TextField
                            label="Search Products"
                            variant="outlined"
                            value={searchTerm}
                            onChange={this.handleSearchChange}
                            sx={{ width: '300px' }}
                        />

                        <Box display="flex" gap={2}>
                            {/* Category Filter */}
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

                            {/* Sort Order */}
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

                        {/* Cart Icon Button */}
                        <IconButton color="primary" onClick={this.toggleCart}>
                            <ShoppingCartIcon />
                            {cart.length > 0 && (
                                <Typography variant="caption" sx={{ position: 'absolute', top: 5, right: 12, color: 'red' }}>
                                    {cart.length}
                                </Typography>
                            )}
                        </IconButton>
                    </Box>

                    <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        alignItems="stretch"
                        justifyContent="center"
                        sx={{ marginTop: '20px' }}
                    >
                        {/* Rendering Product Cards */}
                        {filteredProducts.map((product) => (
                            <Grid item xs={12} sm={6} md={4} key={product.id}>
                                <AnimatedCard
                                    className="card"
                                    sx={{
                                        borderRadius: 2,
                                        boxShadow: 2,
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <FullCardMedia
                                        component="img"
                                        image={product.image}
                                        alt={product.name}
                                    />
                                    <CardContent>
                                        <Typography variant="h6">{product.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.description}
                                        </Typography>
                                        <Typography variant="h6" color="primary">Ksh {product.price}</Typography>
                                    </CardContent>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => this.handleAddToCart(product)}
                                    >
                                        Add to Cart
                                    </Button>
                                </AnimatedCard>
                            </Grid>
                        ))}
                    </Grid>

                    <Divider sx={{ margin: '20px 0' }} />

                    {/* Cart Drawer */}
                    <Drawer anchor="right" open={isCartOpen} onClose={this.toggleCart}>
                        <Box
                            sx={{ width: 300, padding: 2 }}
                            role="presentation"
                            onClick={this.toggleCart}
                            onKeyDown={this.toggleCart}
                        >
                            <Typography variant="h5">Shopping Cart</Typography>
                            {cart.length === 0 ? (
                                <Typography variant="body2" sx={{ padding: 2 }}>Your cart is empty.</Typography>
                            ) : (
                                <List>
                                    {cart.map((product, index) => (
                                        <ListItem key={index}>
                                            <ListItemText primary={product.name} secondary={`Ksh ${product.price}`} />
                                            <Button color="secondary" onClick={() => this.handleRemoveFromCart(index)}>Remove</Button>
                                        </ListItem>
                                    ))}
                                    <Divider />
                                    <ListItem>
                                        <ListItemText primary="Total" />
                                        <ListItemText primary={`Ksh ${totalPrice}`} />
                                    </ListItem>
                                </List>
                            )}
                        </Box>
                    </Drawer>
                </div>
            </BackgroundContainer>
        );
    }
}

export default Products;
