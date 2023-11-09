import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Grid } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Box, Typography, Button, Container } from '@mui/material'
import Media from 'react-media';
export default function Bookings() {
    return (
        <>
            <Media
                queries={{
                    small: '(max-width: 768px)',
                    medium: '(min-width: 769px) and (max-width: 1024px)',
                    large: '(min-width: 1025px)',
                }}
            >
                {(item) => item.large && (
                    <>
                        <Container margin={'auto'} sx={{
                            p: 2,
                            borderRadius: '10px',
                            backdropFilter: `blur(10px)`,
                            background: ' rgb(255 255 255 / 0.6)',
                            color: 'black'
                        }} >
                            <Grid container>
                                <Grid xs={6}>
                                    <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                        <Typography><ArrowBackRoundedIcon sx={{ mt: .5, mr: 2 }} fontSize='large' /></Typography>
                                        <Typography variant='h5'> <b>Booking & plans</b></Typography>
                                    </Box>
                                </Grid>
                                <Grid xs={6} textAlign={'end'}>
                                    <Button variant='outlined'> <b>Help</b></Button>
                                </Grid>
                            </Grid>
                            <hr style={{ border: '1px solid' }} />
                            <Box mx={10} mt={2}>
                                <Typography variant='h5'><b>Category</b></Typography>
                                <Box sx={{ border: '1px solid black', borderRadius: '10px', p: 2 }} mt={3} >
                                    <Grid container>
                                        <Grid xs={6}>
                                            <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography color={'error'} fontSize={'13px'}><b>BOOKING CANCELLED</b></Typography>
                                                    <span style={{ fontSize: '13px' }}><b>Category name & more</b></span>
                                                    <Typography style={{ fontSize: '11px' }}>time</Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid xs={6} textAlign={'end'}>
                                            <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', height: '100%' }}>
                                                <ArrowForwardIosIcon />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <hr style={{ border: '2px solid', marginTop: '35px' }} />
                            </Box>
                            <Box mx={10} mt={2}>
                                <Typography variant='h5'><b>Category</b></Typography>
                                <Box sx={{ border: '1px solid black', borderRadius: '10px', p: 2 }} mt={3} >
                                    <Grid container>
                                        <Grid xs={6}>
                                            <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography color={'error'} fontSize={'13px'}><b>BOOKING CANCELLED</b></Typography>
                                                    <span style={{ fontSize: '13px' }}><b>Category name & more</b></span>
                                                    <Typography style={{ fontSize: '11px' }}>time</Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid xs={6} textAlign={'end'}>
                                            <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', height: '100%' }}>
                                                <ArrowForwardIosIcon />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <hr style={{ border: '2px solid ', marginTop: '35px' }} />
                            </Box>
                        </Container>
                    </>
                )

                }

            </Media>

        </>
    )
}

