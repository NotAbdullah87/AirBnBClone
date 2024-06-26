import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Box, Grid, Card, CardContent, CardMedia } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import Footer from './footer';
import UserDashboardHeader from './userDashboardHeader';

const StaysPage = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  
  useEffect(() => {
    // Check if user email exists in localStorage
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      navigate('/'); // Navigate to homepage if user email doesn't exist
    } else {
      // Fetch reservations for the user with userEmail
      axios.get(`http://localhost:5000/api/UserStays/${userEmail}`)
        .then(response => {
          setReservations(response.data);
        })
        .catch(error => {
          console.error('Error fetching reservations:', error);
          // Handle error (e.g., show error message)
        });
    }
  }, [navigate]);

  return (
    <div>
        <UserDashboardHeader />
    <Box sx={{ margin: 'auto', maxWidth: 1200, padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Your Reservations
      </Typography>
      <Grid container spacing={2}>
        {reservations.map((reservation) => (
          <Grid key={reservation.id} item xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia
                component="img"
                image={reservation.imageLinks}
                alt={reservation.propertyName}
                sx={{ height: 200, objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6">{reservation.propertyName}</Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {reservation.propertyLocation}
                </Typography>
                <Typography variant="body2">{reservation.checkInDate} - {reservation.checkOutDate}</Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <StarIcon />
                  <Typography>{reservation.rating}</Typography>
                </div>
                <Typography>
                  <span style={{ fontWeight: '700' }}>${reservation.price}</span> per night
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>

    <Footer />
    </div>
  );
};

export default StaysPage;
