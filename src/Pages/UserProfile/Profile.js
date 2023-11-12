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
import { Grid } from '@mui/material';
// import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Bookings from '../../Components/Bookings';
import Address from '../../Pages/Address'
import { open_profile_dialog } from '../../Redux/actions/actions';
import Media from 'react-media';
import { Link } from 'react-router-dom';


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
  const buttonStyles = useSelector((state) => state.apply_new_theme)
  const pages = ['Orders', 'Favourites', 'Address',];
  const [value, setValue] = React.useState(0);
  const [choice, setChoice] = useState('Lipstick');
  const dispatch = useDispatch()

  const handleClick = (data) => {
    setChoice(data.categoryName)
  }
  const handleChangeRoute = (index) => {
    if (0 === index) {
      navigate('/all_order')

    }
    else if (1 === index) {
      navigate('/address_profile')
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  };
  const handleChangeD = () => {
    dispatch(open_profile_dialog())
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
          color: '', p: 3, my: 6,
          borderRadius: '10px',
          backdropFilter: `blur(1px)`,
          background: ' rgb(255 255 255 / 0.3)'
        }}>
          <Grid container>
            <Grid xs={6}>
              <Typography variant='h4'> <b>Name</b></Typography>
              <span>number</span> &nbsp;<span>example123@gmail.com</span>
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
                <Box >
                  <Bookings />
                </Box>
              </TabPanel>
              <TabPanel value={value} index={1}>
                Item Two
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
          <Box sx={{
            p: 2,
            borderRadius: '10px',
            backdropFilter: `blur(10px)`,
            background: ' rgb(255 255 255 / 0.6)',
            color: 'black',
            m: 3
          }}>

            <Grid container px={2}>
              <Grid xs={6}>
                <Typography>{`item.name`}
                </Typography>
              </Grid>
              <Grid xs={6} textAlign={'end'}>
                <Typography>

                  {`+91 ${`item.phone_number`}`}
                </Typography>

              </Grid>


            </Grid>
            <Box p={2}>
              <Box mt={2} p={2} sx={{ border: '2px solid white', borderRadius: '10px' }}>

                <Link to='/all_booking'>
                  <Grid container>
                    <Grid xs={1}>
                      <ListIcon />
                    </Grid>
                    <Grid xs={5} textAlign={'start'}>
                      <Typography ml={2}> order</Typography></Grid>
                    <Grid xs={6} textAlign={'end'}><ArrowForwardIosIcon /></Grid>
                  </Grid>
                </Link>

              </Box>
              <Box mt={2} p={2} sx={{ border: '2px solid white', borderRadius: '10px' }}>
                <Link to='/address'>
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
                <Link to='/' >
                  <Grid container>

                    <Grid xs={1}>
                      <LogoutIcon />
                    </Grid>
                    <Grid xs={5} textAlign={'start'}><Typography ml={2}> Sign out</Typography></Grid>

                    <Grid xs={6} textAlign={'end'}><ArrowForwardIosIcon /> </Grid>
                  </Grid>


                </Link>
              </Box >


            </Box>
          </Box>
        )}
      </Media>
    </div >
  )
}
