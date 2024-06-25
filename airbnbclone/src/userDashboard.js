import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you use React Router for navigation
import UserDashboardHeader from './components/userDashboardHeader';
import { Container, Typography, TextField, Grid, Card, CardContent, CardMedia, InputAdornment,Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const UserDashboard = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getALLlistings');
      setListings(response.data);
      setFilteredListings(response.data); // Initialize filtered listings with all listings
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [listings, filterPrice, searchTerm]);

  const applyFilters = () => {
    let filtered = listings;

    // Filter by search term (assuming it matches title or location)
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(listing =>
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price
    if (filterPrice.trim() !== '') {
      filtered = filtered.filter(listing => listing.price <= parseInt(filterPrice));
    }

    setFilteredListings(filtered);
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handlePriceFilterChange = event => {
    setFilterPrice(event.target.value);
  };

  return (
    <>
      <UserDashboardHeader />
      <Container sx={{ mt: '10rem' }}>
        <Typography sx={{ fontFamily: "Montserrat", fontWeight: '700', mb: "2rem" }}>Find Your Next Destination</Typography>
        {/* Search Bar */}
        <TextField
          label="Search by title or location"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <span style={{ backgroundColor: 'var(--red)', borderRadius: "10rem", paddingLeft: "1rem", paddingRight: "1rem", paddingTop: '0.3rem' }}> <SearchIcon sx={{ color: "white" }} /> </span>
              </InputAdornment>
            )
          }}
          sx={{ mt: '1rem' }}
        />

        {/* Price Filter */}
        <TextField
          type="number"
          label="Filter by max price"
          fullWidth
          value={filterPrice}
          onChange={handlePriceFilterChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                $
              </InputAdornment>
            )
          }}
          sx={{ mt: '1rem', width: 'fit-content' }}
        />

        {/* Listings */}
        <Grid container spacing={2} sx={{ marginTop: '16px' }}>
          {filteredListings.map((listing) => (
            <Grid key={listing._id} item xs={12} sm={6} md={4} lg={3}>
                 <Link to={`/listing/${listing._id}`} style={{ textDecoration: 'none' }}>
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
                  {/* Button or Link to Detail Page */}
               
                    
                 
                </CardContent>
              </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default UserDashboard;
