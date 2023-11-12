import React from 'react'
import { Container, Button, Typography, Box } from '@mui/material'
import { Grid } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Small_Cart from '../Components/Small_Cart';
import Coupon from '../Components/Coupon'
// import {  } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { openAdd_Address, open_coupon_dialog, show_all_address, hide_all_address, open_schedule_dialog } from '../Redux/actions/actions';
import Media from 'react-media';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
export default function Booking_details() {
    const buttonStyles = useSelector((state) => state.apply_new_theme)
    const dispatch = useDispatch()
    const handleOpen = () => {
        dispatch(open_coupon_dialog())
    }
    return (
        <Container sx={{ background: 'gray', px: 2, py:4, my:3, borderRadius:'10px' }}>
            <Box p={2} sx={{ borderRadius: '10px', background: 'white', color: 'black' }}>
                <Grid container >
                    <Grid xs={6}>
                        <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                            <Typography><ArrowBackRoundedIcon sx={{ mt: .5, mr: 2 }} fontSize='large' /></Typography>
                            <Typography variant='h5'> <b>Booking & plans</b></Typography>
                        </Box>
                    </Grid>
                    <Grid xs={6} textAlign={'end'}>
                        <Button variant='outlined'> <b>Help</b></Button>
                        <Button variant='outlined' color='error'> <b>SOS</b></Button>
                    </Grid>
                </Grid>
            </Box>
            <Box m={'auto'}>
                <Grid container >
                    <Grid lg={7} xl={7} md={7} xs={12} pt={3} px={2}>
                        <Box sx={{ background: 'white', color: 'black', borderRadius: '10px', p: 2 }} >
                            <Box p={1}>
                                <Typography> <b>Service Cart</b></Typography>

                                <Grid container my={2} >
                                    <Grid xs={6}>
                                        <Typography> Package Name
                                        </Typography>
                                    </Grid>

                                    <Grid xs={6} textAlign={'end'}>  <Typography> 1200
                                    </Typography> </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ borderRadius: '10px' }} p={1}>
                                <Typography mb={1}>
                                    <b> Payment Summary </b></Typography>
                                <Grid container>
                                    <Grid xs={6}>Item total</Grid>
                                    <Grid xs={6} textAlign={'end'}>12,000</Grid>
                                </Grid>
                                <Grid container>
                                    <Grid xs={6}>Item discount</Grid>
                                    <Grid xs={6} textAlign={'end'}>200</Grid>
                                </Grid>
                                <Grid container>
                                    <Grid xs={6}>Tax and fee</Grid>
                                    <Grid xs={6} textAlign={'end'}>100</Grid>
                                </Grid>
                                <hr />
                                <Grid container>
                                    <Grid xs={6}><b>Total</b></Grid>
                                    <Grid xs={6} textAlign={'end'}><b>1200</b></Grid>
                                </Grid>
                            </Box>
                        </Box>

                    </Grid>
                    <Grid lg={5} md={5} textAlign={'start'} px={2} pt={3} >
                        <Box sx={{ background: 'white', color: 'black', borderRadius: '10px', p: 2 }} >
                            <Typography mb={1}>Booking Details</Typography>
                            <Grid container my={2}>
                                <Grid xs={6}>
                                    <Typography>Amount To Pay: 12,000</Typography>
                                    <Button variant='outlined' size='small'>Pay Now</Button>
                                </Grid>
                                <Grid xs={6} textAlign={'end'}>
                                    <ArrowForwardIosIcon size='small' />
                                </Grid>
                            </Grid>
                            <Grid container my={2}>
                                <Grid xs={1}>   <FmdGoodIcon /></Grid>
                                <Grid xs={11} textAlign={'start'}>200</Grid>
                            </Grid>
                            <Grid container>
                                <Grid xs={1}>    <AccessTimeFilledIcon /></Grid>
                                <Grid xs={11} >date time</Grid>
                            </Grid>
                            <Grid container>
                                <Grid xs={6} textAlign={'end'}>
                                    <Button>Reschedule</Button>

                                </Grid>
                                <Grid xs={6}> <Button variant='container' color='error'><b>cancel booking </b> </Button></Grid>
                            </Grid>
                            <hr />
                        </Box>
                        <Box sx={{ my: 4, background: 'white', color: 'black', borderRadius: '10px', p: 2 }} >
                            <Typography mb={2}> <b>Cancellation & Research policy </b></Typography>
                            <span style={{ fontSize: '12px' }}>
                                The corresponding author must inform about the withdrawal ( Cancellation ) of the article before the acceptance from the International Journal of Medical Research and Review and the withdrawal ( Cancellation )</span>

                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}
