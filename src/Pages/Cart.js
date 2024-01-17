import React, { useEffect, useState } from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CircularProgress from '@mui/material-next/CircularProgress';
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Card } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Link, useNavigate } from 'react-router-dom';
import { CardMedia } from '@mui/material';
import empty_cart from '../images/empty_cart.png'
import Proceed_to_pay from '../Components/Dialog/Proceed_to_pay';
import { useSelector, useDispatch } from 'react-redux';
import { store_data_for_check_out, selected_date_time, add_fetch_post, checked_out_call, show_message, store_pathname, open_coupon_dialog, increment_in_bag, clear_all_cart_data, decrement_in_bag, get_all_cart_data, click_to_apply_coupon, show_all_address, open_schedule_dialog, Increment_in_u_bag, update_in_bag } from '../Redux/actions/actions';
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
  const selected_date_time_var = useSelector((state) => state.selected_date_time)
  const get_my_profile_success_error = useSelector((state) => state.get_my_profile_success_error?.data)
  const posts = useSelector((state) => state.posts)
  const update_in_post = useSelector((state) => state.update_in_post)
  const Coupon_Code_value = useSelector((state) => state.apply_onClick_coupon)
  const check_out_data = useSelector(state => state.check_out_data)
  const card_data = useSelector((state) => state.card_data)
  const [data, setData] = React.useState()
  const [disable, setDisable] = React.useState(true)
  const [Load, setLoad] = useState(false)

  const totalPackagePrice = []
  const token = Cookies.get('token')

  const handleOpen = () => {
    if (token) {
      dispatch(open_coupon_dialog())
    } else {
      navigate('/login')
    }
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
      dispatch(show_message(true, 'Add packages first!', 'error'))
    }
  }
  const openSchedule = () => {
    if (Array.isArray(card_data) && card_data.length > 0) {
      if (Cookies.get('token')) {
        dispatch(open_schedule_dialog())
      } else {
        navigate('/login')
      }
    }
    else {
      dispatch(show_message(true, 'Add packages first!', 'error'))
    }

  }

  const handleIncrease = (id) => {
    dispatch(increment_in_bag(id))
    dispatch(add_fetch_post())
    dispatch(get_all_cart_data())
    setLoad(true)
  };

  const handelDecrease = (id) => {
    dispatch(add_fetch_post())
    dispatch(decrement_in_bag(id))
    dispatch(get_all_cart_data())
    setLoad(true)
  }

  useEffect(() => {
    setTimeout(() => {
      dispatch(get_all_cart_data())
      setLoad(false)
    }, 1000);
  }, [dispatch, update_in_post, posts])

  useEffect(() => { dispatch(store_pathname(window.location.pathname)) }, [])


  useEffect(() => {
    const ready_for_check_out = Array.isArray(card_data) && card_data.length > 0 ? card_data?.map((item) => ({ "id": item.package_id, "quantity": item.quantity })) : []
    dispatch(store_data_for_check_out(ready_for_check_out))
  }, [card_data])

  const dateObject = new Date(selected_date_time_var);
  const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const formattedDate = dateObject.toLocaleDateString('en-US', options);

  React.useEffect(() => {
    const dat = check_out_data?.cart_item_for_check_out_address_id?.map((item) => item)
    const data = {
      "address": dat[0]?.id,
      "appointment_date": selected_date_time_var,
      ...(Coupon_Code_value ? { "coupon": Coupon_Code_value } : {}),
      "packages": check_out_data.cart_item_for_check_out_bag_data
    };

    setData(data)
  }, [selected_address, selected_date_time_var])


  const HandleCheckOut = () => {
    if (selected_address) {
      if (selected_date_time_var) {
        dispatch(checked_out_call(data))
      }
      else {
        dispatch(show_message(true, 'Please select address!', 'error'))
      }
    } else {
      dispatch(show_message(true, 'Please select schedule!', 'error'))
    }
  }
  React.useEffect(() => {
    if (check_out_data?.check_out_success.success) {
      dispatch(clear_all_cart_data())
      dispatch(selected_date_time())
      setTimeout(() => {
        navigate('/successful')
        window.location.reload(true)
      }, 500);
    }

  }, [check_out_data?.check_out_success])

  const clear_cart = () => {
    dispatch(add_fetch_post())
    dispatch(clear_all_cart_data())
  }
  useEffect(() => {
    if (selected_address) {
      if (selected_date_time_var) {
        setDisable(false)
      }
    }

  }, [selected_address, selected_date_time_var])


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
                    <Button color='error' onClick={() => clear_cart()}>
                      <span style={{ textUnderlinePosition: 'under', borderBottom: '1px solid red', textTransform: 'capitalize', fontSize: '15px' }}> Clear Cart</span>
                    </Button>
                  </Grid>
                </Grid>
                {Array.isArray(card_data) && card_data?.length > 0 ? (

                  card_data?.map((item) => {
                    const total_price = item?.original_price * item?.quantity;
                    totalPackagePrice.push(total_price);
                    if (item?.quantity !== 0) {
                      return (
                        <Grid container mt={2} mb={1} key={item.id}>
                          <hr />
                          <Grid xs={6}>
                            <Typography>{item?.package}</Typography>
                            <Typography>Price: &#8377; {total_price}</Typography>
                          </Grid>
                          {Load ?
                            <Grid xs={6} textAlign={'end'}>
                              <Button sx={{ color: buttonStyles.icons_Color, backgroundColor: 'white', width: '80px', borderRadius: '10px' }}>
                                <CircularProgress
                                  color="tertiary"
                                  variant="indeterminate"
                                  sx={{
                                    width: '24px',
                                    height: '24px',
                                  }}
                                />
                              </Button>
                            </Grid>
                            :
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
                          }

                        </Grid>
                      );
                    }
                  })
                ) : (
                  <Box my={1.5}>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      image={empty_cart}
                    />
                    <Typography color={'error'} variant='h6' mt={2} textAlign={"center"}>Empty Cart</Typography>
                  </Box>
                )}
                {Array.isArray(card_data) && card_data.length > 0 &&
                  <>
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
                  </>
                }

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
                {Array.isArray(card_data) && card_data.length > 0 ? (
                  <Button variant='contained' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} fullWidth onClick={show_allAddress}>
                    Proceed
                  </Button>
                ) : (
                  <Button variant='contained' disabled fullWidth >
                    Proceed
                  </Button>
                )}

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
                        <span>+91 {get_my_profile_success_error?.phone_number ? get_my_profile_success_error?.phone_number : 'Please login first!'}</span>
                      </Grid>
                    </Grid>
                    <hr />
                    <Grid container my={2}>
                      <Grid xs={1} textAlign={'center'}>
                        <FmdGoodIcon />
                      </Grid>
                      <Grid xs={10}>
                        <Typography mt={.2}><b>Address :</b> {selected_address}  </Typography>
                      </Grid>
                      <Grid xs={1}>
                        <Typography>{selected_address && <Button onClick={show_allAddress} sx={{ textTransform: 'capitalize', textAlign: 'end' }}>Edit</Button>} </Typography>
                      </Grid>
                    </Grid>
                    <Box>
                      <hr />
                      {selected_address ? "" :
                        <>
                          <Button style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} variant='contained' fullWidth size='large' onClick={show_allAddress}> Select an Address</Button>
                          <hr />
                        </>
                      }

                    </Box>
                    <Grid container my={1}>
                      <Grid xs={1} textAlign={'center'}>
                        <AccessTimeFilledIcon />
                      </Grid>
                      <Grid xs={10}>
                        <Typography><b>Slot :</b> {formattedDate} </Typography>
                      </Grid>
                      <Grid xs={1}>
                        <Typography>{formattedDate !== 'Invalid Date' && <Button onClick={openSchedule} sx={{ textTransform: 'capitalize', textAlign: 'end' }}>Edit</Button>} </Typography>
                      </Grid>
                    </Grid>
                    <Box>
                      <hr />
                      {formattedDate !== 'Invalid Date' ? "" :
                        <>
                          {selected_address &&
                            <>
                              <Button
                            style={{
                              background: buttonStyles.buttonColor,
                              color: buttonStyles.buttonText,
                            }}
                            variant='contained'
                            fullWidth
                            size='large'
                            onClick={openSchedule}
                          >
                            Slot
                          </Button>
                            </>
                          }
                         
                        </>
                      }


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
                      <Button onClick={HandleCheckOut}
                        style={{
                          background: disable ? '#D1D1D1' : buttonStyles.buttonColor,
                          color: disable ? 'white' : buttonStyles.buttonText,
                        }}
                        disabled={disable}
                        variant='contained' fullWidth size='large'> Payment</Button>
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
