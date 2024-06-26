import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress
} from '@mui/material';
import axios from 'axios';
import UserDashboardHeader from './userDashboardHeader';
import Footer from './footer';

const HostReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hostEmail = localStorage.getItem('userEmail'); // Retrieve the host email from local storage

    if (!hostEmail) {
      console.error('Host email not found in local storage.');
      setLoading(false);
      return;
    }

    const fetchReservations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reservations/${hostEmail}`);
        const reservationsData = response.data;

        // Fetch property details for each reservation
        const listingPromises = reservationsData.map(reservation =>
          axios.get(`http://localhost:5000/api/listings/${reservation.listingId}`)
        );

        const listings = await Promise.all(listingPromises);
        const reservationsWithListings = reservationsData.map((reservation, index) => ({
          ...reservation,
          listing: listings[index].data
        }));

        setReservations(reservationsWithListings);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reservations:', error);
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <UserDashboardHeader />
      <Container sx={{ mt: '2rem' }}>
        <Typography variant="h4" sx={{ fontFamily: 'Montserrat', fontWeight: '600', mb: '1rem' }}>
          Reservations for Host
        </Typography>
        <Grid container spacing={3}>
          {reservations.length === 0 ? (
            <Typography variant="body1" sx={{ fontFamily: 'Montserrat' }}>
              No reservations found.
            </Typography>
          ) : (
            reservations.map((reservation) => (
              <Grid key={reservation._id} item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontFamily: 'Montserrat', fontWeight: '600' }}>
                      {reservation.userName}
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'Montserrat' }}>
                      Email: {reservation.userEmail}
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'Montserrat' }}>
                      Contact: {reservation.userContact}
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'Montserrat' }}>
                      Check-in: {reservation.checkInDate}
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'Montserrat' }}>
                      Check-out: {reservation.checkOutDate}
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'Montserrat' }}>
                      Guests: {reservation.guests}
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'Montserrat', mt: 2 }}>
                      <strong>Property:</strong> {reservation.listing.title}
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'Montserrat' }}>
                      Address: {reservation.listing.address}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
      <Footer />
    </Container>
  );
};

export default HostReservationsPage;
