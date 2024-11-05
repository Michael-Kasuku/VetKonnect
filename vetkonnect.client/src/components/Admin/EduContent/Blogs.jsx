import React, { Component } from 'react';
import {
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
    Button,
    Divider,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Snackbar,
    Alert,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShare, faFlag, faComment, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery'; // Importing jQuery for UI interactions

class Blogs extends Component {
    state = {
        blogs: [],
        newBlogOpen: false,
        editBlogOpen: false,
        newBlogTitle: '',
        newBlogContent: '',
        editBlogId: null,
        editBlogTitle: '',
        editBlogContent: '',
        searchQuery: '',
        sortBy: 'title', // default sort by title
        snackbarOpen: false,
        snackbarMessage: '',
    };

    componentDidMount() {
        this.initCardHoverEffects();
        this.fetchBlogs(); // Fetch existing blogs
    }

    initCardHoverEffects() {
        $('.card').hover(
            function () {
                $(this).css('transform', 'scale(1.03)');
                $(this).css('box-shadow', '0 8px 16px rgba(0,0,0,0.2)');
            },
            function () {
                $(this).css('transform', 'scale(1)');
                $(this).css('box-shadow', '0 4px 8px rgba(0,0,0,0.1)');
            }
        );
    }

    fetchBlogs() {
        // Simulate fetching blogs from an API
        const blogs = [
            {
                id: 1,
                title: 'Understanding Pet Nutrition',
                content: 'Proper nutrition is essential for your pet\'s health. A well-balanced diet helps to maintain their overall health, improve their mood, and increase their energy levels...',
                likes: 0,
                comments: [],
            },
            {
                id: 2,
                title: 'Common Diseases in Dogs',
                content: 'Learn about the most common diseases that affect dogs, including their symptoms, causes, and treatments...',
                likes: 0,
                comments: [],
            },
        ];
        this.setState({ blogs });
    }

    handleOpenNewBlog = () => {
        this.setState({ newBlogOpen: true });
    };

    handleCloseNewBlog = () => {
        this.setState({ newBlogOpen: false });
    };

    handleOpenEditBlog = (blog) => {
        this.setState({
            editBlogOpen: true,
            editBlogId: blog.id,
            editBlogTitle: blog.title,
            editBlogContent: blog.content,
        });
    };

    handleCloseEditBlog = () => {
        this.setState({ editBlogOpen: false });
    };

    handleCreateBlog = () => {
        const { newBlogTitle, newBlogContent, blogs } = this.state;

        const wordCount = newBlogContent.split(' ').length;
        if (!newBlogTitle || !newBlogContent || wordCount < 300 || wordCount > 350) {
            this.setState({
                snackbarOpen: true,
                snackbarMessage: 'Title is required and content must be between 300 to 350 words.',
            });
            return;
        }

        const newBlog = {
            id: blogs.length + 1,
            title: newBlogTitle,
            content: newBlogContent,
            likes: 0,
            comments: [],
        };

        this.setState({
            blogs: [...blogs, newBlog],
            newBlogTitle: '',
            newBlogContent: '',
            newBlogOpen: false,
        });
    };

    handleUpdateBlog = () => {
        const { editBlogId, editBlogTitle, editBlogContent, blogs } = this.state;

        const updatedBlogs = blogs.map(blog =>
            blog.id === editBlogId ? { ...blog, title: editBlogTitle, content: editBlogContent } : blog
        );

        this.setState({
            blogs: updatedBlogs,
            editBlogOpen: false,
            editBlogId: null,
            editBlogTitle: '',
            editBlogContent: '',
        });
    };

    handleDeleteBlog = (id) => {
        const updatedBlogs = this.state.blogs.filter(blog => blog.id !== id);
        this.setState({ blogs: updatedBlogs });
    };

    handleLikeBlog = (index) => {
        const { blogs } = this.state;
        blogs[index].likes += 1;
        this.setState({ blogs });
    };

    handleCommentBlog = (index) => {
        const comment = prompt("Enter your comment:");
        if (comment) {
            const { blogs } = this.state;
            blogs[index].comments.push(comment);
            this.setState({ blogs });
        }
    };

    handleShareBlog = (title) => {
        alert(`Sharing: ${title}`);
    };

    handleReportBlog = (title) => {
        alert(`Reporting: ${title}`);
    };

    handleCloseSnackbar = () => {
        this.setState({ snackbarOpen: false });
    };

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    handleSortChange = (event) => {
        this.setState({ sortBy: event.target.value });
    };

    render() {
        const { searchQuery, sortBy, blogs } = this.state;

        // Filter and sort blogs based on user input
        const filteredBlogs = blogs
            .filter(blog => blog.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .sort((a, b) => {
                if (sortBy === 'likes') {
                    return b.likes - a.likes; // Sort by likes in descending order
                }
                return a.title.localeCompare(b.title); // Sort by title in ascending order
            });

        return (
            <Container maxWidth="lg" style={{ padding: '32px' }}>
                {/* Create New Blog Button in the top right corner */}
                <Grid container justifyContent="flex-end">
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<FontAwesomeIcon icon={faPlus} />}
                        onClick={this.handleOpenNewBlog}
                        style={{ marginBottom: '16px', borderRadius: '20px', padding: '10px 20px' }}
                    >
                        Create New Blog
                    </Button>
                </Grid>

                {/* Search and Sort Controls */}
                <Grid container spacing={2} style={{ marginBottom: '16px' }}>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            fullWidth
                            label="Search Blogs"
                            variant="outlined"
                            value={searchQuery}
                            onChange={this.handleSearchChange}
                            style={{ borderRadius: '20px' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Sort By</InputLabel>
                            <Select
                                value={sortBy}
                                onChange={this.handleSortChange}
                                label="Sort By"
                                style={{ borderRadius: '20px' }}
                            >
                                <MenuItem value="title">Title</MenuItem>
                                <MenuItem value="likes">Likes</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={2} justifyContent="center">
                    {filteredBlogs.map((blog, index) => (
                        <Grid item xs={12} sm={6} md={4} key={blog.id}>
                            <Card
                                variant="outlined"
                                style={{
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                    borderRadius: '10px',
                                    height: '100%',
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'scale(1.03)',
                                        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                                    },
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h5" component="div" gutterBottom>
                                        {blog.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        style={{ marginBottom: '8px', lineHeight: 1.6 }}
                                    >
                                        {blog.content}
                                    </Typography>
                                    <Divider style={{ margin: '16px 0' }} />
                                    <Typography variant="body2">Likes: {blog.likes}</Typography>
                                    <Grid container spacing={1} style={{ marginTop: '8px' }}>
                                        <Grid item>
                                            <IconButton onClick={() => this.handleLikeBlog(index)}>
                                                <FontAwesomeIcon icon={faHeart} color="red" />
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <IconButton onClick={() => this.handleCommentBlog(index)}>
                                                <FontAwesomeIcon icon={faComment} />
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <IconButton onClick={() => this.handleShareBlog(blog.title)}>
                                                <FontAwesomeIcon icon={faShare} />
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <IconButton onClick={() => this.handleReportBlog(blog.title)}>
                                                <FontAwesomeIcon icon={faFlag} />
                                            </IconButton>
                                        </Grid>
                                        {/* Edit and Delete buttons */}
                                        <Grid item>
                                            <IconButton onClick={() => this.handleOpenEditBlog(blog)}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <IconButton onClick={() => this.handleDeleteBlog(blog.id)}>
                                                <FontAwesomeIcon icon={faTrash} color="red" />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* New Blog Dialog */}
                <Dialog open={this.state.newBlogOpen} onClose={this.handleCloseNewBlog}>
                    <DialogTitle>Create New Blog</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Blog Title"
                            fullWidth
                            value={this.state.newBlogTitle}
                            onChange={(e) => this.setState({ newBlogTitle: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label="Blog Content"
                            multiline
                            rows={4}
                            fullWidth
                            value={this.state.newBlogContent}
                            onChange={(e) => this.setState({ newBlogContent: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseNewBlog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleCreateBlog} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Edit Blog Dialog */}
                <Dialog open={this.state.editBlogOpen} onClose={this.handleCloseEditBlog}>
                    <DialogTitle>Edit Blog</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Blog Title"
                            fullWidth
                            value={this.state.editBlogTitle}
                            onChange={(e) => this.setState({ editBlogTitle: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label="Blog Content"
                            multiline
                            rows={4}
                            fullWidth
                            value={this.state.editBlogContent}
                            onChange={(e) => this.setState({ editBlogContent: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseEditBlog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleUpdateBlog} color="primary">
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Snackbar for notifications */}
                <Snackbar open={this.state.snackbarOpen} autoHideDuration={6000} onClose={this.handleCloseSnackbar}>
                    <Alert onClose={this.handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                        {this.state.snackbarMessage}
                    </Alert>
                </Snackbar>
            </Container>
        );
    }
}

export default Blogs;
