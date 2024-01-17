import React, { useEffect, useState } from 'react'
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
    const buttonStyles = useSelector((state) => state?.apply_new_theme)
    const [load, setLoad] = useState(false)
    const data = useSelector(state => state.check_out_data)

    useEffect(() => {
        dispatch(checked_out_get(10, 10))
    }, [])

    useEffect(() => {
        setLoad(false)
    }, [data])

    const ShowDetailsFunction = (item) => {
        dispatch(to_show_in_details_checkout(item))
        navigate('/booking-details')
    }
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
        setLoad(true)
        dispatch(checked_out_get(value, 10))

    };


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
                            backdropFilter: buttonStyles.child_backdropFilter,
                            background: buttonStyles.child_bg,
                            color: buttonStyles.child_div_text,

                        }} >

                            <Grid container>
                                <Grid xs={6}>
                                    <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                        <Typography onClick={() => navigate('/')}><ArrowBackRoundedIcon sx={{ mt: .5, mr: 2 }} fontSize='large' /></Typography>
                                        <Typography variant='h5' mt={1}> <b>Booking & plans</b></Typography>
                                    </Box>
                                </Grid>
                                <Grid xs={6} textAlign={'end'}>
                                    <Button variant='outlined' onClick={() => dispatch(open_help())}> <b>Help</b></Button>

                                </Grid>
                            </Grid>
                            <hr style={{ border: '1px solid' }} />
                            {load ? <Loading /> :
                                <Box mx={10} mt={2}>
                                    <Typography variant='h5' mb={2}><b>Categories</b></Typography>
                                    {data?.check_out_get_list_success?.data?.map((item, index) => {
                                        return (
                                            <>

                                                <Card sx={{ border: '1px solid black', borderRadius: '10px', px: 2, py: 1.5, mt: 2 }} key={index}  >
                                                    <Grid container onClick={() => ShowDetailsFunction(item)}>
                                                        <Grid xs={6}>
                                                            <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                                                <Box>
                                                                    <Typography sx={{ color: '#4CAF50' }} fontSize={'13px'}><b>BOOKED </b></Typography>
                                                                    <span style={{ fontSize: '13px' }}><b>Category name & more</b></span>
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
                                    <Pagination count={50} variant="outlined" shape="rounded" page={page} onChange={handleChange} />
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
                            borderRadius: '10px',
                            backdropFilter: buttonStyles.child_backdropFilter,
                            background: buttonStyles.child_bg,
                            color: buttonStyles.child_div_text,
                        }} >
                            <Grid container>
                                <Grid xs={6} textAlign={'left'}>
                                    <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                        <Typography onClick={() => navigate('/profile')}><ArrowBackRoundedIcon sx={{ mt: .5, mr: 2 }} fontSize='medium' /></Typography>
                                        <Typography variant='h6'> <b>Booking & plans</b></Typography>
                                    </Box>
                                </Grid>
                                <Grid xs={6} textAlign={'end'}>
                                    <Button variant='outlined' onClick={() => dispatch(open_help())}> <b>Help</b></Button>


                                </Grid>
                            </Grid>
                            <hr style={{ border: '.5px solid' }} />
                            {load ? <Loading /> :
                                <Box mx={1} mt={2}>
                                    <Typography variant='h5'><b>Category</b></Typography>
                                    {data?.check_out_get_list_success?.data?.map((item) => (
                                        <Box sx={{ border: '1px solid black', borderRadius: '10px', p: 2 }} mt={3} >
                                            <Grid container onClick={() => ShowDetailsFunction(item)}>
                                                <Grid xs={6}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                                        <Box>
                                                            <Typography sx={{ color: '#4CAF50' }} fontSize={'13px'}><b>BOOKED </b></Typography>
                                                            <span style={{ fontSize: '13px' }}><b>Category name & more</b></span>
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
                                        </Box>
                                    ))}

                                    <hr style={{ border: '1px solid', marginTop: '30px' }} />
                                    <Stack spacing={2}>
                                        <Pagination count={50} variant="outlined" shape="rounded" page={page} onChange={handleChange} />
                                    </Stack>
                                </Box>}


                        </Container>
                    </>
                )}
            </Media>
        </>
    )
}

