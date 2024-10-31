import React, { useState } from 'react';
import {
    Container,
    Grid,
    Typography,
    Card,
    Avatar,
    Button,
    Divider,
    IconButton,
    Tabs,
    Tab,
    Box,
    TextField,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import { Favorite, Chat, PersonAdd, FavoriteBorder, Send } from '@mui/icons-material';

const vetProfiles = [
    { id: 1, name: 'Dr. Josphine Otieno', jobTitle: 'Veterinary Surgeon', profilePic: '/assets/img/team/josphine.jpg' },
    { id: 2, name: 'Dr. Michael Kasuku', jobTitle: 'Animal Nutritionist', profilePic: '/assets/img/team/kasuku.jpg' },
    { id: 3, name: 'Dr. Daisy Lopez', jobTitle: 'Wildlife Specialist', profilePic: '/assets/img/team/lopez.jpg' },
];

const VetProfiles = () => {
    const [favoriteVets, setFavoriteVets] = useState([]);
    const [connections, setConnections] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [chatOpen, setChatOpen] = useState(false);
    const [currentVet, setCurrentVet] = useState(null);
    const [messages, setMessages] = useState({});
    const [messageInput, setMessageInput] = useState('');

    const toggleFavorite = (vetId) => {
        setFavoriteVets((prev) =>
            prev.includes(vetId) ? prev.filter((id) => id !== vetId) : [...prev, vetId]
        );
    };

    const addConnection = (vet) => {
        setConnections((prev) =>
            prev.some((connection) => connection.id === vet.id)
                ? prev
                : [...prev, vet]
        );
    };

    const handleSearchChange = (event) => setSearchQuery(event.target.value);

    const handleSortChange = (event) => setSortOrder(event.target.value);

    const openChat = (vet) => {
        setCurrentVet(vet);
        setChatOpen(true);
    };

    const closeChat = () => {
        setChatOpen(false);
        setCurrentVet(null);
        setMessageInput('');
    };

    const sendMessage = () => {
        if (!messageInput.trim()) return;
        setMessages((prev) => ({
            ...prev,
            [currentVet.id]: [...(prev[currentVet.id] || []), messageInput],
        }));
        setMessageInput('');
    };

    const filterAndSortVets = (vets) =>
        vets
            .filter((vet) =>
                vet.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .sort((a, b) =>
                sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
            );

    const displayedVets = filterAndSortVets(vetProfiles);

    return (
        <Container maxWidth="lg" sx={{ padding: 2, marginTop: '20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    onChange={handleSearchChange}
                />
                <TextField
                    select
                    label="Sort"
                    value={sortOrder}
                    onChange={handleSortChange}
                    size="small"
                >
                    <MenuItem value="asc">Ascending</MenuItem>
                    <MenuItem value="desc">Descending</MenuItem>
                </TextField>
            </Box>

            <Tabs
                value={selectedTab}
                onChange={(event, newValue) => setSelectedTab(newValue)}
                centered
                sx={{ marginBottom: 2 }}
            >
                <Tab label="All Vets" />
                <Tab label={`Favorites (${favoriteVets.length})`} />
                <Tab label={`Connections (${connections.length})`} />
            </Tabs>

            <TabPanel value={selectedTab} index={0}>
                <VetGrid vets={displayedVets} toggleFavorite={toggleFavorite} openChat={openChat} addConnection={addConnection} favoriteVets={favoriteVets} />
            </TabPanel>

            <TabPanel value={selectedTab} index={1}>
                <VetGrid
                    vets={displayedVets.filter((vet) => favoriteVets.includes(vet.id))}
                    toggleFavorite={toggleFavorite}
                    openChat={openChat}
                    addConnection={addConnection}
                    favoriteVets={favoriteVets}
                />
            </TabPanel>

            <TabPanel value={selectedTab} index={2}>
                <VetGrid vets={connections} toggleFavorite={toggleFavorite} openChat={openChat} addConnection={addConnection} favoriteVets={favoriteVets} />
            </TabPanel>

            <ChatDialog
                open={chatOpen}
                vet={currentVet}
                messageInput={messageInput}
                messages={messages[currentVet?.id] || []}
                onClose={closeChat}
                onInputChange={(e) => setMessageInput(e.target.value)}
                onSend={sendMessage}
            />
        </Container>
    );
};

const VetGrid = ({ vets, toggleFavorite, openChat, addConnection, favoriteVets }) => (
    <Grid container spacing={3}>
        {vets.map((vet) => (
            <Grid item xs={12} sm={6} md={4} key={vet.id}>
                <VetCard
                    vet={vet}
                    isFavorite={favoriteVets.includes(vet.id)}
                    toggleFavorite={toggleFavorite}
                    openChat={openChat}
                    addConnection={addConnection}
                />
            </Grid>
        ))}
    </Grid>
);

const VetCard = ({ vet, isFavorite, toggleFavorite, openChat, addConnection }) => (
    <Card
        sx={{
            boxShadow: 3,
            borderRadius: 2,
            padding: 2,
            textAlign: 'center',
            '&:hover': { boxShadow: '0 8px 16px rgba(0,0,0,0.2)' },
            display: 'flex', // Add this line
            flexDirection: 'column', // Ensure vertical stacking
            alignItems: 'center', // Center items horizontally
            justifyContent: 'center', // Center items vertically
        }}
    >
        <Avatar src={vet.profilePic} alt={vet.name} sx={{ width: 120, height: 120, marginBottom: 2 }} />
        <Typography variant="h5">{vet.name}</Typography>
        <Typography variant="body2" color="textSecondary">
            {vet.jobTitle}
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        <Grid container spacing={1} justifyContent="center">
            <Grid item>
                <IconButton onClick={() => toggleFavorite(vet.id)} color={isFavorite ? 'error' : 'default'}>
                    {isFavorite ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
            </Grid>
            <Grid item>
                <Button variant="outlined" startIcon={<Chat />} onClick={() => openChat(vet)}>
                    Message
                </Button>
            </Grid>
            <Grid item>
                <IconButton color="primary" onClick={() => addConnection(vet)}>
                    <PersonAdd />
                </IconButton>
            </Grid>
        </Grid>
    </Card>
);

const ChatDialog = ({ open, vet, messages, messageInput, onClose, onInputChange, onSend }) => (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Chat with {vet?.name}</DialogTitle>
        <DialogContent dividers>
            <List>
                {messages.map((msg, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={msg} />
                    </ListItem>
                ))}
            </List>
        </DialogContent>
        <DialogActions>
            <TextField value={messageInput} onChange={onInputChange} placeholder="Type a message..." fullWidth />
            <IconButton onClick={onSend} color="primary">
                <Send />
            </IconButton>
        </DialogActions>
    </Dialog>
);

const TabPanel = ({ children, value, index }) => (
    <div role="tabpanel" hidden={value !== index}>
        {value === index && <Box sx={{ padding: 2 }}>{children}</Box>}
    </div>
);

export default VetProfiles;
