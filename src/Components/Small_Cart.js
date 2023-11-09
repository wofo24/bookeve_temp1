import React from 'react'
import Coupon from '../Components/Coupon'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { openAdd_Address, open_coupon_dialog, show_all_address, hide_all_address, open_schedule_dialog } from '../Redux/actions/actions';
import Media from 'react-media';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Small_Cart() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const buttonStyles = useSelector((state) => state.apply_new_theme)

    const handleOpen = () => {
        dispatch(open_coupon_dialog())
    }
    const address = () => {
        dispatch(openAdd_Address())
    }
    const show_allAddress = () => {
        dispatch(show_all_address())
    }
    const openSchedule = () => {
        dispatch(open_schedule_dialog())
    }
    return (

        <Media
            queries={{
                small: '(max-width: 768px)',
                medium: '(min-width: 769px) and (max-width: 1024px)',
                large: '(min-width: 1025px)',
            }}
        >
            {(item) => (
                item.large && (
                    <Box sx={{ p: 3, m: 'auto' }}>
                        <Grid container spacing={3}>
                            <Grid xs={12}>

                                <Box mx={1}>
                                    <Box sx={{ border: `1.5px solid ${buttonStyles.buttonColor}`, borderRadius: '10px', p: 1 }} >
                                        <Box>
                                            <Typography> <b>Cart</b></Typography>
                                        </Box>
                                        <Grid container mt={1} >
                                            <Grid xs={6}>
                                                <Typography> Package Name
                                                </Typography>
                                            </Grid>
                                            <Grid xs={3} textAlign={'start'}>
                                                <Button sx={{ width: '50px', height: '25px', color: buttonStyles.icons_Color, backgroundColor: 'white', borderRadius: '10px' }}>
                                                    <RemoveIcon sx={{ mx: 1 }} />
                                                    1
                                                    <AddIcon sx={{ mx: 1 }} />
                                                </Button>
                                            </Grid>
                                            <Grid xs={3} textAlign={'center'}>  <Typography> 1200
                                            </Typography> </Grid>
                                        </Grid>
                                        <Grid container mt={1}>
                                            <Grid xs={6}>
                                                <Typography> Package Name
                                                </Typography>
                                            </Grid>
                                            <Grid xs={3} textAlign={'start'}>
                                                <Button sx={{ p: 1, width: '50px', height: '25px', color: buttonStyles.icons_Color, backgroundColor: 'white', borderRadius: '10px' }}>
                                                    <RemoveIcon sx={{ mx: 1 }} />
                                                    2
                                                    <AddIcon sx={{ mx: 1 }} />
                                                </Button>
                                            </Grid>
                                            <Grid xs={3} textAlign={'center'}>  <Typography> 1200
                                            </Typography> </Grid>
                                        </Grid>

                                        <Grid sx={{ background: 'green', mt:2 }}>
                                            <Typography sx={{color:'white', textAlign:'center', py:1}}>Congratulation &#8377;12,00 saved!
                                            </Typography>
                                        </Grid>

                                        <Box p={1} py={1.3} mt={2} style={{ display: 'flex', background: buttonStyles.buttonColor, color: buttonStyles.buttonText, borderRadius: '10px' }} >
                                            <Grid container >
                                                <Grid xs={6}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', height: '100%' }}>

                                                        <Typography fontSize={'14px'}>&#8377;12,00 <strike style={{ fontSize: '12px' }}>&#8377;12,00</strike></Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid xs={6} sx={{ textAlign: 'end' }}>
                                                    <Typography sx={{ cursor: 'pointer', fontSize: '14px' }}>View Cart</Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Box>
                                    <Box sx={{ my: 1, border: `1.5px solid ${buttonStyles.buttonColor}`, borderRadius: '10px' }} onClick={handleOpen}  >
                                        <Grid container p={1}>
                                            <Grid item xs={2}>
                                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                                    {/* <ArrowForwardIosIcon /> */}
                                                    <img width="30" style={{ marginTop: '0px' }} height="30" src="https://img.icons8.com/material/24/discount--v1.png" alt="discount--v1" />
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'left' }}>
                                                    <Box>
                                                        <Typography ><b>Coupon offer's</b></Typography>
                                                        <span>Get 150 off</span>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={4} p={1} >
                                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                                    <Typography>Offers</Typography> <ArrowForwardIosIcon />
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{ border: '1.5px solid red', borderRadius: '10px' }} p={1}>
                                        <Typography mb={1}>Payment Summary</Typography>
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
                        </Grid>
                    </Box>
                )
            )}

        </Media>

    )
}
