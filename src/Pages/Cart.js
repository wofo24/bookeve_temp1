import React, { useEffect, useState } from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Coupon from '../Components/Coupon'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Card } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Link, useNavigate } from 'react-router-dom';
import { CardMedia } from '@mui/material';
import empty_cart from '../images/empty_cart.png'
import Proceed_to_pay from '../Components/Dialog/Proceed_to_pay';
import { useSelector, useDispatch } from 'react-redux';
import { store_data_for_check_out, open_coupon_dialog, increment_in_bag, clear_all_cart_data, decrement_in_bag, get_all_cart_data, click_to_apply_coupon, show_all_address, open_schedule_dialog, Increment_in_u_bag, update_in_bag } from '../Redux/actions/actions';
import Media from 'react-media';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PaymentIcon from '@mui/icons-material/Payment';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Small_Cart from '../Components/Small_Cart';
import DeleteIcon from '@mui/icons-material/Delete';
import Cookies from 'js-cookie';
export default function Cart() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const buttonStyles = useSelector((state) => state?.apply_new_theme)
  const selected_address = useSelector((state) => state.selected_address)
  const selected_date_time = useSelector((state) => state.selected_date_time)
  const Coupon_Code_value = useSelector((state) => state.apply_onClick_coupon)
  const card_data = useSelector((state) => state.card_data)
  const card_data_error = useSelector((state) => state.card_data_error)
  const totalPackagePrice = []

  const handleOpen = () => {
    dispatch(open_coupon_dialog())
  }
  const show_allAddress = () => {
    if (Array.isArray(card_data) && card_data.length > 0) {
      if (Cookies.get('token')) {
        dispatch(show_all_address())
      } else {
        navigate('/login')
      }
    }
    else {
      alert('You have no any package in your Cart!')
    }
  }
  const openSchedule = () => {
    dispatch(open_schedule_dialog())
  }

  const handleIncrease = (id) => {
    dispatch(increment_in_bag(id))
    window.location.reload(true)
  };

  const handelDecrease = (id) => {
    dispatch(decrement_in_bag(id))
    window.location.reload(true)
  }

  useEffect(() => {
    dispatch(get_all_cart_data())
  }, [dispatch])



  useEffect(() => {
    const ready_for_check_out = Array.isArray(card_data) && card_data.length > 0 ? card_data?.map((item) => ({ "id": item.package_id, "quantity": item.quantity })) : []
    dispatch(store_data_for_check_out(ready_for_check_out))
  }, [card_data])

  return (
    <div>
      <Media
        queries={{
          small: '(max-width: 768px)',
          medium: '(min-width: 769px) and (max-width: 1024px)',
          large: '(min-width: 1025px)',
        }}
      >
        {(item) => (
          item.small && (
            <>
              <Card sx={{
                mx: 2, my: 2,
                px: 3,
                py: 1,
                borderRadius: '10px',
                backdropFilter: buttonStyles.child_backdropFilter,
                background: buttonStyles.child_bg,
                color: buttonStyles.child_div_text,
              }}>
                <Grid container mt={1}>
                  <Grid xs={7}>
                    <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                      <Typography><ArrowBackRoundedIcon sx={{ mt: .5, mr: 2 }} onClick={() => navigate('/')} fontSize='medium' /></Typography>
                      <Typography variant='h6' ml={-1} fontWeight={500}> Cart</Typography>
                    </Box>
                  </Grid>
                  <Grid container xs={5} justifyContent="flex-end">
                    <Button color='error' onClick={() => dispatch(clear_all_cart_data())}>
                      <span style={{ textUnderlinePosition: 'under', borderBottom: '1px solid red', textTransform: 'capitalize', fontSize: '15px' }}> Clear Cart</span>
                    </Button>
                  </Grid>
                </Grid>
                <hr />
                {Array.isArray(card_data) && card_data.length > 0 ? (

                  card_data?.map((item) => {
                    const total_price = item.original_price * item.quantity;
                    totalPackagePrice.push(total_price);
                    if (item.quantity !== 0) {
                      return (
                        <Grid container mt={2} mb={1} key={item.id}>
                          <Grid xs={6}>
                            <Typography>{item?.package}</Typography>
                            <Typography>Price: &#8377; {total_price}</Typography>
                          </Grid>
                          <Grid xs={6} textAlign={'end'}>
                            <Button sx={{ color: buttonStyles.icons_Color, backgroundColor: 'white', width: '80px', borderRadius: '10px' }}>
                              {item?.quantity <= 1 ? (
                                <DeleteIcon sx={{ mx: 1 }} onClick={() => handelDecrease(item.package_id)} />
                              ) : (
                                <RemoveIcon sx={{ mx: 1 }} onClick={() => handelDecrease(item.package_id)} />
                              )}
                              {item?.quantity}
                              <AddIcon sx={{ mx: 1 }} onClick={() => handleIncrease(item.package_id)} />
                            </Button>
                          </Grid>
                        </Grid>
                      );
                    }
                  })
                ) : (
                  <Box>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      image={empty_cart}
                    />
                    <Typography color={'error'} variant='h6' mt={2} textAlign={"center"}>Empty Cart</Typography>
                  </Box>
                )}
                <hr />
                <Grid container>
                  <Grid xs={6}>Item total</Grid>
                  <Grid xs={6} textAlign={'end'}> &#8377;{totalPackagePrice.reduce(function (accumulator, currentValue) { return accumulator + currentValue }, 0)}</Grid>
                </Grid>
                <Grid container>
                  <Grid xs={6}>Item discount</Grid>
                  <Grid xs={6} textAlign={'end'}>  &#8377; --</Grid>
                </Grid>
                <Grid container>
                  <Grid xs={6}>Tax and fee</Grid>
                  <Grid xs={6} textAlign={'end'}> &#8377; --</Grid>
                </Grid>
                <hr />
                <Grid container>
                  <Grid xs={6}><b>
                    <Typography>

                      Total
                    </Typography>
                  </b>

                  </Grid>
                  <Grid xs={6} textAlign={'end'}><b><Typography>
                    &#8377; {(totalPackagePrice.reduce(function (accumulator, currentValue) { return accumulator + currentValue }, 0)).toLocaleString('en-IN')}

                  </Typography></b></Grid>
                </Grid>
              </Card>
              {Coupon_Code_value && (
                <Box sx={{
                  my: 2,
                  mx: 3,
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
                </Box>
              )}
              {!Coupon_Code_value && (
                <Card sx={{
                  my: 2, mx: 3,
                  borderRadius: '10px',
                  backdropFilter: buttonStyles.child_backdropFilter,
                  background: buttonStyles.child_bg,
                  color: buttonStyles.child_div_text,

                }} elevation={2} onClick={handleOpen}  >
                  <Grid container sx={{ p: 1 }}>
                    <Grid item xs={2}>
                      <img width="40" style={{ marginTop: '2px' }} height="40" src="https://img.icons8.com/material/24/discount--v1.png" alt="discount--v1" />
                    </Grid>
                    <Grid item xs={8} textAlign="left">
                      <Button size='large' variant='text' sx={{ marginTop: '3px' }} >Apply Coupon</Button>
                    </Grid>
                    <Grid item xs={2} textAlign="right">
                      <ArrowForwardIosIcon sx={{ marginTop: '13px' }} />
                    </Grid>
                  </Grid>
                </Card>
              )}

              <Box px={4} pb={4} pt={2}>
                <Button variant='contained' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} fullWidth onClick={show_allAddress}>
                  Proceed
                </Button>
              </Box>
              <Proceed_to_pay />
            </>
          )
        )}
      </Media>
      <Media
        queries={{
          small: '(max-width: 768px)',
          medium: '(min-width: 769px) and (max-width: 1024px)',
          large: '(min-width: 1025px)',
        }}
      >
        {(item) => (
          item.large && (
            <Container sx={{ p: 8 }}>
              <Grid container spacing={2}>
                <Grid xs={8}>
                  <Box p={3} px={4} sx={{
                    borderRadius: '10px',
                    backdropFilter: buttonStyles.child_backdropFilter,
                    background: buttonStyles.child_bg,
                    color: buttonStyles.child_div_text,
                  }} mx={2} mt={1}>
                    <Grid container my={1}>
                      <Grid xs={1} textAlign={'center'}>
                        <FmdGoodIcon />
                      </Grid>
                      <Grid xs={10}>
                        <Typography><b>Sending booking details to</b></Typography>
                        <span>+91 8423174102</span>
                      </Grid>
                    </Grid>
                    <hr />
                    <Grid container my={2}>
                      <Grid xs={1} textAlign={'center'}>
                        <FmdGoodIcon />
                      </Grid>
                      <Grid xs={10}>
                        <Typography><b>Address</b>: {selected_address}</Typography>
                      </Grid>
                    </Grid>
                    <Box>
                      <hr />
                      <Button style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} variant='contained' fullWidth size='large' onClick={show_allAddress}> Select an Address</Button>
                      <hr />
                    </Box>
                    <Grid container my={1}>
                      <Grid xs={1} textAlign={'center'}>
                        <AccessTimeFilledIcon />
                      </Grid>
                      <Grid xs={10}>
                        <Typography><b>Slot</b> {selected_date_time} </Typography>
                      </Grid>
                    </Grid>
                    <Box>
                      <hr />
                      <Button style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} variant='contained' fullWidth size='large' onClick={openSchedule}> Slot</Button>
                      <hr />
                    </Box>
                    <Grid container my={3}>
                      <Grid xs={1} textAlign={'center'}>
                        <PaymentIcon />
                      </Grid>
                      <Grid xs={10}>
                        <Typography><b>Payment Method</b></Typography>
                      </Grid>
                    </Grid>
                    <Box>
                      <hr />
                      <Button onClick={() => navigate('/payment')} style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} variant='contained' fullWidth size='large'> Payment</Button>
                      <hr />
                    </Box>
                    <Box >
                      <Typography variant='h5'>Cancellation & reschedule policy</Typography>
                      <span style={{ color: 'gray', fontSize: '14px' }}>So basically, I am trying to create a progress bar. In this example, I will just change the colors I was using to red, green and blue instead since that's obviously easier to understand than a load of hex values. Effectively, what I am going for is for the progress bar to have this RGB gradien
                      </span>
                    </Box>
                  </Box>
                </Grid>
                <Grid xs={4}>
                  <Box sx={{ color: 'black', borderRadius: '10px', py: 1, width: 360, pl: 0 }}>
                    <Small_Cart />
                  </Box>
                </Grid>
              </Grid>
            </Container>
          )
        )}

      </Media>
    </div >
  )
}
