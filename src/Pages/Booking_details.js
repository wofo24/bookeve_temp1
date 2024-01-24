import React, { useEffect, useState } from 'react'
import { Container, Button, Typography, Box } from '@mui/material'
import { Grid } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { open_help, checked_out_get, post_review, open_schedule_dialog, booking_cancel, show_message } from '../Redux/actions/actions';
import Media from 'react-media';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import Rating from '@mui/material/Rating';
import LinearProgress from '@mui/material/LinearProgress';
import Loading from '../Components/LoadingIcon/Loading'
import { Link } from '@mui/material';
export default function Booking_details() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [will_map_data, setWill_map_data] = useState([])
    const buttonStyles = useSelector((state) => state.all_theme)
    const loading = useSelector((state) => state.review.loading)
    const review = useSelector((state) => state.review.post_review_success)
    const selected_address = useSelector((state) => state.selected_address)
    const show_in_details_checkout = useSelector((state) => state.show_in_details_checkout)
    const data = useSelector(state => state.check_out_data)
    const checkout_loading = useSelector(state => state.check_out_data.loading)
    const id = localStorage.getItem('id')
    const [data_, setData_] = useState({ rating: parseInt(4), checkout: will_map_data?.id })

    useEffect(() => {
        if (show_in_details_checkout?.id) {
            setWill_map_data(show_in_details_checkout);
            localStorage.setItem('id', show_in_details_checkout?.id);
            setData_((prevData) => ({ ...prevData, checkout: show_in_details_checkout.id }));
        } else {
            const Matched_data = data?.check_out_get_list_success?.data?.filter((item) => item?.id === parseInt(id));
            Matched_data?.map((item) => {
                setWill_map_data(item);
                setData_((prevData) => ({ ...prevData, checkout: item.id }));
            });
        }
    }, [data]);

    useEffect(() => {
        dispatch(checked_out_get())
    }, [dispatch, data?.reschedule_check_out_get_list_success])

    const HandleFeedback = (e) => {
        const { name } = e.target
        const { value } = e.target
        setData_({ ...data_, [name]: value })
    }

    const HandleSubmit = (e) => {
        e.preventDefault()
        dispatch(post_review(data_))
    }

    useEffect(() => {
        setData_(
            {
                rating: parseInt(0),
                checkout: will_map_data?.id,
                comment: ''
            }
        );
    }, [review])

    useEffect(() => {
        if (data.cancel_booking_check_out_get_list_success.success) {
            dispatch(show_message(true, data?.cancel_booking_check_out_get_list_success?.data, 'success'))
        }
    }, [data?.cancel_booking_check_out_get_list_success?.data])

    return (
        <div>
            {checkout_loading ? <Loading /> :
                <>
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
                                                        <Typography><ArrowBackRoundedIcon sx={{ mt: .7, ml: 1 }} onClick={() => navigate('/all-booking')} fontSize='medium' /></Typography>
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
                                                <Grid lg={7} xl={7} md={7} xs={12} pt={3} px={2}>
                                                    <Card sx={{ background: 'white', color: 'black', borderRadius: '10px', p: 2 }} >
                                                        <Typography> <b>Service Cart</b></Typography>
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
                                                        {will_map_data?.packages?.map((item2) => (


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
                                                        ))}
                                                        <Box sx={{ borderRadius: '10px' }} p={1}>
                                                            <Typography mb={1}>
                                                                <b> Payment Summary </b></Typography>
                                                            <Grid container>
                                                                <Grid xs={6}>Item total</Grid>
                                                                <Grid xs={6} textAlign={'end'}>&#8377; {will_map_data?.total_price}</Grid>
                                                            </Grid>
                                                            <Grid container>
                                                                <Grid xs={6}>Item discount</Grid>
                                                                <Grid xs={6} textAlign={'end'}>&#8377; --</Grid>
                                                            </Grid>
                                                            <hr />
                                                            <Grid container>
                                                                <Grid xs={6}><b>Total</b></Grid>
                                                                <Grid xs={6} textAlign={'end'}><b>&#8377; {will_map_data.total_price}</b></Grid>
                                                            </Grid>
                                                        </Box>
                                                    </Card>

                                                </Grid>
                                                <Grid lg={5} md={5} textAlign={'start'} px={2} pt={3} >
                                                    <Card sx={{ background: 'white', color: 'black', borderRadius: '10px', p: 2 }} >
                                                        <Typography mb={1}>Booking Details</Typography>
                                                        <Grid container my={2}>
                                                            <Grid xs={9}>
                                                                <Typography>Amount To Pay: &#8377; {will_map_data.total_price}</Typography>
                                                                <Button variant='outlined' size='small'>Pay Now</Button>
                                                            </Grid>
                                                            <Grid xs={3} textAlign={'end'}>
                                                                <ArrowForwardIosIcon size='small' />
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container my={2}>
                                                            <Grid xs={1}>   <FmdGoodIcon /></Grid>
                                                            <Grid xs={11} textAlign={'start'} display={'flex'} alignItems={'center'}>{selected_address}</Grid>
                                                        </Grid>
                                                        <Grid container>
                                                            <Grid xs={1}>    <AccessTimeFilledIcon /></Grid>
                                                            <Grid xs={11} textAlign={'start'} display={'flex'} alignItems={'center'}><b>Slot :</b>{will_map_data.appointment_date}</Grid>
                                                        </Grid>
                                                        <Grid container my={3} >
                                                            <Grid xs={6} textAlign={'end'} p={2}>
                                                                <Button variant='outlined' style={{ border: `1px solid ${buttonStyles.buttonColor}`, color: `${buttonStyles.buttonColor}` }} fullWidth
                                                                    onClick={() => {
                                                                        const data = { reschedule: true, title: "Select reschedule" }
                                                                        const firstOrderId = [will_map_data?.id]
                                                                        dispatch(open_schedule_dialog(firstOrderId, data));
                                                                    }}
                                                                >
                                                                    Reschedule
                                                                </Button>

                                                            </Grid>
                                                            <Grid xs={6} p={2}>
                                                                <Button color='error' variant='contained' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} fullWidth onClick={() => dispatch(booking_cancel([will_map_data?.id]))}>
                                                                    Cancel
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                        <hr />
                                                    </Card>
                                                    <Card sx={{ background: 'white', color: 'black', borderRadius: '10px', p: 2, mt: 4, textAlign: 'center' }}>
                                                        <Box>
                                                            {loading ?
                                                                <Box sx={{ width: '100%' }}>
                                                                    <LinearProgress />
                                                                </Box>
                                                                : ''}
                                                            <Typography variant='h6' component="legend" mb={.8}>Rate your experience</Typography>
                                                            <Typography variant='subtitle2' >The corresponding author must inform about the withdrawal ( Cancellation ) of the article before the acceptance from the International Journal of Medical Research </Typography>
                                                            <form style={{ textAlign: 'center' }} onSubmit={HandleSubmit}>
                                                                <Rating
                                                                    sx={{ my: 2 }}
                                                                    name="simple-controlled"
                                                                    size='large'
                                                                    value={data_?.rating}
                                                                    onChange={HandleFeedback}
                                                                /><br />
                                                                <textarea onChange={HandleFeedback} placeholder='Type something...' style={{ minHeight: '3rem', width: 'auto', height: 'auto', borderRadius: '5px', padding: '5px' }} /><br />
                                                                <Button sx={{ border: `1px solid ${buttonStyles.buttonColor}`, color: `${buttonStyles.buttonColor}`, px: 2, my: 1 }}>Submit</Button>
                                                            </form>
                                                        </Box>
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
                                                    <Button variant='outlined' sx={{ m: 1 }} onClick={() => dispatch(open_help())}> <b>Help</b></Button>
                                                    {/* <Button variant='outlined' color='error'> <b>SOS</b></Button> */}
                                                </Grid>
                                            </Grid>
                                        </Card>
                                        <Box m={'auto'}>
                                            <Grid container >
                                                <Grid lg={7} xl={7} md={7} xs={12} pt={3} px={2}>
                                                    <Card sx={{ background: 'white', color: 'black', borderRadius: '10px', p: 2 }} >

                                                        <Box p={1}>
                                                            <Typography> <b>Service Cart</b></Typography>
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
                                                            {will_map_data?.packages?.map((item2) => (


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
                                                            ))}

                                                        </Box>
                                                        <Box sx={{ borderRadius: '10px' }} p={1}>
                                                            <Typography mb={1}>
                                                                <b> Payment Summary </b></Typography>
                                                            <Grid container>
                                                                <Grid xs={6}>Item total</Grid>
                                                                <Grid xs={6} textAlign={'end'}>&#8377; {will_map_data?.total_price}</Grid>
                                                            </Grid>
                                                            <Grid container>
                                                                <Grid xs={6}>Item discount</Grid>
                                                                <Grid xs={6} textAlign={'end'}>&#8377; --</Grid>
                                                            </Grid>
                                                            <hr />
                                                            <Grid container>
                                                                <Grid xs={6}><b>Total</b></Grid>
                                                                <Grid xs={6} textAlign={'end'}><b>&#8377; {will_map_data.total_price}</b></Grid>
                                                            </Grid>
                                                        </Box>
                                                    </Card>


                                                    <Card sx={{ my: 4, background: 'white', color: 'black', borderRadius: '10px', p: 2 }} >
                                                        <Typography mb={2}> <b>Cancellation & Research policy </b></Typography>
                                                        <span style={{ fontSize: '12px' }}>
                                                            The corresponding author must inform about the withdrawal ( Cancellation ) of the article before the acceptance from the International Journal of Medical Research and Review and the withdrawal ( Cancellation )</span>

                                                    </Card>
                                                </Grid>
                                                <Grid lg={5} md={5} textAlign={'start'} px={2} pt={3} >
                                                    <Card sx={{ background: 'white', color: 'black', borderRadius: '10px', p: 2 }} >
                                                        <Typography mb={1}><b>Booking Details</b></Typography>
                                                        <Grid container my={2}>
                                                            <Grid xs={1}>   <FmdGoodIcon /></Grid>
                                                            <Grid xs={11} textAlign={'start'}><b>Address:</b> {selected_address} ---</Grid>
                                                        </Grid>
                                                        <Grid container>
                                                            <Grid xs={1}>    <AccessTimeFilledIcon /></Grid>
                                                            <Grid xs={11} textAlign={'start'} display={'flex'} alignItems={'center'}><b>Slot :</b>{will_map_data.appointment_date}</Grid>
                                                        </Grid>
                                                        <Grid container mt={1} >
                                                            <Grid xs={6} textAlign={'end'} p={2}>
                                                                <Button variant='outlined' sx={{ border: `1px solid ${buttonStyles.buttonColor}`, color: `${buttonStyles.buttonColor}` }} fullWidth
                                                                    onClick={() => {
                                                                        const data = { reschedule: true, title: "Select reschedule" }
                                                                        const firstOrderId = [will_map_data?.id]
                                                                        dispatch(open_schedule_dialog(firstOrderId, data));
                                                                    }}
                                                                    disabled={data?.cancel_booking_check_out_get_list_success?.data}
                                                                >
                                                                    Reschedule
                                                                </Button>

                                                            </Grid>
                                                            <Grid xs={6} p={2}>
                                                                <Button color='error' variant='contained' disabled={data?.cancel_booking_check_out_get_list_success?.data} fullWidth onClick={() => dispatch(booking_cancel([will_map_data?.id]))}>
                                                                    Cancel
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    </Card>
                                                    {review?.success ?
                                                        <Card sx={{ background: 'white', color: 'black', borderRadius: '10px', p: 1, mt: 4 }}>
                                                            <Box mx={3}>
                                                                <Typography variant='h6' component="legend" mb={.8} textAlign={'center'}>Your response</Typography>
                                                                <Grid container pb={2}>
                                                                    <Grid item xs={2}> {review.data.rating} &#9733; </Grid>
                                                                    <Grid item xs={8}><Typography variant='subtitle' textAlign={'left'} >{review.data.comment}</Typography></Grid>
                                                                    <Grid item xs={2}><Link variant='link' sx={{ textTransform: 'capitalize' }}>Edit</Link></Grid>
                                                                </Grid>
                                                            </Box>
                                                            {loading ?
                                                                <Box sx={{ mx: -4, mb: -2, mt: 3 }}>
                                                                    <LinearProgress color="success" />
                                                                </Box>
                                                                :
                                                                ''}
                                                        </Card>
                                                        :
                                                        <Card sx={{ background: 'white', color: 'black', borderRadius: '10px', p: 2, mt: 4, textAlign: 'center' }}>

                                                            <Box>
                                                                <Typography variant='h6' component="legend" mb={.8}>Rate your experience</Typography>
                                                                <Typography variant='subtitle2' >The corresponding from the International Journal </Typography>
                                                                <form style={{ textAlign: 'center' }} onSubmit={HandleSubmit} >
                                                                    <Rating
                                                                        required
                                                                        sx={{ my: 1.4 }}
                                                                        name="rating"
                                                                        size='large'
                                                                        value={data_.rating}
                                                                        onChange={HandleFeedback}
                                                                    /><br />
                                                                    <textarea value={data_?.comment} required name='comment' onChange={HandleFeedback} placeholder='Type something...' style={{ minHeight: '3rem', width: '90%', height: 'auto', borderRadius: '5px', padding: '5px' }} /><br />
                                                                    <Button variant='outlined' disabled={data?.cancel_booking_check_out_get_list_success?.data} type='submit' sx={{ border: `1px solid ${buttonStyles.buttonColor}`, color: `${buttonStyles.buttonColor}`, px: 4, my: 2 }}>Submit</Button>
                                                                </form>
                                                            </Box>
                                                            {loading ?
                                                                <Box sx={{ mx: -4, mb: -2, mt: 3 }}>
                                                                    <LinearProgress color="success" />
                                                                </Box>
                                                                :
                                                                ''}
                                                        </Card>


                                                    }



                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Container>
                                )}
                            </>
                        )}

                    </Media>
                </>
            }
        </div >
    )
}
