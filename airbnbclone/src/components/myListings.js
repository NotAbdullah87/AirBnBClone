// import React, { useState, useEffect } from 'react';
// import UserDashboardHeader from './userDashboardHeader';
// import {
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
// } from '@mui/material';
// import StarIcon from '@mui/icons-material/Star';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// const MyListings = () => {
//   const [listings, setListings] = useState([]);
//   const [editListing, setEditListing] = useState(null); // State to manage currently edited listing
//   const [openEditDialog, setOpenEditDialog] = useState(false); // State to control edit dialog visibility
//   const navigate = useNavigate();
//   useEffect(() => {
//     // Fetch listings on component mount
//     fetchListings();
//   }, []);

//   const fetchListings = async () => {
//     try {
//       const hostEmail = localStorage.getItem('userEmail');
//       const response = await axios.get(`http://localhost:5000/api/listings?hostEmail=${hostEmail}`);
//       setListings(response.data);
//     } catch (error) {
//       console.error('Error fetching listings:', error);
//       // Handle error cases (e.g., show error message to user)
//     }
//   };

//   const handleEditClick = (listing) => {
//     setEditListing(listing);
//     setOpenEditDialog(true);
//   };

//   const handleEditSubmit = async () => {
//     try {
//       // Make API call to update the listing on the server
//       await axios.put(`http://localhost:5000/api/listings/${editListing._id}`, editListing);
//       // Close the edit dialog and fetch updated listings
//       setOpenEditDialog(false);
//       fetchListings();
//     } catch (error) {
//       console.error('Error updating listing:', error);
//       // Handle error cases (e.g., show error message to user)
//     }
//   };

//   const handleViewMyReservations = () =>{
//     navigate('/viewReservations')
//   }
//   const handleEditDialogClose = () => {
//     setOpenEditDialog(false);
//     setEditListing(null);
//   };

//   const handleInputChange = (e) => {
//     setEditListing({ ...editListing, [e.target.name]: e.target.value });
//   };

//   return (
//     <div>
//       <UserDashboardHeader />
//       <Container sx={{ mt: '10rem' }}>
//         <div style={{display:"flex",justifyContent:"space-between"}}>
//         <Typography variant='h4' sx={{ fontFamily: 'Montserrat' }}>My Listings</Typography>
//         <Button variant="outlined" onClick={handleViewMyReservations} sx={{mt:"1rem",color:"black",fontFamily:"Montserrat",
//                 border:"1px solid black"}}>View Reservations</Button>
//                 </div>
//         <Grid container spacing={2} sx={{ marginTop: '16px' }}>
//           {listings.map((listing) => (
//             <Grid key={listing._id} item xs={12} sm={6} md={4} lg={4}>
//               <Card sx={{ borderRadius: '8px', boxShadow: 'none' }}>
//                 <CardMedia
//                   component="img"
//                   image={listing.imageLinks[0]}
//                   alt={listing.title}
//                   sx={{ height: 250, objectFit: 'cover' }}
//                 />
//                 <CardContent>
//                   <div style={{ display: "flex", justifyContent: "space-between" }}>
//                     <Typography textAlign={'left'} variant="h6" fontFamily={'Montserrat'}>{listing.title}</Typography>
//                     <span style={{ display: "flex" }}>
//                       <StarIcon />
//                       <Typography>{listing.rating}</Typography>
//                     </span>
//                   </div>
//                   <Typography variant="body2" color="text.secondary">
//                     {listing.description}
//                   </Typography>
//                   <div style={{display:"flex",justifyContent:"space-between"}}>
//                   <Typography variant="caption" color="text.secondary">
//                     {listing.address} 
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {listing.bedrooms} Bedrooms
//                   </Typography>
//                   </div>
//                   <Typography><span style={{ fontWeight: "700" }}>${listing.price}</span> night</Typography>
//                   <Button variant="outlined" onClick={() => handleEditClick(listing)} sx={{mt:"1rem",color:"black",fontFamily:"Montserrat",
//                 border:"1px solid black"}}>Edit Listing</Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>

//       {/* Edit Listing Dialog */}
//       <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
//         <DialogTitle>Edit Listing</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="title"
//             name="title"
//             label="Title"
//             fullWidth
//             value={editListing?.title || ''}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             id="description"
//             name="description"
//             label="Description"
//             fullWidth
//             multiline
//             rows={4}
//             value={editListing?.description || ''}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             id="price"
//             name="price"
//             label="Price per night ($)"
//             type="number"
//             fullWidth
//             value={editListing?.price || ''}
//             onChange={handleInputChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleEditDialogClose} sx={{color:"black"}}>Cancel</Button>
//           <Button onClick={handleEditSubmit} variant="contained" sx={{backgroundColor:"var(--red)"}}>Save Changes</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default MyListings;


