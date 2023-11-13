import React from 'react'
import Coupon from '../Components/Coupon'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Card } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { openAdd_Address, open_coupon_dialog, show_all_address, hide_all_address, open_schedule_dialog } from '../Redux/actions/actions';
import Media from 'react-media';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PaymentIcon from '@mui/icons-material/Payment';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
export default function Cart() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const buttonStyles = useSelector((state) => state?.apply_new_theme)

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
              <Box sx={{ px: 3 }}>
                <Grid container mt={1} >
                  <Grid xs={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                      <Typography><ArrowBackRoundedIcon sx={{ mt: .5, mr: 2 }} onClick={() => navigate('/')} fontSize='medium' /></Typography>
                      <Typography variant='h6' ml={-1}> <b>Cart</b></Typography>
                    </Box>
                  </Grid>

                </Grid>
                <hr />

                <Grid container mt={2} mb={5}>
                  <Grid xs={6}>
                    <Typography  >Package Name</Typography>
                    <Typography  >Price: &#8377; 200</Typography>
                  </Grid>
                  <Grid xs={6} textAlign={'end'}>
                    <Button sx={{ color: buttonStyles.icons_Color, backgroundColor: 'white', width: '80px', borderRadius: '10px' }}>
                      <RemoveIcon sx={{ mx: 1 }} />
                      1
                      <AddIcon sx={{ mx: 1 }} />
                    </Button>


                  </Grid>
                </Grid>
                <Grid container>
                  <Grid xs={6}>Item total</Grid>
                  <Grid xs={6} textAlign={'end'}> &#8377; 12,000</Grid>
                </Grid>
                <Grid container>
                  <Grid xs={6}>Item discount</Grid>
                  <Grid xs={6} textAlign={'end'}>  &#8377; 200</Grid>
                </Grid>
                <Grid container>
                  <Grid xs={6}>Tax and fee</Grid>
                  <Grid xs={6} textAlign={'end'}> &#8377; 100</Grid>
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

                   &#8377; 1200
                  </Typography></b></Grid>
                </Grid>
              </Box>
              <Card sx={{
                my: 2, mx: 1,
                borderRadius: '10px',
                backdropFilter: buttonStyles.child_backdropFilter,
                background: buttonStyles.child_bg,
                color: buttonStyles.child_div_text,

              }} elevation={2} onClick={handleOpen}  >
                <Grid container sx={{ p:1 }}>
                  <Grid item xs={2}>
                    <img width="40" style={{ marginTop: '6px' }} height="40" src="https://img.icons8.com/material/24/discount--v1.png" alt="discount--v1" />
                  </Grid>
                  <Grid item xs={8} textAlign="left">
                    <Button size='large' variant='text' sx={{ marginTop: '3px' }} >Apply Coupon</Button>
                  </Grid>
                  <Grid item xs={2} textAlign="right">
                    <ArrowForwardIosIcon sx={{ marginTop: '13px' }} />
                  </Grid>
                </Grid>
              </Card>
              <Box p={4}>

                <Button variant='contained' style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} fullWidth onClick={() => navigate('/address')}>
                  Proceed
                </Button>
              </Box>
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
                        <Typography><b>Address</b></Typography>
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
                        <Typography><b>Slot</b></Typography>
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
                    <Box sx={{ color: 'black' }}>
                      <Typography variant='h5'>Cancellation & reschedule policy</Typography>
                      <span>So basically, I am trying to create a progress bar. In this example, I will just change the colors I was using to red, green and blue instead since that's obviously easier to understand than a load of hex values. Effectively, what I am going for is for the progress bar to have this RGB gradien
                      </span>
                    </Box>
                  </Box>
                </Grid>
                <Grid xs={4}>

                  <Box mx={1}>
                    <Box sx={{
                      my: 1, borderRadius: '10px',
                      backdropFilter: buttonStyles.child_backdropFilter,
                      background: buttonStyles.child_bg,
                      color: buttonStyles.child_div_text, p: 1
                    }} >
                      <Box my={1}>
                        <Typography> <b>Cart</b></Typography>
                      </Box>
                      <Box>
                        Bag item's
                      </Box>
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
                    <Box sx={{
                      my: 1, borderRadius: '10px',
                      backdropFilter: buttonStyles.child_backdropFilter,
                      background: buttonStyles.child_bg,
                      color: buttonStyles.child_div_text,
                    }} onClick={handleOpen}  >
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
                    <Box sx={{
                      borderRadius: '10px',
                      backdropFilter: buttonStyles.child_backdropFilter,
                      background: buttonStyles.child_bg,
                      color: buttonStyles.child_div_text,
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
                    </Box>
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
