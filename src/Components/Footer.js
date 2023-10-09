import { Grid, Box, Typography } from '@mui/material';
import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
const footerStyle = {
    marginTop: 'auto',
    marginBottom: '40px'
};

export default function Footer() {
    return (
        <footer style={footerStyle}>
            <Box>
                dddddddd
            </Box>
            <hr />
            <Grid container >
                <Grid item xs={12} lg={6}>
                    <Box m={3} textAlign='center'>
                        <Grid container>
                            <Grid item xs={5} textAlign='right' px={2}>
                                <LocationOnIcon fontSize='large' />
                            </Grid>
                            <Grid item xs={7} textAlign='left'>
                                <Typography>
                                    Locations
                                </Typography>
                            </Grid>
                            <Grid item xs={5} textAlign='right' px={2}>
                                <CallIcon fontSize='large' />
                            </Grid>
                            <Grid item xs={7} textAlign='left'>
                                <Typography>
                                    <a href="tel:123-456-7890">123-456-7890</a>
                                </Typography>
                            </Grid>
                            <Grid item xs={5} textAlign='right' px={2}>
                                <MailIcon fontSize='large' />
                            </Grid>
                            <Grid item xs={7} textAlign='left'>
                                <Typography >
                                    <a href="mailto: abc@example.com">Send Email</a>
                                </Typography>
                            </Grid>

                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Box m={3} lg={{ textAlign: 'left' }}>
                        <Typography sx={{ fontWeight: 600 }}>
                            About the company
                        </Typography>
                        <span>
                            If you want the footer to always be at the bottom of the page, regardless of the content's
                            If you want the footer to always be at the bottom of the page, regardless of the content's
                            If you want the footer to always be at the bottom of the page, regardless of the content's
                        </span>
                        <Box sx={{ my: 1 }} textAlign='center'>
                            <InstagramIcon sx={{ m: .3 }} fontSize='large' onClick={event => window.location.href = 'https://www.instagram.com/'} />
                            <YouTubeIcon sx={{ m: .3 }} fontSize='large' onClick={event => window.location.href = 'https://www.youtube.com/'} />
                            <WhatsAppIcon sx={{ m: .3 }} fontSize='large' onClick={event => window.location.href = "https://wa.me/8423174102/?text='hello'"} />
                            <FacebookIcon sx={{ m: .3 }} fontSize='large' onClick={event => window.location.href = 'https://www.facebook.com/'} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </footer>
    );
}