import React, { useState, useEffect } from 'react';
import UserDashboardHeader from './userDashboardHeader';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [editListing, setEditListing] = useState(null); // State to manage currently edited listing
  const [openEditDialog, setOpenEditDialog] = useState(false); // State to control edit dialog visibility
  const [messages, setMessages] = useState([]); // State to store messages for a listing
  const [openMessagesDialog, setOpenMessagesDialog] = useState(false); // State to control messages dialog visibility
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch listings on component mount
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const hostEmail = localStorage.getItem('userEmail');
      const response = await axios.get(`http://localhost:5000/api/listings?hostEmail=${hostEmail}`);
      setListings(response.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
      // Handle error cases (e.g., show error message to user)
    }
  };

  const handleEditClick = (listing) => {
    setEditListing(listing);
    setOpenEditDialog(true);
  };

  const handleViewMessages = async (listingId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/messages/${listingId}`);
      setMessages(response.data);
      setOpenMessagesDialog(true);
    } catch (error) {
      console.error('Error fetching messages:', error);
      // Handle error cases (e.g., show error message to user)
    }
  };

  const handleClearConversation = async (listingId) => {
    console.log(listingId)
    try {
      await axios.delete(`http://localhost:5000/api/messages/clear/${listingId}`);
      setMessages([]); // Clear messages state locally
    } catch (error) {
      console.error('Error clearing conversation:', error);
      // Handle error cases (e.g., show error message to user)
    }
  };

  const handleEditSubmit = async () => {
    try {
      // Make API call to update the listing on the server
      await axios.put(`http://localhost:5000/api/listings/${editListing._id}`, editListing);
      // Close the edit dialog and fetch updated listings
      setOpenEditDialog(false);
      fetchListings();
    } catch (error) {
      console.error('Error updating listing:', error);
      // Handle error cases (e.g., show error message to user)
    }
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setEditListing(null);
  };

  const handleInputChange = (e) => {
    setEditListing({ ...editListing, [e.target.name]: e.target.value });
  };

  const handleCloseMessagesDialog = () => {
    setOpenMessagesDialog(false);
    setMessages([]); // Clear messages when dialog is closed
  };

  return (
    <div>
      <UserDashboardHeader />
      <Container sx={{ mt: '10rem' }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant='h4' sx={{ fontFamily: 'Montserrat' }}>My Listings</Typography>
          <Button variant="outlined" onClick={() => navigate('/viewReservations')} sx={{ mt: "1rem", color: "black", fontFamily: "Montserrat", border: "1px solid black" }}>View Reservations</Button>
        </div>
        <Grid container spacing={2} sx={{ marginTop: '16px' }}>
          {listings.map((listing) => (
            <Grid key={listing._id} item xs={12} sm={6} md={4} lg={4}>
              <Card sx={{ borderRadius: '8px', boxShadow: 'none' }}>
                <CardMedia
                  component="img"
                  image={listing.imageLinks[0]}
                  alt={listing.title}
                  sx={{ height: 250, objectFit: 'cover' }}
                />
                <CardContent>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography textAlign={'left'} variant="h6" fontFamily={'Montserrat'}>{listing.title}</Typography>
                    <span style={{ display: "flex" }}>
                      <StarIcon />
                      <Typography>{listing.rating}</Typography>
                    </span>
                  </div>
                  <Typography variant="body2" color="text.secondary">
                    {listing.description}
                  </Typography>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="caption" color="text.secondary">
                      {listing.address}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {listing.bedrooms} Bedrooms
                    </Typography>
                  </div>
                  <Typography><span style={{ fontWeight: "700" }}>${listing.price}</span> night</Typography>
                  <Button variant="outlined" onClick={() => handleEditClick(listing)} sx={{ mt: "1rem", color: "black", fontFamily: "Montserrat", border: "1px solid black" }}>Edit Listing</Button>
                  <Button variant="outlined" onClick={() => handleViewMessages(listing._id)} sx={{ mt: "1rem", color: "black", fontFamily: "Montserrat", border: "1px solid black" }}>View Messages</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Edit Listing Dialog */}
      <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Listing</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Title"
            fullWidth
            value={editListing?.title || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="description"
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={editListing?.description || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="price"
            name="price"
            label="Price per night ($)"
            type="number"
            fullWidth
            value={editListing?.price || ''}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} sx={{ color: "black" }}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained" sx={{ backgroundColor: "var(--red)" }}>Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* Messages Dialog */}
      <Dialog open={openMessagesDialog} onClose={handleCloseMessagesDialog}>
        <DialogTitle>Messages</DialogTitle>
        <DialogContent>
          {messages.map((message, index) => (
            <div key={index}>
              <Typography variant="body1">{message.message}</Typography>
              <Typography variant="caption" color="text.secondary">Sent by: {message.userEmail}</Typography>
              <hr />
            </div>
          ))}
          {messages.length === 0 && <Typography variant="body1">No messages yet.</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClearConversation(editListing)} variant="contained" sx={{ backgroundColor: "var(--red)" }}>Clear Conversation</Button>
          <Button onClick={handleCloseMessagesDialog} sx={{ color: "black" }}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyListings;
