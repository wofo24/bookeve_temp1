import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import img from '../images/imagesSampleIMage.png'
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { add_package, add_fetch_post, clear_cart_data_message, increment_in_bag, decrement_in_bag, show_message, incrementPackageCount, openDialog, openRepeat, openView } from '../Redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LinearProgress from '@mui/material/LinearProgress';

export default function Package({ item }) {
  const dispatch = useDispatch()
  const buttonStyles = useSelector((state) => state.all_theme)
  const loading_post = useSelector((state) => state?.posts?.loading);
  // const loading = useSelector((state) => state.card_data.loading)
  const card_data = useSelector((state) => state.card_data)
  const [show_btn, setShow_btn] = useState(false)
  const [id, setId] = useState()

  const Increment = (id) => {
    if (item.variants) {
      if (item.quanitity === 0) {
        dispatch(openDialog(item))
      }
      else {
        dispatch(openRepeat(item))
      }
    } else {
      dispatch(increment_in_bag(id));
      dispatch(incrementPackageCount(id));
      dispatch(add_package(id));
    }
    setId(id)
    dispatch(add_fetch_post());
  }

  const Decrement = (id) => {
    setId(id)
    dispatch(decrement_in_bag(id));
    dispatch(add_fetch_post());
  }


  useEffect(() => {
    if (card_data.snack_update_increment !== null) {
      if (card_data.snack_update_increment.success) {
        dispatch(show_message(true, 'Package added successfully!', 'success'))
        dispatch(clear_cart_data_message())
      }

    }
  }, [dispatch, card_data.snack_update_increment])

  useEffect(() => {
    if (card_data.snack_update_decrement !== null) {
      if (card_data.snack_update_decrement.success) {
        dispatch(show_message(true, 'Package removed!', 'warning'))
        dispatch(clear_cart_data_message())
      }
    }

  }, [dispatch, card_data.snack_update_decrement])

  useEffect(() => {
    if (item?.quanitity >= 1 || item?.quanitity === 0) {
      setShow_btn(true);
    }
    else {
      setShow_btn(false)
    }
    setId()
  }, [item]);


  return (
    <Box my={1.5} sx={{ backgroundColor: 'transparent' }}>
      <Card sx={{
        backgroundColor: 'transparent',
        background: buttonStyles.child_bg,
        backdropFilter: buttonStyles.child_backdropFilter,
        color: buttonStyles.child_div_text,
        border: '1px solid #ececec',
        borderRadius: '10px',
        maxHeight: '190px',
        minHeightL: '150px',
        '@media screen and (min-width: 1200px)': {
          minWidth: '450px', // Adjust the value as needed
          margin: '0 auto', // Center the card horizontally
        }
      }}  >
        <Grid container>
          <Grid item xs={7} >
            <Box py={2} px={2} >
              <Typography component="div" sx={{ color: 'black', }} >
                {item?.package_name}
              </Typography>
              <Box component="div" sx={{ color: 'black', fontSize: '14px', color: 'gray', py: .4 }} >
                <Box sx={{ borderBottom: '1px dotted', width: 135, }}>
                  <StarsRoundedIcon sx={{ mt: -.5, fontSize: '18px' }} /> {item.avg_star_rating} ({item.reviews_count} reviews)
                </Box>
              </Box>
              <Typography variant="subtitle1" fontSize={'14px'} component="div">
                &#8377;{parseFloat(item?.original_price)} &#x2666; {item.duration} min
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {item.offer ? (`Off: ${item?.packageDiscount}%`) : ''}
              </Typography>

              <Typography color="text.secondary" sx={{ fontSize: '12px' }}>
                {item?.package_detail.split(' ').slice(0, 4).join(' ')} ...
              </Typography>
              <Box pt={1}>
                <Typography sx={{ textTransform: 'capitalize', color: buttonStyles.icons_Color }} variant='text' onClick={() => dispatch(openView(item))}>View details</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={5} sx={{ display: 'grid', placeContent: 'center', pt: 2 }} >
            <Box sx={{ maxWidth: '150px', maxHeight: '130px', overflow: 'hidden', borderRadius: '10px' }}>
              <CardMedia
                component="img"
                sx={{ width: '130px', height: '135px', m: 'auto', }}
                image={item.icon === null ? img : item.icon}
                alt="Not Found!"
              />
            </Box>
            <Box mt={-1}>
              <Box sx={{ color: '#fff3d0', mt: 2, ml: .9, }}>
                {show_btn ?
                  <>
                    < Grid container sx={{
                      float: "right",
                      display: 'flex', justifyContent: 'center',
                      alignContent: 'center', mt: -5, mr: 2.9, color: buttonStyles.icons_Color,
                      backgroundColor: 'white', width: '80px', height: '35px',
                      borderRadius: '10px',
                      overflow: 'hidden'
                    }}>

                      {loading_post && id === item?.id && id === item?.id ? (
                        <Box sx={{ width: '100%', px: 1 }}>
                          <LinearProgress fourColor sx={{ mt: 3.9, borderBottomRightRadius: '30px', borderBottomLeftRadius: '30px', mx: -.7, height: '5px' }} />
                        </Box>
                      ) :
                        <>
                          <Grid item textAlign={'center'} sx={{
                            display: 'flex', justifyContent: 'center',
                            alignContent: 'center',
                            pt: .7
                          }}>
                            <RemoveIcon onClick={() => {
                              Decrement(item?.id)

                            }} sx={{}} />
                          </Grid>
                          <Grid item textAlign={'center'} sx={{
                            display: 'flex', justifyContent: 'center',
                            alignContent: 'center',
                          }}>
                            <Box sx={{ background: buttonStyles.child_bg, height: '35px', width: '30px', pt: .3, fontWeight: 600, fontSize: '17px' }}>
                              {item.quanitity === null ? 0 : item.quanitity}
                            </Box>
                          </Grid>
                          <Grid item textAlign={'end'} sx={{
                            display: 'flex', justifyContent: 'center',
                            alignContent: 'center',
                            pt: .7
                          }}>
                            <AddIcon onClick={() => {
                              Increment(item?.id)
                            }} />
                          </Grid>
                        </>
                      }
                    </Grid>
                  </>
                  :
                  (<Button sx={{
                    overflow: 'hidden',
                    float: "right",
                    borderRadius: '10px', mt: -5, mr: 2.9, width: 83, height: '35px', textColor: '#ffc219',
                    background: 'white', background: buttonStyles.buttonColor,
                    color: buttonStyles.buttonText,
                    '&:hover, &:active': {
                      background: buttonStyles.buttonColor,
                      textColor: '#ffc219',
                    },
                  }} width={'80px'} onClick={() => {
                    Increment(item?.id)
                  }} >
                    {loading_post && id === item?.id ?
                      <Box sx={{ width: '100%' }}>
                        <LinearProgress fourColor sx={{ mt: 3.9, background: buttonStyles.buttonColor, borderBottomRightRadius: '30px', borderBottomLeftRadius: '30px', mx: -1, height: '5px' }} />
                      </Box>
                      : 'Add'}
                  </Button>)
                }
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box >

  )
}
