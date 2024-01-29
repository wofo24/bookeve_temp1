import { Grid, Box, Typography } from '@mui/material';
import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useSelector } from 'react-redux';
import Media from 'react-media';
import Loading from './LoadingIcon/Loading';
const footerStyle = {
    marginTop: 'auto',
};

export default function Footer() {
    const buttonStyles = useSelector((state) => state.all_theme)
    const public_info = useSelector((state) => state?.public_information?.data?.data)
    const loading = useSelector((state) => state?.public_information?.data?.loading)
    
    return (
        <footer style={footerStyle}>
            {loading && <Loading />}
            <Media queries={{
                small: '(max-width: 768px)',
                medium: '(min-width: 769px) and (max-width: 1024px)',
                large: '(min-width: 1025px)',
            }}>
                {(item) => item.large && (
                    <Box>
                        <Box sx={{ mx: 0, p: 2, background: buttonStyles.buttonColor, color: buttonStyles.buttonText }}>
                            <Typography sx={{ fontFamily: buttonStyles.fontFamily, textAlign: 'center' }}>Get your bio link For free in 30 Seconds</Typography>
                        </Box>
                        <hr />
                        <Grid container pt={1} pb={10}>
                            <Grid item xs={12} lg={6} sm={12}>
                                <Box mt={1} textAlign={'left'} >
                                    <Box textAlign='left' mx={5}>
                                        <Typography variant='h3' fontWeight={700}>{public_info?.business_name}</Typography> <br />
                                        <Typography variant='h5' fontWeight={700}> <LocationOnIcon fontSize='large' sx={{ mr: 1 }} /> {public_info?.address}</Typography>
                                        <Typography mt={2}><b> 2023 Example@gmail.com</b></Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} lg={6} sm={12}>
                                <Box sx={{ fontFamily: buttonStyles.fontFamily, display: 'flex', justifyContent: 'end' }} mt={8} mx={7} >
                                    <Box>
                                        <Typography variant='h5' sx={{ fontWeight: 800, fontFamily: buttonStyles.fontFamily, textAlign: 'center', fontSize: '30px' }}>
                                            Contact with us on-
                                        </Typography>

                                        <Box sx={{ my: 1 }} textAlign='center'>
                                            <InstagramIcon sx={{ m: .3, mx: 2 }} style={{ color: buttonStyles.icons_Color }} fontSize='large' onClick={event => window.location.href = `${public_info.instagram}`} />
                                            <YouTubeIcon sx={{ m: .3, mx: 2 }} style={{ color: buttonStyles.icons_Color }} fontSize='large' onClick={event => window.location.href = `${public_info.youtube}`} />
                                            <WhatsAppIcon sx={{ m: .3, mx: 2 }} style={{ color: buttonStyles.icons_Color }} fontSize='large' onClick={event => window.location.href = `${public_info.whatsapp}`} />
                                            <FacebookIcon sx={{ m: .3, mx: 2 }} style={{ color: buttonStyles.icons_Color }} fontSize='large' onClick={event => window.location.href = `${public_info.facebook}`} />
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                )}

            </Media>
            <Media queries={{
                small: '(max-width: 768px)',
                medium: '(min-width: 769px) and (max-width: 1024px)',
                large: '(min-width: 1025px)',
            }}>
                {(item) => item.small && (
                    <Box>
                        <Box sx={{ mx: 0, p: 2, background: buttonStyles.buttonColor, color: buttonStyles.buttonText }}>
                            <Typography sx={{ fontFamily: buttonStyles.fontFamily, textAlign: 'center' }}>Get your bio link For free in 30 Seconds</Typography>
                        </Box>
                        <hr />
                        <Grid container >
                            <Grid item xs={12} lg={6} sm={12}>
                                <Box mt={1} >
                                    <Box textAlign='center'>
                                        <Typography variant='h4' fontWeight={700}>{public_info?.business_name}</Typography> <br />
                                        <Typography variant='h5'>{public_info?.address}</Typography>
                                        <Typography mt={2}><b> 2023 Example@gmail.com</b></Typography>
                                    </Box>

                                </Box>
                            </Grid>
                            <Grid item xs={12} lg={6} sm={12}>
                                <Box sx={{ mb: 8, fontFamily: buttonStyles.fontFamily, display: 'flex', justifyContent: 'center' }} mt={3} mx={2} >
                                    <Box>
                                        <Typography variant='h5' sx={{ fontWeight: 600, fontFamily: buttonStyles.fontFamily, textAlign: 'center' }}>
                                            Contact with us on-
                                        </Typography>

                                        <Box sx={{ my: 1 }} textAlign='center'>
                                            <InstagramIcon sx={{ m: .3, mx: 2 }} style={{ color: buttonStyles.icons_Color }} fontSize='large' onClick={event => window.location.href = `${public_info?.instagram}`} />
                                            <YouTubeIcon sx={{ m: .3, mx: 2 }} style={{ color: buttonStyles.icons_Color }} fontSize='large' onClick={event => window.location.href = `${public_info?.youtube}`} />
                                            <WhatsAppIcon sx={{ m: .3, mx: 2 }} style={{ color: buttonStyles.icons_Color }} fontSize='large' onClick={event => window.location.href = `${public_info?.whatsapp}`} />
                                            <FacebookIcon sx={{ m: .3, mx: 2 }} style={{ color: buttonStyles.icons_Color }} fontSize='large' onClick={event => window.location.href = `${public_info?.facebook}`} />
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                )}

            </Media>

        </footer>
    );
}
