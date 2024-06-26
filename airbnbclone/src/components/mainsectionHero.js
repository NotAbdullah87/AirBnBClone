import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/bundle';
import { Grid, Typography, Box, Card, CardContent, CardMedia } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import '../index.css';
import { Link } from 'react-router-dom';
import Favorite from '@mui/icons-material/Favorite';
const MainSectionHero = () => {
    const [activeButton, setActiveButton] = useState('Beach');
    const [products, setProducts] = useState([]);

    const buttons = [
        { id: 'Beach', icon: <BeachAccessIcon sx={{color:"#cccccc"}} />, text: 'Beach' },
        { id: 'locations', icon: <LocationOnIcon   sx={{color:"#cccccc"}}/>, text: 'Locations' },
        { id: 'events', icon: <EventIcon   sx={{color:"#cccccc"}}/>, text: 'Events' },
        { id: 'people', icon: <PeopleAltIcon  sx={{color:"#cccccc"}} />, text: 'People' },
    ];

    useEffect(() => {
        // Fetch the data from the API
        axios.get('http://localhost:5000/api/getALLlistings')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the listings!", error);
            });
    }, []);

    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId);
    };

    return (
        <Box sx={{ margin: 'auto', fontFamily: 'Montserrat !important', mt: "1rem" }}>
            <Swiper
                spaceBetween={5}
                breakpoints={{
                    640: {
                        slidesPerView: 4,
                    },
                    768: {
                        slidesPerView: 4,
                    },
                    1024: {
                        slidesPerView: 6,
                    },
                }}
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
            {/* Display all products */}
            <Grid container spacing={2} sx={{ marginTop: '16px' }}>
           
                {products.map((product) => (
                    <Grid key={product.id} item xs={12} sm={6} md={4} lg={4}>
                          <Link to={`/listing/${product._id}`} style={{ textDecoration: 'none' }}>
            <Card sx={{ position: 'relative', borderRadius: '8px', boxShadow: 'none' }}>
              <CardMedia
                component="img"
                image={product.imageLinks[0]}
                alt={product.title}
                sx={{ height: 250, objectFit: 'cover' }}
              />
              {/* Favorite icon */}
              <Favorite
                style={{
                  position: 'absolute',
                  top: '10px', // Adjust as per your design
                  right: '10px', // Adjust as per your design
                  zIndex: 1,
                  color: 'var(--red)',
                  backgroundColor: 'white'
                  ,borderRadius:"100px",
                  padding:"3px",
                  opacity:"50%"
                }}
              />
              <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography textAlign={'left'} variant="h6" fontFamily={'Montserrat'}>
                    {product.title}
                  </Typography>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <StarIcon />
                    <Typography>{product.rating}</Typography>
                  </div>
                </div>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">
                    {product.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.bedrooms} Bedrooms
                  </Typography>
                </div>
                <Typography>
                  <span style={{ fontWeight: '700' }}>${product.price}</span> night
                </Typography>
              </CardContent>
            </Card>
          </Link>
                    </Grid>

                    
                ))}
            </Grid>
        </Box>
    );
};

export default MainSectionHero;
