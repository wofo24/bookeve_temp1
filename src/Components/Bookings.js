import React, { useEffect } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Card, Grid } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Box, Typography, Button, Container } from '@mui/material'
import Media from 'react-media';
import { useDispatch, useSelector } from 'react-redux'
import Pagination from '@mui/material/Pagination';
import { open_help, checked_out_get, to_show_in_details_checkout } from '../Redux/actions/actions';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import Loading from './LoadingIcon/Loading';
export default function Bookings() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const styles = useSelector((state) => state?.all_theme)
    const data = useSelector(state => state.check_out_data)
    const loading = useSelector(state => state.check_out_data.loading)
    const [page, setPage] = React.useState(1);



    const ShowDetailsFunction = (item) => {
        dispatch(to_show_in_details_checkout(item))
        navigate('/booking-details')
    }

    useEffect(() => {
        dispatch(checked_out_get(0, 10))

    }, [dispatch, data?.reschedule_check_out_get_list_success,])

    const handleChange = (event, value) => {
        const data = `${value - 1}${0}`
        setPage(value);
        dispatch(checked_out_get(parseInt(data), 10))
    };


    console.log(data?.check_out_get_list_success?.data, 'this is data')
    return (
        <>
            {loading
                ?
                <Loading />
                :
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
                                    background: styles?.colors?.secondary,
                                    color: styles?.colors?.heighlightText,

                                }} >

                                    <Grid container>
                                        <Grid xs={6}>
                                            <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                                <Typography onClick={() => navigate('/')}><ArrowBackRoundedIcon sx={{ mt: .5, mr: 2 }} fontSize='large' /></Typography>
                                                <Typography variant='h5' mt={1}> <b>Booking & plans</b></Typography>
                                            </Box>
                                        </Grid>
                                        <Grid xs={6} textAlign={'end'}>
                                            <Button variant='outlined' style={{ background: styles?.colors?.button, color: styles?.colors?.white }} onClick={() => dispatch(open_help())}> <b>Help</b></Button>
                                            {/* <Button fullWidth variant='contained' onClick={submitData}>Proceed</Button> */}
                                        </Grid>
                                    </Grid>
                                    <hr style={{ border: '1px solid' }} />
                                    {loading ? <Loading /> :
                                        <Box mx={10} mt={2}>
                                            {/* <Typography variant='h5' mb={2}><b>Categories</b></Typography> */}
                                            {data?.check_out_get_list_success?.data?.map((item, index) => {
                                                return (
                                                    <>

                                                        <Card sx={{ border: '1px solid black', borderRadius: '10px', px: 2, py: 1.5, mt: 2 }} key={index}  >
                                                            <Grid container onClick={() => ShowDetailsFunction(item)}>
                                                                <Grid xs={6}>
                                                                    <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                                                        <Box>
                                                                            <Typography sx={{ color: item?.order_stage_verbose === 'Cancelled' ? styles?.colors?.error : item?.order_stage_verbose === 'Completed' ? styles?.colors?.success : '#F7CB73' }} fontSize={'13px'}><b>{item?.order_stage_verbose} </b></Typography>
                                                                            <span style={{ fontSize: '13px' }}><b>
                                                                                {
                                                                                    item?.packages?.map((item2, index) => index === 0 && item2?.package_name)
                                                                                }

                                                                                {item.packages.length > 1 && ` & ${item.packages.length - 1} More`}

                                                                            </b></span>
                                                                            <Typography style={{ fontSize: '11px' }}><b>Price:</b> &#8377; <span> {item.total_price}</span></Typography>
                                                                            <Typography style={{ fontSize: '11px' }}><b>Time:</b> {item.appointment_date}</Typography>
                                                                        </Box>
                                                                    </Box>
                                                                </Grid>
                                                                <Grid xs={6} textAlign={'end'}>
                                                                    <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', height: '100%' }}>
                                                                        <ArrowForwardIosIcon />
                                                                    </Box>
                                                                </Grid>
                                                            </Grid>
                                                        </Card>
                                                    </>
                                                )
                                            })}
                                        </Box>
                                    }

                                    <hr style={{ border: '1px solid', marginTop: '30px' }} />
                                    <Box sx={{ display: 'flex', placeContent: 'center' }}>
                                        <Stack spacing={2}>
                                            <Pagination count={Math.ceil(data?.check_out_get_list_success?.count / 10)} defaultPage={1} variant="outlined" shape="rounded" page={page} onChange={handleChange} />
                                        </Stack>

                                    </Box>
                                </Container>
                            </>
                        )

                        }

                    </Media>
                    <Media
                        queries={{
                            small: '(max-width: 768px)',
                            medium: '(min-width: 769px) and (max-width: 1024px)',
                            large: '(min-width: 1025px)',
                        }}
                    >
                        {(item) => item.small && (
                            <>
                                <Container margin={'auto'} sx={{
                                    p: 2,
                                    borderRadius: '10px', background: styles?.colors?.secondary,
                                    color: styles?.colors?.heighlightText,
                                }} >
                                    <Grid container>
                                        <Grid xs={6} textAlign={'left'}>
                                            <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                                <Typography onClick={() => navigate('/profile')}><ArrowBackRoundedIcon sx={{ mt: .5, mr: 2 }} fontSize='medium' /></Typography>
                                                <Typography variant='h6'> <b>Booking & plans</b></Typography>
                                            </Box>
                                        </Grid>
                                        <Grid xs={6} textAlign={'end'}>
                                            <Button variant='outlined' style={{ background: styles?.colors?.button, color: styles?.colors?.white }} onClick={() => dispatch(open_help())}> <b>Help</b></Button>


                                        </Grid>
                                    </Grid>
                                    <hr style={{ border: '.5px solid' }} />
                                    {loading ? <Loading /> :
                                        <Box mx={1} mt={2}>
                                            {data?.check_out_get_list_success?.data?.map((item) => (
                                                <Box sx={{ border: '1px solid black', borderRadius: '10px', pb: 1, px: 2, pt: 1 }} mt={3} >
                                                    <Grid container onClick={() => ShowDetailsFunction(item)}>
                                                        <Grid xs={8}>
                                                            <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                                                <Box>
                                                                    <Typography sx={{ color: item?.order_stage_verbose === 'Cancelled' ? styles?.colors?.error : item?.order_stage_verbose === 'Completed' ? styles?.colors?.success : '#F7CB73' }} fontSize={'13px'}><b>{item?.order_stage_verbose} </b></Typography>
                                                                    <span style={{ fontSize: '13px' }}><b>
                                                                        {
                                                                            item?.packages?.map((item2, index) => index === 0 && item2?.package_name)
                                                                        }

                                                                        {item.packages.length > 1 && ` & ${item.packages.length - 1} More`}
                                                                    </b></span>
                                                                    <Typography style={{ fontSize: '11px' }}><b>Price:</b> &#8377; <span> {item.total_price}</span></Typography>
                                                                    <Typography style={{ fontSize: '11px' }}><b>Time:</b> &nbsp;

                                                                        {
                                                                            new Date(item.appointment_date).toLocaleString('en-US', {
                                                                                year: 'numeric', month: 'long', day: 'numeric',
                                                                                hour: 'numeric', minute: 'numeric', second: 'numeric'
                                                                            })


                                                                        }



                                                                    </Typography>
                                                                    <Typography style={{ fontSize: '11px' }}><b>Payment Method:</b> &nbsp;

                                                                        {item?.payment_method_verbose}



                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Grid>
                                                        <Grid xs={4} textAlign={'end'}>
                                                            <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', height: '100%' }}>
                                                                <ArrowForwardIosIcon />
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            ))}

                                            <hr style={{ border: '1px solid', marginTop: '30px' }} />

                                            <Box sx={{ display: 'flex', placeContent: 'center' }}>
                                                <Stack spacing={2}>
                                                    <Pagination count={Math.ceil(data?.check_out_get_list_success?.count / 10)} defaultPage={1} variant="outlined" shape="rounded" page={page} onChange={handleChange} />
                                                </Stack>

                                            </Box>
                                        </Box>}


                                </Container>
                            </>
                        )}
                    </Media>
                </>
            }

        </>
    )
}

