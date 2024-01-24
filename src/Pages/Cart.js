import React, { useEffect, useState } from 'react'
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CircularProgress from '@mui/material-next/CircularProgress';
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Card } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Link, useNavigate } from 'react-router-dom';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { CardMedia } from '@mui/material';
import empty_cart from '../images/empty_cart.png'
import Proceed_to_pay from '../Components/Dialog/Proceed_to_pay';
import { useSelector, useDispatch } from 'react-redux';
import { store_data_for_check_out, get_my_profile, close_coupon_dialog, selected_date_time, add_fetch_post, checked_out_call, show_message, store_pathname, open_coupon_dialog, increment_in_bag, clear_all_cart_data, decrement_in_bag, get_all_cart_data, click_to_apply_coupon, show_all_address, open_schedule_dialog, Increment_in_u_bag, update_in_bag } from '../Redux/actions/actions';
import Media from 'react-media';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PaymentIcon from '@mui/icons-material/Payment';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Small_Cart from '../Components/Small_Cart';
import DeleteIcon from '@mui/icons-material/Delete';
import Cookies from 'js-cookie';
import Loading from '../Components/LoadingIcon/Loading';

export default function Cart() {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const buttonStyles = useSelector((state) => state?.all_theme)
  const selected_address = useSelector((state) => state.selected_address)
  const selected_date_time_var = useSelector((state) => state.selected_date_time)
  const get_my_profile_success_error = useSelector((state) => state.get_my_profile_success_error?.data)
  const posts = useSelector((state) => state.posts)
  const update_in_post = useSelector((state) => state.update_in_post)
  const Coupon_Code_value = useSelector((state) => state.apply_onClick_coupon)
  const coupons = useSelector((state) => state.coupons)
  const check_out_data = useSelector(state => state.check_out_data)
  const loading = useSelector((state) => state.coupons.loading)
  const card_data = useSelector((state) => state?.card_data?.data)
  const [data, setData] = React.useState()
  const [disable, setDisable] = React.useState(true)
  const [Load, setLoad] = useState(false)
  const [discount, setDiscount] = useState(null)

  const totalPackagePrice = []
  const token = Cookies.get('token')

  useEffect(() => {
    dispatch(get_my_profile())
  }, [token])

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

  useEffect(() => {
    if (coupons?.post_coupon_success?.success) {
      dispatch(close_coupon_dialog())
    }
  }, [coupons?.post_coupon_success?.success])

  useEffect(() => {
    if (coupons?.post_coupon_success?.data?.message === "Applicable") {
      function extractNumbersFromString(inputString) {
        const numbers = inputString.match(/\d+/g);
        return numbers ? numbers.join('') : '';
      }
      const mergedNumbersFrom1 = extractNumbersFromString(coupons?.post_coupon_success?.data?.result?.message);
      setDiscount(parseInt(mergedNumbersFrom1))
    } else {
      console.error('error')
    }
  }, [coupons?.post_coupon_success?.data?.result?.message])

  return (
    <div>
      {loading && <Loading />}
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
                {discount !== null ?
                  <Grid sx={{ background: '#22bb33', mt: 2, mx: -3 }}>
                    <Typography sx={{ color: 'white', textAlign: 'center', py: 1 }}>Congratulation &#8377;{discount} saved so far!
                    </Typography>
                  </Grid> : ''
                }
                {Array.isArray(card_data) && card_data.length > 0 &&
                  <>
                    <hr />
                    <Grid container>
                      <Grid xs={6}>Item total</Grid>
                      <Grid xs={6} textAlign={'end'}> &#8377;{totalPackagePrice.reduce(function (accumulator, currentValue) { return accumulator + currentValue }, 0)}</Grid>
                    </Grid>
                    <Grid container>
                      <Grid xs={6}>Item discount</Grid>
                      <Grid xs={6} textAlign={'end'}>  {discount !== null ? <Typography color={'#43a047'}> &#8377;{discount}</Typography> : <Typography color={'gray'}> &#8377;0</Typography>}</Grid>
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
                        &#8377; {(totalPackagePrice.reduce((accumulator, currentValue) => accumulator + currentValue, 0) - discount).toLocaleString('en-IN')}


                      </Typography></b></Grid>
                    </Grid>
                  </>
                }
              </Card>
              {Array.isArray(card_data) && card_data.length > 0 &&
                <>
                  {coupons?.post_coupon_success?.success && (
                    <Card sx={{
                      my: 2,
                      mx: 3,
                      borderRadius: '10px',
                      backdropFilter: `blur(10px)`,
                      background: '#ffff',
                      color: 'black', p: 1
                    }}  >
                      <Grid container p={0}>
                        <Grid item xs={1} pt={.1}>
                          <CheckCircleRoundedIcon fontSize='small' sx={{ color: '#00E311' }} />
                        </Grid>
                        <Grid item xs={9}>
                          <Box sx={{ color: 'black' }}>
                            <Typography variant='subtitle' fontSize={'13px'}>
                              {coupons?.post_coupon_success?.data?.result?.message}
                            </Typography> <br />
                            <Typography onClick={handleOpen} variant='subtitle' color={"gray"}>View all coupons <ArrowRightIcon sx={{ marginLeft: -1.5 }} color={'error'} /></Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={2}>
                          <Box sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }}>
                            <Button color='error' sx={{ textTransform: 'capitalize' }} onClick={() => {
                              dispatch(click_to_apply_coupon(''))
                              window.location.reload(true)
                            }}>Remove</Button>
                          </Box>
                        </Grid>

                      </Grid>
                    </Card>
                  )}
                  {coupons?.post_coupon_success.length === 0 && (
                    <Card sx={{
                      my: 2, mx: 3,
                      borderRadius: '10px',
                      backdropFilter: buttonStyles.child_backdropFilter,
                      background: 'WHITE',
                      color: buttonStyles.child_div_text,

                    }} elevation={2} onClick={handleOpen}  >
                      <Grid container sx={{ p: 1 }}>
                        <Grid item xs={1}>
                          <img width="25" style={{ marginTop: '2px' }} height="25" src="https://img.icons8.com/material/24/discount--v1.png" alt="discount--v1" />
                        </Grid>
                        <Grid item xs={9}>
                          <Typography size='large' variant='text' sx={{ color: 'black', mx: 1 }}>View all coupons</Typography>
                        </Grid>
                        <Grid item xs={2} textAlign="right">
                          <ArrowForwardIosIcon fontSize='small' sx={{ fontWeight: 800, color: 'gray' }} />
                        </Grid>
                      </Grid>
                    </Card>
                  )}
                </>
              }

              {Array.isArray(card_data) && card_data.length > 0 &&
                <>
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
                </>}

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
              {Array.isArray(card_data) && card_data?.length > 0 ? (
                <>
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
                            <span>+91 {get_my_profile_success_error?.data?.phone_number ? get_my_profile_success_error?.data?.phone_number : 'Please login first!'}</span>
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
                        <Small_Cart discount={discount} />
                      </Box>
                    </Grid>
                  </Grid>
                </>

              ) : (
                <Box height={'270px'} py={1} my={4}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    style={{ objectFit: 'contain', width: '100%', height: '100%', marginTop: '-40px' }}
                    image={empty_cart}
                  />

                  <Typography color={'warning'} my={1} textAlign={"center"}><Link to={'/'}>Go to add</Link></Typography>
                  <Typography color={'error'} variant='h6' mt={-0} textAlign={"center"}>Empty Cart</Typography>
                </Box>
              )}

            </Container>
          )
        )}

      </Media>
    </div >
  )
}
