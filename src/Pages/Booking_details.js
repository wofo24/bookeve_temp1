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
import { open_help, open_coupon_dialog, show_all_address, hide_all_address, open_schedule_dialog, open_agree_dialog } from '../Redux/actions/actions';
import Media from 'react-media';

import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
export default function Booking_details() {
    const buttonStyles = useSelector((state) => state.apply_new_theme)
    const date_time = useSelector((state) => state.selected_date_time)
    const selected_address = useSelector((state) => state.selected_address)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleOpen = () => {
        dispatch(open_coupon_dialog())
    }
    return (
        <div>
            <Media
                queries={{
                    small: '(max-width: 768px)',
                    medium: '(min-width: 769px) and (max-width: 1024px)',
                    large: '(min-width: 1025px)',
                }}>

                {(item) => (
                    <>
                        {item.small && (
                            <Container sx={{
                                px: 2, py: 4, my: 3, borderRadius: '10px',
                                backdropFilter: buttonStyles.child_backdropFilter,
                                background: buttonStyles.child_bg,
                                color: buttonStyles.color,
                            }}>
                                <Card p={2} sx={{ borderRadius: '10px', background: 'white', color: 'black' }}>
                                    <Grid container my={1} >
                                        <Grid xs={6}>
                                            <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', }}>
                                                <Typography><ArrowBackRoundedIcon sx={{ mt: .5, ml: 1 }} onClick={() => navigate('/all-booking')} fontSize='medium' /></Typography>
                                                <Typography variant='h6' fontSize={'14px'} sx={{ mt: .5, ml: 1 }}> <b>Booking & plans</b></Typography>
                                            </Box>
                                        </Grid>
                                        <Grid xs={6} textAlign={'end'}>
                                            <Box sx={{ display: 'flex', flex: 'wrap', justifyContent: 'space-around', alignItems: 'center' }}>
                                                <Box>
                                                    <Button variant='outlined' onClick={() => dispatch(open_help())}> <b>Help</b></Button>
                                                </Box>
                                                <Box>
                                                    <Button variant='outlined' color='error'> <b>SOS</b></Button>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Card>
                                <Box m={'auto'}>
                                    <Grid container >
                                        <Grid lg={7} xl={7} md={7} xs={12} pt={3} px={2}>
                                            <Card sx={{ background: 'white', color: 'black', borderRadius: '10px', p: 2 }} >
                                                <Box p={1}>
                                                    <Typography> <b>Service Cart</b></Typography>

                                                    <Grid container my={2} >
                                                        <Grid xs={4}>
                                                            <Typography> Package Name
                                                            </Typography>
                                                        </Grid>
                                                        <Grid>
                                                            <Typography>{1}</Typography>
                                                        </Grid>

                                                        <Grid xs={4} textAlign={'end'}>  <Typography> 1200
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
                                            </Card>

                                        </Grid>
                                        <Grid lg={5} md={5} textAlign={'start'} px={2} pt={3} >
                                            <Card sx={{ background: 'white', color: 'black', borderRadius: '10px', p: 2 }} >
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
                                                    <Grid xs={11} textAlign={'start'} display={'flex'} alignItems={'center'}>{selected_address}</Grid>
                                                </Grid>
                                                <Grid container>
                                                    <Grid xs={1}>    <AccessTimeFilledIcon /></Grid>
                                                    <Grid xs={11} textAlign={'start'} display={'flex'} alignItems={'center'}><b>Slot :</b>{date_time}</Grid>
                                                </Grid>
                                                <Grid container my={3} >
                                                    <Grid xs={6} textAlign={'end'} p={2}>
                                                        <Button variant='outlined' style={{ border: `1px solid ${buttonStyles.buttonColor}`, color: `${buttonStyles.buttonColor}` }} fullWidth onClick={() => dispatch(open_schedule_dialog())}>
                                                            Reschedule
                                                        </Button>

                                                    </Grid>
                                                    <Grid xs={6} p={2}>
                                                        <Button color='error' variant='contained' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} fullWidth onClick={() => dispatch(open_schedule_dialog())}>
                                                            Cancel
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                                <hr />
                                            </Card>
                                            <Card sx={{ my: 4, background: 'white', color: 'black', borderRadius: '10px', p: 2 }} >
                                                <Typography mb={2}> <b>Cancellation & Research policy </b></Typography>
                                                <span style={{ fontSize: '12px' }}>
                                                    The corresponding author must inform about the withdrawal ( Cancellation ) of the article before the acceptance from the International Journal of Medical Research and Review and the withdrawal ( Cancellation )</span>

                                            </Card>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Container>
                        )}
                    </>
                )}

            </Media>
            <Media
                queries={{
                    small: '(max-width: 768px)',
                    medium: '(min-width: 769px) and (max-width: 1024px)',
                    large: '(min-width: 1025px)',
                }}>

                {(item) => (
                    <>
                        {item.large && (
                            <Container sx={{
                                px: 2, py: 4, my: 3, borderRadius: '10px',
                                backdropFilter: buttonStyles.child_backdropFilter,
                                background: buttonStyles.child_bg,
                                color: buttonStyles.color,
                            }}>
                                <Card p={2} sx={{ borderRadius: '10px', background: 'white', color: 'black' }}>
                                    <Grid container my={1}>
                                        <Grid xs={10} sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                                <Typography onClick={() => navigate('/profile')}><ArrowBackRoundedIcon sx={{ ml: 2 }} fontSize='large' /></Typography>
                                                <Typography variant='h5' px={1}> <b>Booking & plans</b></Typography>
                                            </Box>
                                        </Grid>
                                        <Grid xs={2} textAlign={'center'}>
                                            <Button variant='outlined' sx={{ m: 2 }} onClick={() => dispatch(open_help())}> <b>Help</b></Button>
                                            <Button variant='outlined' color='error'> <b>SOS</b></Button>
                                        </Grid>
                                    </Grid>
                                </Card>
                                <Box m={'auto'}>
                                    <Grid container >
                                        <Grid lg={7} xl={7} md={7} xs={12} pt={3} px={2}>
                                            <Card sx={{ background: 'white', color: 'black', borderRadius: '10px', p: 2 }} >

                                                <Box p={1}>
                                                    <Typography> <b>Service Cart</b></Typography>
                                                    <Box>
                                                        <Grid container my={2} >
                                                            <Grid xs={4} textAlign={'start'}>
                                                                <Typography> Package Name
                                                                </Typography>
                                                            </Grid>
                                                            <Grid xs={4} textAlign={'end'}>
                                                                <Typography>Quantity</Typography>
                                                            </Grid>

                                                            <Grid xs={4} textAlign={'end'}>
                                                                <Typography> Price
                                                                </Typography> </Grid>
                                                        </Grid>
                                                    </Box>
                                                    <Grid container my={2} >
                                                        <Grid xs={4} textAlign={'start'}>
                                                            <Typography> Package Name
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={4} textAlign={'end'}>
                                                            <Typography>{1}</Typography>
                                                        </Grid>

                                                        <Grid xs={4} textAlign={'end'}>
                                                            <Typography> 1200
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
                                            </Card>

                                        </Grid>
                                        <Grid lg={5} md={5} textAlign={'start'} px={2} pt={3} >
                                            <Card sx={{ background: 'white', color: 'black', borderRadius: '10px', p: 2 }} >
                                                <Typography mb={1}><b>Booking Details</b></Typography>
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
                                                    <Grid xs={11} textAlign={'start'}><b>Address:</b> {selected_address}</Grid>
                                                </Grid>
                                                <Grid container>
                                                    <Grid xs={1}>    <AccessTimeFilledIcon /></Grid>
                                                    <Grid xs={11} ><b>Slot:</b> {date_time} </Grid>
                                                </Grid>
                                                <Grid container my={3} spacing={2}>
                                                    <Grid xs={6} px={2} textAlign={'end'}>
                                                        <Button onClick={() => dispatch(open_schedule_dialog())}>Reschedule</Button>

                                                    </Grid>
                                                    <Grid xs={6} px={2}> <Button variant='contained' color='error' onClick={() => dispatch(open_agree_dialog())}><b>cancel booking </b> </Button></Grid>
                                                </Grid>
                                                <hr />
                                            </Card>
                                            <Card sx={{ my: 4, background: 'white', color: 'black', borderRadius: '10px', p: 2 }} >
                                                <Typography mb={2}> <b>Cancellation & Research policy </b></Typography>
                                                <span style={{ fontSize: '12px' }}>
                                                    The corresponding author must inform about the withdrawal ( Cancellation ) of the article before the acceptance from the International Journal of Medical Research and Review and the withdrawal ( Cancellation )</span>

                                            </Card>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Container>
                        )}
                    </>
                )}

            </Media>

        </div>
    )
}
