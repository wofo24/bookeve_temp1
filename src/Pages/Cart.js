import React from 'react'
import Coupon from '../Components/Coupon'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { openAdd_Address, open_coupon_dialog, show_all_address, hide_all_address, open_schedule_dialog } from '../Redux/actions/actions';
import Media from 'react-media';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PaymentIcon from '@mui/icons-material/Payment';
export default function Cart() {
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
              <Box>
                <Typography> <b>Cart</b></Typography>
              </Box>
              <Card sx={{ my: 2 }} elevation={2} onClick={handleOpen}  >
                <Grid container sx={{ p: 2 }}>
                  <Grid item xs={2}>
                    <img width="40" style={{ marginTop: '10px' }} height="40" src="https://img.icons8.com/material/24/discount--v1.png" alt="discount--v1" />
                  </Grid>
                  <Grid item xs={8} textAlign="left">
                    <Button size='large' variant='text' sx={{ marginTop: '10px' }} >Apply Coupon</Button>
                  </Grid>
                  <Grid item xs={2} textAlign="right">
                    <ArrowForwardIosIcon sx={{ marginTop: '10px' }} />
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
                  <Box p={2} sx={{ border: '1px solid', borderRadius: '10px' }} mx={2} mt={1}>
                    <Grid container my={1}>
                    <Grid xs={1} textAlign={'center'}>
                      <FmdGoodIcon/>
                      </Grid>
                      <Grid xs={10}>
                        <Typography><b>Sending booking details to</b></Typography>
                        <span>+91 8423174102</span>
                      </Grid>
                    </Grid>
                    <hr />
                    <Grid container my={2}>
                    <Grid xs={1} textAlign={'center'}>
                      <FmdGoodIcon/>
                      </Grid>
                      <Grid xs={10}>
                        <Typography><b>Address</b></Typography>
                      </Grid>
                    </Grid>
                    <Box>
                      <hr />
                      <Button variant='contained' fullWidth size='large' onClick={show_allAddress}> Select an Address</Button>
                      <hr />
                    </Box>
                    <Grid container my={1}>
                    <Grid xs={1} textAlign={'center'}>
                      <AccessTimeFilledIcon/>
                      </Grid>
                      <Grid xs={10}>
                        <Typography><b>Slot</b></Typography>
                      </Grid>
                    </Grid>
                    <Box>
                      <hr />
                      <Button variant='contained' fullWidth size='large' onClick={openSchedule}> slot</Button>
                      <hr />
                    </Box>
                    <Grid container my={3}>
                    <Grid xs={1} textAlign={'center'}>
                      <PaymentIcon/>
                      </Grid>
                      <Grid xs={10}>
                        <Typography><b>Payment Method</b></Typography>
                      </Grid>
                    </Grid>
                    <Box>
                      <hr />
                      <Button onClick={() => navigate('/payment')} variant='contained' fullWidth size='large' >Payment</Button>
                      <hr />
                    </Box>
                    <Box sx={{ color: 'black' }}>
                      <Typography variant='h5'>Cancellation & reschedule policy</Typography>
                      <span>lorekkkkkkkkkkkkkkkkkkkkkkk
                      </span>
                    </Box>
                  </Box>
                </Grid>
                <Grid xs={4}>

                  <Box mx={1}>
                    <Box sx={{ my: 1, border: `1.5px solid ${buttonStyles.buttonColor}`, borderRadius: '10px', p: 1 }} >
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
            </Container>
          )
        )}

      </Media>
    </div>
  )
}
