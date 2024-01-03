import React, { useEffect } from 'react'
import Coupon from '../Components/Coupon'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { openAdd_Address, show_message, click_to_apply_coupon, open_coupon_dialog, show_all_address, hide_all_address, open_schedule_dialog } from '../Redux/actions/actions';
import Media from 'react-media';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link } from 'react-router-dom'
export default function Small_Cart() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const buttonStyles = useSelector((state) => state.apply_new_theme)
    const Coupon_Code_value = useSelector((state) => state.apply_onClick_coupon)
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
    useEffect(() => {
        if (Coupon_Code_value) {
            dispatch(show_message(true, 'Coupon applied successful!', 'success'))
        }
        else {
            dispatch(show_message(true, 'Coupon removed!', 'warning'))

        }
    }, [Coupon_Code_value])

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
                                    <Card sx={{
                                        borderRadius: '10px',
                                        backdropFilter: buttonStyles.child_backdropFilter,
                                        background: buttonStyles.child_bg,
                                        color: buttonStyles.child_div_text, p: 2
                                    }} >
                                        <Box>
                                            <Typography variant='h6'> <b>Cart</b></Typography>
                                        </Box>
                                        <Grid container mt={1} >
                                            <Grid xs={6}>
                                                <Typography> Package Name</Typography>
                                                <Typography sx={{ fontSize: '10px' }}> Addon's Name</Typography>
                                            </Grid>
                                            <Grid xs={3} textAlign={'start'}>
                                                <Box>
                                                    <Button variant='outlined' color='warning' sx={{ width: '50px', height: '25px', color: buttonStyles.icons_Color, backgroundColor: 'white', borderRadius: '6px' }}>
                                                        <RemoveIcon sx={{ m: 1, fontSize: '16px' }} />
                                                        1
                                                        <AddIcon sx={{ m: 1, fontSize: '16px' }} />
                                                    </Button>
                                                </Box>
                                            </Grid>
                                            <Grid xs={3} textAlign={'center'}>  <Typography>&#8377;1200
                                            </Typography> </Grid>
                                        </Grid>
                                        <Grid container mt={1}>
                                            <Grid xs={6}>
                                                <Typography> Package Name</Typography>
                                                <Typography sx={{ fontSize: '10px' }}> Addon's Name</Typography>
                                            </Grid>
                                            <Grid xs={3} textAlign={'start'}>
                                                <Button variant='outlined' color='warning' sx={{ p: 1, width: '50px', height: '25px', color: buttonStyles.icons_Color, backgroundColor: 'white', borderRadius: '6px' }}>
                                                    <RemoveIcon sx={{ m: 1, fontSize: '16px' }} />
                                                    3
                                                    <AddIcon sx={{ m: 1, fontSize: '16px' }} />
                                                </Button>
                                            </Grid>
                                            <Grid xs={3} textAlign={'center'}>  <Typography> &#8377;1200
                                            </Typography> </Grid>
                                        </Grid>

                                        <Grid sx={{ background: '#22bb33', mt: 2 }}>
                                            <Typography sx={{ color: 'white', textAlign: 'center', py: 1 }}>Congratulation &#8377;12,00 saved!
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
                                                    <Link
                                                        to={`/cart`}
                                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                                    >
                                                        <Typography sx={{ cursor: 'pointer', fontSize: '14px', }}>View Cart</Typography>
                                                    </Link>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Card>

                                    {Coupon_Code_value && (
                                        <Card sx={{
                                            my: 2,
                                            borderRadius: '10px',
                                            backdropFilter: `blur(10px)`,
                                            background: '#22bb33',
                                            color: 'black', p: 1
                                        }}  >
                                            <Grid container p={0}>
                                                <Grid item xs={2} pt={.1}>
                                                    <CheckCircleOutlineIcon fontSize='large' sx={{ color: '#e3f2fd' }} />
                                                </Grid>
                                                <Grid item xs={7}>
                                                    <Box sx={{ color: '#e3f2fd' }}>
                                                        <Typography><b>{Coupon_Code_value}</b> applied</Typography>
                                                        <Typography sx={{ fontSize: '10px' }}>-&#8377;1200 (30% off)</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }}>
                                                        <Button color='error' onClick={() => dispatch(click_to_apply_coupon(''))}>Remove</Button>
                                                    </Box>
                                                </Grid>

                                            </Grid>
                                        </Card>
                                    )}
                                    {!Coupon_Code_value && (<Card sx={{
                                        my: 1, borderRadius: '10px',
                                        backdropFilter: `blur(10px)`,
                                        background: ' rgb(255 255 255 / 0.6)',
                                        color: 'black', p: 2
                                    }} onClick={handleOpen}  >
                                        <Grid container p={1}>
                                            <Grid item xs={2}>
                                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
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
                                    </Card>)}

                                    <Card sx={{
                                        borderRadius: '10px',
                                        backdropFilter: `blur(10px)`,
                                        background: ' rgb(255 255 255 / 0.6)',
                                        color: 'black', p: 2
                                    }} p={1}>
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
                                    </Card>
                                </Box>

                            </Grid>
                        </Grid>
                    </Box>
                )
            )}

        </Media>

    )
}
