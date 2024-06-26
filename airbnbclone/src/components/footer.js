import React from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';

const Footer = () => {
  return (
    <Box
    fullwidth
      sx={{
        backgroundColor: '#f3f3f3',
        color: 'black',
        py: 6,
        borderTop: '1px solid #ddd',
        margin : 0,
      }}
    >
      <Container fullwidth>
        <Grid container spacing={5}>
          {/* Section 1: Support */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="textSecondary" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Help Center</Link>
              <Link href="#" color="textSecondary" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>AirCover</Link>
              <Link href="#" color="textSecondary" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Anti-discrimination</Link>
              <Link href="#" color="textSecondary" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Disability support</Link>
              <Link href="#" color="textSecondary" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Cancellation options</Link>
              <Link href="#" color="textSecondary" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Report neighborhood concern</Link>
            </Box>
          </Grid>
          
          {/* Section 2: Hosting */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Hosting
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="textSecondary" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Airbnb your home</Link>
              <Link href="#" color="textSecondary" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>AirCover for Hosts</Link>
              <Link href="#" color="textSecondary" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Hosting resources</Link>
              <Link href="#" color="textSecondary" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Community forum</Link>
              <Link href="#" color="textSecondary" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Hosting responsibly</Link>
              <Link href="#" color="textSecondary" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Airbnb-friendly apartments</Link>
              <Link href="#" color="textSecondary" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Join a free Hosting class</Link>
            </Box>
          </Grid>
          
          {/* Section 3: Airbnb */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Airbnb
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="textSecondary" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Newsroom</Link>
              <Link href="#" color="textSecondary" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>New features</Link>
              <Link href="#" color="textSecondary" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Careers</Link>
              <Link href="#" color="textSecondary" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Investors</Link>
              <Link href="#" color="textSecondary" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Gift cards</Link>
              <Link href="#" color="textSecondary" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Airbnb.org emergency stays</Link>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Footer Bottom */}
      <Box
        sx={{
          backgroundColor: '#f3f3f3',
          py: 2,
          mt: 4,
          borderTop: '1px solid #ddd',
        }}
      >
        <Container maxWidth="lg">
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              © 2024 Airbnb, Inc. · <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Terms</Link> · <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Sitemap</Link> · <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Privacy</Link> · <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Your Privacy Choices</Link>
            </Typography>
            <Box display="flex" alignItems="center" mt={{ xs: 2, md: 0 }}>
              <Typography variant="body2" color="textSecondary" sx={{ mr: 2 }}>
                <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>English (US)</Link> · $ USD
              </Typography>
              <Box>
                <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}><FacebookIcon /></Link>
                <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}><GoogleIcon /></Link>
                <Link href="#" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}><AppleIcon /></Link>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
