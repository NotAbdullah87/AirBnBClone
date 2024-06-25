import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import axios from 'axios';

const ListingDetailPage = () => {
  const { id } = useParams(); // Get the listing ID from the URL parameter
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/listings/${id}`);
        setListing(response.data);
      } catch (error) {
        console.error('Error fetching listing details:', error);
      }
    };

    fetchListing();
  }, [id]);

  if (!listing) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h4">{listing.title}</Typography>
      <Typography variant="body1">{listing.description}</Typography>
      {/* Render other details as needed */}
    </Container>
  );
};

export default ListingDetailPage;
