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

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [editListing, setEditListing] = useState(null); // State to manage currently edited listing
  const [openEditDialog, setOpenEditDialog] = useState(false); // State to control edit dialog visibility

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

  return (
    <div>
      <UserDashboardHeader />
      <Container sx={{ mt: '10rem' }}>
        <Typography variant='h4' sx={{ fontFamily: 'Montserrat' }}>My Listings</Typography>
        <Grid container spacing={2} sx={{ marginTop: '16px' }}>
          {listings.map((listing) => (
            <Grid key={listing._id} item xs={12} sm={6} md={4} lg={3}>
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
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                  <Typography variant="caption" color="text.secondary">
                    {listing.address} 
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {listing.bedrooms} Bedrooms
                  </Typography>
                  </div>
                  <Typography><span style={{ fontWeight: "700" }}>${listing.price}</span> night</Typography>
                  <Button variant="outlined" onClick={() => handleEditClick(listing)} sx={{mt:"1rem",color:"black",fontFamily:"Montserrat",
                border:"1px solid black"}}>Edit Listing</Button>
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
          <Button onClick={handleEditDialogClose} sx={{color:"black"}}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained" sx={{backgroundColor:"var(--red)"}}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyListings;
