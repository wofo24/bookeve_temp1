import React from 'react'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ListIcon from '@mui/icons-material/List';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LogoutIcon from '@mui/icons-material/Logout';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
// import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Theme_Button from '../../Components/Theme/Theme_Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Card, Grid } from '@mui/material';
import Bookings from '../../Components/Bookings';
import Address from '../../Pages/Address'
import { get_my_profile, open_profile_dialog } from '../../Redux/actions/actions';
import Media from 'react-media';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect } from 'react';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Profile() {
  const navigate = useNavigate()
  const token = Cookies.get('token')
  const buttonStyles = useSelector((state) => state.apply_new_theme)
  const get_my_profile_success_error = useSelector((state) => state.get_my_profile_success_error?.data)
  const pages = ['Orders', 'Address',];
  const style = { textDecoration: 'none', color: 'black', ':hover': { color: 'red' } }
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch()


  const handleChange = (event, newValue) => {
    setValue(newValue)
  };
  const handleChangeD = () => {
    dispatch(open_profile_dialog())


  }

  useEffect(() => {
    dispatch(get_my_profile(token))
  }, [])
  useEffect(() => {
    console.log(get_my_profile_success_error, 'this si ')
  }, [get_my_profile_success_error])

  const Logout = () => {
    Cookies.remove('token')
    const token = Cookies.get('token')
    if (token) {
      Cookies.remove('token')
      window.location.reload(true)
      navigate('/')

    }
  }

  return (
    <div>
      <Media
        queries={{
          small: '(max-width: 768px)',
          medium: '(min-width: 769px) and (max-width: 1024px)',
          large: '(min-width: 1025px)',
        }}
      >{(item) => item.large && (
        <Container sx={{
          p: 3, my: 6,
          borderRadius: '10px',
          backdropFilter: buttonStyles.child_backdropFilter,
          background: buttonStyles.child_bg,
          color: buttonStyles.child_div_text,
        }}>
          <Grid container>
            <Grid xs={6}>
              <Typography variant='h4' sx={{ textTransform: 'capitalize' }}> <b>{(get_my_profile_success_error?.name)}</b></Typography>
              <span style={{ fontSize: '12px' }}>{get_my_profile_success_error?.phone_number}</span> &nbsp;<span>{get_my_profile_success_error?.email_id}</span>
            </Grid>
            <Grid xs={6} sx={{ textAlign: 'end', pt: 2 }}>
              <Button variant='outlined' color='success' onClick={handleChangeD}>Edit Profile</Button>
            </Grid>
          </Grid>
          <Box my={3}
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%', background: 'white', color: 'black', p: 5, borderRadius: '10px' }}
          >

            <Tabs
              value={value}
              orientation="vertical"
              // variant="scrollable"
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: 'divider', width: '10rem', textAlign: 'end' }}
            >
              {pages.map((item, index) => (
                <Tab sx={{
                  textTransform: 'none',
                  fontWeight: '700',

                  width: 'auto',
                  display: 'flex', // Use flex layout
                  justifyContent: 'start',
                  flexDirection: 'row-reverse', // Reverses the direction, placing the button label on the left



                }} label={<Box sx={{ display: 'flex', textTransform: 'capitalize', textAlign: 'left', }}> <Typography sx={{ fontSize: '20px' }}>{item}</Typography> </Box>}  {...a11yProps(0)} />))}

            </Tabs>
            <Box sx={{ background: '', width: '100%' }}>
              <TabPanel value={value} index={0}>
                <Box mt={-4}>
                  <Bookings />
                </Box>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Box mt={-4}>
                  <Address from={false} />
                </Box>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Address />
              </TabPanel>
            </Box>
          </Box>

        </Container>
      )}
      </Media>
      <Media
        queries={{
          small: '(max-width: 768px)',
          medium: '(min-width: 769px) and (max-width: 1024px)',
          large: '(min-width: 1025px)',
        }}
      >
        {(item) => item.small && (
          <Card sx={{
            p: 2,
            borderRadius: '10px',
            backdropFilter: buttonStyles.child_backdropFilter,
            background: buttonStyles.child_bg,
            color: buttonStyles.child_div_text,
            m: 3
          }}>



            <Grid container>
              <Grid xs={7}>
                <Typography variant='h6' sx={{ textTransform: 'capitalize' }}> <>{get_my_profile_success_error?.name}</></Typography>
                <span style={{ fontSize: '15px' }}>{get_my_profile_success_error?.phone_number}</span>&nbsp; <br /><span style={{ fontSize: '15px' }}>{get_my_profile_success_error?.email_id ? get_my_profile_success_error.email_id : 'No email'}</span>
              </Grid>
              <Grid xs={5} sx={{ textAlign: 'end', mt: 1 }}>
                <Button size='small' variant='outlined' color='success' onClick={handleChangeD}>Edit Profile</Button>
              </Grid>
            </Grid>
            <Box p={2}>
              <Box mt={2} p={2} sx={{ border: '2px solid white', borderRadius: '10px' }}>

                <Link to='/all-booking' className='Profile_Button' style={style}>
                  <Grid container>
                    <Grid xs={1}>
                      <ListIcon />
                    </Grid>
                    <Grid xs={9} textAlign={'start'}>
                      <Typography ml={2} >My Booking</Typography></Grid>
                    <Grid xs={2} textAlign={'end'}><ArrowForwardIosIcon /></Grid>
                  </Grid>
                </Link>

              </Box>
              <Box mt={2} p={2} sx={{ border: '2px solid white', borderRadius: '10px' }}>
                <Link to='/address' className='Profile_Button' style={style}>
                  <Grid container>
                    <Grid xs={1}>
                      <LocationOnIcon />

                    </Grid>
                    <Grid xs={5} textAlign={'start'}><Typography ml={2}> Address</Typography></Grid>

                    <Grid xs={6} textAlign={'end'}><ArrowForwardIosIcon /> </Grid>
                  </Grid>
                </Link>
              </Box >
              <Box mt={2} p={2} sx={{ border: '2px solid white', borderRadius: '10px' }}>
                <Link to='/' className='Profile_Button' style={style} >
                  <Grid container>

                    <Grid xs={1}>
                      <LogoutIcon />
                    </Grid>
                    <Grid xs={5} textAlign={'start'}><Typography ml={2} onClick={Logout}> Sign out</Typography></Grid>

                    <Grid xs={6} textAlign={'end'}><ArrowForwardIosIcon /> </Grid>
                  </Grid>


                </Link>
              </Box >


            </Box>
          </Card>
        )}
      </Media>
    </div >
  )
}
