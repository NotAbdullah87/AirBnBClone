import React, { useState } from 'react';
import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography, Checkbox, IconButton,Slider } from '@mui/material';
import HouseIcon from '@mui/icons-material/House';
import ApartmentIcon from '@mui/icons-material/Apartment';
// import BoatIcon from '@mui/icons-material/Boat';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PrivateIcon from '@mui/icons-material/SingleBed';
import SharedIcon from '@mui/icons-material/Group';
import { useNavigate } from 'react-router-dom';
import House from '@mui/icons-material/House';
import video1 from './vid1.mp4'
import img1 from './Screenshot 2024-06-25 100716.png'
import UserDashboardHeader from '../userDashboardHeader';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import axios from 'axios';

const icons = {
  house: <HouseIcon />,
  apartment: <ApartmentIcon />,
  // Add more icons for other property types as needed
};

const Step1 = () => {
    const navigate = useNavigate();

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState('');
  const [guestType, setGuestType] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [guests, setGuests] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [beds, setBeds] = useState('');
  const [lockType, setLockType] = useState('');
  const [bathroomType, setBathroomType] = useState('');
  const [address, setAddress] = useState('');
  const [presence, setPresence] = useState({
    me: false,
    family: false,
    otherGuests: false,
    roommates: false,
  });
  const [imageLinks, setImageLinks] = useState(['']);
  const [price, setPrice] = useState(15);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };

  const handlePublish =async () => {
    const data = {
        title,
        description,
        propertyType,
        guestType,
        address,
        guests,
        bedrooms,
        beds,
        lockType,
        bathroomType,
        presence,
        imageLinks,
        price,
        hostEmail: localStorage.getItem('userEmail'), // Assuming you stored the user's email in localStorage
      };
    
      try {
        const response = await axios.post('http://localhost:5000/api/publishListing', data);
        console.log('Listing published successfully:', response.data);
        alert('Listing Publish Successful')
        navigate('/myListings')
        // Optionally, you can handle success feedback or navigate to another page
      } catch (error) {
        console.error('Error publishing listing:', error);
        // Handle error cases (e.g., show error message to user)
      }
  };
  
  const handleNext = () => {
    if (step === 1) {
      // Validate step 1 data if needed
      setStep(2);
    } else if (step === 2) {
      // Validate step 2 data if needed
      setStep(3);
    } else if (step === 3) {
      // Validate step 3 data if needed
      setStep(4);
    } else if (step === 4) {
      // Validate step 4 data if needed
      setStep(5);
    } else if (step === 5) {
      // Validate step 5 data if needed
      setStep(6);
    } else if (step === 6) {
      // Validate step 6 data if needed
      setStep(7);
    } else if (step === 7) {
      // Validate step 7 data if needed
      setStep(8);
    } else if (step === 8) {
      // Validate step 8 data if needed
      setStep(9);
    } else if (step === 9) {
      // Validate step 9 data if needed
      setStep(10)
    }else if (step == 10){

    }
  };
  const handlePresenceChange = (event) => {
    setPresence({
      ...presence,
      [event.target.name]: event.target.checked,
    });
    console.log(presence)
  };
  const handleImageLinkChange = (index, event) => {
    const newImageLinks = [...imageLinks];
    newImageLinks[index] = event.target.value;
    setImageLinks(newImageLinks);
  };

  const handleAddImageLink = () => {
    setImageLinks([...imageLinks, '']);
  };

  const handleRemoveImageLink = (index) => {
    const newImageLinks = [...imageLinks];
    newImageLinks.splice(index, 1);
    setImageLinks(newImageLinks);
  };
  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Container maxWidth="md">
            <UserDashboardHeader />
            <Box mt={10}>
                <Grid container spacing={2} mt={4}>
                    <Grid item xs={12} md ={6} sx={{mt:{xs:'1rem',sm:"10rem"}}}>
                    <Typography variant="h4" gutterBottom sx={{fontFamily:"Montserrat",fontWeight:700}}>Step 1: Tell us about your place</Typography>
                     <Typography variant="subtitle1"  sx={{fontFamily:"Montserrat"}}>In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room.</Typography>
                     </Grid>
                    <Grid item xs={12} md={6}>    
                  <img width={"100%"} src={img1}></img>
           </Grid>
                        
                </Grid>
              </Box>
            {/* <Grid container spacing={2} mt={4}>
              <Grid item xs={12} md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Which type of property do you have?</FormLabel>
                  <RadioGroup
                    aria-label="propertyType"
                    name="propertyType"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <FormControlLabel value="house" control={<Radio />} label="House" icon={icons.house} />
                      </Grid>
                      <Grid item xs={4}>
                        <FormControlLabel value="apartment" control={<Radio />} label="Apartment" icon={icons.apartment} />
                      </Grid>
                      <Grid item xs={4}>
                        <FormControlLabel value="boat" control={<Radio />} label="Boat" icon={icons.boat} />
                      </Grid>
                    
                    </Grid>
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="How many guests can stay?"
                  variant="outlined"
                  type="number"
                  value={guestType}
                  onChange={(e) => setGuestType(e.target.value)}
                />
              </Grid>
            </Grid> */}
            <Box mt={4} display="flex" justifyContent="flex-end">
              <Button variant="contained" style={{backgroundColor:"black",color:"white"}} onClick={handleNext}>Next</Button>
            </Box>
          </Container>
        );

      case 2:
        return (
          <Container maxWidth="md">
            <UserDashboardHeader />
            <Box mt={20}>
              <Typography variant="h4" gutterBottom sx={{fontFamily:"Montserrat",fontWeight:700}}>Step 2: Which of these best describes your place?</Typography>
              <Typography variant="subtitle1"sx={{fontFamily:"Montserrat"}}>Choose the type of place that best describes your listing.</Typography>
            </Box>
            <Grid container spacing={2} mt={4}>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="propertyType"
                    name="propertyType"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  >
                    <Grid container spacing={2}>
                      {Object.keys(icons).map(key => (
                        <Grid item xs={4} key={key}>
                          <FormControlLabel value={key} control={<Radio />} label={key.charAt(0).toUpperCase() + key.slice(1)} icon={icons[key]} />
                        </Grid>
                      ))}
                    </Grid>
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Box mt={4} display="flex" justifyContent="space-between">
              <Button variant="contained" color="primary" onClick={handlePrevious} style={{backgroundColor:"black"}}>Previous</Button>
              <Button variant="contained" color="primary" onClick={handleNext} style={{backgroundColor:"black"}}>Next</Button>
            </Box>
          </Container>
        );

      case 3:
        return (
          <Container maxWidth="md">
            <UserDashboardHeader />
            <Box mt={14}>
              <Typography variant="h4" gutterBottom sx={{fontFamily:"Montserrat",fontWeight:700}}>Step 3: What type of place will guests have?</Typography>
              <Typography variant="subtitle1">Choose the type of accommodation you will offer to guests.</Typography>
            </Box>
            <Grid container spacing={2} mt={4}>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="guestType"
                    name="guestType"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  >
                    <FormControlLabel value="room" control={<Radio />} label="A room" />
                    <FormControlLabel value="shared-room" control={<Radio />} label="A shared room" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Box mt={4} display="flex" justifyContent="space-between">
             <Button variant="contained" color="primary" onClick={handlePrevious} style={{backgroundColor:"black"}}>Previous</Button>
              <Button variant="contained" color="primary" onClick={handleNext} style={{backgroundColor:"black"}}>Next</Button>
            </Box>
          </Container>
        );

      case 4:
        return (
          <Container maxWidth="md">
            <UserDashboardHeader />
            <Box mt={14}>
              <Typography variant="h4" gutterBottom sx={{fontFamily:"Montserrat",fontWeight:700}}>Step 4: Where's your place located?</Typography>
              <Typography variant="subtitle1" sx={{fontFamily:"Montserrat"}}>Your address is only shared with guests after they’ve made a reservation.</Typography>
              {/* Integrate map component for address entry */}
              <TextField
            placeholder="Enter your property address"
            fullWidth
            value={address}
            onChange={handleAddressChange}
            sx={{ mt: 2 }}
          />
            </Box>
            {/* Map component and address entry */}
            <Typography>Enter Property Title</Typography>
            <TextField
            placeholder="enter title here .... "
            fullWidth
            value={title}
            onChange={handleTitleChange}
            sx={{ mt: 2 }}
          />
            <Typography>Enter Description</Typography>
            <TextField
            placeholder="enter description here ...."
            fullWidth
            value={description}
            onChange={handleDescriptionChange}
            sx={{ mt: 2 }}
          />
            <Box mt={4} display="flex" justifyContent="space-between">
             <Button variant="contained" color="primary" onClick={handlePrevious} style={{backgroundColor:"black"}}>Previous</Button>
              <Button variant="contained" color="primary" onClick={handleNext} style={{backgroundColor:"black"}}>Next</Button>
            </Box>
          </Container>
        );

      case 5:
        return (
          <Container maxWidth="md">
            <UserDashboardHeader />
            <Box mt={14}>
              <Typography variant="h4" gutterBottom sx={{fontFamily:"Montserrat",fontWeight:700}}>Step 5: Let's start with the basics</Typography>
              <Typography variant="subtitle1" sx={{fontFamily:"Montserrat"}}>Provide some basic details about your property.</Typography>
            </Box>
            <Grid container spacing={2} mt={4}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Guests"
                  variant="outlined"
                  type="number"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Bedrooms"
                  variant="outlined"
                  type="number"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Beds"
                  variant="outlined"
                  type="number"
                  value={beds}
                  onChange={(e) => setBeds(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Does every bedroom have a lock?</FormLabel>
                  <RadioGroup
                    aria-label="lockType"
                    name="lockType"
                    value={lockType}
                    onChange={(e) => setLockType(e.target.value)}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" icon={<LockIcon />} />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel value="no" control={<Radio />} label="No" icon={<LockOpenIcon />} />
                      </Grid>
                    </Grid>
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Box mt={4} display="flex" justifyContent="space-between">
             <Button variant="contained" color="primary" onClick={handlePrevious} style={{backgroundColor:"black"}}>Previous</Button>
              <Button variant="contained" color="primary" onClick={handleNext} style={{backgroundColor:"black"}}>Next</Button>
            </Box>
          </Container>
        );

      case 6:
        return (
          <Container maxWidth="md">
            <UserDashboardHeader />
            <Box mt={14}>
              <Typography variant="h4" gutterBottom sx={{fontFamily:"Montserrat",fontWeight:700}}>Step 6: What kind of bathrooms are available to guests?</Typography>
              <Typography variant="subtitle1" sx={{fontFamily:"Montserrat"}}>Describe the bathroom setup for your guests.</Typography>
            </Box>
            <Grid container spacing={2} mt={4}>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="bathroomType"
                    name="bathroomType"
                    value={bathroomType}
                    onChange={(e) => setBathroomType(e.target.value)}
                  >
                    <FormControlLabel value="private" control={<Radio />} label="Private and attached" icon={<PrivateIcon />} />
                    <FormControlLabel value="dedicated" control={<Radio />} label="Dedicated" icon={<PrivateIcon />} />
                    <FormControlLabel value="shared" control={<Radio />} label="Shared" icon={<SharedIcon />} />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Box mt={4} display="flex" justifyContent="space-between">
             <Button variant="contained" color="primary" onClick={handlePrevious} style={{backgroundColor:"black"}}>Previous</Button>
              <Button variant="contained" color="primary" onClick={handleNext} style={{backgroundColor:"black"}}>Next</Button>
            </Box>
          </Container>
        );

      case 7:
        return (
          <Container maxWidth="md">
            <UserDashboardHeader />
            <Box mt={14}>
          <Typography variant="h4" gutterBottom sx={{fontFamily:"Montserrat",fontWeight:"700"}}>Step 7: Who else might be there?</Typography>
          <Typography variant="body1" sx={{fontFamily:"Montserrat"}}>
            Guests need to know whether they’ll encounter other people during their stay.
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={presence.me}
                onChange={handlePresenceChange}
                name="me"
              />
            }
            label="Me"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={presence.family}
                onChange={handlePresenceChange}
                name="family"
                sx={{fontFamily:"Montserrat",fontWeight:"700"}}
              />
            }
            label="My family"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={presence.otherGuests}
                onChange={handlePresenceChange}
                name="otherGuests"
              />
            }
            label="Other guests"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={presence.roommates}
                onChange={handlePresenceChange}
                name="roommates"
              />
            }
            label="Roommates"
          />
          </Box>
            <Box mt={4} display="flex" justifyContent="space-between">
             <Button variant="contained" color="primary" onClick={handlePrevious} style={{backgroundColor:"black"}}>Previous</Button>
              <Button variant="contained" color="primary" onClick={handleNext} style={{backgroundColor:"black"}}>Next</Button>
            </Box>
          </Container>
        );

        case 8:
            return (
              <Container maxWidth="md">
                <UserDashboardHeader />
                <UserDashboardHeader />
                <Box mt={14}>
            <Typography variant="h4"  sx={{fontFamily:"Montserrat",fontWeight:"700"}}>Step 8: Add Images of Your Property</Typography>
            <Typography variant="body1"  sx={{fontFamily:"Montserrat"}}>
              Please insert the links of the images of your property.
            </Typography>
            {imageLinks.map((link, index) => (
              <Box key={index} display="flex" alignItems="center" mt={2}>
                <TextField
                  placeholder="Enter image link"
                  fullWidth
                  value={link}
                  onChange={(e) => handleImageLinkChange(index, e)}
                />
                <IconButton color="primary" onClick={handleAddImageLink}>
                  <AddCircleIcon />
                </IconButton>
                {imageLinks.length > 1 && (
                  <IconButton color="secondary" onClick={() => handleRemoveImageLink(index)}>
                    <RemoveCircleIcon />
                  </IconButton>
                )}
              </Box>
            ))}
       <Box mt={4} display="flex" justifyContent="space-between">
             <Button variant="contained" color="primary" onClick={handlePrevious} style={{backgroundColor:"black"}}>Previous</Button>
              <Button variant="contained" color="primary" onClick={handleNext} style={{backgroundColor:"black"}}>Next</Button>
            </Box>
          </Box>
              </Container>
            );

            case 9:
                return (
            <Container maxWidth="md">
                <UserDashboardHeader />
            <Box mt={14}>
              <Typography variant="h4" sx={{fontFamily:"Montserrat",fontWeight:"700"}}>Step 9: Set Your Price</Typography>
              <Typography variant="body1" sx={{fontFamily:"Montserrat"}}>
                You can change it anytime.
              </Typography>
              <Box mt={2}>
                <Typography gutterBottom>Price per night</Typography>
                <Slider
                  value={price}
                  onChange={handlePriceChange}
                  aria-labelledby="price-slider"
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={10}
                  max={1000}
                />
                <Typography sx={{fontFamily:"Montserrat",fontWeight:"700",textAlign:"center",fontSize:"2rem"}}>${price}</Typography>
                {/* <TextField
                  label="Price per night ($)"
                  value={price}
                  fullWidth
                  sx={{ mt: 2 }}
                  InputProps={{
                    readOnly: true,
                  }}
                /> */}
                <Typography mt={2} sx={{fontFamily:"Montserrat"}}>
                  Guest price before taxes: ${(price * 1.13).toFixed(2)}
                </Typography>
              </Box>
              <Box mt={4} display="flex" justifyContent="space-between">
             <Button variant="contained" color="primary" onClick={handlePrevious} style={{backgroundColor:"black"}}>Previous</Button>
              <Button variant="contained" color="primary" onClick={handleNext} style={{backgroundColor:"black"}}>Review</Button>
            </Box>
            </Box>
          </Container>
                );
            

            case 10:
                return(
                    <Container maxWidth="md">
                        <UserDashboardHeader />
                    <Box mt={14}>
                      <Typography variant="h4"sx={{fontFamily:"Montserrat",fontWeight:'700'}}>Review Your Listing</Typography>
                      <Typography variant="h6"sx={{fontFamily:"Montserrat",fontWeight:'600'}}>Property Type:</Typography>
                      <Typography variant="body1"sx={{fontFamily:"Montserrat"}}>{propertyType}</Typography>
                      
                      <Typography variant="h6"sx={{fontFamily:"Montserrat",fontWeight:'600'}}>Guest Type:</Typography>
                      <Typography variant="body1"sx={{fontFamily:"Montserrat"}}>{guestType}</Typography>
                      
                      <Typography variant="h6"sx={{fontFamily:"Montserrat",fontWeight:'600'}}>Location:</Typography>
                      <Typography variant="body1"sx={{fontFamily:"Montserrat"}}>{address}</Typography>
                      
                      <Typography variant="h6"sx={{fontFamily:"Montserrat",fontWeight:"600"}}>Guests:</Typography>
                      <Typography variant="body1">{guests}</Typography>
                      
                      <Typography variant="h6"sx={{fontFamily:"Montserrat",fontWeight:"600"}}>Bedrooms:</Typography>
                      <Typography variant="body1">{bedrooms}</Typography>
                      
                      <Typography variant="h6"sx={{fontFamily:"Montserrat",fontWeight:"600"}}>Beds:</Typography>
                      <Typography variant="body1">{beds}</Typography>
                      
                      <Typography variant="h6"sx={{fontFamily:"Montserrat",fontWeight:"600"}}>Lock Type:</Typography>
                      <Typography variant="body1">{lockType}</Typography>
                      
                      <Typography variant="h6"sx={{fontFamily:"Montserrat",fontWeight:"600"}}>Bathroom Type:</Typography>
                      <Typography variant="body1">{bathroomType}</Typography>
                      
                      <Typography variant="h6"sx={{fontFamily:"Montserrat",fontWeight:"600"}}>Who Else Might Be There:</Typography>
                      <Typography variant="body1">
                        {presence.me && "Me "}
                        {presence.family && "My family "}
                        {presence.otherGuests && "Other guests "}
                        {presence.roommates && "Roommates "}
                      </Typography>
                      
                      <Typography variant="h6"sx={{fontFamily:"Montserrat",fontWeight:"600"}}>Images:</Typography>
                      {imageLinks.map((link, index) => (
                        <Typography key={index} variant="body1">{link}</Typography>
                      ))}
                      
                      <Typography variant="h6"sx={{fontFamily:"Montserrat",fontWeight:"600"}}>Price:</Typography>
                      <Typography variant="body1"sx={{fontFamily:"Montserrat"}}>${price} per night</Typography>
                      
                      <Box mt={4} display="flex" justifyContent="space-between">
                      <Button variant="contained" color="primary" onClick={handlePrevious} style={{backgroundColor:"black"}}>Previous</Button>
                        <Button variant="contained" color="primary" onClick={handlePublish} sx={{backgroundColor:'black'}}>
                          Publish
                        </Button>
                      </Box>
                    </Box>
                  </Container>
                );
      // Add cases for remaining steps 8 to 11

      default:
        return (
          <Container maxWidth="md">
            <Box mt={4}>
              <Typography variant="h4" gutterBottom>Step {step}: Step {step} content goes here</Typography>
            </Box>
            <Box mt={4} display="flex" justifyContent="space-between">
             <Button variant="contained" color="primary" onClick={handlePrevious} style={{backgroundColor:"black"}}>Previous</Button>
              <Button variant="contained" color="primary" onClick={handleNext} style={{backgroundColor:"black"}}>Next</Button>
            </Box>
          </Container>
        );
    }
  };

  return (
    <>
      {renderStep()}
    </>
  );
};

export default Step1;
