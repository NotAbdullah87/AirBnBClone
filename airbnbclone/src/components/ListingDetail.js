import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  Paper,
  TextField,
  Button,
  Modal,
  Box,
  Backdrop,
  Fade
} from '@mui/material';
import axios from 'axios';
import UserDashboardHeader from './userDashboardHeader';
import IosShareIcon from '@mui/icons-material/IosShare';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ListingDetailPage = () => {
  const { id } = useParams(); // Get the listing ID from the URL parameter
  const [listing, setListing] = useState(null);
  const [guests, setGuests] = useState(1); // State for number of guests
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [userName, setUserName] = useState(''); // State for user name input
  const [userContact, setUserContact] = useState(''); // State for user contact input
  const [message, setMessage] = useState(''); // State for message input
  const [messages, setMessages] = useState([]); // State for storing messages
  const [messageError, setMessageError] = useState(''); // State for message input validation
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user login status

  useEffect(() => {
    // Check if user is logged in on component mount
    const checkLoggedInStatus = () => {
      const user = localStorage.getItem('userEmail'); // Assuming user login details are stored in localStorage
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoggedInStatus();
  }, []);

  // Fetch listing details on component mount
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/listings/${id}`);
        setListing(response.data);
        // Optionally, fetch messages for this listing
        fetchMessagesForListing(id);
      } catch (error) {
        console.error('Error fetching listing details:', error);
      }
    };

    fetchListing();
  }, [id]);

  // Fetch messages for the current listing from the backend
  const fetchMessagesForListing = async (listingId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/messages/${listingId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Function to handle guest count change
  const handleGuestsChange = (event) => {
    setGuests(parseInt(event.target.value));
  };

  // Function to handle modal open
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  // Function to handle modal close
  const handleModalClose = () => {
    setModalOpen(false);
  };

  // Function to handle message input change
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
    setMessageError('');
  };

  // Function to handle reservation
  const handleReserve = async () => {
    if (!isLoggedIn) {
      alert('Please log in to make a reservation.');
      // Optionally, redirect to login page
      return;
    }

    try {
      // Make a POST request to store the reservation
      const response = await axios.post('http://localhost:5000/api/reservations', {
        listingId: listing._id,
        userEmail: 'user@example.com', // Replace with actual user email (if available in your app)
        userName: userName,
        userContact: userContact,
        hostEmail: listing.hostEmail,
        checkInDate: '2024-07-01', // Replace with actual check-in date from state or form
        checkOutDate: '2024-07-05', // Replace with actual check-out date from state or form
        guests: guests
      });

      console.log('Reservation stored:', response.data); // Log the response from the server

      // Close the modal after successful reservation
      handleModalClose();
    } catch (error) {
      console.error('Error storing reservation:', error);
      // Handle error (e.g., display error message)
    }
  };

  // Function to validate and send message
  const handleSendMessage = async () => {
    if (!isLoggedIn) {
      alert('Please log in to send a message.');
      // Optionally, redirect to login page
      return;
    }

    if (!message.trim()) {
      setMessageError('Message cannot be empty');
      return;
    }

    try {
      // Make a POST request to store the message
      const response = await axios.post('http://localhost:5000/api/messages', {
        listingId: listing._id,
        userEmail: 'user@example.com', // Replace with actual user email (if available in your app)
        userName: userName,
        message: message
      });

      console.log('Message sent:', response.data); // Log the response from the server

      // Add the new message to the messages state
      setMessages([...messages, response.data]);

      // Clear the message input and close the modal
      setMessage('');
      handleModalClose();
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error (e.g., display error message)
    }
  };

  // Render loading state if listing is null
  if (!listing) return <div>Loading...</div>;

  return (
    <Container>
      <UserDashboardHeader />
      <Container sx={{ mt: '10rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" sx={{ fontFamily: 'Montserrat', fontWeight: '600', mb: '1rem' }}>
            {listing.title}
          </Typography>
          <div style={{ display: 'flex' }}>
            <Typography sx={{ textAlign: 'center', margin: 'auto' }}>
              <IosShareIcon />Share
            </Typography>
            <Typography sx={{ textAlign: 'center', margin: 'auto' }}>
              <FavoriteBorderIcon />Save
            </Typography>
          </div>
        </div>
        <Grid container spacing={2}>
          {listing.imageLinks.map((image, index) => (
            <Grid key={index} item xs={12} sm={12} md={12} lg={12}>
              <Card sx={{ borderRadius: '8px', boxShadow: 'none' }}>
                <CardMedia
                  component="img"
                  image={image}
                  alt={`Image ${index + 1}`}
                  style={{ width: '100%' }} // Adjust image size here
                />
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h6" sx={{ fontFamily: 'Montserrat', fontWeight: '600', mt: '1rem' }}>
          Property is in {listing.address}
        </Typography>
        <Typography variant="h7" sx={{ fontFamily: 'Montserrat' }}>
          {listing.guests} Guests | {listing.bedrooms} bedrooms | {listing.beds} beds
        </Typography>
      </Container>

      {/* Host information section */}
      <Container sx={{ display: 'flex', textAlign: 'center', mt: '1.2rem' }}>
        <img
          src="https://a0.muscache.com/im/pictures/user/f470b93c-487c-4e28-beea-b0ba801fb74e.jpg?im_w=240"
          alt="Profile"
          style={{
            borderRadius: '50%',
            width: '50px', // Adjust as needed
            height: '50px', // Adjust as needed
            objectFit: 'cover', // To maintain aspect ratio
            marginTop: '1rem'
          }}
        />
        <Typography sx={{ mt: '1.2rem', ml: '1rem' }}>
          <span style={{ fontWeight: '700' }}>Hosted By :</span> {listing.hostEmail}
        </Typography>
      </Container>

      {/* About this space section */}
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {/* Box on the left side */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              About This Space
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {listing.description}
            </Typography>
          </Grid>
          {/* Text on the right side */}
          <Grid item xs={12} sm={6} sx={{ fontFamily: 'Montserrat' }}>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
                ${listing.price} per night
              </Typography>
              <TextField
                fullWidth
                label="Check-in Date"
                type="date"
                InputLabelProps={{
                  shrink: true
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Check-out Date"
                type="date"
                InputLabelProps={{
                  shrink: true
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Number of Guests"
                type="number"
                value={guests}
                onChange={handleGuestsChange}
                InputProps={{ inputProps: { min: 1 } }}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" onClick={handleModalOpen} sx={{ backgroundColor: 'var(--red)' }} fullWidth>
                Reserve
              </Button>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Total Price: 
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Price per night: $ {listing.price}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Service Fee: $10
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Total Fee (before taxes): $160
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Modal for additional information */}
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-describedby="reservation-modal-description"
        closeAfterTransition
        // BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={modalOpen}>
          <Box
            sx={{
              backgroundColor: 'white',
              boxShadow: 24,
              padding: 4,
              borderRadius: 4,
              maxWidth: 400,
              margin: 'auto',
              marginTop: '10%'
            }}
          >
            <Typography id="reservation-modal-title" variant="h6" gutterBottom>
              Enter Your Information
            </Typography>
            <TextField
              fullWidth
              label="Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Contact Number"
              value={userContact}
              onChange={(e) => setUserContact(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" onClick={handleReserve} sx={{ backgroundColor: 'var(--red)', mr: 2 }}>
              Confirm Booking
            </Button>
            <Button variant="outlined" onClick={handleModalClose}>
              Cancel
            </Button>
          </Box>
        </Fade>
      </Modal>

      {/* Chatbox section */}
      <Container sx={{ py: 4 }}>
        <Typography variant="h5" gutterBottom>
          Send Message to Host
        </Typography>
        <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
          {/* Display messages */}
          {messages.map((msg, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
              <Typography variant="body1">
                <span style={{ fontWeight: 'bold' }}>{msg.userName}: </span>
                {msg.message}
              </Typography>
            </div>
          ))}
          {/* Input for new message */}
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            placeholder="Type your message..."
            value={message}
            onChange={handleMessageChange}
            error={!!messageError}
            helperText={messageError}
            sx={{ mt: 2 }}
          />
          <Button variant="contained" onClick={handleSendMessage} sx={{ backgroundColor: 'var(--red)', mt: 2 }}>
            Send
          </Button>
        </Paper>
      </Container>
    </Container>
  );
};

export default ListingDetailPage;
