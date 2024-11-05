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
    Snackbar,
    Alert,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faComment, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

class Discussions extends Component {
    state = {
        discussionGroups: [],
        newGroupOpen: false,
        editGroupOpen: false,
        newGroupName: '',
        editGroupId: null,
        editGroupName: '',
        snackbarOpen: false,
        snackbarMessage: '',
        searchQuery: '',
        sortOption: 'name', // Default sorting by name
    };

    componentDidMount() {
        this.fetchDiscussionGroups(); // Fetch existing discussion groups
    }

    fetchDiscussionGroups = () => {
        // Simulate fetching discussion groups from an API
        const discussionGroups = [
            { id: 1, name: 'Veterinary Medicine Questions' },
            { id: 2, name: 'Pet Nutrition Tips' },
            { id: 3, name: 'Canine Health Discussions' },
        ];
        this.setState({ discussionGroups });
    };

    handleOpenNewGroupDialog = () => {
        this.setState({ newGroupOpen: true });
    };

    handleCloseNewGroupDialog = () => {
        this.setState({ newGroupOpen: false });
    };

    handleOpenEditGroupDialog = (group) => {
        this.setState({ editGroupOpen: true, editGroupId: group.id, editGroupName: group.name });
    };

    handleCloseEditGroupDialog = () => {
        this.setState({ editGroupOpen: false });
    };

    handleCreateGroup = () => {
        const { newGroupName, discussionGroups } = this.state;

        // Validate the group name
        if (!newGroupName.trim()) {
            this.showSnackbar('Group name is required.');
            return;
        }

        const newGroup = {
            id: discussionGroups.length + 1,
            name: newGroupName,
        };

        this.setState({
            discussionGroups: [...discussionGroups, newGroup],
            newGroupName: '',
            newGroupOpen: false,
        });

        this.showSnackbar('Discussion group created successfully!');
    };

    handleEditGroup = () => {
        const { editGroupId, editGroupName, discussionGroups } = this.state;

        // Validate the edited group name
        if (!editGroupName.trim()) {
            this.showSnackbar('Group name is required.');
            return;
        }

        const updatedGroups = discussionGroups.map(group =>
            group.id === editGroupId ? { ...group, name: editGroupName } : group
        );

        this.setState({
            discussionGroups: updatedGroups,
            editGroupOpen: false,
            editGroupName: '',
            editGroupId: null,
        });

        this.showSnackbar('Discussion group updated successfully!');
    };

    handleDeleteGroup = (groupId) => {
        const { discussionGroups } = this.state;
        const updatedGroups = discussionGroups.filter(group => group.id !== groupId);

        this.setState({
            discussionGroups: updatedGroups,
        });

        this.showSnackbar('Discussion group deleted successfully!');
    };

    handleJoinGroup = (groupName) => {
        this.showSnackbar(`Joined group: ${groupName}`);
    };

    showSnackbar = (message) => {
        this.setState({
            snackbarOpen: true,
            snackbarMessage: message,
        });
    };

    handleCloseSnackbar = () => {
        this.setState({ snackbarOpen: false });
    };

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    handleSortChange = (event) => {
        this.setState({ sortOption: event.target.value });
    };

    getFilteredAndSortedGroups = () => {
        const { discussionGroups, searchQuery, sortOption } = this.state;

        // Filter discussion groups based on the search query
        const filteredGroups = discussionGroups.filter(group =>
            group.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // Sort filtered groups
        return filteredGroups.sort((a, b) => {
            if (sortOption === 'name') {
                return a.name.localeCompare(b.name);
            }
            return 0; // Add more sorting options if needed
        });
    };

    render() {
        const { newGroupOpen, editGroupOpen, snackbarOpen, snackbarMessage, searchQuery, sortOption } = this.state;
        const filteredAndSortedGroups = this.getFilteredAndSortedGroups();

        return (
            <Container maxWidth="lg" style={{ padding: '32px' }}>
                {/* Button to create a new discussion group */}
                <Grid container justifyContent="flex-end" style={{ marginBottom: '24px' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<FontAwesomeIcon icon={faPlus} />}
                        onClick={this.handleOpenNewGroupDialog}
                        style={this.buttonStyle}
                    >
                        Create New Group
                    </Button>
                </Grid>

                {/* Header for discussion groups */}
                <Typography
                    variant="h4"
                    component="h2"
                    gutterBottom
                    align="center"
                    style={this.headerStyle}
                >
                    Veterinary Discussion Groups
                </Typography>

                {/* Search and Sort functionality */}
                <Grid container spacing={3} alignItems="center" justifyContent="center" style={{ marginBottom: '24px' }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Search Groups"
                            variant="outlined"
                            fullWidth
                            value={searchQuery}
                            onChange={this.handleSearchChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Sort By</InputLabel>
                            <Select
                                value={sortOption}
                                onChange={this.handleSortChange}
                                label="Sort By"
                            >
                                <MenuItem value="name">Name</MenuItem>
                                {/* Add more sort options here */}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                {/* Displaying the list of discussion groups */}
                <Grid container spacing={3} justifyContent="center">
                    {filteredAndSortedGroups.map((group) => (
                        <Grid item xs={12} sm={6} md={4} key={group.id}>
                            <Card variant="outlined" style={this.cardStyle}>
                                <CardContent style={{ padding: '16px' }}>
                                    <Typography variant="h5" component="div" gutterBottom>
                                        {group.name}
                                    </Typography>
                                    <Divider style={{ margin: '16px 0' }} />
                                    <Grid container justifyContent="flex-end" spacing={1}>
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                startIcon={<FontAwesomeIcon icon={faEdit} />}
                                                onClick={() => this.handleOpenEditGroupDialog(group)}
                                            >
                                                Edit
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<FontAwesomeIcon icon={faTrash} />}
                                                onClick={() => this.handleDeleteGroup(group.id)}
                                            >
                                                Delete
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                startIcon={<FontAwesomeIcon icon={faComment} />}
                                                onClick={() => this.handleJoinGroup(group.name)}
                                            >
                                                Join Group
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Dialog for creating a new discussion group */}
                <Dialog open={newGroupOpen} onClose={this.handleCloseNewGroupDialog} fullWidth>
                    <DialogTitle>Create New Discussion Group</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Group Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={this.state.newGroupName}
                            onChange={(e) => this.setState({ newGroupName: e.target.value })}
                            style={{ marginBottom: '16px' }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseNewGroupDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleCreateGroup} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Dialog for editing a discussion group */}
                <Dialog open={editGroupOpen} onClose={this.handleCloseEditGroupDialog} fullWidth>
                    <DialogTitle>Edit Discussion Group</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Group Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={this.state.editGroupName}
                            onChange={(e) => this.setState({ editGroupName: e.target.value })}
                            style={{ marginBottom: '16px' }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseEditGroupDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleEditGroup} color="primary">
                            Save Changes
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Snackbar for notifications */}
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={this.handleCloseSnackbar}>
                    <Alert onClose={this.handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Container>
        );
    }

    cardStyle = {
        margin: '16px',
        backgroundColor: '#f9f9f9',
    };

    headerStyle = {
        marginBottom: '32px',
        color: '#333',
    };

    buttonStyle = {
        margin: '4px',
    };
}

export default Discussions;
