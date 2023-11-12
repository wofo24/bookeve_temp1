import { Grid, Box, Typography } from '@mui/material';
import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useSelector, useDispatch } from 'react-redux';
const footerStyle = {
    marginTop: 'auto',
    marginBottom: '40px'
};

export default function Footer() {
    const dispatch = useDispatch()
    const buttonStyles = useSelector((state) => state.apply_new_theme)
    return (
        <footer style={footerStyle}>
            <Box sx={{ mx: 0, p: 2, backgroundColor: buttonStyles.buttonColor, color: buttonStyles.buttonText }}>
                <Typography sx={{ fontFamily: buttonStyles.fontFamily, textAlign: 'center' }}>Get your bio link For free in 30 Seconds</Typography>
            </Box>
            <hr />
            <Grid container >
                <Grid item xs={12} lg={6} sm={12}>
                    <Box mt={5} >
                        <Box textAlign='center'>
                            <Typography variant='h4'>Business Name</Typography><br />
                            <Typography variant='h5'>New Delhi</Typography>
                            <Typography mt={2}><b> 2023 Example@gmail.com</b></Typography>
                        </Box>

                    </Box>
                </Grid>
                <Grid item xs={12} lg={6} sm={12}>
                    <Box sx={{ fontFamily: buttonStyles.fontFamily, display: 'flex', justifyContent: 'center' }} mt={10} mx={2} >
                        <Box>

                            <Typography variant='h5' sx={{ fontWeight: 600, fontFamily: buttonStyles.fontFamily, textAlign: 'center' }}>
                                Contact with us on-
                            </Typography>

                            <Box sx={{ my: 1 }} textAlign='center'>
                                <InstagramIcon sx={{ m: .3, mx: 2 }} style={{ color: buttonStyles.icons_Color }} fontSize='large' onClick={event => window.location.href = 'https://www.instagram.com/'} />
                                <YouTubeIcon sx={{ m: .3, mx: 2 }} style={{ color: buttonStyles.icons_Color }} fontSize='large' onClick={event => window.location.href = 'https://www.youtube.com/'} />
                                <WhatsAppIcon sx={{ m: .3, mx: 2 }} style={{ color: buttonStyles.icons_Color }} fontSize='large' onClick={event => window.location.href = "https://wa.me/8423174102/?text='hello'"} />
                                <FacebookIcon sx={{ m: .3, mx: 2 }} style={{ color: buttonStyles.icons_Color }} fontSize='large' onClick={event => window.location.href = 'https://www.facebook.com/'} />
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </footer>
    );
}



{/* <Grid item xs={5} textAlign='right' px={2}>
                                <LocationOnIcon fontSize='large' style={{ color: buttonStyles.icons_Color }} />
                            </Grid>
                            <Grid item xs={7} textAlign='left'>
                                <Typography style={{ color: buttonStyles.icons_Color }}>
                                    Locations
                                </Typography>
                            </Grid>
                            <Grid item xs={5} textAlign='right' px={2}>
                                <CallIcon fontSize='large' style={{ color: buttonStyles.icons_Color }} />
                            </Grid>
                            <Grid item xs={7} textAlign='left'>
                                <Typography>
                                    <a href="tel:123-456-7890" style={{ color: buttonStyles.icons_Color }}>+91 123-456-7890</a>
                                </Typography>
                            </Grid>
                            <Grid item xs={5} textAlign='right' px={2}>
                                <MailIcon fontSize='large' style={{ color: buttonStyles.icons_Color }} />
                            </Grid>
                            <Grid item xs={7} textAlign='left'>
                                <Typography >
                                    <a href="mailto: abc@example.com" style={{ color: buttonStyles.icons_Color }}>Send Email</a>
                                </Typography>
                            </Grid> */}

{/* </Grid> */ }