import { Box, Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Card } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { checked_out_get, open_help, open_schedule_dialog, booking_cancel } from '../Redux/actions/actions';
import { useNavigate } from 'react-router-dom';



export default function Track_order() {
    const data = useSelector(state => state.check_out_data)
    const buttonStyles = useSelector((state) => state?.apply_new_theme)
    const [lastOrder, setLastOrder] = useState([])
    const totalPackagePrice = []
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(checked_out_get())
    }, [])

    useEffect(() => {
        const maxIdItem = data?.check_out_get_list_success?.data?.reduce((maxItem, currentItem) => {
            return currentItem?.id > (maxItem?.id || 0) ? currentItem : maxItem;
        }, null);
        setLastOrder([maxIdItem])
    }, [data?.check_out_get_list_success])

    // console.log(data?.check_out_get_list_success?.data)

    return (


        <Container margin={'auto'} sx={{
            p: 2,
            mt: 0,
            my: { lg: 4, xs: 0 },
            borderRadius: '10px',
            backdropFilter: buttonStyles.child_backdropFilter,
            background: buttonStyles.child_bg,
            color: buttonStyles.child_div_text,
        }} >
            <Box mx={1} mt={0}>
                <Container sx={{
                    px: 2, py: 4, my: 2, borderRadius: '10px',
                    backdropFilter: buttonStyles.child_backdropFilter,
                    background: buttonStyles.child_bg,
                    color: buttonStyles.color,
                }}>
                    <Card p={2} sx={{ borderRadius: '10px', background: 'white', color: 'black' }}>
                        <Grid container my={1} >
                            <Grid xs={6}>
                                <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', }}>
                                    <Typography><ArrowBackRoundedIcon sx={{ mt: .5, ml: 1 }} onClick={() => navigate('/')} fontSize='medium' /></Typography>
                                    <Typography variant='h6' fontSize={'14px'} sx={{ mt: .5, ml: 1 }}> <b>Booking Details</b></Typography>
                                </Box>
                            </Grid>
                            <Grid xs={6} textAlign={'end'}>
                                <Box sx={{ alignItems: 'end', mx: 1 }}>
                                    <Box>
                                        <Button variant='outlined' onClick={() => dispatch(open_help())}> <b>Help</b></Button>
                                    </Box>

                                </Box>
                            </Grid>
                        </Grid>
                    </Card>
                    <Box m={'auto'}>
                        <Grid container >
                            <Grid lg={7} xl={7} md={7} xs={12} pt={3} px={1}>
                                <Card sx={{ background: 'white', color: 'black', borderRadius: '10px', p: 2 }} >
                                    <Typography fontSize={'18px'} > <b>Service Cart</b></Typography>
                                    <Grid container mt={1} ml={1} >
                                        <Grid xs={4}>
                                            <Typography sx={{ color: buttonStyles.buttonColor, opacity: .7 }} fontSize={'14px'}>Package name
                                            </Typography>
                                        </Grid>
                                        <Grid xs={4}>
                                            <Typography sx={{ color: buttonStyles.buttonColor, opacity: .7 }} fontSize={'14px'} textAlign={'center'}>Quantity</Typography>
                                        </Grid>

                                        <Grid xs={4} ><Typography sx={{ color: buttonStyles.buttonColor, opacity: .7 }} fontSize={'14px'} textAlign={'end'} mx={2}>
                                            Price
                                        </Typography> </Grid>
                                    </Grid>
                                    {lastOrder?.map((item) => (
                                        item?.packages?.map((item2) => {
                                            return (
                                                <Box p={1}>
                                                    <Grid container mt={1} >
                                                        <Grid xs={4}>
                                                            <Typography> {item2.package_name}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs={4} textAlign={'center'}>
                                                            <Typography>{item2.quantity}</Typography>
                                                        </Grid>

                                                        <Grid xs={4} textAlign={'end'}>  <Typography>
                                                            &#8377; {item2.price}
                                                        </Typography> </Grid>
                                                    </Grid>
                                                </Box>
                                            )
                                        })
                                    ))}
                                    <hr />
                                    <Box sx={{ borderRadius: '10px' }} p={1}>
                                        <Typography mb={1}>
                                            <b> Payment Summary </b></Typography>
                                        <Grid container>
                                            <Grid xs={6}>Item total</Grid>
                                            <Grid xs={6} textAlign={'end'}>&#8377; {lastOrder?.map((item) => (item?.total_price))}</Grid>
                                            {console.log(totalPackagePrice)}
                                        </Grid>
                                        <Grid container>
                                            <Grid xs={6}>Item discount</Grid>
                                            <Grid xs={6} textAlign={'end'}>&#8377; --</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid xs={6}>Tax and fee</Grid>
                                            <Grid xs={6} textAlign={'end'}>&#8377; --</Grid>
                                        </Grid>
                                        <hr />
                                        <Grid container>
                                            <Grid xs={6}><b>Total</b></Grid>
                                            <Grid xs={6} textAlign={'end'}><b>  &#8377; {lastOrder?.map((item) => (item?.total_price))}</b></Grid>
                                        </Grid>
                                    </Box>
                                </Card>

                            </Grid>
                            <Grid lg={5} md={5} textAlign={'start'} px={1} pt={3} >
                                <Card sx={{ background: 'white', color: 'black', borderRadius: '10px', p: 2 }} >
                                    <Typography mb={1}>Booking Details</Typography>
                                    <Grid container my={2}>
                                        <Grid xs={9}>
                                            <Typography><b>Amount To Pay:</b> &#8377;  {lastOrder?.map((item) => (item?.total_price))}
                                            </Typography>
                                            <Button variant='outlined' color='error' size='small' sx={{ mt: .4 }}>Pay Now</Button>
                                        </Grid>
                                        <Grid xs={3} textAlign={'end'}>
                                            <ArrowForwardIosIcon size='small' />
                                        </Grid>
                                    </Grid>
                                    <Grid container my={2}>
                                        <Grid xs={1}>   <FmdGoodIcon /></Grid>
                                        <Grid xs={11} textAlign={'start'} display={'flex'} alignItems={'center'}>--- No initiated</Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid xs={1}>    <AccessTimeFilledIcon /></Grid>
                                        <Grid xs={11} textAlign={'start'} display={'flex'} alignItems={'center'}><b>Slot :</b>{lastOrder?.map((item) => (item?.appointment_date))}</Grid>
                                    </Grid>
                                    <Grid container mt={3} >
                                        <Grid xs={6} textAlign={'end'} p={2}>
                                            <Button variant='outlined' style={{ border: `1px solid ${buttonStyles.buttonColor}`, color: `${buttonStyles.buttonColor}` }} fullWidth
                                                onClick={() => {
                                                    console.log("lastOrder:", lastOrder);
                                                    const data = { reschedule: true, title: "Select reschedule" }
                                                    const firstOrderId = lastOrder?.map((item) => item.id)
                                                    dispatch(open_schedule_dialog(firstOrderId, data));
                                                }}>
                                                Reschedule
                                            </Button>

                                        </Grid>
                                        <Grid xs={6} p={2}>
                                            <Button onClick={() => dispatch(booking_cancel(lastOrder?.map((item) => item.id)))} color='error' variant='contained' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} fullWidth>
                                                Cancel
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    {/* <hr /> */}
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



                {/* <hr style={{ border: '1px solid', marginTop: '30px' }} /> */}
            </Box>

        </Container>


    )
}
