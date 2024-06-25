import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/bundle';
import { Grid, Typography, Box, Card, CardContent, CardMedia } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import StarIcon from '@mui/icons-material/Star';
import '../index.css';

// Mock product data with images, descriptions, and tags
const productsData = [
  { id: 1, name: 'Tiracol, India', image: 'https://a0.muscache.com/im/pictures/7a0e4e5f-ce39-485a-b8d3-cc95c2c81a7e.jpg?im_w=720', description: 'Near Beach', rating: '4.8', price: "150", startDate: 'June 1', endDate: "June 7", tags: ['Beach'] },
  { id: 2, name: 'Umargam, India', image: 'https://a0.muscache.com/im/pictures/04159340-c713-4f6c-a417-66070e4596f0.jpg?im_w=720', description: 'Coastal Haven', rating: '4.7', price: "140", startDate: 'June 8', endDate: "June 14", tags: ['Beach'] },
  { id: 3, name: 'Mountain Retreat', image: 'https://a0.muscache.com/im/pictures/miso/Hosting-1062711922476606416/original/cd1b101d-a49b-478a-a23b-34ba3c6be876.jpeg?im_w=720', description: 'Peaceful Mountain Getaway', rating: '4.9', price: "160", startDate: 'July 1', endDate: "July 7", tags: ['locations'] },
  { id: 4, name: 'City Lights', image: 'https://a0.muscache.com/im/pictures/f0ea4cba-c771-41b6-92c5-caa646edb513.jpg?im_w=720', description: 'Downtown Apartment', rating: '4.6', price: "130", startDate: 'July 8', endDate: "July 14", tags: ['locations'] },
  { id: 5, name: 'Lake House', image: 'https://a0.muscache.com/im/pictures/miso/Hosting-853189955208971108/original/aab48bd2-edb0-4ffd-87a3-f5cc7d7c3be2.jpeg?im_w=720', description: 'Lakefront Cottage', rating: '4.5', price: "120", startDate: 'August 1', endDate: "August 7", tags: ['favorites'] },
  { id: 6, name: 'Desert Oasis', image: 'https://a0.muscache.com/im/pictures/d3b2b902-6143-46e1-90fc-f6eee6f66e42.jpg?im_w=720', description: 'Desert Bungalow', rating: '4.7', price: "110", startDate: 'August 8', endDate: "August 14", tags: ['favorites'] },
  { id: 7, name: 'Cultural Hub', image: 'https://a0.muscache.com/im/pictures/miso/Hosting-694576369161952366/original/0f692363-ea7b-4710-89d6-ad4bef9c4528.jpeg?im_w=720', description: 'Historic Downtown', rating: '4.8', price: "140", startDate: 'September 1', endDate: "September 7", tags: ['events'] },
  { id: 8, name: 'Country Farmhouse', image: 'https://a0.muscache.com/im/pictures/miso/Hosting-668620215138733009/original/cdf158ed-b31c-40cc-8305-d8d1ef1b588e.jpeg?im_w=720', description: 'Quiet Countryside', rating: '4.9', price: "150", startDate: 'September 8', endDate: "September 14", tags: ['events'] },
  { id: 9, name: 'Riverside Cabin', image: 'https://a0.muscache.com/im/pictures/944b9510-945e-47cd-bd7d-bc1b5b94ba4b.jpg?im_w=720', description: 'Secluded River Cabin', rating: '4.8', price: "130", startDate: 'October 1', endDate: "October 7", tags: ['people'] },
  { id: 10, name: 'Urban Flat', image: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-989225924012535287/original/aa2962a9-e51c-44c9-8a20-79e9a8d36b02.jpeg?im_w=720', description: 'Modern City Flat', rating: '4.6', price: "140", startDate: 'October 8', endDate: "October 14", tags: ['people'] },
  { id: 11, name: 'Forest Lodge', image: 'https://a0.muscache.com/im/pictures/miso/Hosting-3298227/original/db91b151-be3e-4a4c-8790-ed64c0ac7698.jpeg?im_w=720', description: 'Cabin in the Woods', rating: '4.7', price: "150", startDate: 'November 1', endDate: "November 7", tags: ['people'] },
  { id: 12, name: 'Tropical Paradise', image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53356377/original/92fe34bc-bf42-4bc0-a361-a08353e0ec12.jpeg?im_w=720', description: 'Beachfront Resort', rating: '5.0', price: "200", startDate: 'November 8', endDate: "November 14", tags: ['Beach'] },
];

const MainSectionHero = () => {
  const [activeButton, setActiveButton] = useState('Beach');

  const buttons = [
    { id: 'Beach', icon: <BeachAccessIcon />, text: 'Beach' },
    { id: 'locations', icon: <LocationOnIcon />, text: 'Locations' },
    { id: 'events', icon: <EventIcon />, text: 'Events' },
    { id: 'people', icon: <PeopleAltIcon />, text: 'People' },
  ];

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  const filteredProducts = productsData.filter(product => product.tags.includes(activeButton));

  return (
    <Box sx={{ margin: 'auto', fontFamily: 'Montserrat !important', mt: "2rem" }}>
      <Swiper
        spaceBetween={5}
        breakpoints={{
          // when window width is >= 640px
          640: {
            slidesPerView: 4,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 4,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 6,
          },
        }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {buttons.map((button) => (
          <SwiperSlide key={button.id}>
            <Grid
              container
              direction="column"
              alignItems="center"
              spacing={1}
              sx={{
                borderRadius: '0px',
                padding: '16px',
                textAlign: 'center',
                cursor: 'pointer',
                borderBottom: activeButton === button.id ? '4px solid #000' : '0px solid #ccc',
              }}
              onClick={() => handleButtonClick(button.id)}
            >
              <Grid item>{button.icon}</Grid>
              <Grid item>
                <Typography align="center" variant="body1">
                  {button.text}
                </Typography>
              </Grid>
            </Grid>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Filtered product list based on activeButton */}
      <Grid container spacing={2} sx={{ marginTop: '16px' }}>
        {filteredProducts.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ borderRadius: '8px', boxShadow: 'none' }}>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{ height: 250, objectFit: 'cover' }}
              />
              <CardContent>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography textAlign={'left'} variant="h6" fontFamily={'Montserrat'}>{product.name}</Typography>
                  <span style={{ display: "flex" }}> <StarIcon />
                    <Typography>{product.rating}</Typography></span>
                </div>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {product.startDate} - {product.endDate}
                </Typography>
                <Typography><span style={{ fontWeight: "700" }}>${product.price}</span> night</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MainSectionHero;
