import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    Badge,
    Avatar,
    Divider,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    TextField,
    Button,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Mail as MailIcon,
    Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { useMediaQuery } from '@mui/material';

const HorizontalNavBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuType, setMenuType] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [profilePicture, setProfilePicture] = useState("assets/img/team/kasuku.jpg");
    const [messages, setMessages] = useState([
        { id: 1, content: "Juma sent you a message", time: "1 minute ago", read: false, sender: "Juma", type: "received", replies: [] },
        { id: 2, content: "Amina replied to your inquiry", time: "5 minutes ago", read: false, sender: "Amina", type: "received", replies: [] },
        { id: 3, content: "Your message has been sent", time: "10 minutes ago", read: true, sender: "You", type: "sent", replies: [] },
    ]);
    const [notifications, setNotifications] = useState([
        { id: 1, content: "New inquiry received from Juma", time: "2 minutes ago", read: false },
        { id: 2, content: "Appointment scheduled with Amina", time: "15 minutes ago", read: true },
        { id: 3, content: "Reminder: Check vaccination status", time: "30 minutes ago", read: false },
    ]);
    const [replyContent, setReplyContent] = useState('');
    const [selectedMessageId, setSelectedMessageId] = useState(null);
    const [newProfileData, setNewProfileData] = useState({ name: '' });
    const isMobile = useMediaQuery('(max-width:600px)');

    // Array of Kenyan names for simulation
    const kenyanNames = [
        "Juma", "Amina", "Ken", "Wanjiru", "Njeri", "Musa", "Fatuma",
        "James", "Joyce", "Ochieng", "Lilian", "Sharon", "Abdi",
        "Kevin", "Susan", "Omondi", "Diana", "Karanja", "Joy"
    ];

    // Array of inquiries related to veterinary services
    const inquiries = [
        "What vaccinations do you offer for dogs?",
        "Can you help with my cat's dental issues?",
        "What is the procedure for neutering my pet?",
        "Do you provide emergency services for animals?",
        "How often should I bring my pet in for check-ups?",
        "Can you assist with livestock health assessments?",
        "What are your operating hours for veterinary services?",
        "How do I prepare my pet for surgery?",
        "Do you offer grooming services as well?",
        "What should I do if my pet has a fever?"
    ];

    // Simulate receiving a new message (for demo purposes)
    useEffect(() => {
        const interval = setInterval(() => {
            const randomName = kenyanNames[Math.floor(Math.random() * kenyanNames.length)];
            const randomInquiry = inquiries[Math.floor(Math.random() * inquiries.length)];
            const newMessage = {
                id: messages.length + 1,
                content: `${randomName}: ${randomInquiry}`,
                time: "Just now",
                read: false,
                sender: randomName,
                type: "received",
                replies: []
            };
            setMessages(prev => [...prev, newMessage]);
        }, 10000); // New message every 10 seconds
        return () => clearInterval(interval);
    }, [messages]);

    const handleMenuOpen = (event, type) => {
        setAnchorEl(event.currentTarget);
        setMenuType(type);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuType('');
        setSelectedMessageId(null); // Reset selected message when menu closes
        setReplyContent(''); // Reset reply content
    };

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateProfile = () => {
        console.log("Profile updated with: ", newProfileData);
        handleMenuClose();
    };

    const handleMessageClick = (id) => {
        setMessages(messages.map(message => message.id === id ? { ...message, read: true } : message));
        setSelectedMessageId(id);
    };

    const handleReplySubmit = () => {
        if (replyContent.trim() && selectedMessageId !== null) {
            const newReply = {
                id: Math.max(...messages.map(m => m.id)) + 1,
                content: replyContent,
                time: "Just now",
                read: true,
                sender: "You",
            };
            setMessages(prev =>
                prev.map(message =>
                    message.id === selectedMessageId
                        ? { ...message, replies: [...message.replies, newReply] }
                        : message
                )
            );
            setReplyContent(''); // Clear reply input
            handleMenuClose(); // Close menu after sending
        }
    };

    const renderMessages = () => {
        return (
            <>
                <Typography variant="h6" sx={{ px: 2, py: 1 }}>Messages</Typography>
                <Divider />
                {messages.map((message) => (
                    <Box key={message.id} sx={{ p: 2, borderBottom: '1px solid #ddd' }}>
                        <Box onClick={() => handleMessageClick(message.id)} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar alt={message.sender} src="assets/img/team/default_user.jpg" />
                            <Box sx={{ ml: 2 }}>
                                <Typography variant="body2" color={message.read ? "text.secondary" : "inherit"}>
                                    {message.content}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">{message.time}</Typography>
                            </Box>
                        </Box>
                        {selectedMessageId === message.id && (
                            <Box sx={{ mt: 1, pl: 5 }}>
                                <TextField
                                    label="Your Reply"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                />
                                <Button variant="contained" color="primary" onClick={handleReplySubmit} sx={{ mt: 1 }}>
                                    Reply
                                </Button>
                                {message.replies.map(reply => (
                                    <Box key={reply.id} sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                                        <Avatar alt={reply.sender} src="assets/img/team/default_user.jpg" />
                                        <Box sx={{ ml: 2 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                {reply.content}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">{reply.time}</Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Box>
                ))}
            </>
        );
    };

    const renderNotifications = () => {
        return (
            <>
                <Typography variant="h6" sx={{ px: 2, py: 1 }}>Notifications</Typography>
                <Divider />
                {notifications.map((notification) => (
                    <Box key={notification.id} sx={{ p: 2, borderBottom: '1px solid #ddd' }}>
                        <Typography variant="body2" color={notification.read ? "text.secondary" : "inherit"}>
                            {notification.content}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">{notification.time}</Typography>
                    </Box>
                ))}
            </>
        );
    };

    const renderMobileMenu = () => (
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <List>
                <ListItem button onClick={(e) => handleMenuOpen(e, 'messages')}>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary="Messages" />
                </ListItem>
                <ListItem button onClick={(e) => handleMenuOpen(e, 'notifications')}>
                    <ListItemIcon><NotificationsIcon /></ListItemIcon>
                    <ListItemText primary="Notifications" />
                </ListItem>
            </List>
        </Drawer>
    );

    return (
        <>
            <AppBar position="fixed" sx={{ width: '100%', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'amber' }}>
                <Toolbar sx={{ justifyContent: 'space-between', padding: 0 }}> {/* Remove padding if necessary */}
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Vet Konnect
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton color="inherit" onClick={(e) => handleMenuOpen(e, 'messages')}>
                            <Badge badgeContent={messages.filter(m => !m.read).length} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit" onClick={(e) => handleMenuOpen(e, 'notifications')}>
                            <Badge badgeContent={notifications.filter(n => !n.read).length} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit" onClick={(e) => handleMenuOpen(e, 'profile')}>
                            <Avatar alt="Profile" src={profilePicture} />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>


            {renderMobileMenu()}

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                {menuType === 'messages' && renderMessages()}
                {menuType === 'notifications' && renderNotifications()}
                {menuType === 'profile' && (
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h6">Profile</Typography>
                        <Divider />
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                label="Name"
                                variant="outlined"
                                fullWidth
                                value={newProfileData.name}
                                onChange={(e) => setNewProfileData({ ...newProfileData, name: e.target.value })}
                            />
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="profile-picture-upload"
                                type="file"
                                onChange={handleProfilePictureChange}
                            />
                            <label htmlFor="profile-picture-upload">
                                <Button variant="contained" color="primary" component="span" sx={{ mt: 2 }}>
                                    Change Profile Picture
                                </Button>
                            </label>
                            <Button variant="contained" color="secondary" onClick={handleUpdateProfile} sx={{ mt: 2 }}>
                                Update Profile
                            </Button>
                        </Box>
                    </Box>
                )}
            </Menu>
        </>
    );
};

export default HorizontalNavBar;
